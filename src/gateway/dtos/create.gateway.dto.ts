import { IsNotEmpty } from "class-validator";

export class CreateGatewayDto {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    active: boolean;
}

