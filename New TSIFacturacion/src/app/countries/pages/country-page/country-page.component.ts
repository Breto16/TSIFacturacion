import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { Cancion } from '../../interfaces/tracks.interface';
import { TopsArtist } from '../../interfaces/TopsArtist.interface';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class ArtistPageComponent {
  public CancionesA?: TopsArtist;
  //public country?: Country | null = null;

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ){}
 
  ngOnInit(): void {
    console.log("Antes:",this.CancionesA);
    this.activedRoute.params
      .pipe(
        switchMap(({id}) => this.spotifyService.searchTopByArtist(id))
      )
      .subscribe (tracks => {
        
        if(!tracks) return this.router.navigateByUrl('');
        
        else{
        console.log("Canciones del Artista",tracks)
        return this.CancionesA = tracks;}

      });

    // this.activedRoute.params.subscribe(
    //   parametros => {
    //     console.log(parametros['id']);
    //     this.countriesService.searchCountryByAlphaCode(parametros['id'])
    //       .subscribe(country =>{
    //         if (!country){
    //           console.log('null');
    //           return;
    //         }else{
    //           console.log(country);
    //           this.country = country;
    //           return;
    //         }
    //       })
    //   }
    // );
    console.log("Despues:",this.CancionesA);


    
  }



}
