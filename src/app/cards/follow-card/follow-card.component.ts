import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { MatButton } from '@angular/material/button';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-follow-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  templateUrl: './follow-card.component.html',
  styleUrl: './follow-card.component.scss'
})
export class FollowCardComponent implements OnInit {
  @Input() user?: User;
  loadedImage?: string;
  @Input() userString?: string;
  currentUser = getAuth().currentUser;

  follows?: string[]
  followBtn: boolean = true;


  constructor(private userService: UserService){}

  ngOnInit(): void {
    if (this.user) {
      this.userService.loadProfilePicture(this.user?.profilePictureUrl).subscribe(img =>{
        this.loadedImage = img;
      });
    }

    if (this.currentUser) {
      this.userService.getUser(this.currentUser.uid).subscribe(usr => {
        if (usr){
          this.follows = usr.follows as string[];
        }
        this.follows?.map(str => {
          if (this.user?.id == str){
            this.followBtn = false;
          }
        })
      });
    }
    
  }

  follow(id: string) {
    if (this.currentUser) {
      this.userService.follow(this.currentUser.uid, id).then(data => {
        console.log(data);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  unfollow(id: string){
    if (this.currentUser) {
      this.userService.unfollow(this.currentUser.uid, id).then(data => {
        console.log(data);
      }).catch(error => {
        console.error(error);
      });
    }
  }

}
