import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpClientModule, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyAvkRyttE6Bbn5oJNVLrPknAxbUqpjYW_Y';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = "";


  constructor( private http: HttpClient) {
  }

  getVideos() {
    
/*     const url = '${ this.youtubeUrl }/playlistItems';
    
    const params = new HttpParams()
      .set("parts","snippet")
      .set("maxResults","10")
      .set("playlistId",this.playlist)
      .set("key", this.apikey) */


    return this.http.get<YoutubeResponse>("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyAvkRyttE6Bbn5oJNVLrPknAxbUqpjYW_Y&playlistId=UUuaPTYj15JSkETGnEseaFFg&maxResults=10&nextPageToken=CAoQAA")
      .pipe (

        map ( resp => {
          this.nextPageToken = resp.nextPageToken;
          return (resp.items);
        }),

        map ( items => {
          return items.map( video => video.snippet);
        })
      )
  }



}
