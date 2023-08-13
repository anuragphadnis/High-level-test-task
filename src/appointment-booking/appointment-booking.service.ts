import { Injectable } from "@nestjs/common";
import { EventRepoistory } from "./repositories/event/repository";
import { EventRepositoryFactory } from "./repositories/event/respoistory.factory.service";
import { GetEventsRequestDto, GetEventsResponse } from "./dtos/get-events.dto";
import { configuration } from "src/config";
import { GetFreeSlotRequest, GetFreeSlotsResponse } from "./dtos/get-free-slots.dto";
import { BookSlotRequest, BookSlotResponse } from "./dtos/book-slot.dto";

@Injectable()
export class AppointmentBookingService {
    private eventRepository: EventRepoistory;
    private config = configuration();
    constructor (
        private eventRepositoryFactory: EventRepositoryFactory
    ) {
        this.eventRepository = this.eventRepositoryFactory.getInstance('Firebase');
    }

    async getEvents(data: GetEventsRequestDto): Promise<GetEventsResponse> {
        const events = await this.eventRepository.getEvents({
            duration: this.config.duration,
            slotOwnerId: data.slowOwnerId,
            startTime: data.startDate,
            endTime: data.endDate,
        });
        return {
            events: events.map(event => { return {
                startAt: event.startTime,
                endAt: event.endTime,
                booker: event.booker,
            }}),
        }
    }

    async getFreeSlots(data: GetFreeSlotRequest): Promise<GetFreeSlotsResponse> {
        const slots = await this.eventRepository.getFreeSlots({
            duration: this.config.duration,
            slotOwnerId: data.slotOwnerId,
            startTime: data.startAt,
        });
        return {
            slots: slots.map(slot => { return {
                endAt: slot.endTime,
                startAt: slot.startTime,
            }}),
        };
    }

    async bookSlot(data: BookSlotRequest): Promise<BookSlotResponse> {
        const res = await this.eventRepository.bookSlot({
            booker: data.booker,
            duration: this.config.duration,
            slotOwnerId: this.config.slot.owner.id,
            slotOwnerName: this.config.slot.owner.name,
            startTime: data.startTime,
        });
        return {
            booker: res.booker,
            endTime: res.endTime,
            slotOwnerId: this.config.slot.owner.id,
            slotOwnerName: this.config.slot.owner.name,
            startTime: res.startTime,
        };
    }
}
