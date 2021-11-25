import { createReducer, on } from '@ngrx/store';

import { retrievedPeopleList, addUser } from '../actions/people.actions';

export const initialState: any = {};

export const peopleReducer = createReducer(
    initialState,
    on(retrievedPeopleList, (state, { people }) => { return {...state, users: people} }),
    on(addUser, (state, user) => {
        const existingUserIndex = state['users'].findIndex((userEle: any) => user.id == userEle.id )
        if (existingUserIndex > -1) {
            return {
                ...state,
                users: [
                    ...state['users'].slice(0, existingUserIndex),
                    { ...user },
                    ...state['users'].slice(existingUserIndex + 1)
                ]
            }
        }
        return {
            ...state,
            user: [
                ...state['users'],
                user
            ]
        };
    })
);