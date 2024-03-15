
import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { CountriesTableComponent } from "../../countries/components/countries-table/countries-table.component";
import { SpotifyService } from '../../countries/services/spotify.service';
import { TopTracks } from '../../countries/interfaces/toptracks.interface';
import { CardListComponent } from '../../shared/components/card-list/card-list.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CountriesTableComponent, CardListComponent,RouterModule]
})
export class HomePageComponent {

  public TopCanciones?: TopTracks;
  
  constructor(
    private spotifyService: SpotifyService){}

  ngOnInit(): void {

    console.log("Antes:",this.TopCanciones);
    this.Iniciar();
    console.log("Despues:",this.TopCanciones);

    
  }
  Iniciar():void{
    this.spotifyService.getAccessToken_();
    this.searchTopTrack();
  }
  searchTopTrack(): void {
    this.spotifyService.searchTop20()
      .subscribe(tracks => {
        if(!tracks){
          console.log('TRACKS ES NULL:');
        }else{
        this.TopCanciones = tracks; // Asigna directamente el valor del arreglo a this.track
        console.log('TRACKS ES: ',this.TopCanciones.description);  
      }
        
      });
    }
    
                 

      
}
  


