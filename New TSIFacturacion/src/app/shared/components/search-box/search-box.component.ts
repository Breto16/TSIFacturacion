import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  constructor(private router: Router) {}
  @Input()
  public placeholder: string = '';

 @Output()
 public onValue = new EventEmitter<string>();

 
 emitValue( value: string ): void{
  this.onValue.emit (value);
  
 }

 IrArtistas() {
  // Puedes ajustar la ruta según tus necesidades
  this.router.navigate(['/search/artists']);
}
IrCanciones() {
  // Puedes ajustar la ruta según tus necesidades
  this.router.navigate(['/search/tracks']);
}

}
