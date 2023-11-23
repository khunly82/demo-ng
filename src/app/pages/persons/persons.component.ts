import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {
  persons$!: Observable<any[]>;

  constructor(
    private readonly _personService: PersonService,
  ) {
    this.persons$ =  _personService.get();
  }
}
