import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyB8NPCPB8iuTKnvzG1IQloZidqDL_iUsJY",
  authDomain: "sousou-e9314.firebaseapp.com",
  databaseURL: "https://sousou-e9314.firebaseio.com",
  projectId: "sousou-e9314",
  storageBucket: "sousou-e9314.appspot.com",
  messagingSenderId: "93173588872",
  appId: "1:93173588872:web:34b5732f36d3019cd0d03d",
  measurementId: "G-NCXEVEKSVM"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
