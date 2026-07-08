import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ResidentService } from '../services/resident';
import { Navbar } from '../layout/navbar/navbar';
@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Navbar],
  templateUrl: './residents.html',
  styleUrl: './residents.css'
})
export class Residents implements OnInit {

  residents: any[] = [];
  showAddModal = false;
showEditModal = false;
selectedResidentId = 0;
searchText = '';
aggregatorList: any[] = [];
  residentForm = new FormGroup({
  fullName: new FormControl('', Validators.required),

  phoneNumber: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[6-9][0-9]{9}$/)
  ]),

  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),

  state: new FormControl('', Validators.required),

  aggregator: new FormControl('', Validators.required)
});

  constructor(
    private residentService: ResidentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.loadResidents();
  this.loadAggregatorList();
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
loadAggregatorList(): void {
  fetch('/assets/aggregators.json')
    .then(response => response.json())
    .then(json => {
      this.aggregatorList = json.data;
      this.cdr.detectChanges();
    })
    .catch(error => {
      console.log(error);
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
    phoneNumber: resident.phone_number,
    email: resident.email,
    state: resident.state,
    aggregator: resident.aggregator
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
    console.log('Add button clicked');
console.log('Form valid:', this.residentForm.valid);
console.log('Form value:', this.residentForm.value);
console.log('Form errors:', this.residentForm);
    console.log("Save button clicked");
    if (this.residentForm.invalid) {
      this.residentForm.markAllAsTouched();
      return;
    }

    const newResident = {
  fullName: this.residentForm.value.fullName,
  phoneNumber: this.residentForm.value.phoneNumber,
  email: this.residentForm.value.email,
  state: this.residentForm.value.state,
  aggregator: this.residentForm.value.aggregator
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
  console.log('Update button clicked');
console.log('Form valid:', this.residentForm.valid);
console.log('Form value:', this.residentForm.value);

  if (this.residentForm.invalid) {
    this.residentForm.markAllAsTouched();
    return;
  }

  const updatedResident = {
  fullName: this.residentForm.value.fullName,
  phoneNumber: this.residentForm.value.phoneNumber,
  email: this.residentForm.value.email,
  state: this.residentForm.value.state,
  aggregator: this.residentForm.value.aggregator
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
get filteredResidents() {
  if (!this.searchText) {
    return this.residents;
  }

  const search = this.searchText.toLowerCase();

  return this.residents.filter(resident =>
    resident.full_name?.toLowerCase().includes(search) ||
    resident.flat_number?.toLowerCase().includes(search) ||
    resident.phone_number?.includes(search)
  );
}
}