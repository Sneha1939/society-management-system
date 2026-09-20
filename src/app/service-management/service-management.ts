import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ServiceService } from '../services/service';

@Component({
  selector: 'app-service-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './service-management.html',
  styleUrl: './service-management.css'
})
export class ServiceManagement implements OnInit {

  services: any[] = [];

  serviceForm: FormGroup;

  editingId: number | null = null;

  constructor(
  private serviceService: ServiceService,
  private fb: FormBuilder,
  private cdr: ChangeDetectorRef
)  {

    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      base_price: ['', [
        Validators.required,
        Validators.min(0)
      ]],
      status: ['ACTIVE', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {

  this.serviceService.getServices().subscribe({

    next: (data) => {
      console.log('Services received:', data);

      this.services = data;

      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error('Error fetching services:', error);
    }

  });

}

  saveService(): void {

    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    if (this.editingId !== null) {

      this.serviceService
        .updateService(this.editingId, this.serviceForm.value)
        .subscribe({

          next: () => {
  this.resetForm();
  this.loadServices();
},

          error: (error) => {
            console.error('Error updating service:', error);
          }

        });

    } else {

      this.serviceService
        .createService(this.serviceForm.value)
        .subscribe({

          next: () => {
  this.resetForm();
  this.loadServices();
},

          error: (error) => {
            console.error('Error creating service:', error);
          }

        });

    }

  }

  editService(service: any): void {

  console.log('Editing service:', service);

  this.editingId = service.id;

  this.serviceForm.patchValue({
    name: service.name,
    description: service.description,
    base_price: service.base_price,
    status: service.status
  });

  this.cdr.detectChanges();

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

  resetForm(): void {

    this.editingId = null;

    this.serviceForm.reset({
      name: '',
      description: '',
      base_price: '',
      status: 'ACTIVE'
    });

  }

}