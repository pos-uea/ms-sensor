import * as mongoose from 'mongoose';
import * as moment from 'moment';

moment.locale('pt-br');

export const SensorDataSchema = new mongoose.Schema({
    sensor_code: { type: String, required: true},
    value: { type: Number, required: true},
    sensor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'sensor',
    },
    week: { type: Number, default: moment().isoWeek()},
    month: { type: Number, default: moment().month()+1},
    year: { type: Number, default: moment().year()},
}, { timestamps: true , collection: 'sensor_data'});

