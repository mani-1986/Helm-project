import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectPeopleList } from '../store/people.selectors';
import { addUser } from '../store/actions/people.actions';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  formGroup: any;
  titleAlert: string = 'This field is required';
  people$ = this.store.select(selectPeopleList);
  peopleLength = 0
  idParam: any = null;

  addNewUserLabel: string = 'Add User'
  editUserLabel: string = 'Edit User';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store) { }

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('id');
      if (this.idParam != null) {
        this.people$.subscribe(users => {
          this.peopleLength = users.length;
          const user = users?.find((userVal: any) => {
            return userVal.id == this.idParam
          });
          if (user) {
            this.setFormValues(user);
          }
        });
      }
    });
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'username': [null, Validators.required],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'address': this.formBuilder.group({
        'street': ['', ''],
        'suite': ['', ''],
        'city': ['', ''],
        'zipcode': ['', ''],
        'geo': this.formBuilder.group({
          'lat': ['', ''],
          'lng': ['', ''],
        })
      }),
      'phone': ['', ''],
      'website': ['', ''],
      'company': this.formBuilder.group({
        'name': ['', ''],
        'catchPhrase': ['', ''],
        'bs': ['', ''],
      })
    });
  }

  setFormValues(user: any) {
    this.formGroup.patchValue({
      'name': user.name,
      'username': user.username,
      'email': user.email,
      'address': {
        'street': user.address.street,
        'suite': user.address.suite,
        'city': user.address.city,
        'zipcode': user.address.zipcode,
        'geo': {
          'lat': user.address.geo.lat,
          'lng': user.address.geo.lng
        }
      },
      'phone': user.phone,
      'website': user.website,
      'company': {
        'name': user.company.name,
        'catchPhrase': user.company.catchPhrase,
        'bs': user.company.bs,
      }
    })
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  getErrorEmail() {
    return this.formGroup.get('email')?.hasError('required') ? 'Field is required' :
      this.formGroup.get('email')?.hasError('pattern') ? 'Not a valid email address' :
        'Invalid email address';
  }

  onSubmit(user: any) {
    if (this.idParam != null) { // update existing user
      this.store.dispatch(addUser({ id: parseFloat(this.idParam), ...user }));
    } else { // add new user
      this.store.dispatch(addUser({ id: this.peopleLength + 1, ...user }));
    }
    this.router.navigate(['']);
  }

}
