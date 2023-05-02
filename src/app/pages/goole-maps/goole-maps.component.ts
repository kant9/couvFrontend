import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-goole-maps',
  templateUrl: './goole-maps.component.html',
  styleUrls: ['./goole-maps.component.scss']
})
export class GooleMapsComponent {
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ2mPuQfYVX20hkbrZC9tnbFP3Hy61DbM', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
}