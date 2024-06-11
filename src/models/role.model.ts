import { Schema, model, Document } from "mongoose";

interface IRole extends Document {
  name: string;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: [true, "role is required"],
    },
  },
  { timestamps: true }
);

const Role = model<IRole>("Role", RoleSchema, "roles");

export default Role;
export { IRole };
