import { Component } from '@angular/core';
import {
  retrievedPeopleList,
} from './store/actions/people.actions';
import { PeopleService } from './people.service';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'people-list';
  // people$ = this.store.select(selectPeople);

  constructor(private peopleService: PeopleService, private store: Store) {}

  ngOnInit() {
    this.peopleService
      .getPeople()
      .subscribe((people) => this.store.dispatch(retrievedPeopleList({ people })));
  
  }
}
