import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
  model: String,
  credit: Number,
  qty:{
    type:Number,
    default:1
    }
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
        required: true,
      },
      credits: Number,
      date: {
        type: Date,
        default: Date.now,
      },
      city : {
        type : String,
        required: true,
      },
      latitude:String,
      longitude:String,
      pickedUp: {
        type:Boolean,
        default:false
      },
      products:[itemSchema],
      collectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection for the collector
      },
      centerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center', // Reference to the User collection for the center
      },
      isVerifiedAtCentre:{
        type:Boolean,
        default:false
      },
      isRecycled:{
        type:Boolean,
        default:false
      }
  });


const Order = new mongoose.model("Order", orderSchema);
export default Order;