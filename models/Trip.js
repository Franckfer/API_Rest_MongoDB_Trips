const { Schema, model } = require('mongoose');

const tripSchema = Schema({
    name: { type: String, required: true},
    description: { type: String},
    destination: { type: String, required: true, maxlength: 20},
    category: { type: String, enum: ['familiar', 'friends', 'business'] },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
},{
    timestamps: true
});

module.exports = model('trip', tripSchema);