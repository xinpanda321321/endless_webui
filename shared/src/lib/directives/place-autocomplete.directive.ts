import {
  Directive,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[webuiPlaceAutocomplete]',
})
export class PlaceAutocompleteDirective implements OnInit {
  private destroy = new Subject<void>();

  @Output() addressChange = new EventEmitter<google.maps.places.PlaceResult>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const input = this.el.nativeElement;
    const autocomplete = new google.maps.places.Autocomplete(input);

    fromEvent(input, 'change')
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        const address = autocomplete.getPlace();

        console.log(address);

        this.addressChange.emit(address);
      });
  }
}
