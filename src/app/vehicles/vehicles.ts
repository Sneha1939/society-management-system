import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Navbar } from '../layout/navbar/navbar';
import { VehicleService } from '../services/vehicle';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Navbar],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class Vehicles implements OnInit {

  vehicles: any[] = [];
  searchText = '';
  showAddModal = false;
  showEditModal = false;
  selectedVehicleId = 0;

  vehicleForm = new FormGroup({
    ownerName: new FormControl('', Validators.required),
    flatNumber: new FormControl('', Validators.required),
    vehicleType: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required),
    parkingSlot: new FormControl('')
  });

  constructor(
    private vehicleService: VehicleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  get filteredVehicles() {
    if (!this.searchText) {
      return this.vehicles;
    }

    const search = this.searchText.toLowerCase();

    return this.vehicles.filter(vehicle =>
      vehicle.owner_name?.toLowerCase().includes(search) ||
      vehicle.flat_number?.toLowerCase().includes(search) ||
      vehicle.vehicle_number?.toLowerCase().includes(search) ||
      vehicle.vehicle_type?.toLowerCase().includes(search)
    );
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.vehicleForm.reset();
  }

  openEditModal(index: number): void {
    const vehicle = this.vehicles[index];

    this.selectedVehicleId = vehicle.id;

    this.vehicleForm.patchValue({
      ownerName: vehicle.owner_name,
      flatNumber: vehicle.flat_number,
      vehicleType: vehicle.vehicle_type,
      vehicleNumber: vehicle.vehicle_number,
      parkingSlot: vehicle.parking_slot
    });

    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.vehicleForm.reset();
  }

  addVehicle(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadVehicles();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateVehicle(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    this.vehicleService.updateVehicle(this.selectedVehicleId, this.vehicleForm.value).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadVehicles();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteVehicle(index: number): void {
    const vehicle = this.vehicles[index];

    const confirmed = confirm(`Delete vehicle ${vehicle.vehicle_number}?`);

    if (!confirmed) {
      return;
    }

    this.vehicleService.deleteVehicle(vehicle.id).subscribe({
      next: () => {
        this.loadVehicles();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}