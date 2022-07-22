import { Schema, model, models } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.methods.toJSON = function () {
  const { ...category } = this.toObject();
  delete category.__v;
  return category;
};

export default models.Category || model('Category', categorySchema);
