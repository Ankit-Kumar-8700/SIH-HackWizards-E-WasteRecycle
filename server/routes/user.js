import express from 'express';
const router = express.Router();

import { signUp,signIn, verifyEmail, getCredits } from '../controllers/user.js';
import {createPickUp, acceptPickup, getAvailablePickUps, getAlreadyPickedUp, getScheduledPickUps,markPickedUp,dropAtCenter, getSpecificOrder} from "../controllers/pickup.js";
import {getOrdersOfCollector,markOrderVerified,markOrderRecycled, getCollectors} from "../controllers/center.js";

import authentication from '../middleware/auth.js';
import {verifyUser, verifyCollector, verifyCenter,verifyCollectorOrCentre} from "../middleware/roleVerification.js";


//Handle authentcaion
router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/verify",verifyEmail);

//Normal User routes
router.get("/getCredits",authentication,verifyUser,getCredits);
router.post("/pickUp", authentication, verifyUser, createPickUp); 



//Collector Routes

router.get("/getAvailablePickups", authentication, verifyCollector, getAvailablePickUps); 
router.post("/acceptPickup", authentication, verifyCollector, acceptPickup); 
router.get("/getScheduledPickUps", authentication, verifyCollector,getScheduledPickUps); 
router.post("/markPickedUp", authentication, verifyCollector,markPickedUp); 
router.get("/getAlreadyPickedUp", authentication, verifyCollector,getAlreadyPickedUp); 
router.post("/dropAtCentre",authentication,verifyCollector,dropAtCenter);


// anyone collector and center can view the order

router.get('/order/:id',authentication,verifyCollectorOrCentre,getSpecificOrder);
//E-Waste Center Routes

// firstly center should be able to view collector's request 
// like collector's photo, date on which collector initiated request, amount of e-waste that he wants to recyle should be displaye like in card format
// and it should also have view details button that will fetch orderofthat collector that he wants to recycle


// jis collector pe industry click kregi uske orders with collector_id , and center id match krke center ko dikhao
router.get("/getCollectors",authentication,verifyCenter,getCollectors);       
router.get("/getOrdersOfCollector/:id",authentication,verifyCenter,getOrdersOfCollector);  // only once view details is clicked will use this
router.get("/markOrderVerified/:id",authentication,verifyCenter,markOrderVerified);   // verified at center
router.get("/markOrderRecycled/:id",authentication,verifyCenter,markOrderRecycled);   // recycled at center now delete from db and also update credits to user


export default router;