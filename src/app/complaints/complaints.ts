import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { ComplaintService } from '../services/complaint';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Navbar } from '../layout/navbar/navbar';
@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './complaints.html',
  styleUrl: './complaints.css',
})

export class Complaints implements OnInit{
  complaints: any[] = [];
  constructor(private complaintService: ComplaintService,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.loadComplaints();
}

loadComplaints(): void {
  console.log("loadComplaints() called");

  this.complaintService.getComplaints().subscribe({
    next: (data) => {
      console.log('Complaints from backend:', data);
      this.complaints = data;
      console.log("Complaints array:", this.complaints);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log(err);
    }
  });
}
  complaintForm= new FormGroup({
    residentName: new FormControl('', Validators.required),
    flatNumber: new FormControl('', Validators.required),
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required)
  });
  
  submitComplaint(): void {

  if (this.complaintForm.invalid) {
    this.complaintForm.markAllAsTouched();
    return;
  }

  const newComplaint = {
    residentName:this.complaintForm.value.residentName,
    flatNumber: this.complaintForm.value.flatNumber,
    title: this.complaintForm.value.title,
    description: this.complaintForm.value.description,
    category: this.complaintForm.value.category
  };

  this.complaintService.addComplaint(newComplaint)
    .subscribe({
      next: (response) => {

        console.log(response);

        this.complaints = [response, ...this.complaints];

        this.complaintForm.reset();
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err);
      }
    });
}
markResolved(index: number): void {
  const complaint = this.complaints[index];

  this.complaintService.updateComplaintStatus(complaint.id, 'Resolved')
    .subscribe({
      next: () => {
        this.loadComplaints();
      },
      error: (err) => {
        console.log(err);
      }
    });
}

deleteComplaint(index: number): void {

  const complaint = this.complaints[index];

  this.complaintService.deleteComplaint(complaint.id)
    .subscribe({
      next: () => {
        this.loadComplaints();
      },
      error: (err) => {
        console.log(err);
      }
    });
}
}
