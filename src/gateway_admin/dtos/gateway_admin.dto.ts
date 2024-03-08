import { IsArray, IsNotEmpty } from "class-validator";
import { IGateway } from "src/gateway/intefaces/gateway.interface";
import { ISensor } from "src/sensor/interfaces/sensor.interface";

export class GatewayAdminDto {
    @IsNotEmpty()
    gateway: IGateway;

    @IsArray()
    sensors: Array<ISensor>;

}
