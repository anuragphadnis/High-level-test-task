import { BadRequestException, Injectable } from "@nestjs/common";
import { plainToClass } from 'class-transformer';
import { firestore } from "firebase-admin";
import { initializeApp } from 'firebase-admin/app';
import { Event } from "src/appointment-booking/models/event.model";
import { v4 as uuid } from 'uuid';
import { BookSlotParams, EventRepoistory, GetEventsParams } from "./repository";

@Injectable()
export class FirebaseEventRepository extends EventRepoistory {
    private model: firestore.CollectionReference<firestore.DocumentData>;
    constructor () {
        super();
        const app = initializeApp();
        this.model = firestore().collection('event');
    }

    async bookSlot(data: BookSlotParams): Promise<Event> {
        const currentEvent = await this.getEvents({
            duration: data.duration,
            slotOwnerId: this.config.slot.owner.id,
            startTime: data.startTime
        });
        if (currentEvent.length != 0) {
            throw new BadRequestException('Slot already booked');
        }
        const endTime = Date.parse(this.getEndTime(data.startTime, data.duration).toString());
        const event: Event = {
            ...data,
            slotOwnerId: this.config.slot.owner.id,
            slotOwnerName: this.config.slot.owner.name,
            endTime,
        }
        await this.model.doc(uuid()).set(event);
        return event;
    }

    async getEvents(data: GetEventsParams): Promise<Event[]> {
        const endTime = data.endTime || Date.parse(this.getEndTime(data.startTime, data.duration).toString());
        const res = await this.model
            .where('slotOwnerId', '==', this.config.slot.owner.id)
            .where('startTime', '>=', data.startTime).get()
            // .where('endTime', '<=', endTime).get();
        if (res.empty) return [];
        const events: Event[] = [];
        res.docs.forEach(obj => {
            if (obj.data().endTime <= endTime) {
                events.push(plainToClass(Event, obj.data()))
            }
        });
        return events;
    }
}