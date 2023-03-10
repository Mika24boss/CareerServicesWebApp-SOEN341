import {error} from '@sveltejs/kit';
import {authService} from '$lib/features/authService.js';
import {jobService} from '$lib/features/jobService.js';


/** @type {import('./$types').PageLoad} */
export async function load({params}) {
    const user = authService.getUser();
    const jobData = await jobService.getJobByID(params.jobID, user.token);
    return jobData[0];

    //throw error(404, 'Not found');
}