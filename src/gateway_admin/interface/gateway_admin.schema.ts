import * as mongoose from 'mongoose';

export const GatewayAdminSchema = new mongoose.Schema({
    gateway: {type: mongoose.Schema.Types.ObjectId,  ref: "Gateway", unique: true},
    sensors: Array<{type: mongoose.Schema.Types.ObjectId, ref: "Sensor" }>
}, {timestamps: true, collection: 'gateway_admin' })



