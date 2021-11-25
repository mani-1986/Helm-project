import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectPeople = createFeatureSelector<any>('people');

export const selectPeopleList = createSelector(
    selectPeople,
    (state) => {
        return (state['users'] && state['users'].length > 0) ? state['users'] : [];
    }
);
