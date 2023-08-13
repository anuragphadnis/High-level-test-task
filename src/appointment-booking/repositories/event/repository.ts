import { addHours, addMinutes } from "date-fns";
import { Duration } from "../../models/duration.enum";
import { Event } from "../../models/event.model";
import { NotImplementedException } from "@nestjs/common";

export interface GetEventsParams {
    slotOwnerId: string;
    startTime: number;
    duration: Duration;
}

export interface GetFreeSlotsParams {
    slotOwnerId: string;
    startTime: number;
    duration: Duration;
}

export interface BookSlotParams {
    startTime: number;
    duration: Duration;
    booker: {
        name: string;
        id: string;
        contact: {
            phoneNumber: string;
            email: string;
        }
    };
    slotOwner: {
        name: string;
        id: string;
    };
}

export abstract class EventRepoistory {
    protected getEndTime(startTime: number, duration: Duration) {
        switch (duration) {
            case Duration.ONE_HOUR: return addHours(startTime, 1);
            case Duration.THIRTY_MIN: return addMinutes(startTime, 30);
            default:
                throw new Error(`getEndTime not defined for duration: ${duration}`);
        }
    }

    async getEvents(data: GetEventsParams): Promise<Event[]> {
        throw new NotImplementedException();
    }
    async getFreeSlots(data: GetFreeSlotsParams): Promise<Event[]> {
        throw new NotImplementedException();
    }
    async bookSlot(data: BookSlotParams): Promise<Event> {
        throw new NotImplementedException();
    }
}