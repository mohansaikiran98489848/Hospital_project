import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReceptionService } from '../../../core/services/reception.service';

@Component({
  selector: 'app-reception-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reception-register.component.html'
})
export class ReceptionRegisterComponent {
  dto: any = { patientId: 0, patientName: '', age: null, gender: '', phone: '', address: '', serviceId: null, paidAmount: null, paymentMode: '' };
  response: any;

  constructor(private svc: ReceptionService) {}

  submit() {
    this.svc.register(this.dto).subscribe({
      next: res => this.response = res,
      error: err => this.response = { error: err?.error ?? err }
    });
  }
}
