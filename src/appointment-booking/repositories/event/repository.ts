import { addHours, addMinutes, set } from "date-fns";
import { Duration } from "../../models/duration.enum";
import { Event } from "../../models/event.model";
import { NotImplementedException } from "@nestjs/common";
import { configuration } from "src/config";
import { Slot } from "src/appointment-booking/models/slot.model";

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

export interface GetEventParams {
    slotOwnerId: string;
    startTime: number;
    duration: Duration;
}

export abstract class EventRepoistory {
    protected config = configuration();

    protected getEndTime(startTime: number | Date, duration: Duration) {
        switch (duration) {
            case Duration.ONE_HOUR: return addHours(startTime, 1);
            case Duration.THIRTY_MIN: return addMinutes(startTime, 30);
            default:
                throw new Error(`getEndTime not defined for duration: ${duration}`);
        }
    }

    protected nextInterval(currentEndAt: number | Date, duration: Duration) {
        return this.getEndTime(currentEndAt, duration);
    }

    async getFreeSlots(data: GetFreeSlotsParams): Promise<Slot[]> {
        let slotStartAt = set(new Date(), {
            hours: this.config.slot.startTime.hour,
            minutes: this.config.slot.startTime.minute
        });
        const lastSlotEndAt = set(new Date(), {
            hours: this.config.slot.endTime.hour,
            minutes: this.config.slot.endTime.minute,
        });
        const freeSlots: Slot[] = [];
        while (slotStartAt <= lastSlotEndAt) {
            const event = await this.getEvent({
                duration: data.duration,
                slotOwnerId: data.slotOwnerId,
                startTime: Date.parse(slotStartAt.toString()),
            });
            const slotEndsAt = Date.parse(this.getEndTime(slotStartAt, data.duration).toString());
            if (!event) {
                freeSlots.push({
                    endTime: slotEndsAt,
                    startTime: Date.parse(slotStartAt.toString()),
                })
            }
        }
        return freeSlots;
    }

    async getEvent(data: GetEventParams): Promise<Event> {
        const events = await this.getEvents(data);
        if (events.length === 0) return null;
        return events[0];
    }


    async getEvents(data: GetEventsParams): Promise<Event[]> {
        throw new NotImplementedException();
    }

    async bookSlot(data: BookSlotParams): Promise<Event> {
        throw new NotImplementedException();
    }

    async isSlotAvailaible(startTime: number, endTime: number): Promise<boolean> {
        throw new NotImplementedException();
    }
}