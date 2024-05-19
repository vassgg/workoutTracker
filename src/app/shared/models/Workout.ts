import { Timestamp } from '@angular/fire/firestore';
import { Exercise } from './Exercise';

export interface Workout {
  id?: string;
  workoutName: string;
  creatorId: string;
  exercises: Array<Exercise>;
  insertDate: Timestamp;
}
