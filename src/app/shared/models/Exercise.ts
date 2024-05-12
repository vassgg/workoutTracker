import { Set } from './Set';

export interface Exercise {
  note?: string;
  name: string;
  primaryMuscleGroup: string;
  sets?: Array<Set>;
}
