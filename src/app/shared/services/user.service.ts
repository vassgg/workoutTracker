import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from '../models/User';
import { arrayRemove, arrayUnion, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  collectionName = 'Users';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  create(user: User) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(user.id)
      .set(user);
  }

  getUser(uid: string) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(uid)
      .valueChanges();
  }

  getAllUser() {
    return this.afs.collection<User>(this.collectionName, ref => ref.limit(5)).valueChanges();
  }

  loadProfilePicture(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  uploadProfilePicture(path: string, file: any) {
    return this.storage.upload(path, file);
  }

  deleteProfilePicture(filename: string, path: string) {
    return this.storage.ref(filename).child(path);
  }

  update(user: User) {
    return this.afs
      .collection<User>(this.collectionName)
      .doc(user.id)
      .set(user);
  }

  follow(uid: string, userToFollowId: string) {
    return this.afs.collection<User>(this.collectionName).doc(uid).update({
      follows: arrayUnion(userToFollowId)
    });
  }

  unfollow(uid: string, userToUnfollow: string){
    return this.afs.collection<User>(this.collectionName).doc(uid).update({
      follows: arrayRemove(userToUnfollow)
    });
  }
}
