import mongoose from 'mongoose';
export const productSchema = new mongoose.Schema({
    name: {
        type     : "string",
        required : [true, 'Product name required']
    },
    description: {
        type      : "string",
        maxlength : 540,
        required  : [true, 'Product description required']
    },
    price: {
        description: "Price in 'currency'",
        type       : "number",
        min        : 0,
        required   : [true, 'Product price required']
    },
    currency: {
        description: "ISO 4217 Currency Code",
        type       : "string",
        minlength  : 3,
        maxlength  : 3,
        required   : [true, 'Product currency required']
    },
    createdAt: {
        type    : Date,
        default : Date.now
    }
});
mongoose.model('Product', productSchema);

export default mongoose.model('Product');