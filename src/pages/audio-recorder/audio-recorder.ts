import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';

import { MediaPlugin } from 'ionic-native';

@Component({
  selector: 'page-audio-recorder',
  templateUrl: 'audio-recorder.html'
})
export class AudioRecorderPage {
  mediaPlugin: MediaPlugin = null;
  recorded: boolean;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioRecorderPage');
  }
  
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
			  public platform: Platform) {
				  this.recorded = false;
  }
  
  get MediaPlugin(): MediaPlugin {
    if (this.mediaPlugin == null) {
      this.mediaPlugin = new MediaPlugin('recording.wav');
    }

    return this.mediaPlugin;
  }
  
  startRecording() {
    try {
		this.MediaPlugin.startRecord();
    }
    catch (e) {
      this.showAlert('Error: '+ e);
    }
  }

  stopRecording() {
    try {	  
	  this.MediaPlugin.stopRecord();
	  this.recorded = true;
    }
    catch (e) {
      this.showAlert('Error: '+ e);
    }
  }

  playRecording() {
    try {
	  this.MediaPlugin.play();
    }
    catch (e) {
      this.showAlert('Error: '+ e);
    }
  }

  stopRecordingPlay() {
    try {
      this.MediaPlugin.stop();
    }
    catch (e) {
      this.showAlert('Error: '+ e);
    }
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
