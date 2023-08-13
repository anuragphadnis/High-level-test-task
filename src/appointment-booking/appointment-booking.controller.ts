import { Body, Controller, Get, Post } from "@nestjs/common";
import { GetFreeSlotRequest, GetFreeSlotsResponse } from "./dtos/get-free-slots.dto";
import { GetEventsRequestDto, GetEventsResponse } from "./dtos/get-events.dto";
import { BookSlotRequest, BookSlotResponse } from "./dtos/book-slot.dto";
import { AppointmentBookingService } from "./appointment-booking.service";

@Controller('/slot')
export class AppointmentBookingController {
    constructor (
        private readonly appointmentBookingService: AppointmentBookingService
    ) {}

    @Post('/free-slot')
    async getFreeSlots(@Body() request: GetFreeSlotRequest): Promise<GetFreeSlotsResponse> {
        return await this.appointmentBookingService.getFreeSlots(request);
    }

    @Post('/events')
    async getEvents(@Body() request: GetEventsRequestDto): Promise<GetEventsResponse> {
        return await this.appointmentBookingService.getEvents(request);
    }

    @Post('/book')
    async bookSlot(@Body() request: BookSlotRequest): Promise<BookSlotResponse> {
        return await this.appointmentBookingService.bookSlot(request);
    }
}
