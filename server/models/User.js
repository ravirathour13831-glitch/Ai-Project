import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, unique: true, minlength: 3, maxlength: 40 },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);