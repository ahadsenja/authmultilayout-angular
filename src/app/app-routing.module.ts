import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

// import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { BoardAdminComponent } from './components/board-admin/board-admin.component';
// import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
// import { BoardUserComponent } from './components/board-user/board-user.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },

  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
      }
    ]
  },

  // {path: '', redirectTo: '/', pathMatch: 'full'},
  // {path: 'dashboard', component: HomeComponent},
  // {path: 'signup', component: SignupComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'admin', component: BoardAdminComponent},
  // {path: 'mod', component: BoardModeratorComponent},
  // {path: 'user', component: BoardUserComponent},
  // {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
