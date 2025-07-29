import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    clientName : {
        type : String,
        required : true
    },
    clientEmail : String,
    clientAddress : String,
    items : [
        {
            name : String,
            quantity : Number,
            price : Number
        }
    ],
    taxRate : Number,
    totalAmount : Number,
    createdAt : {
        type : Date,
        default : Date.now
    },
});

export default mongoose.model("Invoice",invoiceSchema);