

class DrugDao {

    constructor() {
    }

    searchDrugs = (drugName) => {
        return DRUG_LIST;
    }

    aggregateSearchByRouteOfAdmin = async (drugName) => {
        let drugList = await this.searchDrugs(drugName);
        let drugGroups = {};
        drugList.forEach(drug => {
            if (!(drug.RouteofAdmin in drugGroups)) {
                drugGroups[drug.RouteofAdmin] = [];
            }
            drugGroups[drug.RouteofAdmin].push(drug);
        })
        return drugGroups;
    }
}

export const drugDao = new DrugDao();

const DRUG_LIST = [
    {
        "IDDrug" : 201,
        "DrugName" : "Pregabalin",
        "Salt" : "",
        "DosageForm" : "CAPSULE",
        "Strengh" : "50 mg",
        "RouteofAdmin" : "ORAL",
        "ATCCode" : "N03AX16",
        "Ingredient" : "",
        "Approvedclinicalindications" : "",
        "Accesslevel" : "",
        "Remarks" : ""
    },
    {
        "IDDrug" : 202,
        "DrugName" : "Pregabalin",
        "Salt" : "",
        "DosageForm" : "CAPSULE",
        "Strengh" : "75 mg",
        "RouteofAdmin" : "ORAL",
        "ATCCode" : "N03AX16",
        "Ingredient" : "",
        "Approvedclinicalindications" : "",
        "Accesslevel" : "",
        "Remarks" : ""
    },
    {
        "IDDrug" : 203,
        "DrugName" : "Prilocaine+Felypressin   ",
        "Salt" : "",
        "DosageForm" : "INJECTION",
        "Strengh" : "",
        "RouteofAdmin" : "PARENTERAL",
        "ATCCode" : "N01BB54",
        "Ingredient" : "(Prilocaine HCl 30mg+Felypressin (0.03 IU.) 0.54 mcg)\/ ml",
        "Approvedclinicalindications" : "",
        "Accesslevel" : "",
        "Remarks" : "Cartridge"
    },
    {
        "IDDrug" : 204,
        "DrugName" : "Primaquine",
        "Salt" : "As Phosphate",
        "DosageForm" : "TABLET",
        "Strengh" : "15 mg",
        "RouteofAdmin" : "PARENTERAL",
        "ATCCode" : "P01BA03",
        "Ingredient" : "",
        "Approvedclinicalindications" : "For use in combination with clindamycin hydrochloride in the treatment of Pneumocystis carinii pneumonia associated with AIDS.",
        "Accesslevel" : "",
        "Remarks" : ""
    },
    {
        "IDDrug" : 205,
        "DrugName" : "Primaquine",
        "Salt" : "As Phosphate",
        "DosageForm" : "TABLET",
        "Strengh" : "7.5 mg",
        "RouteofAdmin" : "ORAL",
        "ATCCode" : "P01BA03",
        "Ingredient" : "",
        "Approvedclinicalindications" : "For use in combination with clindamycin hydrochloride in the treatment of Pneumocystis carinii pneumonia associated with AIDS.",
        "Accesslevel" : "",
        "Remarks" : ""
    },
    {
        "IDDrug" : 206,
        "DrugName" : "Primidone",
        "Salt" : "",
        "DosageForm" : "SUSPENSION",
        "Strengh" : "125 mg\/5ml",
        "RouteofAdmin" : "ORAL",
        "ATCCode" : "N03AA03",
        "Ingredient" : "",
        "Approvedclinicalindications" : "",
        "Accesslevel" : "",
        "Remarks" : ""
    },
    {
        "IDDrug" : 207,
        "DrugName" : "Primidone",
        "Salt" : "",
        "DosageForm" : "TABLET",
        "Strengh" : "250 mg",
        "RouteofAdmin" : "ORAL",
        "ATCCode" : "N03AA03",
        "Ingredient" : "",
        "Approvedclinicalindications" : "",
        "Accesslevel" : "",
        "Remarks" : ""
    },
];