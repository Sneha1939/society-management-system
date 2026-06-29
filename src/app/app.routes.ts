import { Routes } from '@angular/router';
import { Login } from './login/login';
import {Dashboard } from './dashboard/dashboard';
import {Complaints} from './complaints/complaints';
import { Residents } from './residents/residents';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'complaints',
    component: Complaints
  },
  {
  path: 'residents',
  component: Residents
}
];
