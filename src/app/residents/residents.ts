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
showEditModal = false;
selectedResidentId = 0;
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
openEditModal(index: number): void {

  const resident = this.residents[index];

  this.selectedResidentId = resident.id;

  this.residentForm.patchValue({
    fullName: resident.full_name,
    flatNumber: resident.flat_number,
    phoneNumber: resident.phone_number,
    email: resident.email,
    emergencyContact: resident.emergency_contact,
    familyMembers: resident.family_members
  });

  this.showEditModal = true;
}
  closeAddModal(): void {
    this.showAddModal = false;
    this.residentForm.reset();
  }
closeEditModal(): void {

  this.showEditModal = false;
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
updateResident(): void {

  if (this.residentForm.invalid) {
    this.residentForm.markAllAsTouched();
    return;
  }

  const updatedResident = {
    fullName: this.residentForm.value.fullName,
    flatNumber: this.residentForm.value.flatNumber,
    phoneNumber: this.residentForm.value.phoneNumber,
    email: this.residentForm.value.email,
    emergencyContact: this.residentForm.value.emergencyContact,
    familyMembers: this.residentForm.value.familyMembers
  };

  this.residentService
    .updateResident(this.selectedResidentId, updatedResident)
    .subscribe({
      next: () => {
        this.closeEditModal();
        this.loadResidents();
      },
      error: (err) => {
        console.log(err);
      }
    });
}
  deleteResident(index: number): void {

  const resident = this.residents[index];

  const confirmed = confirm(
    `Are you sure you want to delete ${resident.full_name}?`
  );

  if (!confirmed) {
    return;
  }

  this.residentService.deleteResident(resident.id)
    .subscribe({
      next: () => {
        this.loadResidents();
      },
      error: (err) => {
        console.log(err);
      }
    });

}
}