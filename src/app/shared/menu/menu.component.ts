import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() onLogout: EventEmitter<void> = new EventEmitter();

  onLogoutClick(){
    this.onLogout.emit();
  }
}
