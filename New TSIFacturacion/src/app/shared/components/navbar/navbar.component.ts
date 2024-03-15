import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../../../countries/services/spotify.service';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  constructor(
    private spotifyService: SpotifyService){}

    callSpotify() {
      this.spotifyService.getAccessToken_()
        
      /*.subscribe(spotifyToken => {
          console.log(spotifyToken);
          this.spotifyService.token = spotifyToken?.access_token;
        });*/
    }

  }
