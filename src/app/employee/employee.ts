import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        console.log(data);
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}