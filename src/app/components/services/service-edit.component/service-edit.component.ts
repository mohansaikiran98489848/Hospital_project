import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceDto } from '../../../core/models/service.model';
import { ServiceService } from '../../../core/services/service.service';
import { DepartmentService, DepartmentDto } from '../../../core/services/department.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { TypeService } from '../../../core/services/type.service';
import { TypeDto } from '../../../core/models/type.model';
import { DoctorDto } from '../../../core/models/doctor.model';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-edit.component.html'
})
export class ServiceEditComponent implements OnInit {
  @Input() service?: ServiceDto;
  @Output() close = new EventEmitter<boolean>();

  form!: FormGroup;
  loading = true;

  types: TypeDto[] = [];
  departments: DepartmentDto[] = [];
  doctors: DoctorDto[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: ServiceService,
    private deptSvc: DepartmentService,
    private doctorSvc: DoctorService,
    private typeSvc: TypeService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      serviceName: ['', Validators.required],
      fee: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      typeId: ['', Validators.required],
      departmentId: ['', Validators.required],
      doctorId: ['', Validators.required]
      // outsourceId: [null] // optional, add when needed
    });

    Promise.all([
      this.typeSvc.getAll().toPromise(),
      this.deptSvc.getAll().toPromise()
    ])
    .then(([types, depts]) => {
      // ParentId 6 = "Service Category" (per your Type seeds)
      this.types = (types ?? []).filter(t => t.parentId === 6);
      this.departments = depts ?? [];

      if (this.service) {
        this.form.patchValue(this.service);
        // preload doctors for the existing department
        this.loadDoctors(this.service.departmentId);
      }
    })
    .finally(() => this.loading = false);

    // When department changes, refresh doctor list
    this.form.get('departmentId')!.valueChanges.subscribe(deptId => {
      if (deptId) this.loadDoctors(Number(deptId));
      this.form.get('doctorId')!.setValue('');
    });
  }
loadDoctors(departmentId: number) {
  this.doctorSvc.getByDepartment(departmentId).subscribe((res: any) => {
    // handle both possible shapes: array or object with data
    this.doctors = Array.isArray(res) ? res : res?.data ?? [];
  });
}


  save() {
    if (this.form.invalid) return;
    const dto: ServiceDto = this.form.getRawValue();

    if (this.service) {
      this.svc.update(this.service.serviceId, dto).subscribe({
        next: () => this.close.emit(true),
        error: err => console.error('Update failed:', err)
      });
    } else {
      this.svc.add(dto).subscribe({
        next: () => this.close.emit(true),
        error: err => console.error('Create failed:', err)
      });
    }
  }

  cancel() {
    this.close.emit(false);
  }
}
