import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'workout-tracker';

  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService){}

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (user: any) => {
        console.log(user);
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      }, error: (error: any) => {
        console.error(error)
        localStorage.setItem('user', JSON.stringify('null'));
      }
    })
  }

  logout(){
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
    }).catch(error => {
      console.error(error);
    });
  }

  close(event:any, sidenav: MatSidenav){
    if (event === true){
      sidenav.close();
    }
  }
}
