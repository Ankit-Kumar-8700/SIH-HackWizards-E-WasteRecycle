import Order from "../models/order.js";
import User from "../models/user.js";



// make endpoint for center to first fetch list of collector that it is working with after that on clicking particular collector it should show the orders of collector that are there (getOrdersOfCollectors)


// route for handling authentication of centers  (as of now just use the user route only);

const getOrdersOfCollector = async (req, res) => {
     // Also remember u may need to add a route for getting list of all collectors, specific collectors like by their name
    const {userId} = req.user;

    const {id : collectorId} = req.params;

    try {
        const orders = await Order.find({ collectorId, centerId : userId, isRecycled: false });   // If you are storing orders history that is recycled by facility(center)
        return res.status(202).json(orders);
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

// We can also merge verification and credit giving system in one route

//If you want to do with 2 routes you can do make button for verified first and after like if it is verified on front-end show recycled button instead now on clicking recycled it should recycle the waste and award the credits

const markOrderVerified = async (req, res) => {
    const {id :orderId } = req.params;

    try {
        const order = await Order.findOne({ _id: orderId });
        if(!order) return res.status(404).json({message : "Order not found"});
        order.isVerifiedAtCentre = true;
        await order.save();
        return res.status(202).json({ message: "Order Verified Successfully", id : order._id });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error");
    }
}

const markOrderRecycled = async (req, res) => {
    const { id :  orderId } = req.params;
   
    try {
        const order = await Order.findOne({ _id: orderId , isRecycled:false});
        if(!order) return res.status(202).json({message : 'Already Recycled'});

        const user_id = order.userId;
        const creditsRecovered = order.credits;

        const user = await User.findOneAndUpdate(
            { _id: user_id },
            { $inc: { credits: creditsRecovered } }, // Use $inc to increment credits by creditsRecovered
            { new: true } // Return the updated user document
          );


          //This lines will cause issue in signin because we have custom hooks for user in between

          // const user = await User.findOne({ _id: user_id });
          // user.credits += creditsRecovered;
          // await user.save(); 

        
        order.isRecycled = true;


        await order.save();          // If you want to save u can do it here else just delete the order from db
        return res.status(202).json({ message: "Order Recyled Successfully and credits transferred to user", id : order._id ,credits:user.credits});
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}


const getCollectors = async(req,res)=>{

        const {userId} = req.user;

       try {
            const orders = await Order.find({centerId:userId,isRecycled:false});
            let users = orders.map((order) => order.collectorId);
            users = await User.find({_id : {$in:users}});
            console.log(users);
            return res.status(202).json(users);

    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}


export {
    getOrdersOfCollector,
    markOrderVerified,
    markOrderRecycled,
    getCollectors
}