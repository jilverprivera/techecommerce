import { Schema, model, models } from 'mongoose';

const paymentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    send: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

paymentSchema.methods.toJSON = function () {
  const { ...payment } = this.toObject();
  delete payment.__v;
  return payment;
};

export default models.Payment || model('Payment', paymentSchema);
