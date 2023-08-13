export class Slot {
    startAt: number;
    endAt: number;
}

export class GetFreeSlotRequest {
    startAt: number;
    slotOwnerId: string;
} 

export class GetFreeSlotsResponse {
    slots: Slot[];
}
