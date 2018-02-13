import airportsRaw from '../../../data/dist/airports.json';
import routesRaw from '../../../data/dist/routes.csv';

export class RoutesService {

  routes: { [iataFrom: string]: { [iataTo: string]: boolean } } = (() => {
    const res = {};
    for (const route of (<string>routesRaw).split("\n")) {
      const [iataFrom, iataTo, bidirectional] = route.split(",");
      res[iataFrom] = res[iataFrom] || {};
      res[iataFrom][iataTo] = true;
      if (bidirectional == 't') {
        res[iataTo] = res[iataTo] || {};
        res[iataTo][iataFrom] = true;
      }
    }
    return res;
  })();

  airports: RoutesService.Airport[] = airportsRaw.map(([iata, name, country]) => {
    return new RoutesService.Airport(iata, name, country);
  });

  constructor() {
  }

  private searchAirportsAll(input: string): RoutesService.Airport[] {
    input = input.trim().toLocaleLowerCase();
    return this.airports.filter((a) => a.matches(input));
  }

  searchAirports(input: string, departure: RoutesService.Airport): RoutesService.Airport[] {
    let airports = this.searchAirportsAll(input);
    if (departure) {
      airports = airports.filter((a) => this.routes[departure.iata] && this.routes[departure.iata][a.iata]);
    }
    if (input.trim().length <= 2 && airports.length > 50) {
      airports = airports.slice(0, 50);
    }
    return airports;
  }

  hasRoute(from: RoutesService.Airport, to: RoutesService.Airport): boolean {
    return !from || this.routes[from.iata] && this.routes[from.iata][to.iata];
  }

}

export namespace RoutesService {
  export class Airport {
    matchers: string[];

    constructor(public iata: string, public name: string, public country: string) {
      this.matchers = [iata, name, country].map((str) => str.toLocaleLowerCase());
    }

    matches(beginning: string): boolean {
      return this.matchers.some((matcher) => {
        return matcher.substring(0, beginning.length) == beginning;
      });
    }
  }
}
