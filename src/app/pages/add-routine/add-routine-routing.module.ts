import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoutineComponent } from './add-routine.component';

const routes: Routes = [{ path: '', component: AddRoutineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutineRoutingModule { }
