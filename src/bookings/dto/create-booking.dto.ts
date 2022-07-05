import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookingDto {
    
    @IsNotEmpty()
    @IsString()
    tripId :string;

    @IsString()
    @IsNotEmpty()
    client : string;

    @IsNumber()
    passengers?: number;

}
