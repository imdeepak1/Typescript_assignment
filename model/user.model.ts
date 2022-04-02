import { Schema, model } from "mongoose";

interface User {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  status: String;
  token: String;
}

const userSchema = new Schema<User>({
  firstName: { type: String,require: true, default: null },
  lastName: { type: String,require: true, default: null },
  email: { type: String, require: true,unique: true },
  password: { type: String,require: true},
  status: {type:String ,require: true, default: "Active"},
  token: { type: String,require: true },
});
const user = model<User>("User", userSchema);

export default user;
