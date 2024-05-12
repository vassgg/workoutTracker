import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Exercise } from '../models/Exercise';
import { Workout } from '../models/Workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private afs: AngularFirestore) {}
  collectionName = 'Exercises';
  workoutCollection = 'Workouts';

  getExercises() {
    return this.afs.collection<Exercise>(this.collectionName);
  }

  insertWorkout(creatorId: string, exercises: Array<Exercise>) {
    return this.afs.collection<Workout>(this.workoutCollection).add({
      creatorId: creatorId,
      exercises: exercises,
    });
  }
}
