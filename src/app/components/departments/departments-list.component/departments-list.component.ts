import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DepartmentService, DepartmentDto } from '../../../core/services/department.service';
import { TypeService } from '../../../core/services/type.service';
import { TypeDto } from '../../../core/models/type.model';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-departments-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {
  departments: DepartmentDto[] = [];
  totalCount = 0;
  page = 1;
  pageSize = 10;
  search = '';
  loading = true;

  showModal = false;
  isEdit = false;
  form!: FormGroup;
  editingId: number | null = null;

  types: TypeDto[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(
    private deptSvc: DepartmentService,
    private typeSvc: TypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      departmentName: ['', {
        validators: [Validators.required],
        asyncValidators: [this.duplicateNameValidator()],
        updateOn: 'blur'
      }],
      description: [''],
      typeId: ['', Validators.required],
    });

    this.typeSvc.getAll().subscribe({
      next: (list) => this.types = list ?? [],
      error: () => this.types = []
    });

    this.loadPage(1);
  }

  duplicateNameValidator() {
    return (control: AbstractControl) => {
      const name = control.value?.trim();
      if (!name) return of(null);
      return this.deptSvc.checkName(name, this.editingId ?? undefined).pipe(
        map(exists => (exists ? { duplicateName: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  loadPage(page: number, search: string = '') {
    this.loading = true;
    this.deptSvc.getPaged(page, this.pageSize, search).subscribe({
      next: (res) => {
        this.page = page;
        this.search = search;
        this.totalCount = res.totalCount;
        this.departments = page === 1 ? res.data : [...this.departments, ...res.data];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load departments';
        this.loading = false;
      }
    });
  }

  onSearch(term: string) {
    this.departments = [];
    this.loadPage(1, term);
  }

  showMore() {
    if (this.departments.length >= this.totalCount) return;
    this.loadPage(this.page + 1, this.search);
  }

  openAdd() {
    this.isEdit = false;
    this.editingId = null;
    this.form.reset({ departmentName: '', description: '', typeId: '' });
    this.showModal = true;
  }

  openEdit(dep: DepartmentDto) {
    this.isEdit = true;
    this.editingId = dep.departmentId;
    this.form.reset({
      departmentName: dep.departmentName,
      description: dep.description ?? '',
      typeId: dep.typeId
    });
    this.showModal = true;
  }

  save() {
    if (this.form.invalid) return;
    const dto: DepartmentDto = this.form.getRawValue();

    if (this.isEdit && this.editingId) {
      this.deptSvc.update(this.editingId, dto).subscribe({
        next: () => {
          this.successMessage = 'Department updated successfully';
          this.departments = [];
          this.loadPage(1, this.search);
          this.showModal = false;
        },
        error: () => this.errorMessage = 'Update failed'
      });
    } else {
      this.deptSvc.add(dto).subscribe({
        next: () => {
          this.successMessage = 'Department created successfully';
          this.departments = [];
          this.loadPage(1, this.search);
          this.showModal = false;
        },
        error: () => this.errorMessage = 'Creation failed'
      });
    }
  }

  confirmDelete(dep: DepartmentDto) {
    if (!confirm(`Delete "${dep.departmentName}"?`)) return;
    this.deptSvc.delete(dep.departmentId).subscribe({
      next: () => {
        this.successMessage = 'Department deleted successfully';
        this.departments = [];
        this.loadPage(1, this.search);
      },
      error: (err) => {
        this.errorMessage = err?.error ?? 'Delete failed';
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
