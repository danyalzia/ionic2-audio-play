import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AudioRecorderPage } from '../pages/audio-recorder/audio-recorder';
import { MusicPlayerPage } from '../pages/music-player/music-player';

import { IonicAudioModule } from 'ionic-audio/dist';

import { CustomTrack } from '../providers/custom-track';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	AudioRecorderPage,
	MusicPlayerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	IonicAudioModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	AudioRecorderPage,
	MusicPlayerPage
  ],
  providers: [CustomTrack, {provide: ErrorHandler, useClass: IonicErrorHandler}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
