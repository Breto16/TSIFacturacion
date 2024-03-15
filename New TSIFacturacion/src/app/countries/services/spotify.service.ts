import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { SpotiToken } from '../interfaces/spotify.interfaces';
import { Cancion } from '../interfaces/tracks.interface';
import { Artist } from '../interfaces/artist.interface';
import { TopTracks } from '../interfaces/toptracks.interface';
import { IndividualArtist } from '../interfaces/IndividialA.interface';
import { TopsArtist } from '../interfaces/TopsArtist.interface';
import { GetAlbums } from '../interfaces/GetAlbums.interface';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string = 'd17b880d557a4bf9b1b0bbe009e45c5b';
  private clientSecret: string = '06b849f99d914929b9c6961282fee4f0';
  private _tagsHistory: string[] = [];
  tokenUrl: string = "https://accounts.spotify.com/api/token";
  idAndSecret: string = btoa(this.clientId + ":" + this.clientSecret);
  public token: string = '';
  http: any;
  private apiUrl: string = 'https://api.spotify.com/v1';  

constructor(private httpClient: HttpClient) {
  this.loadLocalStorage();
 }

// body = {
//     'grant_type': "client_credentials",
// };
body = 'grant_type=client_credentials';

options = {
    headers: new HttpHeaders({
        'Authorization': 'Basic '.concat(this.idAndSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
    })
};

  
searchTracks(q: string): Observable<Cancion> {
  const url = `${this.apiUrl}/search?q=${q}&type=track`;
  this.organizeHistory(q);
  //console.log('El token es: ', this.token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });
  return this.httpClient.get<Cancion>(url, { headers }).pipe(
    catchError(() => of({} as Cancion))
  );
}
searchTopByArtist(q: string): Observable<TopsArtist> {
  const url = `${this.apiUrl}/artists/${q}/top-tracks?market=ES`;
  //console.log('El token es: ', this.token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });
  return this.httpClient.get<TopsArtist>(url, { headers }).pipe(
    catchError(() => of({} as TopsArtist))
  );
}
searchJustA(q: string): Observable<IndividualArtist> {
  const url = `${this.apiUrl}/artists/${q}`;
  //console.log('El token es: ', this.token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });
  return this.httpClient.get<IndividualArtist>(url, { headers }).pipe(
    catchError(() => of({} as IndividualArtist))
  );
}
searchJustAlbums(q: string): Observable<GetAlbums> {
  const url = `${this.apiUrl}/artists/${q}/albums`;
  //console.log('El token es: ', this.token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });
  return this.httpClient.get<GetAlbums>(url, { headers }).pipe(
    catchError(() => of({} as GetAlbums))
  );
}
searchArtist(q: string): Observable<Artist> {
  const url = `${this.apiUrl}/search?q=${q}&type=artist`;
  this.organizeHistory(q);
  //console.log('El token es: ', this.token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });
  return this.httpClient.get<Artist>(url, { headers }).pipe(
    catchError(() => of({} as Artist))
  );
}
searchTop20(): Observable<TopTracks> {
  const url = `${this.apiUrl}/playlists/37i9dQZEVXbMDoHDwVN2tF`;
  console.log('El token es: ', this.token);
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,  // Asegúrate de manejar adecuadamente el token
  });
  return this.httpClient.get<TopTracks>(url, { headers }).pipe(
    catchError(() => of({} as TopTracks))
  );
}





    /*
      searchTrack( q:string ): Observable<Track | null>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${'BQBHxC_p_OQqFUTH3ynHOnhynsyFihf1C6VqYRl9dv2G2gDnQWbhyOLc6vnnv1YHIuRqRkXBllo6aE5mtT-FRtA4bQ2YVZAxWLQYj8vyr913yd7h_IM'}`,
      });
      const url = `${this.apiUrl}/search?q=${q}&type=track`;
      return this.httpClient.get<Track[]>(url,{ headers })
        .pipe(
          map ( tracks => tracks.length > 0 ? tracks[0] : null ),
          catchError(()=> of(null))
        );

    }*/


  
    get tagsHistory() {
      return [...this._tagsHistory];
    }
  
    private organizeHistory(tag: string) {
      tag = tag.toLowerCase();
  
      if (this._tagsHistory.includes(tag)) {
        this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
      }
      this._tagsHistory.unshift(tag);
      this._tagsHistory = this._tagsHistory.splice(0, 10);
      this.saveLocalStorage();
    }
  
    private saveLocalStorage(): void {
      localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }
  
    private loadLocalStorage(): void {
      if (!localStorage.getItem('history')) return;
      this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  
      if (this._tagsHistory.length === 0) return;
      this.searchTracks(this._tagsHistory[0]);
    }
























  getAccessToken_(  ): string{
    const url = this.tokenUrl;
    this.httpClient.post<SpotiToken>(url,this.body, this.options)
      .pipe(
        map(response => response.access_token),
        catchError(()=> of(''))
      )
      .subscribe(token=> {this.token = token;});

      return this.token;
  }  

  getAccessToken(  ): Observable<SpotiToken|null>{
    const url = this.tokenUrl;
    return this.httpClient.post<SpotiToken>(url,this.body, this.options)
      .pipe(
        catchError(()=> of(null))
      )
    }  
}
