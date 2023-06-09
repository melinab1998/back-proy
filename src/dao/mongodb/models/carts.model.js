import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: Number
            }
        ],
        default: []
    }
});

cartSchema.pre('find', function(){
    this.populate('products');
});

export const cartModel = mongoose.model('carts', cartSchema)