import { Component, Input, Output, EventEmitter, SimpleChanges, ElementRef } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'airport-modal',
  templateUrl: './airport-modal.component.html',
  styleUrls: ['./airport-modal.component.scss']
})
export class AirportModalComponent {

  @Input() placeholder: string;
  @Input() open: boolean;
  @Input() airport: RoutesService.Airport;
  @Input() isDepartureAirport: boolean;
  @Input() airportOpposite: RoutesService.Airport;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter<RoutesService.Airport>();
  searchString: string;
  matchingAirports: RoutesService.Airport[];

  constructor(public device: DeviceService,
              private routes: RoutesService,
              private ref: ElementRef) {}

  trackByIata(airport: RoutesService.Airport): string {
    return airport.iata;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.open) {
      this.searchString = "";
      this.matchingAirports = [];
    }
  }

  onSearchChange(searchString: string) {
    this.searchString = searchString;
    const departure = this.isDepartureAirport ? null : this.airportOpposite;
    this.matchingAirports = this.routes.searchAirports(this.searchString, departure);
  }

}
