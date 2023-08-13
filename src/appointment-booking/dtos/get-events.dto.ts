export class GetEventsRequestDto {
    slowOwnerId: string;
    startDate: number;
    endDate: number;
}

export class EventsResponse {
    startAt: number;
    endAt: number;
    booker: {
        name: string;
        id: string;
        contact: {
            phoneNumber: string;
            email: string;
        }
    };
}

export class GetEventsResponse {
    events: EventsResponse[];
}