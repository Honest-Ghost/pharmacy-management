import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private subscription: Subscription;
  private apiUrl = 'http://localhost:5165/api/medicine'; // Base API URL

  constructor(private http: HttpClient) {
    this.subscription = new Subscription();
  }

  // getMedicines(): Observable<Medicine[]> {
  //   return this.http.get<any>(`${this.apiUrl}/GetMedicines`).pipe(
  //     map(response => response.responseData.map((item: any) => ({
  //       id: item.int_rec_id,
  //       name: item.var_item_name,
  //       manufacturer: item.var_manufacturer_name,
  //       price: item.dec_price,
  //       expiryDate: item.dtm_expirydate.split('T')[0] // Format date to yyyy-MM-dd
  //     })))
  //   );
  // }

  getMedicineById(id: number): Observable<Medicine> {
    return this.http.get<any>(`${this.apiUrl}/GetMedicinesById/${id}`).pipe(
      map(response => ({
        id: response.responseData.int_rec_id,
        name: response.responseData.var_item_name,
        manufacturer: response.responseData.var_manufacturer_name,
        price: response.responseData.dec_price,
        expiryDate: response.responseData.dtm_expirydate.split('T')[0] // Format date to yyyy-MM-dd
      }))
    );
  }

  addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(`${this.apiUrl}/AddMedicine`, medicine);
  }

  updateMedicine(id: number, medicine: Medicine): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/UpdateMedicine`, medicine);
  }

  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteMedicine/${id}`);
  }
  getFilteredMedicine(searchMedicineName: string, searchManufacturer: string): Observable<any[]> {
    const payload = {
      var_item_name: searchMedicineName,
      var_manufacturer_name: searchManufacturer
    };

    return this.http.post<any[]>(`${this.apiUrl}/GetFilteredMedicine`, payload).pipe(
      map(response => response.map((item: any) => ({
        id: item.int_rec_id,
        name: item.var_item_name,
        manufacturer: item.var_manufacturer_name,
        price: item.dec_price,
        expiryDate: item.dtm_expirydate.split('T')[0] // Format date to yyyy-MM-dd
      })))
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}