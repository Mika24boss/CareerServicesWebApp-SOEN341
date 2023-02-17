import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({params}) {
    //check if jobID is valid, and fetch data
    if (params.jobID === "1") {
        return {
            jobTitle: 'Professional gamer',
            companyName: 'Ubisoft',
            location: 'Montreal but also remote like very far away',
            jobID: "1",
            jobDesc: "This is an amazing opportunity for an amazing person. Free orange juice every morning! Minimum salary! Premium benefits! Apply now and hear from us in one to two business decades."
        };
    } else if (params.jobID === "2") {
        return {
            jobTitle: 'Semiprofessional gamer very god',
            companyName: 'Ubihard',
            location: 'Toronto',
            jobID: "2",
            jobDesc: "We're almost pro! Join us on our journey to becoming pro. I mean, you become pro. We guide the best! Almost"
        };
    } else if (params.jobID === "3") {
        return {
            jobTitle: 'Streamer',
            companyName: 'Twitch',
            location: 'Remote',
            jobID: "3",
            jobDesc: "Do you dream of becoming a successful streamer? Are you motivated, enthusiastic and have great interpersonal skills? Come work for us and we will promote you until we die! Or go to YouTube."
        };
    }

    throw error(404, 'Not found');
}