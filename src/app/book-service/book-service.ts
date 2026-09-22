import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ServiceService } from '../services/service';
import { ServiceRequestService } from '../services/service-request';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-service.html',
  styleUrl: './book-service.css'
})
export class BookService implements OnInit {

  requestForm: FormGroup;

  services: any[] = [];

  successMessage = '';
  errorMessage = '';

  submitting = false;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private serviceRequestService: ServiceRequestService,
    private cdr: ChangeDetectorRef
  ) {

    this.requestForm = this.fb.group({

      customer_name: [
        '',
        Validators.required
      ],

      customer_phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9][0-9]{9}$/)
        ]
      ],

      service_category_id: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.required
      ],

      address: [
        '',
        Validators.required
      ],

      preferred_date: [
        '',
        Validators.required
      ],

      preferred_time: [
        '',
        Validators.required
      ]

    });
  }


  ngOnInit(): void {
    this.loadServices();
  }


  loadServices(): void {

    this.serviceService.getServices().subscribe({

      next: (data) => {

        this.services = data.filter(
          service => service.status === 'ACTIVE'
        );

        console.log('Active services:', this.services);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error loading services:', error);

        this.errorMessage = 'Unable to load services';

        this.cdr.detectChanges();
      }

    });
  }


  submitRequest(): void {

    if (this.requestForm.invalid) {

      this.requestForm.markAllAsTouched();

      return;
    }


    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';


    this.serviceRequestService
      .createRequest(this.requestForm.value)
      .subscribe({

        next: (response) => {

          this.successMessage =
            `Service request #${response.id} created successfully`;

          this.requestForm.reset();

          this.submitting = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error('Error creating service request:', error);

          this.errorMessage =
            error.error?.message ||
            'Unable to create service request';

          this.submitting = false;

          this.cdr.detectChanges();
        }

      });
  }
}