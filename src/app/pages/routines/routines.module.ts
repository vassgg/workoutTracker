import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutinesRoutingModule } from './routines-routing.module';
import { RoutinesComponent } from './routines.component';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    RoutinesComponent
  ],
  imports: [
    CommonModule,
    RoutinesRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class RoutinesModule { }
