import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Cancion } from '../../../countries/interfaces/tracks.interface';

@Component({
    selector: 'gifs-card-list',
    standalone: true,
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.css',
    imports: [CardComponent]
})
export class CardListComponent {

  @Input()
  public TopCanciones?: Cancion;

}
