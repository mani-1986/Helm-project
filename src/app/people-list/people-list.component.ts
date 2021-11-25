import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectPeopleList } from '../store/people.selectors';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  @Input() users: any;
  constructor(private router: Router, private store: Store, private route: ActivatedRoute) { }
  people$ = this.store.select(selectPeopleList);

  editUser(id: any): void {
    if (id != null) {
      this.router.navigate(['/manage-user', id]);
    }
    this.router.navigate(['/manage-user']);
  }

}
