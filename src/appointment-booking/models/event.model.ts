import { Duration } from "./duration.enum";

export class Event {
    startTime: number;
    endTime: number;
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