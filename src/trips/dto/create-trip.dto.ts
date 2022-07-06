import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateTripDto {
    @IsString()
    @IsNotEmpty()
    destination : string;

    @IsString()
    @IsNotEmpty()
    agencyId : string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsNumberString()
    flightPrice: number;

    @IsNumberString()
    places: number;

    @IsString()
    @IsNotEmpty()
    id : string;
}
