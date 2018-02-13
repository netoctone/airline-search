import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'search--airport-field',
  templateUrl: './airport-field.component.html',
  styleUrls: ['./airport-field.component.scss']
})
export class AirportFieldComponent {

  private open: boolean;
  private searchString: string = '';
  @Input() placeholder: boolean;
  @Input() airport: RoutesService.Airport;
  @Input() airportOpposite: RoutesService.Airport;
  @Input() isDepartureAirport: boolean;
  @Output() onSelect = new EventEmitter<RoutesService.Airport>();

  constructor(private routes: RoutesService) { }

  deactivate() {
    this.open = false;
  }

  onSelectAirport(airport) {
    this.open = false;
    this.onSelect.emit(airport);
  }

  ngOnChanges(changes) {
    if (changes.airport) {
      this.searchString = this.airport ? this.airport.name : '';
    }
  }

  onType(searchString: string) {
    this.searchString = searchString;
  }

  onTypeFinish() {
    const departure = this.isDepartureAirport ? null : this.airportOpposite;
    const airports = this.routes.searchAirports(this.searchString, departure);
    if (airports.length == 1) {
      this.searchString = airports[0].name;
      this.onSelect.emit(airports[0]);
    } else {
      this.searchString = this.airport ? this.airport.name : '';
    }
  };

  doOpen() {
    this.open = true;
  }

}
