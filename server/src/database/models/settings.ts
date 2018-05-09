import * as mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const schema = new mongoose.Schema({
    options: {
        type: Object,
        required: true
    },
    dictionary: {
        type: Object,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Settings', schema);
