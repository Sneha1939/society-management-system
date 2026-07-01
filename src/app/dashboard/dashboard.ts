import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../services/dashboard';
import { Navbar } from '../layout/navbar/navbar';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  stats: any = {};
today = new Date();
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}