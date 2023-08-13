export class BookSlotRequest {
    startTime: number;
    booker: {
        name: string;
        id: string;
        contact: {
            phoneNumber: string;
            email: string;
        }
    };
}

export class BookSlotResponse {
    startTime: number;
    endTime: number;
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