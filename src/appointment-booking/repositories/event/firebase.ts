import { configuration } from "src/config";
import { BookSlotParams, EventRepoistory, GetEventsParams, GetFreeSlotsParams } from "./repository";
import { App, applicationDefault, initializeApp } from 'firebase-admin/app';
import { Event } from "src/appointment-booking/models/event.model";
import { BadRequestException, NotImplementedException } from "@nestjs/common";
import { firestore } from "firebase-admin";
import { nanoid } from "nanoid";
import { plainToClass } from 'class-transformer';

export class FirebaseEventRepository extends EventRepoistory {
    private model: firestore.CollectionReference<firestore.DocumentData>;
    private config = configuration();
    constructor () {
        super();
        initializeApp({
            credential: applicationDefault(),
            databaseURL: this.config.database.firestore.databaseUrl,
        });
        this.model = firestore().collection('event');
    }

    async bookSlot(data: BookSlotParams): Promise<Event> {
        if ((await this.getEvents({
            duration: data.duration,
            slotOwnerId: data.slotOwner.id,
            startTime: data.startTime
        })).length == 0) {
            throw new BadRequestException('Slot already booked');
        }
        const endTime = Date.parse(this.getEndTime(data.startTime, data.duration).toString());
        const event: Event = {
            ...data,
            slotOwner: {
                id: this.config.slot.owner.id,
                name: this.config.slot.owner.name,
            },
            endTime,
        }
        await this.model.doc(nanoid()).set(event);
        return event;
    }

    async getEvents(data: GetEventsParams): Promise<Event[]> {
        const endTime = Date.parse(this.getEndTime(data.startTime, data.duration).toString());
        const res = await this.model
            .where('slowOwner.id', '==', this.config.slot.owner.id)
            .where('startTime', '>=', data.startTime)
            .where('endTime', '<=', endTime).get();
        console.log(res);
        if (res.empty) return [];
        const events: Event[] = [];
        res.forEach(obj => events.push(plainToClass(Event, {...obj.data})));
        return events;
    }
}