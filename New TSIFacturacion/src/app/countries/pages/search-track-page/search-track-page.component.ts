import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CardListComponent } from "../../../shared/components/card-list/card-list.component";
import { Cancion } from '../../interfaces/tracks.interface';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-search-track-page',
    standalone: true,
    templateUrl: './search-track-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CardListComponent]
})
export class SearchTrackPageComponent {
  public TopCanciones?: Cancion;
  
  constructor(
    
    private spotifyService: SpotifyService){}
  
  
  
  
  
  searchTrack(term: string): void {
    this.spotifyService.searchTracks(term)
      .subscribe(tracks => {
        if(!tracks){
          console.log('TRACKS ES NULL:');
        }else{
        this.TopCanciones = tracks; // Asigna directamente el valor del arreglo a this.track
        console.log('TRACKS ES: ',this.TopCanciones);  
      }
        
      });
    }
}
