/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationDto } from '../../../core/models/consultation.model';
import { ConsultationService } from '../../../core/services/consultation.service';


@Component({
  selector: 'app-consultations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultations-list.component.html'
})
export class ConsultationsListComponent implements OnInit {
  consultations: ConsultationDto[] = [];
  constructor(private cs: ConsultationService) {}
  ngOnInit() { this.cs.getAll().subscribe(x => this.consultations = x); }
}
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConsultationDto } from '../../../core/models/consultation.model';
import { ConsultationService } from '../../../core/services/consultation.service';
import { ConsultationEditComponent } from '../consultation-edit.component/consultation-edit.component';

@Component({
  selector: 'app-consultations-list',
  standalone: true,
  imports: [CommonModule, ConsultationEditComponent],
  templateUrl: './consultations-list.component.html'
})
export class ConsultationsListComponent implements OnInit {
  consultations: ConsultationDto[] = [];
  showForm = false;
  selectedId: number = 0;

  constructor(private cs: ConsultationService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.cs.getAll().subscribe(x => (this.consultations = x));
  }

  addConsultation() {
    this.selectedId = 0;
    this.showForm = true;
  }

  editConsultation(id: number) {
    this.selectedId = id;
    this.showForm = true;
  }

  onCloseForm(refresh = false) {
    this.showForm = false;
    if (refresh) this.load();
  }
}
