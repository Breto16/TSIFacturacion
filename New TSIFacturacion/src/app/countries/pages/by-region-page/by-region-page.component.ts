
import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { CountriesTableComponent } from "../../components/countries-table/countries-table.component";
import { SpotifyService } from '../../services/spotify.service';
import { switchMap } from 'rxjs';
import { CardListComponent } from '../../../shared/components/card-list/card-list.component';
import { Track} from '../../interfaces/TopsArtist.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IndividualArtist } from '../../interfaces/IndividialA.interface';
import { CommonModule } from '@angular/common';
import { TopsArtist } from '../../interfaces/TopsArtist.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GetAlbums } from '../../interfaces/GetAlbums.interface';

@Component({
    selector: 'app-by-region-page',
    standalone: true,
    templateUrl: './by-region-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CountriesTableComponent]
})
export class ByRegionPageComponent {
  public Albums?: GetAlbums;
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService,
    private sanitizer: DomSanitizer
  ){}
  ngOnInit(): void {
  this.activedRoute.params
        .pipe(
          switchMap(({id}) => this.spotifyService.searchJustAlbums(id))
        )
        .subscribe (GAlbums => {
          
          if(!GAlbums) return this.router.navigateByUrl('');
          
          else{
          console.log("Datos del Artista",GAlbums)
          return this.Albums = GAlbums;}
  
        });
  }
}
