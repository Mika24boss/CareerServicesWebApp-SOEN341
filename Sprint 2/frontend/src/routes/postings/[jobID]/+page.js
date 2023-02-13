import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ fetch, params }) {
    //check if jobID is valid, and fetch data
    if (params.jobID === '1') {
        return {
            title: '1',
            content: 'Welcome to 1'
        };
    }

    throw error(404, 'Not found');
}