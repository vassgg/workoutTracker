import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-small-menu',
  templateUrl: './small-menu.component.html',
  styleUrl: './small-menu.component.scss'
})
export class SmallMenuComponent {
  @Output() onLogout: EventEmitter<void> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  onLogoutClick(){
    this.onLogout.emit();
  }

  close(){
    this.onClose.emit(true);
  }
}
