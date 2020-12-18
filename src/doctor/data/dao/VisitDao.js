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
    }

    setVisits(userId, visits) {
        this.visits[userId] = visits;
    }

    getVisits(userId) {
        return this.visits[userId];
    }
}

export const visitDao = InMemVisitDao.createInstance();


