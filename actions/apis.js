import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from "moment";

// const baseUrl = 'http://127.0.0.1:8000/v1/';
const baseUrl = 'https://apis.getcustomer.live/v1/';


export async function sendSigninOtpOnWhatsappAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}sendSigninOtpOnWhatsapp/`,
                payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function signinAPI(payloads) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.post(
            `${baseUrl}signin/`,
                payloads,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    // 'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function checkAuthenticationAPI(token) {
    return await new Promise(async (onResolve, onReject) => {
        await axios.get(
            `${baseUrl}checkAuthentication/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getNearByShopsAPI(page) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.get(
            `${baseUrl}getNearByShops?page=${page}&recordsPerPage=10&radius=50`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getShopDetailsByIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.get(
            `${baseUrl}getShopDetailsById/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function scheduleNewMeetingAPI(payload) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.post(
            `${baseUrl}meets/scheduleNewMeeting/`,
            payload,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getNearByShopsBySearchAPI(page, searchedText) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.post(
            `${baseUrl}getNearByShopsBySearch/?page=${page}&recordsPerPage=10&radius=50`,
            {"searchedText": searchedText},
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function getAccountDetailsAPI() {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.get(
            `${baseUrl}getAccountDetails/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function updateAccountDetailsAPI(payload) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.post(
            `${baseUrl}updateAccountDetails/`,
            payload,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function getUpcomingMeetingsAPI(page) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.get(
            `${baseUrl}meets/getUpcomingMeetings/?page=${page}&recordsPerPage=10`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function rescheduleMeetingByIdAPI(payload, id) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.post(
            `${baseUrl}meets/rescheduleMeetingById/${id}/`,
            payload,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function confirmMeetingByIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.get(
            `${baseUrl}meets/confirmMeetingById/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function cancelMeetingByIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.get(
            `${baseUrl}meets/cancelMeetingById/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function giveReviewAndRatingToMeetingByIdAPI(payload, id) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.post(
            `${baseUrl}meets/giveReviewAndRatingToMeetingById/${id}/`,
            payload,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}


export async function changeZipcodeAPI(zipcode) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.post(
            `${baseUrl}changeZipcode/`,
            {zipcode},
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function getMeetDetailsByIdAPI(id) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.get(
            `${baseUrl}meets/getMeetDetailsById/${id}/`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}

export async function setNewMeetIdByIdAPI(id, meetId) {
    return await new Promise(async (onResolve, onReject) => {
        let auth_token = null;
        try {
            auth_token = await AsyncStorage.getItem('@token')
        } catch (e) {"token problem: ", console.log(e)};
        await axios.post(
            `${baseUrl}meets/setNewMeetIdById/${id}/`,
            {meetId},
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': `Token ${auth_token}`
                }
            }
        )
            .then(res => onResolve(res))
            .catch(err => onReject(err));
    });
}