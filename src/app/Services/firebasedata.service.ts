import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebasedataService {

  constructor(public fireservice: AngularFirestore) { }

  // tslint:disable-next-line:typedef
  createStudentData(data: any) {
    return this.fireservice.collection('student').add(data);
  }

  // tslint:disable-next-line:typedef
  displayStudentData() {
    return this.fireservice.collection('student').snapshotChanges();
  }

}
