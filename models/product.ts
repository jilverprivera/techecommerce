import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    product_id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const { ...product } = this.toObject();
  delete product.__v;
  return product;
};

export default models.Product || model('Product', productSchema);
