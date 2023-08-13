import { Module } from '@nestjs/common';
import { AppointmentBookingController } from './appointment-booking.controller';
import { AppointmentBookingService } from './appointment-booking.service';
import { EventRepositoryFactory } from './repositories/event/respoistory.factory.service';
import { FirebaseEventRepository } from './repositories/event/firebase';

@Module({
    imports: [],
    controllers: [AppointmentBookingController],
    providers: [AppointmentBookingService, EventRepositoryFactory, FirebaseEventRepository ],
})
export class AppointmentBookingModule { }
