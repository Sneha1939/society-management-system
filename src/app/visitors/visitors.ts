import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Navbar } from '../layout/navbar/navbar';
import { VisitorService } from '../services/visitor';

@Component({
  selector: 'app-visitors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Navbar],
  templateUrl: './visitors.html',
  styleUrl: './visitors.css'
})
export class Visitors implements OnInit {

  visitors: any[] = [];
  searchText = '';
  showAddModal = false;

  visitorForm = new FormGroup({
    spocDesignation: new FormControl('', Validators.required),
    spocName: new FormControl('', Validators.required),
    spocDob: new FormControl('', Validators.required),
    platform: new FormControl('', Validators.required)
  });

  constructor(
    private visitorService: VisitorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadVisitors();
  }

  loadVisitors(): void {
    this.visitorService.getVisitors().subscribe({
      next: (data) => {
        this.visitors = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  get filteredVisitors() {
    if (!this.searchText) {
      return this.visitors;
    }

    const search = this.searchText.toLowerCase();

    return this.visitors.filter(visitor =>
      visitor.visitor_name?.toLowerCase().includes(search) ||
      visitor.spoc_designation?.toLowerCase().includes(search) ||
      visitor.platform?.toLowerCase().includes(search)
    );
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.visitorForm.reset();
  }

  addVisitor(): void {
    if (this.visitorForm.invalid) {
      this.visitorForm.markAllAsTouched();
      return;
    }

    const newSpoc = {
      spocDesignation: this.visitorForm.value.spocDesignation,
      spocName: this.visitorForm.value.spocName,
      spocDob: this.visitorForm.value.spocDob,
      platform: this.visitorForm.value.platform
    };

    this.visitorService.addVisitor(newSpoc).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadVisitors();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  updateStatus(index: number): void {
    const visitor = this.filteredVisitors[index];

    const newStatus =
      visitor.status === 'Inactive'
        ? 'Active'
        : 'Verified';

    this.visitorService.updateVisitorStatus(visitor.id, newStatus).subscribe({
      next: () => {
        this.loadVisitors();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  deleteVisitor(index: number): void {
    const visitor = this.filteredVisitors[index];

    const confirmed = confirm(`Delete SPOC ${visitor.visitor_name}?`);

    if (!confirmed) {
      return;
    }

    this.visitorService.deleteVisitor(visitor.id).subscribe({
      next: () => {
        this.loadVisitors();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}