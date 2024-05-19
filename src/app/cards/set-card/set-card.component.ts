import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AddRoutineRoutingModule } from '../../pages/add-routine/add-routine-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Set } from '../../shared/models/Set';

@Component({
  selector: 'app-set-card',
  standalone: true,
  imports: [
    CommonModule,
    AddRoutineRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './set-card.component.html',
  styleUrl: './set-card.component.scss',
})
export class SetCardComponent implements OnChanges {
  constructor(private formBuilder: FormBuilder) {}
  @Input() submitted = false;
  @Input() index = 0;
  @Input() weight = 0;
  @Input() reps = 0;
  @Output() setRemoveRequest = new EventEmitter<number>();
  @Output() set = new EventEmitter<Set>();
  setForm = this.formBuilder.group({
    weight: [],
    reps: [],
  });

  removeSet(index: number) {
    this.setRemoveRequest.emit(index - 1);
  }

  pushSet(weight: number, reps: number) {
    this.set.emit({ weight: weight, reps: reps });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submitted'].currentValue === true) {
      const { weight, reps } = this.setForm.value;
        if (weight && reps){
          this.pushSet(weight, reps);
        }
    }
  }
}
