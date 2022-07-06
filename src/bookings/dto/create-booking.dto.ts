import { IsDateString, isDateString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateBookingDto {
    
    @IsNotEmpty()
    @IsString()
    tripId :string;

    @IsString()
    @IsNotEmpty()
    passengerName : string;
    
    @IsDateString()
    date : Date;

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsNumberString()
    luggageKilos: number;

}
