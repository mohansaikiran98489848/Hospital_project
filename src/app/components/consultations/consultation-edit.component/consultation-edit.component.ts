import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { ConsultationService } from '../../../core/services/consultation.service';
import { PatientService } from '../../../core/services/patient.service';
import { DoctorService } from '../../../core/services/doctor.service';
import { ServiceService } from '../../../core/services/service.service';
import { DepartmentService, DepartmentDto } from '../../../core/services/department.service';

import { ConsultationDto } from '../../../core/models/consultation.model';
import { PatientDto } from '../../../core/models/patient.model';
import { DoctorDto } from '../../../core/models/doctor.model';
import { ServiceDto } from '../../../core/models/service.model';

@Component({
  selector: 'app-consultation-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './consultation-edit.component.html'
})
export class ConsultationEditComponent implements OnInit, OnDestroy {
  @Input() id: number = 0;
  @Output() close = new EventEmitter<boolean>();

  form!: FormGroup;
  departments: DepartmentDto[] = [];
  doctors: DoctorDto[] = [];
  services: ServiceDto[] = [];
  selectedService?: ServiceDto;
  isNew = true;
  loading = true;

  // ✅ Patient search
  searchTerm = '';
  filteredPatients: PatientDto[] = [];
  private searchSubject = new Subject<string>();
  private subs: Subscription[] = [];

  // ✅ Add new patient modal
  showAddPatientModal = false;
  newPatient: PatientDto = { patientId: 0, patientName: '', age: 0, gender: '', phone: '', address: '' };

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private serviceService: ServiceService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.isNew = !this.id;

    this.form = this.fb.group({
      patientId: ['', Validators.required],
      departmentId: ['', Validators.required],
      doctorId: ['', Validators.required],
      serviceId: ['', Validators.required],
      departmentName: [{ value: '', disabled: true }],
      consultationDate: [''],
      fee: [''],
      notes: ['']
    });

    // ✅ Patient live search
    this.subs.push(
      this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe(term => {
        const clean = term.trim();
        if (!clean) {
          this.filteredPatients = [];
          return;
        }
        this.patientService.searchPatients(clean).subscribe(results => {
          this.filteredPatients = results ?? [];
        });
      })
    );

    // ✅ Load departments and services initially
    Promise.all([
      this.departmentService.getAll().toPromise(),
      this.serviceService.getAll().toPromise()
    ]).then(([departments, services]) => {
      this.departments = departments ?? [];
      this.services = services ?? [];

      if (!this.isNew) {
        this.consultationService.get(this.id).subscribe(c => {
          this.form.patchValue(c);
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });

    // ✅ When department changes → fetch doctors
    this.subs.push(
      this.form.get('departmentId')!.valueChanges.subscribe((depId: number | string) => {
        const id = +depId;
        if (!id) {
          this.doctors = [];
          this.form.patchValue({ doctorId: '' });
          return;
        }

        // Load department name
        this.departmentService.get(id).subscribe(dep => {
          this.form.patchValue({ departmentName: dep.departmentName });
        });

        // ✅ Load doctors for the selected department
        this.doctorService.getByDepartment(id).subscribe(docs => {
          this.doctors = docs ?? [];
          if (docs.length === 1) {
            this.form.patchValue({ doctorId: docs[0].doctorId });
          }
        });
      })
    );

    // ✅ When service changes → update fee automatically
    this.subs.push(
      this.form.get('serviceId')!.valueChanges.subscribe((serviceId: number | string) => {
        const id = +serviceId;
        const selected = this.services.find(s => s.serviceId === id);
        this.selectedService = selected;
        this.form.patchValue({
          fee: selected?.fee || ''
        });
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  // ✅ Patient search input handler
  onSearch(term: string) {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  // ✅ Select a patient from search result
  selectPatient(p: PatientDto) {
    this.form.patchValue({ patientId: p.patientId });
    this.searchTerm = p.patientName;
    this.filteredPatients = [];
  }

  // ✅ Save consultation
  save() {
    const dto: ConsultationDto = this.form.getRawValue();
    if (this.isNew) {
      this.consultationService.add(dto).subscribe(() => this.close.emit(true));
    } else {
      this.consultationService.update(this.id, dto).subscribe(() => this.close.emit(true));
    }
  }

  cancel() {
    this.close.emit(false);
  }

  // ✅ Open add patient modal
  openAddPatient() {
    this.newPatient = { patientId: 0, patientName: '', age: 0, gender: '', phone: '', address: '' };
    this.showAddPatientModal = true;
  }

  // ✅ Save new patient
  saveNewPatient() {
    this.patientService.add(this.newPatient).subscribe({
      next: () => {
        this.showAddPatientModal = false;
        this.patientService.searchPatients(this.newPatient.patientName).subscribe(list => {
          const added = (list ?? []).find(x => x.patientName === this.newPatient.patientName);
          if (added) {
            this.form.patchValue({ patientId: added.patientId });
            this.searchTerm = added.patientName;
          }
        });
      }
    });
  }

  cancelNewPatient() {
    this.showAddPatientModal = false;
  }
}
