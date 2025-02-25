import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/medicine.model'; // Import the Medicine interface

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule] // Add FormsModule here
})
export class ListComponent implements OnInit {
  medicines: Medicine[] = [];
  selectedCount: number = 0;
  searchManufacturer: string = '';
  searchMedicineName: string = '';
  private searchTerms = new Subject<void>();
  private sortColumn: string = '';
  private sortDirection: 'asc' | 'desc' = 'asc';


  constructor(private medicineService: MedicineService) { }

  // ngOnInit() {
  //   this.medicineService.getMedicines().subscribe(medicines => {
  //     this.medicines = medicines;
  //     this.updateSelectedCount();
  //   });
  // }
  
  // ngOnInit(): void {
  //   this.getMedicines();
  // }
  ngOnInit(): void {
    this.getMedicines();
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.getMedicines();
    });
  }
  getMedicines(): void {
    this.medicineService.getFilteredMedicine(this.searchMedicineName, this.searchManufacturer).subscribe(
      (data: any[]) => {
        this.medicines = data;
      },
      error => {
        console.error('Error fetching medicines:', error);
      }
    );
  }
  search(): void {
    this.getMedicines();
  }

  selectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.medicines.forEach(medicine => {
      medicine.selected = checked;
    });
    this.updateSelectedCount();
  }

  deselectAll() {
    this.medicines.forEach(medicine => {
      medicine.selected = false;
    });
    this.updateSelectedCount();
  }

  updateSelectedCount() {
    this.selectedCount = this.medicines.filter(medicine => medicine.selected).length;
  }

  deleteMedicine(id: number) {
    if (confirm('Are you sure you want to delete this medicine?')) {
      this.medicineService.deleteMedicine(id).subscribe(() => {
        // Refresh the list after deletion
        this.medicineService.getFilteredMedicine(this.searchMedicineName, this.searchManufacturer).subscribe(medicines => {
          this.medicines = medicines;
          this.updateSelectedCount();
        });
      });
    }
  }

  deleteSelected() {
    if (confirm('Are you sure to delete the selected entries?')) {
      const selectedIds = this.medicines.filter(medicine => medicine.selected).map(medicine => medicine.id);
      selectedIds.forEach(id => {
        this.medicineService.deleteMedicine(id).subscribe(() => {
          // Refresh the list after deletion
          this.medicineService.getFilteredMedicine(this.searchMedicineName, this.searchManufacturer).subscribe(medicines => {
            this.medicines = medicines;
            this.updateSelectedCount();
          });
        });
      });
    }
  }
}