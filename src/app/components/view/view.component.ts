import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicineService } from '../../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Medicine } from '../../models/medicine.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ViewComponent implements OnInit {
  medicine: Medicine | undefined;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.medicineService.getMedicineById(id).subscribe(
      medicine => {
        this.medicine = medicine;
        console.log('Medicine fetched:', this.medicine); // Debugging log
      },
      error => {
        console.error('Error fetching medicine:', error);
      }
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}