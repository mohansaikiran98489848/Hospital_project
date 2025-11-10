import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../core/services/doctor.service';
import { DepartmentService } from '../../../core/services/department.service';
import { TypeService } from '../../../core/services/type.service';
import { DoctorDto } from '../../../core/models/doctor.model';
import { DepartmentDto } from '../../../core/services/department.service';
import { TypeDto } from '../../../core/models/type.model';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-edit.component.html'
})
export class DoctorEditComponent implements OnInit {
  @Input() doctor?: DoctorDto;
  @Output() close = new EventEmitter<boolean>();

  form!: FormGroup;
  departments: DepartmentDto[] = [];
  types: TypeDto[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
    private typeService: TypeService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      typeId: ['', Validators.required],
      departmentId: ['', Validators.required],
      doctorName: ['', Validators.required],
      qualification: [''],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]]
    });

    // Load types and departments
    Promise.all([
      this.typeService.getAll().toPromise(),
      this.departmentService.getAll().toPromise()
    ])
      .then(([types, departments]) => {
        // ✅ Filter: only show doctor-related types
        this.types = (types ?? []).filter(t =>
          t.typeName.toLowerCase().includes('doctor') || t.parentId === 5
        );

        this.departments = departments ?? [];

        if (this.doctor) {
          this.form.patchValue(this.doctor);
        }
      })
      .finally(() => (this.loading = false));
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: DoctorDto = this.form.getRawValue();
    dto.typeId = Number(dto.typeId);
    dto.departmentId = Number(dto.departmentId);

    if (this.doctor) {
      this.doctorService.update(this.doctor.doctorId, dto).subscribe({
        next: () => this.close.emit(true),
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.doctorService.add(dto).subscribe({
        next: () => this.close.emit(true),
        error: (err) => console.error('Create failed:', err)
      });
    }
  }

  cancel() {
    this.close.emit(false);
  }
}
