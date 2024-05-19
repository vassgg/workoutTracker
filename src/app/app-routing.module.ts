import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard],
  },

  {
    path: 'add-workout',
    loadChildren: () =>
      import('./pages/add-routine/add-routine.module').then((m) => m.AddRoutineModule),
    canActivate: [authGuard],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'friends',
    loadChildren: () =>
      import('./pages/friends/friends.module').then((m) => m.FriendsModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: 'add-routine',
    loadChildren: () =>
      import('./pages/add-routine/add-routine.module').then(
        (m) => m.AddRoutineModule
      ),
      canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: '/home',
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
