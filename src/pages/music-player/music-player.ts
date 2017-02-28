import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { AudioProvider } from 'ionic-audio/dist';

import { CustomTrack } from '../../providers/custom-track';

import {FileChooser} from 'ionic-native';

import {FilePath} from 'ionic-native';

@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html'
})
export class MusicPlayerPage {
  myTracks: any[];
  singleTrack: any;
  allTracks: any[];
  selectedTrack: number;
  
  loaded: boolean;
  
  filePath: any;
  
  File: any;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicPlayerPage');
	
	if (this.customTrack.customSource == null) {
		  this.loaded = false;
	}
	
	else {
		this.loaded = true;
	}
  }
  
  // http://stackoverflow.com/questions/35352284/replacing-characters-within-a-string-in-angularjs
  tools_replaceAll(str, find, replace) {
	  return str.replace(new RegExp(find, 'g'), replace);
  }
	
  openFile() {
	  this.platform.ready().then(() => {
		  let file: any;
		  FileChooser.open()
		  .then((uri) => {
			  console.log(uri);
			  file = uri;
			  this.File = file;
			  console.log("OpenFile path: " + this.File);
			  
			  FilePath.resolveNativePath(uri)
			  .then((filePath) => {
				  console.log("Second Path: "+ filePath);
				  this.filePath = filePath;
				  
				  //this.filePath = this.tools_replaceAll(this.filePath, "%3A416" , ".mp3" ) ;
				  
				  this.saveTrackSource(this.filePath);
			  })
			  .catch((err) => {
				  console.log(err);
				});
			  
		  }).catch((e) => console.log(e));
	  });
  }
  
  constructor(public customTrack: CustomTrack, public navCtrl: NavController, public navParams: NavParams, private audioProvider: AudioProvider, public platform: Platform) {
  
    
	this.filePath = "";
	this.File = this.filePath;
	
    this.myTracks = [{
      src: 'http://mp3zoop.com/download/775932db906b446e8f3177af4c71f4e0/4/katatonia-soil039s-song.mp3',
      artist: 'Katatonia',
      title: "Soil's Song",
      art: 'https://images-na.ssl-images-amazon.com/images/I/51%2BVlDDzumL.jpg',
      preload: 'metadata'
    },
    {
      src: 'http://www.noiseaddicts.com/samples_1w72b820/4201.mp3',
      title: 'India National Anthem',
      art: 'http://www.flagsinformation.com/indian-flag.png',
      preload: 'metadata'
    }];
    
    this.singleTrack = {
      src: 'http://www.noiseaddicts.com/samples_1w72b820/4207.mp3',
      title: 'Israel National Anthem',
      art: 'http://www.crwflags.com/fotw/images/i/il.gif',
      preload: 'metadata'
    };
	
	this.customTrack.customTrack = {
		src: this.customTrack.customSource,
		artist: 'Unknown',
		title: 'Custom Song',
		preload: 'none'
	};
  }
  
  saveTrackSource(source) {
	  this.customTrack.customSource = source;
	  console.log(this.customTrack.customSource);
	  
	  this.loaded = true;
	  
	  if (this.customTrack.customSource == null) {
		  this.loaded = false;
	  }
	  
	  this.customTrack.customTrack.src = this.customTrack.customSource;
	  this.pauseSelectedTrack();
	  
	  // Let's reload the view
	  this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  
  ngAfterContentInit() {     
    this.allTracks = this.audioProvider.tracks; 
  }
  
  playSelectedTrack() {
    this.audioProvider.play(this.selectedTrack);
  }
  
  pauseSelectedTrack() {
     this.audioProvider.pause(this.selectedTrack);
  }
  
  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }
}
