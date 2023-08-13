import { Duration } from "./appointment-booking/models/duration.enum";

export const configuration = () => ({
    slot: {
        startTime: {
            hour: 10,
            minute: 0,
        },
        endTime: {
            hour: 17,
            minute: 0,
        },
        owner: {
            name: 'Dr. John',
            id: 'bR7s9pT'
        },
    },
    database: {
        firestore: {
            databaseUrl: process.env.FIRESTORE_DB_URL,
        }
    },
    duration: Duration.THIRTY_MIN,
});