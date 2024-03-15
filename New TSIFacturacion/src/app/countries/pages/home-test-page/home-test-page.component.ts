
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

@Component({
    selector: 'app-home-test-page',
    standalone: true,
    templateUrl: './home-test-page.component.html',
    styles: ``,
    imports: [SearchBoxComponent, CountriesTableComponent, CardListComponent, CommonModule,RouterModule]
})
export class HomeTestPageComponent {

  public CancionesA?: TopsArtist;
  public IArtist?: IndividualArtist;
  private id: string | null = null;
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService,
    private sanitizer: DomSanitizer
  ){}

 
  ngOnInit(): void {
    
      this.activedRoute.params.subscribe(params => {
        // 'id' debe coincidir con el nombre del parámetro en tu ruta
        this.id = params['id'];
        console.log('ID capturado:', this.id);

        // Puedes realizar acciones adicionales con el ID aquí, como cargar datos según el ID, etc.
      });

      this.LoadArtist();
      console.log("Antes:",this.CancionesA);
      this.activedRoute.params
        .pipe(
          switchMap(({id}) => this.spotifyService.searchTopByArtist(id))
        )
        .subscribe (tracks => {
          
          if(!tracks) return this.router.navigateByUrl('');
          
          else{
          console.log("Datos del Artista",tracks)
          return this.CancionesA = tracks;}
  
        });
  
  }
  LoadArtist():void{
    this.activedRoute.params
    .pipe(
      switchMap(({id}) => this.spotifyService.searchJustA(id))
    )
    .subscribe (iart => {
      
      if(!iart) return this.router.navigateByUrl('');
      
      else{
      console.log("Canciones del Artista",iart)
      return this.IArtist = iart;}

    });
      
 
  }
  getIframeUrl(item: Track): SafeResourceUrl {
    // Construye la URL del iframe basándote en la información de item
    // Aquí puedes utilizar las propiedades de item para formar la URL
      const spotiURL = 'https://open.spotify.com/embed/track/' + item.id;
      return this.sanitizer.bypassSecurityTrustResourceUrl(spotiURL);
  }
}


