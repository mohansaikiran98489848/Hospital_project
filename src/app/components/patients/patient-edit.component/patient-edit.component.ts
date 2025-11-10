import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientDto } from '../../../core/models/patient.model';
import { PatientService } from '../../../core/services/patient.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './patient-edit.component.html'
})
export class PatientEditComponent implements OnInit {
  patient: PatientDto = { patientId: 0, patientName: '', age: 0, gender: '', phone: '', address: '' };
  isNew = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: PatientService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && id > 0) {
      this.isNew = false;
      this.svc.get(id).subscribe(p => this.patient = p);
    }
  }

  save() {
    if (this.isNew) {
      this.svc.add(this.patient).subscribe(() => this.router.navigate(['/patients']));
    } else {
      this.svc.update(this.patient.patientId, this.patient).subscribe(() => this.router.navigate(['/patients']));
    }
  }

  cancel() {
    this.router.navigate(['/patients']);
  }
}
