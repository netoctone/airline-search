import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search--form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  private airportArrival: RoutesService.Airport;
  private airportDeparture: RoutesService.Airport;

  constructor(private routes: RoutesService, private router: Router) { }

  onSelectDeparture(airport: RoutesService.Airport) {
    this.airportDeparture = airport;
    if (this.airportArrival && !this.routes.hasRoute(this.airportDeparture, this.airportArrival)) {
      this.airportArrival = null;
    }
    this.doSearch();
  }

  onSelectArrival(airport: RoutesService.Airport) {
    this.airportArrival = airport;
    this.doSearch();
  }

  doSearch() {
    if (this.airportDeparture && this.airportArrival) {
      const queryParams = {
        from: this.airportDeparture.iata,
        to: this.airportArrival.iata
      };
      this.router.navigate(['/airlines'], { queryParams });
    }
  }

}
