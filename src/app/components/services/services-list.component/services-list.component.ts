import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDto } from '../../../core/models/service.model';
import { ServiceService } from '../../../core/services/service.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ServiceEditComponent } from '../service-edit.component/service-edit.component';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ServiceEditComponent],
  templateUrl: './services-list.component.html'
})
export class ServicesListComponent implements OnInit, OnDestroy {
  services: ServiceDto[] = [];
  totalCount = 0;

  page = 1;
  pageSize = 10;
  search = '';
  loading = false;

  showModal = false;
  selected?: ServiceDto;

  private search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private svc: ServiceService) {}

  ngOnInit() {
    this.search$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(term => {
        this.search = term || '';
        this.page = 1;
        this.load(true);
      });

    this.load(true);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(term: string) {
    this.search$.next(term);
  }

  load(reset = false) {
    this.loading = true;
    this.svc.getPaged(this.page, this.pageSize, this.search).subscribe({
      next: res => {
        this.totalCount = res.totalCount;
        this.services = reset ? res.data : [...this.services, ...res.data];
      },
      complete: () => (this.loading = false)
    });
  }

  showMore() {
    if (this.services.length >= this.totalCount) return;
    this.page += 1;
    this.load(false);
  }

  openAdd() {
    this.selected = undefined;
    this.showModal = true;
  }
  openEdit(item: ServiceDto) {
    this.selected = item;
    this.showModal = true;
  }
  onClose(refresh: boolean) {
    this.showModal = false;
    if (refresh) {
      this.page = 1;
      this.load(true);
    }
  }
  remove(id: number) {
    if (!confirm('Delete this service?')) return;
    this.svc.delete(id).subscribe(() => {
      this.page = 1;
      this.load(true);
    });
  }
}
