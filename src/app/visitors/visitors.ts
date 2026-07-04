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
    visitorName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9][0-9]{9}$/)
    ]),
    flatNumber: new FormControl('', Validators.required),
    purpose: new FormControl('')
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
      error: (err) => {
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
      visitor.flat_number?.toLowerCase().includes(search) ||
      visitor.phone_number?.includes(search)
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

    this.visitorService.addVisitor(this.visitorForm.value).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadVisitors();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateStatus(index: number, status: string): void {
    const visitor = this.visitors[index];

    this.visitorService.updateVisitorStatus(visitor.id, status).subscribe({
      next: () => {
        this.loadVisitors();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteVisitor(index: number): void {
    const visitor = this.visitors[index];

    const confirmed = confirm(`Delete visitor ${visitor.visitor_name}?`);

    if (!confirmed) {
      return;
    }

    this.visitorService.deleteVisitor(visitor.id).subscribe({
      next: () => {
        this.loadVisitors();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}