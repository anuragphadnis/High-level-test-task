import { IsArray, IsNumber, IsObject, IsString } from "class-validator";
import { Booker } from "./booker.dto";

export class GetEventsRequestDto {
    @IsString()
    slowOwnerId: string;
    @IsNumber()
    startDate: number;
    @IsNumber()
    endDate: number;
}

export class EventsResponse {
    @IsNumber()
    startAt: number;
    @IsNumber()
    endAt: number;
    @IsObject()
    booker: Booker;
}

export class GetEventsResponse {
    @IsArray()
    events: EventsResponse[];
}