import {doctorService} from "../server/DoctorServiceGateway";


export class DrugDao {

    constructor() {
    }

    searchDrugs = (drugName) => {
        return doctorService.searchDrugs(drugName)
            .then(drugList => drugList);
    }

    aggregateSearchByRouteOfAdmin = async (drugName) => {
        let drugList = await this.searchDrugs(drugName);
        let drugGroups = {};
        drugList.forEach(drug => {
            if (!(drug.routeOfAdministration in drugGroups)) {
                drugGroups[drug.routeOfAdministration] = [];
            }
            drugGroups[drug.routeOfAdministration].push(drug);
        })
        return drugGroups;
    }
}

export const drugDao = new DrugDao();
