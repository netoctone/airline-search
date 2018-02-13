import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'airport-popup',
  templateUrl: './airport-popup.component.html',
  styleUrls: ['./airport-popup.component.scss']
})
export class AirportPopupComponent {

  private matchingAirports: RoutesService.Airport[];
  @Input() isDepartureAirport: boolean;
  @Input() airport: RoutesService.Airport;
  @Input() airportOpposite: RoutesService.Airport;
  @Input() airportText: string;
  @Output() onSelect = new EventEmitter<RoutesService.Airport>();

  constructor(private routes: RoutesService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.airportText || changes.airport) && this.airportText) {
      const departure = this.isDepartureAirport ? null : this.airportOpposite;
      this.matchingAirports = this.routes.searchAirports(this.airportText, departure);
    } else {
      this.matchingAirports = [];
    }
  }

  trackByIata(airport: RoutesService.Airport) {
    return airport.iata;
  }

}
