import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutExerciseCardComponent } from './workout-exercise-card.component';

describe('WorkoutExerciseCardComponent', () => {
  let component: WorkoutExerciseCardComponent;
  let fixture: ComponentFixture<WorkoutExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutExerciseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
