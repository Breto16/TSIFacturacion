import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CardListComponent } from "../../../shared/components/card-list/card-list.component";
import { Artist } from '../../interfaces/artist.interface';
import { SpotifyService } from '../../services/spotify.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-search-artist-page',
    standalone: true,
    templateUrl: './search-artist-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CardListComponent,CommonModule,RouterModule]
})
export class SearchArtistPageComponent {
  public Artistas?: Artist;
  
  constructor(
    
    private spotifyService: SpotifyService){}
  
  searchArtist(term: string): void {
    this.spotifyService.searchArtist(term)
      .subscribe(artist => {
        if(!artist){
          console.log('Art ES NULL:');
        }else{
        this.Artistas = artist; // Asigna directamente el valor del arreglo a this.track
        console.log('Art ES: ',this.Artistas);  
      }
        
      });
    }
}
