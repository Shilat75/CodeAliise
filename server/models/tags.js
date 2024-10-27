import mongoose from "mongoose";

const TagSchema = mongoose.Schema({
  Name : { type: String, required: "Tag must have a Name" },
  Description : { type: String, required: "Tag must have a Description" },
});

export default mongoose.model("Tag", TagSchema);
