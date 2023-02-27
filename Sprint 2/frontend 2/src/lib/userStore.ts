import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

enum UserState {
    LoggedOut,
    Student,
    Employer,
    Admin
}

let userID: Writable<number> = writable(0);
let userState: Writable<UserState> = writable(UserState.LoggedOut);

export const userService = {
    UserState,
    userID,
    userState,
}