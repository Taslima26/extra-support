import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    volunteerId: String,
    categoryId: String,
    title: String,
    repeated: Boolean,
    contactDetails: String,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const SessionModel = model("session", sessionSchema);

export default SessionModel;