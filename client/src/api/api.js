import axios from 'axios';

const url = "http://localhost:5000/api/v1";
const Api = axios.create({ baseURL: url })

Api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('profile')}`
    }
    return req;
})


const SignUp = (formData) => Api.post(`/user/signup`, formData);
const LogIn = (formData) => Api.post(`/user/signin`, formData);

// User endpoints

const makePickUp = (formData) => Api.post('/user/pickUp', formData);
const fetchCredits = () => Api.get("/user/getCredits");


// Collector Enpoints

const fetchAvailablePickups = () => Api.get('/user/getAvailablePickups');
const fetchScheduledPickups = () => Api.get('/user/getScheduledPickUps');
const fetchAlreadyPickups = () => Api.get('/user/getAlreadyPickedUp');
const acceptPickup = (orderId) => Api.post('/user/acceptPickup', orderId);
const markPickup = (orderId) => Api.post('/user/markPickedUp', orderId);
const fetchOrder = (id) => Api.get(`/user/order/${id}`);
const fetchNearestCenter = () => Api.post('/user/dropAtCentre');


// Center Enpoints
const fetchCollectors = () => Api.get('/user/getCollectors');
const fetchCollectorOrders = (collectorId) => Api.get(`user/getOrdersOfCollector/${collectorId}`);
const markVerified = (orderId) => Api.get(`/user/markOrderVerified/${orderId}`);
const markRecycled = (orderId) => Api.get(`/user/markOrderRecycled/${orderId}`);


export { SignUp, LogIn, fetchAvailablePickups, fetchScheduledPickups, fetchAlreadyPickups, makePickUp, acceptPickup, markPickup, fetchOrder, fetchNearestCenter, fetchCollectorOrders,markVerified,markRecycled, fetchCredits, fetchCollectors };