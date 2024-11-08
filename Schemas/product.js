import mangoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  isAvailable: Boolean,
  image: [
    {
      url: {
        type: String,
        required: true,
      },

      altText: {
        type: String,
        default: "Product Image",
      },
    },
  ],
});
