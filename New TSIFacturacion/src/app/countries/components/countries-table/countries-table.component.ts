import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Item, Tracks } from '../../interfaces/toptracks.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'countries-table',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './countries-table.component.html',
  styles: ``
})
export class CountriesTableComponent {
  @Input()
  public tracks?: Tracks;
  public urlP: SafeResourceUrl = '' ;
  constructor(private sanitizer: DomSanitizer) {}


  getIframeUrl(item: Item): SafeResourceUrl {
    // Construye la URL del iframe basándote en la información de item
    // Aquí puedes utilizar las propiedades de item para formar la URL
      const spotiURL = 'https://open.spotify.com/embed/track/' + item.track.id;
      return this.sanitizer.bypassSecurityTrustResourceUrl(spotiURL);
  }
}
