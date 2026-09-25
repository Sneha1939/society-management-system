import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ServiceRequestService }
  from '../services/service-request';

import { AssignmentService }
  from '../services/assignment';

@Component({
  selector: 'app-service-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-requests.html',
  styleUrl: './service-requests.css'
})
export class ServiceRequests implements OnInit {

  requests: any[] = [];

  matchingWorkers: any[] = [];

  selectedRequest: any = null;

  loading = false;
  workersLoading = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private serviceRequestService: ServiceRequestService,
    private assignmentService: AssignmentService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.loadRequests();
  }


  loadRequests(): void {

    this.loading = true;

    this.serviceRequestService
      .getRequests()
      .subscribe({

        next: (data) => {

          this.requests = data;
          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error loading service requests:',
            error
          );

          this.errorMessage =
            'Unable to load service requests';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }


  findWorkers(request: any): void {

    this.selectedRequest = request;

    this.matchingWorkers = [];

    this.successMessage = '';
    this.errorMessage = '';

    this.workersLoading = true;


    this.serviceRequestService
      .getMatchingWorkers(
        request.service_category_id
      )
      .subscribe({

        next: (workers) => {

          this.matchingWorkers = workers;

          this.workersLoading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error finding workers:',
            error
          );

          this.errorMessage =
            'Unable to find matching workers';

          this.workersLoading = false;

          this.cdr.detectChanges();
        }

      });
  }


  assignWorker(worker: any): void {

    if (!this.selectedRequest) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';


    this.assignmentService
      .assignWorker(
        this.selectedRequest.id,
        worker.id
      )
      .subscribe({

        next: () => {

          this.successMessage =
            `${worker.worker_name} assigned successfully`;

          this.matchingWorkers = [];

          this.selectedRequest = null;

          // Reload requests so OPEN becomes ASSIGNED
          this.loadRequests();

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Error assigning worker:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Unable to assign worker';

          this.cdr.detectChanges();
        }

      });
  }


  closeWorkers(): void {

    this.selectedRequest = null;

    this.matchingWorkers = [];

    this.errorMessage = '';

    this.cdr.detectChanges();
  }

}