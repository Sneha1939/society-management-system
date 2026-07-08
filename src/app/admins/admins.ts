import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Navbar } from '../layout/navbar/navbar';
import { AdminService } from '../services/admin';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Navbar],
  templateUrl: './admins.html',
  styleUrl: './admins.css'
})
export class Admins implements OnInit {

  admins: any[] = [];
  searchText = '';
  showAddModal = false;

  adminForm = new FormGroup({
    adminName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[6-9][0-9]{9}$/)
    ]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    aggregator: new FormControl('', Validators.required)
  });

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  get filteredAdmins() {
    if (!this.searchText) {
      return this.admins;
    }

    const search = this.searchText.toLowerCase();

    return this.admins.filter(admin =>
      admin.admin_name?.toLowerCase().includes(search) ||
      admin.email?.toLowerCase().includes(search) ||
      admin.username?.toLowerCase().includes(search) ||
      admin.aggregator?.toLowerCase().includes(search)
    );
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.adminForm.reset();
  }

  addAdmin(): void {
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      return;
    }

    this.adminService.addAdmin(this.adminForm.value).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadAdmins();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  toggleStatus(index: number): void {
    const admin = this.filteredAdmins[index];

    const newStatus =
      admin.status === 'Active'
        ? 'Inactive'
        : 'Active';

    this.adminService.updateAdminStatus(admin.id, newStatus).subscribe({
      next: () => {
        this.loadAdmins();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  deleteAdmin(index: number): void {
    const admin = this.filteredAdmins[index];

    const confirmed = confirm(`Delete admin ${admin.admin_name}?`);

    if (!confirmed) {
      return;
    }

    this.adminService.deleteAdmin(admin.id).subscribe({
      next: () => {
        this.loadAdmins();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}