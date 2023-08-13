import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentBookingModule } from './appointment-booking/appointment-booking.module';

@Module({
  imports: [AppointmentBookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
