import { Injectable } from "@nestjs/common";
import { EventRepoistory } from "./repository";
import { FirebaseEventRepository } from "./firebase";

@Injectable()
export class EventRepositoryFactory {
    private serviceMap: Record<string, EventRepoistory>;
    constructor (
        private firebaseService: FirebaseEventRepository,
    ) {
        this.serviceMap = {
            'Firebase': this.firebaseService,
        }
    }

    getInstance(database: string): EventRepoistory {
        return this.serviceMap[database];
    }
}