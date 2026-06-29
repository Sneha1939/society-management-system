import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ResidentService } from '../services/resident';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './residents.html',
  styleUrl: './residents.css'
})
export class Residents implements OnInit {

  residents: any[] = [];
  showAddModal = false;

  residentForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    flatNumber: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9][0-9]{9}$/)
    ]),
    email: new FormControl('', Validators.email),
    emergencyContact: new FormControl(''),
    familyMembers: new FormControl('', Validators.required)
  });

  constructor(
    private residentService: ResidentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadResidents();
  }

  loadResidents(): void {
    this.residentService.getResidents().subscribe({
      next: (data) => {
        this.residents = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.residentForm.reset();
  }

  addResident(): void {
    if (this.residentForm.invalid) {
      this.residentForm.markAllAsTouched();
      return;
    }

    const newResident = {
      fullName: this.residentForm.value.fullName,
      flatNumber: this.residentForm.value.flatNumber,
      phoneNumber: this.residentForm.value.phoneNumber,
      email: this.residentForm.value.email,
      emergencyContact: this.residentForm.value.emergencyContact,
      familyMembers: this.residentForm.value.familyMembers
    };

    this.residentService.addResident(newResident).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadResidents();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteResident(index: number): void {
    const resident = this.residents[index];

    this.residentService.deleteResident(resident.id).subscribe({
      next: () => {
        this.loadResidents();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}