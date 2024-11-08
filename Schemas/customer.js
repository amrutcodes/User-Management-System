import mangoose from "mongoose";

const customerSchema = mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  phoneNo: Number,
  email: {
    type: String,
    unique: true,
    required: true,
    lowerCase: true,
    trim: true,
  },
  password: { type: String, required: true, minLength: 8 },

  address: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: Number, required: true, trim: true },
    landmark: { type: String, required: true },
  },
});
