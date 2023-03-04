const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    description: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: [],
        required: true,
    },
    account: {
        type: String,
        enum: ['Checking', 'Savings', 'Credit Card', 'Cash'],
    },
    date: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Income', incomeSchema);