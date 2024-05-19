import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit {
  
  userArr: User[] = [];
  filteredArray: User[] = [];
  currentUser = JSON.parse(localStorage.getItem('user') as string);
  userNames: string[] = [];

  constructor(private userService: UserService) { }

  onKeydown(event: any){
    
    
    this.userArr.forEach(userElement => {
      
      this.filteredArray = this.userArr.filter(currentUser => {
          
          if (event.target.value !== '') {
            return currentUser.username.includes(event.target.value)
            
          } 
          return this.userArr
        })
        
    });
    
    
  }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe(userData => {
      this.userArr = userData;
      this.filteredArray= userData;
    }); 
  }
}
