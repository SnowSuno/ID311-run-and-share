import { writable } from 'svelte/store';

export const dailyChallenge = writable({
    date: "",
    metric: 0,
    range: 0,
})