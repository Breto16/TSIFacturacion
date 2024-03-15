import { Component } from '@angular/core';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { CardListComponent } from "../../../shared/components/card-list/card-list.component";
import { Cancion } from '../../interfaces/tracks.interface';
import { SpotifyService } from '../../services/spotify.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-search-page',
    standalone: true,
    templateUrl: './search-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CardListComponent,RouterOutlet,RouterModule, CommonModule]
})
export class SearchPageComponent {
  public TopCanciones?: Cancion;
  
  constructor(
    
    private spotifyService: SpotifyService){}
  
  
  
    get tags(): string[]{
      return this.spotifyService.tagsHistory;
    }
    searchTag(tag: string) {
      this.spotifyService.searchTracks(tag);
      //console.log(tag);
    }
  
}
