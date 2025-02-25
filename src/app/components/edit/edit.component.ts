import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  private subscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicineService: MedicineService
  ) {
    this.editForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      price: [0, Validators.required],
      expiryDate: ['', Validators.required]
    });
    this.subscription = new Subscription();
  }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.subscription = this.medicineService.getMedicineById(id).subscribe(medicine => {
      this.editForm.patchValue(medicine);
    });
  }

  editMedicine() {
    if (this.editForm.valid) {
      const updatedMedicine: any = {
        int_rec_id: this.editForm.get('id')!.value,
        var_item_name: this.editForm.get('name')!.value,
        var_manufacturer_name: this.editForm.get('manufacturer')!.value,
        dec_price: this.editForm.get('price')!.value,
        dtm_creationdate: new Date().toISOString(), // Current date and time
        dtm_expirydate: this.editForm.get('expiryDate')!.value,
        int_status_id: 1 // default status ID (Success)
      };

      this.medicineService.updateMedicine(updatedMedicine.int_rec_id, updatedMedicine).subscribe(() => {
        alert('Medicine updated successfully!');
        this.router.navigate(['/list']);
      });
    }
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}