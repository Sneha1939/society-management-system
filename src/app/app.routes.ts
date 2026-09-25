import { Routes } from '@angular/router';
import { Login } from './login/login';
import {Dashboard } from './dashboard/dashboard';
import {Complaints} from './complaints/complaints';
import { Residents } from './residents/residents';
import { Visitors } from './visitors/visitors';
import { Vehicles } from './vehicles/vehicles';
import { Admins } from './admins/admins';
import { WorkerVerification } from './worker-verification/worker-verification';
import { DedicatedLogin } from './dedicated-login/dedicated-login';
import { ServiceManagement } from './service-management/service-management';
import { BookService } from './book-service/book-service';
import { ServiceRequests } from './service-requests/service-requests';
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
},
{
  path: 'visitors',
  component: Visitors
},
{
  path: 'vehicles',
  component: Vehicles
},
{
  path: 'admins',
  component: Admins
},
{
  path: 'worker-verification',
  component: WorkerVerification
},
{
  path: 'dedicated-login',
  component: DedicatedLogin
},
{
  path: 'services-management',
  component: ServiceManagement
},
{
  path: 'book-service',
  component: BookService
},
{
  path: 'service-requests',
  component: ServiceRequests
}
];
