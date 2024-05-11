import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatIconButton,
    MatIconModule
  ]
})
export class FriendsModule { }
