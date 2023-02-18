import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export enum UserState {
    LoggedOut,
    Student,
    Employer,
    Admin
}

export var userID: Writable<number> = writable(0);
export var userState: Writable<UserState> = writable(UserState.LoggedOut);