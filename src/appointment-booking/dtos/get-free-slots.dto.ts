import { IsArray, IsNumber, IsString } from "class-validator";

export class Slot {
    @IsNumber()
    startAt: number;
    @IsNumber()
    endAt: number;
}

export class GetFreeSlotRequest {
    @IsNumber()
    startAt: number;
    @IsString()
    slotOwnerId: string;
} 

export class GetFreeSlotsResponse {
    @IsArray()
    slots: Slot[];
}
