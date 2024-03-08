import { IGateway } from "src/gateway/intefaces/gateway.interface";
import { ISensor } from "src/sensor/interfaces/sensor.interface";


export interface IGatewayAdmin {
    gateway: IGateway;
    sensors: Array<ISensor>;
}