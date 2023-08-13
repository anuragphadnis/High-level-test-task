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
    endTime?: number;
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
    slotOwnerId: string;
    slotOwnerName: string;
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
            minutes: this.config.slot.startTime.minute,
            seconds: 0,
        });
        const lastSlotEndAt = set(new Date(), {
            hours: this.config.slot.endTime.hour,
            minutes: this.config.slot.endTime.minute,
            seconds: 0,
        });
        const freeSlots: Slot[] = [];
        while (slotStartAt <= lastSlotEndAt) {
            const event = await this.getEvent({
                duration: data.duration,
                slotOwnerId: data.slotOwnerId,
                startTime: Date.parse(slotStartAt.toString()),
            });
            const slotEndsAt = this.getEndTime(slotStartAt, data.duration);
            if (!event) {
                freeSlots.push({
                    endTime: Date.parse(slotEndsAt.toString()),
                    startTime: Date.parse(slotStartAt.toString()),
                })
            }
            slotStartAt = slotEndsAt;
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