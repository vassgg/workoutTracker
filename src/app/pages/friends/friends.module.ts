import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FollowCardComponent } from '../../cards/follow-card/follow-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatIconButton,
    MatIconModule,
    MatButtonModule,
    FollowCardComponent,
    ReactiveFormsModule
  ]
})
export class FriendsModule { }
