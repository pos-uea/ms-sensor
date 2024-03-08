import * as mongoose from 'mongoose';

export const NotificationAdminSchema = new mongoose.Schema({
    sensor: {type: mongoose.Schema.Types.ObjectId,  ref: "Sensor", unique: true},
    type: {type: String},
    value_limite: {type: Number},
    emails: Array<{type: string }>
}, {timestamps: true, collection: 'notification_admin' })
