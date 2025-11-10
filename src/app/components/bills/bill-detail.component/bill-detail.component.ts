import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillHeaderDto, BillReceiptDto } from '../../../core/models/bill.model';
import { BillService } from '../../../core/services/bill.service';

@Component({
  selector: 'app-bill-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-detail.component.html'
})
export class BillDetailComponent implements OnInit {
  id = 0;
  bill: BillHeaderDto | null = null;
  receipts: BillReceiptDto[] = [];
  loading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private billService: BillService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) { this.errorMessage = 'Invalid Bill ID'; this.loading = false; return; }
    this.id = +idParam;

    this.billService.get(this.id).subscribe({
      next: (bill: BillHeaderDto) => { this.bill = bill; this.loading = false; },
      error: (err: any) => { console.error('Error fetching bill:', err); this.errorMessage = 'Failed to load bill details.'; this.loading = false; }
    });

    this.billService.getReceipts(this.id).subscribe({
      next: (receipts: BillReceiptDto[]) => (this.receipts = receipts),
      error: (err: any) => console.error('Error loading receipts:', err)
    });
  }
}
