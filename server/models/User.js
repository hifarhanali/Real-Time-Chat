import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: String,
    firstName: String,
    lastName: String,
    photo: String,
  }
);

export default mongoose.model("User", UserSchema);