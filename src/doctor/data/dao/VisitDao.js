import {FirstVisit} from "../../domain/visit/Visit";


export class InMemVisitDao {
    constructor() {
        this.visits = {};
    }

    static createInstance() {
        return new InMemVisitDao();
    }

    initVisit(userId) {
        this.visits[userId] = FirstVisit.createNew();
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

export const visitDao = InMemVisitDao.createInstance();


