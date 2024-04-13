import Order from "../models/order.js";
import Centre from "../models/centre.js";
import User from "../models/user.js";

import { haversine } from "../utils/helper.js";

const createPickUp = async (req, res) => {
    const { userId, city, lat, lon } = req.user;
    const { products } = req.body;

    try {
        let total_credits = 0;
        for (let i = 0; i < products.length; i++) {
            total_credits += (products[i].credit * products[i].qty); //  Assuming products[i] : { model : 'Mac Air M1', credit : 10 }
        }

        await Order.create({
            userId,
            products,
            credits: total_credits,
            city,
            latitude: lat,
            longitude: lon,
        }); // create pickup with user_id,products,credits

        // Send Mail notification to collector's of this city

        return res.status(202).json({ message: "Pickup assigned Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(505).json("Internal Server Error");
    }
};

const getAvailablePickUps = async (req, res) => {
    const { city, lat, lon } = req.user; // Get the city from req.user object while setting up this make sure also add city to it.

    try {
        const pickUps = await Order.find({ city, collectorId: null });
        if (pickUps.length != 0) return res.status(202).json(pickUps);
        else {
            const totalPickUps = [];
            const allPickUps = await Order.find({ collectorId: null });

            for (let i = 0; i < allPickUps.length; i++) {
                const dist = haversine(
                    parseFloat(lat),
                    parseFloat(lon),
                    parseFloat(allPickUps[i].latitude),
                    parseFloat(allPickUps[i].longitude)
                );

                // console.log(dist);
                totalPickUps.push({ ...allPickUps[i]._doc, dist });
            }
            totalPickUps.sort((a, b) => a.dist - b.dist);

            // Can slice top 15 nearest orders here for the collector;

            const topNearestPickUps = totalPickUps.slice(0,15);
            return res.status(202).json(topNearestPickUps);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Internal Server Error");
    }
};

const acceptPickup = async (req, res) => {
    // It is like updating order with a collector id

    const { orderId } = req.body; // from front-end store orders with their order_id
    const { userId } = req.user;

    try {
        const order = await Order.findOne({_id:orderId});
        if (!order.collectorId) {
            order.collectorId = userId;
            await order.save();
            return res
                .status(202)
                .json({ message: "Order assigned to you successfully", id:order._id });
        } else {
            return res
                .status(202)
                .json({ message: "Someone has already taken this order." });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(505).json("Internal Server Error");
    }
};

const markPickedUp = async (req, res) => {
    const { userId } = req.user;
    const { orderId } = req.body;

    try {
        const order = await Order.findOne({ _id: orderId, collectorId: userId });
        order.pickedUp = true;
        await order.save();
        return res.status(202).json({ message: "Order Picked Up Successfully", id : orderId });
    } catch (error) {
        console.log(error.message);
        return res.status(505).json("Internal Server Error");
    }
};

const getScheduledPickUps = async (req, res) => {
    const { userId } = req.user; // Get the city from req.user object while setting up this make sure also add city to it.
    try {
        const pickUps = await Order.find({ collectorId: userId , pickedUp:false});
        return res.status(202).json(pickUps);
    } catch (error) {
        console.log(error.message);
        return res.status(505).json("Internal Server Error");
    }
};

const getAlreadyPickedUp = async (req, res) => {
    const { userId } = req.user;
    try {
        const orders = await Order.find({ collectorId: userId, pickedUp: true });
        return res.status(202).json(orders);
    } catch (error) {
        console.log(error.message);
        return res.status(505).json("Internal Server Error");
    }
};


const getSpecificOrder = async(req,res)=>{
    const {id} = req.params;
    try{
        const order = await Order.findOne({_id:id});
        const userId = order.userId;
        const user = await User.findOne({_id:userId});
        res.status(202).json({...order._doc,address:user.address,email:user.email,name:user.name});
    }
    catch(error){
        res.status(500).json("Something Bad Happen Try Again Later");
    }
}



const dropAtCenter = async (req, res) => {
    // Convert city to lattitude and longitude
    // const {lat,lon} =  await getCoordinates(city);
    // const nearbyCities = await getNearbyCityNames(lat, lon);
    // console.log(nearbyCities);

    // first fetch nearest centre to collector only one
    // add center ki id to order picked by collector

    const {userId, lat, lon} = req.user;
    // const {orders} = req.body;              // => orders : [{user_id:1,products:[{},{}], credits, collectorId  }] add centre id in here
    const centres = await User.find({role:"center"});
    // console.log(centres);   
    // it will become center.find() once we register center from other form  
    // Either colelctor can select all e-waste for recycle or only some chunks of it

    const orders = await Order.find({collectorId:userId,pickedUp:true,centerId:null});  // assuming collector's make request for all the picked up products at once only


    let centre;

    let miniDist = Infinity;

    for (let i = 0; i < centres.length; i++) {
        const dist = haversine(
            parseFloat(lat),
            parseFloat(lon),
            parseFloat(centres[i].latitude),
            parseFloat(centres[i].longitude)
        );

        if (dist < miniDist) {
            miniDist = dist;
            centre = centres[i];
        }
    }
   
    if(orders.length === 0){
        return res.status(202).json({message: `Order is already assigned to Center ${centre.name}`});

    }

    const orderIds = orders.map((order) => order._id);
    await Order.updateMany({ _id: { $in: orderIds } }, { $set: { centerId: centre._id } });

    return res.status(202).json({message: `Order assigned to Center ${centre.name}  succssfully`});
};



export {
    createPickUp,
    acceptPickup,
    getAvailablePickUps,
    getAlreadyPickedUp,
    getScheduledPickUps,
    markPickedUp,
    dropAtCenter,
    getSpecificOrder
};

// const centers = [
//     { name: 'Center 1', latitude: 41.8781, longitude: -87.6298 },
//     { name: 'Center 2', latitude: 34.0522, longitude: -118.2437 },
//     // Add more centers with their coordinates
//   ];

//   function findNearestCenter(cityLat, cityLon, centers) {
//     let nearestCenter = null;
//     let minDistance = Infinity;

//     for (const center of centers) {
//       const centerLat = center.latitude;
//       const centerLon = center.longitude;

//       const distance = calculateHaversineDistance(cityLat, cityLon, centerLat, centerLon);

//       if (distance < minDistance) {
//         nearestCenter = center;
//         minDistance = distance;
//       }
//     }

//     return nearestCenter;
//   }

//   // Example usage
//   const cityLatitude = 40.7128; // Replace with the city's latitude
//   const cityLongitude = -74.0060; // Replace with the city's longitude

//   const nearestCenter = findNearestCenter(cityLatitude, cityLongitude, centers);
//   console.log('Nearest Center:', nearestCenter);
