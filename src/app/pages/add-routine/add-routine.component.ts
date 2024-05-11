import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrl: './add-routine.component.scss'
})
export class AddRoutineComponent implements OnInit {
  routineTitle = new FormControl('');
  note = new FormControl('');
  selectedOption: number = 1;

  @Input() arrayOfTen: number[] = [];

  ngOnInit(): void {
    this.arrayOfTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
}
