import {FollowupVisit} from "../../domain/visit/FollowupVisit";

export class FollowupVisitInMemStore {
    constructor() {
        this.visits = {};
    }

    static createInstance() {
        return new FollowupVisitInMemStore();
    }

    initVisit(userId) {
        this.visits[userId] = FollowupVisit.createNew();
        this.visits[userId].patientUserId = userId;
        return this.visits[userId];
    }

    setVisits(userId, visits) {
        this.visits[userId] = visits;
        return this.visits[userId];
    }

    getVisits(userId) {
        return this.visits[userId];
    }
}

export const followupVisitStore = FollowupVisitInMemStore.createInstance();


