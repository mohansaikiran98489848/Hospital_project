import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BillHeaderDto } from '../../../core/models/bill.model';
import { BillService } from '../../../core/services/bill.service';


@Component({
  selector: 'app-bills-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bills-list.component.html'
})
export class BillsListComponent implements OnInit {
  bills: BillHeaderDto[] = [];
  constructor(private svc: BillService) {}
  ngOnInit() { this.svc.getAll().subscribe({ next: (bills) => this.bills = bills, error: e => console.error(e) }); }
}
