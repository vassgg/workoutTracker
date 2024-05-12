import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SmallMenuComponent } from './shared/small-menu/small-menu.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [AppComponent, MenuComponent, SmallMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp({
      projectId: 'workout-tracker-dd5ba',
      appId: '1:623650990229:web:a96926e19cf95b2d4b139c',
      storageBucket: 'workout-tracker-dd5ba.appspot.com',
      apiKey: 'AIzaSyAYh9e8FNm9wQ4Dp5Do4NJs5_7Dbyjv2Bs',
      authDomain: 'workout-tracker-dd5ba.firebaseapp.com',
      messagingSenderId: '623650990229',
      measurementId: 'G-TXNQVQ0DG6',
    }),
    // provideFirebaseApp(() => initializeApp({"projectId":"workout-tracker-dd5ba","appId":"1:623650990229:web:a96926e19cf95b2d4b139c","storageBucket":"workout-tracker-dd5ba.appspot.com","apiKey":"AIzaSyAYh9e8FNm9wQ4Dp5Do4NJs5_7Dbyjv2Bs","authDomain":"workout-tracker-dd5ba.firebaseapp.com","messagingSenderId":"623650990229","measurementId":"G-TXNQVQ0DG6"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
