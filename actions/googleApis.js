import axios from "axios";
const GOOGLE_MAP_API_KEY = "AIzaSyAFwNL5K1HnAxuoZbUdpNii_73FXiw5UGg";


export async function getShopsFromGoogle( latitude, longitude, radius=1000, keyword="stores" ) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${latitude},${longitude}`,
                    radius,
                    keyword,
                    key: GOOGLE_MAP_API_KEY,
                }
            },
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function googleEventCreaterAPI(payload, provider_token) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1`,
            payload,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Bearer ${provider_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function updateGoogleEventAPI(payload, provider_token, eventId) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.put(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}?conferenceDataVersion=1`,
            payload,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Bearer ${provider_token}`
                }
            },
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}
