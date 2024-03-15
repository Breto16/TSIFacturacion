import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


import { Item } from '../../../countries/interfaces/tracks.interface';

@Component({
    selector: 'gifs-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: []
})
export class CardComponent {
  @Input() item!: Item;
  public urlP: SafeResourceUrl = '' ;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.urlP);
    if(!this.item) throw new Error('Cancion is required');
    else{
       const spotiURL = 'https://open.spotify.com/embed/track/' + this.item.id;
       this.urlP = this.sanitizer.bypassSecurityTrustResourceUrl(spotiURL);
      }
    

    console.log(this.urlP)
  }
  ngOnChanges():void{
    console.log(this.urlP);
    if(!this.item) throw new Error('Cancion is required');
    else{
       const spotiURL = 'https://open.spotify.com/embed/track/' + this.item.id;
       this.urlP = this.sanitizer.bypassSecurityTrustResourceUrl(spotiURL);
    }
  }
  

}
