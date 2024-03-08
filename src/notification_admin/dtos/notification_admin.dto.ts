import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateNotificationAdminDto {
    @IsNotEmpty()
    sensor: string;

    @IsNotEmpty()
    type: string;
    
    @IsNotEmpty()
    @IsNumber()
    value_limite: Number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    emails: Array<string>;

}



