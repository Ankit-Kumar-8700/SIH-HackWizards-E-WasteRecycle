import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  model: String,
  credit: Number,
});


const Item = new mongoose.model("Items", itemSchema);
export default Item;
