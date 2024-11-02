import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt timestamps
});

const Notification = mongoose.model('notification', notificationSchema);

export default Notification;
