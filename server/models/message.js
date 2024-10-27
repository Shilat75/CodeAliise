import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    from: { type: String },
    to: { type: String},
    message: { type: String},
    timestamp: { type: Date, default: Date.now }
  });
  
export default mongoose.model('Message', MessageSchema);