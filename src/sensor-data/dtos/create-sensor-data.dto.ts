import { IsNotEmpty } from "class-validator";

export class createSensorDataDto {

    @IsNotEmpty()
    readonly sensor_code: string;

    @IsNotEmpty()
    readonly value: Number;

}