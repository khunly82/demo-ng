import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Observable, filter, map, mergeMap, switchMap, tap } from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {
  person!: any;
  test: any;
  map!: L.Map;

  options: any;
  coords: any;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _personService: PersonService
  ) {
    this._route.params
      .pipe(
        tap((p: any) => this.test = p.test),
        filter((p: any) => p.id != this.person?.id),
        map((p :any) => p.id),
        switchMap(id => _personService.getById(id)),
        tap(p => this.person = p),
        mergeMap(({address}) => this._personService.getCoords(address)),
        filter(c => !!c)
      )
      .subscribe((c: any) => {
        this.coords = { lat: c.lat, lng: c.lon }
        this.options = {
          layers: [
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
          ],
          zoom: 16,
          center: this.coords
        }
        
      });
  }

  initMap(map: L.Map) {
    this.map = map;
    const marker = L.marker(this.coords, {icon: L.icon({
      iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
      shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
      iconSize:     [20, 20], // size of the icon
      shadowSize:   [20, 20], // size of the shadow
    })});
    marker.addTo(this.map);
  }
}
