import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component/dashboard.component';
import { RoleGuard } from './core/guards/role.guard';
import { PatientsListComponent } from './components/patients/patients-list.component/patients-list.component';
import { PatientEditComponent } from './components/patients/patient-edit.component/patient-edit.component';
import { DoctorsListComponent } from './components/doctors/doctors-list.component/doctors-list.component';
import { ServicesListComponent } from './components/services/services-list.component/services-list.component';
import { ReceptionRegisterComponent } from './components/reception/reception-register.component/reception-register.component';
import { ConsultationsListComponent } from './components/consultations/consultations-list.component/consultations-list.component';
import { BillsListComponent } from './components/bills/bills-list.component/bills-list.component';
import { BillDetailComponent } from './components/bills/bill-detail.component/bill-detail.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ConsultationEditComponent } from './components/consultations/consultation-edit.component/consultation-edit.component';
import { DepartmentsListComponent } from './components/departments/departments-list.component/departments-list.component';
import { TypesListComponent } from './components/types/types-list.component/types-list.component';

/*export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

    { path: 'patients', component: PatientsListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Reception'] } },
  { path: 'patients/edit/:id', component: PatientEditComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Reception'] } },
  { path: 'doctors', component: DoctorsListComponent, canActivate: [AuthGuard] },
  
   { path: 'departments', component: DepartmentsListComponent, canActivate: [AuthGuard] },
      { path: 'services', component: ServicesListComponent, canActivate: [AuthGuard] },
  { path: 'reception', component: ReceptionRegisterComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Reception'] } },
  { path: 'consultations', component: ConsultationsListComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillsListComponent, canActivate: [AuthGuard] },
   { path: 'bills/:id', component: BillDetailComponent, canActivate: [AuthGuard] },
   { path: 'consultations/edit/:id', component: ConsultationEditComponent, canActivate: [AuthGuard] },
   { path: 'types', component: TypesListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
*/export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

    // 🧍 Patients → Everyone except blocked users
    { path: 'patients', component: PatientsListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Doctor', 'Reception'] } },
    { path: 'patients/edit/:id', component: PatientEditComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Reception'] } },

    // 👨‍⚕️ Doctors → Admin + Doctor only
    { path: 'doctors', component: DoctorsListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Doctor'] } },

    // 🏥 Departments → Admin only (optional, keep same)
    { path: 'departments', component: DepartmentsListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] } },

    // 💊 Services
    { path: 'services', component: ServicesListComponent, canActivate: [AuthGuard] },

    // 🛎 Reception → Only Reception
    { path: 'reception', component: ReceptionRegisterComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Reception'] } },

    // 💬 Consultations → Doctor + Admin
    { path: 'consultations', component: ConsultationsListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Doctor'] } },
    { path: 'consultations/edit/:id', component: ConsultationEditComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin', 'Doctor'] } },

    // 💵 Bills → Admin only (or whoever you want)
    { path: 'bills', component: BillsListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] } },
    { path: 'bills/:id', component: BillDetailComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] } },

    { path: 'types', component: TypesListComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: 'login' }
];
