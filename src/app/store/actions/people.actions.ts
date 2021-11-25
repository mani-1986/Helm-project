import { createAction, props } from '@ngrx/store';

export const addUser = createAction(
    '[People List] Add User',
    props<{ id: number }>()
);

export const retrievedPeopleList = createAction(
    '[People List/API] Retrieve People List Success',
    props<{ people: any }>()
);