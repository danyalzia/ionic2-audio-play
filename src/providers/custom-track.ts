import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomTrack {
  customTrack: any;
  customSource: any;
  
  constructor(public http: Http) {
    console.log('Hello CustomTrack Provider');

  }

}
