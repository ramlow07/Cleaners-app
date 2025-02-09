import { Schema, model, Document } from "mongoose";

// Define a TypeScript interface for User
interface IUser extends Document {
  email: string;
  password: string;
  verified: boolean;
  refreshToken?: string; // Optional field
}

// Define Mongoose Schema
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
});

// Export the User model
export default model<IUser>("User", userSchema);
