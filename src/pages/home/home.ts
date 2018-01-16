import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: String[];
  isRecording = false;

  constructor(public navCtrl: NavController, 
    private plt: Platform, 
    private speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef) {

  }

  isIos () {
    return this.plt.is('ios');
  }

  getPermission () {
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });
  }

  startListening () {
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening()
    .subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening () {
    this.speechRecognition.stopListening()
    .then(() => {
      this.isRecording = false
    })
  }
}
