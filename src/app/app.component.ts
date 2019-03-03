import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ypg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  PLAYLIST_BASE_URL = 'http://www.youtube.com/watch_videos?video_ids=';
  PLAYLIST_SEPARATOR = ',';
  playlistGeneratedUrl: string;
  urlForm: FormGroup;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.urlForm = this.fb.group({
        urls: this.fb.array([this.fb.control('')])
      }
    );
  }

  generatePlaylist() {
    let finalUrl = this.PLAYLIST_BASE_URL;
    for (const url of this.urlForm.value.urls) {
      if (url.length > 0) {
        const videoId = url.split('?v=', 2);
        finalUrl = finalUrl + videoId[1] + this.PLAYLIST_SEPARATOR;
      }
    }
    this.playlistGeneratedUrl = finalUrl.slice(0, -1);
  }

  addUrl() {
    const urls = this.urlForm.get('urls') as FormArray;
    urls.push(this.fb.control(''));
  }
}
