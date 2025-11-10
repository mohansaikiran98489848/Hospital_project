import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../../../core/services/type.service';
import { TypeDto } from '../../../core/models/type.model';

@Component({
  selector: 'app-types-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './types-list.component.html'
})
export class TypesListComponent implements OnInit {
  // list
  types: TypeDto[] = [];
  totalCount = 0;
  page = 1;
  pageSize = 10;
  search = '';
  loading = true;

  // parents dropdown source
  allTypesForParent: TypeDto[] = [];

  // modal/form
  showModal = false;
  isEdit = false;
  form!: FormGroup;
  editingId: number | null = null;

  // messages
  successMsg = '';
  errorMsg = '';

  // helpers for UI state
  canShowMore = computed(() => this.types.length < this.totalCount);

  constructor(
    private fb: FormBuilder,
    private typeSvc: TypeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      typeName: ['', Validators.required],
      parentId: [null], // can be null
      description: ['']
    });

    // parents list
    this.typeSvc.getAll().subscribe({
      next: (list) => this.allTypesForParent = list ?? [],
      error: () => this.allTypesForParent = []
    });

    this.loadPage(1);
  }

  loadPage(page: number, search: string = '') {
  this.loading = true;

  this.typeSvc.getPaged(page, this.pageSize, search).subscribe({
    next: (res) => {
      this.page = page;
      this.search = search;
      this.totalCount = res.totalCount;

      // ✅ Append if not first page, replace if first page
      if (page === 1) {
        this.types = res.data;
      } else {
        this.types = [...this.types, ...res.data];
      }

      this.loading = false;
    },
    error: () => {
      this.errorMsg = 'Failed to load types.';
      this.loading = false;
    }
  });
}

  // template safely passes value via a template ref variable (#q)
  onSearch(term: string) {
    this.types = [];
    this.loadPage(1, term);
  }

  showMore() {
  // ✅ only load next page if records still remain
  if (this.types.length < this.totalCount && !this.loading) {
    this.loadPage(this.page + 1, this.search);
  }
}

  openAdd() {
    this.isEdit = false;
    this.editingId = null;
    this.successMsg = '';
    this.errorMsg = '';
    this.form.reset({ typeName: '', parentId: null, description: '' });
    this.showModal = true;
  }

  openEdit(row: TypeDto) {
    this.isEdit = true;
    this.editingId = row.id;
    this.successMsg = '';
    this.errorMsg = '';
    this.form.reset({
      typeName: row.typeName,
      parentId: row.parentId ?? null,
      description: row.description ?? ''
    });
    this.showModal = true;
  }

  save() {
    if (this.form.invalid) return;
    const body: TypeDto = {
      id: this.isEdit && this.editingId ? this.editingId : 0,
      typeName: this.form.value.typeName,
      parentId: this.form.value.parentId ?? null,
      description: this.form.value.description ?? '',
    };

    if (this.isEdit && this.editingId) {
      this.typeSvc.update(this.editingId, body).subscribe({
        next: () => {
          this.successMsg = 'Type updated successfully';
          this.types = [];
          this.loadPage(1, this.search);
          this.showModal = false;
        },
        error: (err) => this.errorMsg = err?.error ?? 'Update failed'
      });
    } else {
      this.typeSvc.add(body).subscribe({
        next: () => {
          this.successMsg = 'Type created successfully';
          this.types = [];
          this.loadPage(1, this.search);
          this.showModal = false;
        },
        error: (err) => this.errorMsg = err?.error ?? 'Create failed'
      });
    }
  }

  confirmDelete(row: TypeDto) {
    if (!confirm(`Delete "${row.typeName}"?`)) return;
    this.typeSvc.delete(row.id).subscribe({
      next: () => {
        this.successMsg = 'Type deleted';
        this.types = [];
        this.loadPage(1, this.search);
      },
      error: (err) => {
        this.errorMsg = (typeof err?.error === 'string' && err.error) ? err.error : 'Delete failed';
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }

  // exclude self in parent dropdown during edit
  parentOptions(): TypeDto[] {
    if (!this.isEdit || !this.editingId) return this.allTypesForParent;
    return this.allTypesForParent.filter(t => t.id !== this.editingId);
  }
}
