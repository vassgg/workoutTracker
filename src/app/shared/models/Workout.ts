import { Exercise } from './Exercise';

export interface Workout {
  creatorId: string;
  exercises: Array<Exercise>;
}
