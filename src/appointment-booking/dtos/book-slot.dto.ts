import { IsNumber, IsObject, IsString } from "class-validator";
import { Booker } from "./booker.dto";

export class BookSlotRequest {
    @IsNumber()
    startTime: number;
    @IsObject()
    booker: Booker;
}

export class BookSlotResponse {
    @IsNumber()
    startTime: number;
    @IsNumber()
    endTime: number;
    @IsObject()
    booker: Booker;
    @IsString()
    slotOwnerId: string;
    @IsString()
    slotOwnerName: string;
}