import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'workout-tracker';

  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService, private router: Router){}

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(usr => {
      this.loggedInUser = usr;
    })
  }

  logout(){
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
      localStorage.setItem('user', 'null');
      this.router.navigateByUrl('/login');
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
