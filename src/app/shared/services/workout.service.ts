import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Exercise } from '../models/Exercise';
import { Workout } from '../models/Workout';
import { Timestamp, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}
  collectionName = 'Exercises';
  workoutCollection = 'Workouts';

  getExercises() {
    return this.afs.collection<Exercise>(this.collectionName).valueChanges();
  }

  insertWorkout(workoutName: string, creatorId: string, exercises: Array<Exercise>) {
    return this.afs.collection<Workout>(this.workoutCollection).add({
      workoutName: workoutName,
      creatorId: creatorId,
      exercises: exercises,
      insertDate: Timestamp.now()
    }).then(docRef => {
      docRef.update({
        id: docRef.id
      })
    });
  }

  getWorkoutByUser(userId: string) {
    return this.afs.collection<Workout>(this.workoutCollection, ref => ref.where("creatorId", "==", userId).orderBy("insertDate", "desc")).valueChanges();
  }

  delete(workoutId: string){
    return this.afs.collection<Workout>(this.workoutCollection).doc(workoutId).delete();
  }

  loadImg(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
