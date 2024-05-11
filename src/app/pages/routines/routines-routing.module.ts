import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutinesComponent } from './routines.component';

const routes: Routes = [{ path: '', component: RoutinesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutinesRoutingModule { }
