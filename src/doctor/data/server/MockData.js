export const firstVisitWebService = {
    "status": 200,
    "code": "SUCCESS",
    "message": "",
    "data": {
        "firstVisit": {
            "warfarinInfo": {
                "reasonForWarfarin": {
                    "conditions": [],
                        "heartValveReplacementConditions": [
                        {
                            "id": 6,
                            "name": "MVR",
                            "groupId": 2
                        }
                    ]
                },
                "dateOfFirstWarfarin": "",
                    "lastWarfarinDosage": {
                    "id": 3042,
                        "patientUserId": 9145,
                        "saturday": "0",
                        "sunday": "0",
                        "monday": "0",
                        "tuesday": "4",
                        "wednesday": "16",
                        "thursday": "0",
                        "friday": "3"
                },
                "firstTimeWarfarin": false
            },
            "lastInrTest": {
                "hasUsedPortableDevice": false,
                    "dateOfLastInrTest": "1399/12/02",
                    "lastInrValue": "1.6",
                    "lastInrTestLabInfo": "laboratory"
            },
            "testResult": {
                "Hb": "",
                    "Hct": "",
                    "Plt": "",
                    "Bun": "",
                    "Urea": "",
                    "Cr": "",
                    "Na": "",
                    "K": "",
                    "Alt": "",
                    "Ast": ""
            },
            "medicalHistory": {
                "majorSurgery": "",
                    "minorSurgery": "",
                    "hospitalAdmission": "1396/10/29-1399/8/16-1399/10/21بعلت عدم تنظیم وارفارین و عوارض خونریزی دهنده",
                    "pastConditions": [
                    {
                        "id": 35,
                        "name": "Hyperlipidemia",
                        "groupId": 4
                    }
                ]
            },
            "physicalExam": {
                "bloodPressure": {
                    "systolic": "",
                        "diastolic": ""
                },
                "heartBeat": "",
                    "respiratoryRate": ""
            },
            "echocardiography": {
                "EF": "",
                    "LAVI": "",
                    "comment": ""
            },
            "flags": {
                "visitFlag": false,
                    "isSaved": true,
                    "isEnded": false
            },
            "inr": {
                "inrTargetRange": {
                    "from": "2.5",
                        "to": "3.5"
                },
                "nextInrCheckDate": "1399/12/18"
            },
            "visitDate": {
                "value": "98/03/20",
                    "details": {
                    "visitDay": "20",
                        "visitMonth": "03",
                        "visitYear": "98"
                }
            },
            "bleedingOrClottingTypes": [
                {
                    "id": 9,
                    "name": "No Bleeding or Clotting occur since last visit",
                    "groupId": 3
                }
            ],
                "electrocardiography": {
                "ecg": {
                    "id": 47,
                        "name": "Atrial Fibrillation",
                        "groupId": 6
                },
                "avrBlock": null
            },
            "habit": [],
                "id": 4067,
                "patientUserId": 9145,
                "dateOfDiagnosis": "1395/10/05",
                "drugHistory": 1,
                "reportComment": "",
                "medicationHistory": [
                {
                    "id": 3110,
                    "patientUserId": 9145,
                    "drugName": "ASA (Acetylsalicylic Acid) 80 mg",
                    "startDate": "1395/10/07",
                    "endDate": null
                },
                {
                    "id": 3111,
                    "patientUserId": 9145,
                    "drugName": "Atorvastatin 20 mg",
                    "startDate": "1395/10/07",
                    "endDate": null
                },
                {
                    "id": 3112,
                    "patientUserId": 9145,
                    "drugName": "Cinnarizine  25 mg",
                    "startDate": "1399/11/27",
                    "endDate": null
                },
                {
                    "id": 3113,
                    "patientUserId": 9145,
                    "drugName": "Triamcinolone NN   ",
                    "startDate": "1399/11/27",
                    "endDate": null
                },
                {
                    "id": 3114,
                    "patientUserId": 9145,
                    "drugName": "Propranolol 10 mg",
                    "startDate": "1399/11/27",
                    "endDate": null
                }
            ],
                "hasBledScore": {
                "id": 3035,
                    "patientUserId": 9145,
                    "hypertension": 0,
                    "renalDisease": 1,
                    "liverDisease": 0,
                    "strokeHistory": 0,
                    "priorBleeding": 1,
                    "labileInr": 1,
                    "ageGroup": 0,
                    "medUsagePredisposingToBleeding": 1,
                    "alcaholOrDrugUsageHistory": 0
            },
            "cha2ds2Score": {
                "id": 3036,
                    "patientUserId": 9145,
                    "ageGroup": 0,
                    "sex": 0,
                    "heartFailureHistory": 1,
                    "hypertensionHistory": 0,
                    "strokeHistory": 0,
                    "vascular": 0,
                    "diabetes": 0
            }
        }
    }
}

export const firstVisitExample = {
    "Age": '1',
    "Alt": "",
    "Ast": "",
    "BleedingorClotting": "",
    "BloodPressure": "-",
    "Bun": "",
    "Comment": "He already dead bro",
    "CommentReport": null,
    "Cr": "",
    "DateofINRTest": "1397/11/16",
    "Diabetes": '1',
    "DrugHistory": '1',
    "ECG": "-",
    "EF": "",
    "FDayVisit": "17",
    "FFlagSave": "1",
    "FFlagVisit": null,
    "FMonthVisit": "06",
    "FYearVisit": "1399",
    "FlagEndVisit": "1",
    "Friday": '16',
    "Habit": "",
    "Hb": "",
    "Hct": "",
    "HeartFailure": null,
    "HospitalAdmission": "",
    "Hypertension": '1',
    "ID": null,
    "IDDosage": null,
    "IDFirst": 2046,
    "IDUserPatient": [
        4119,
        null,
    ],
    "INRtargetrange": "2.5-3.5",
    "K": "3.4",
    "LAVI": "8.1",
    "Lab": "moddares",
    "LabileINR": null,
    "LastINR": "2.29",
    "Liverdisease": null,
    "MajorSurgery": "Brain Surgery",
    "MinorSurgery": "",
    "Monday": null,
    "Na": "",
    "NextINRCheck": null,
    "PastMedicalHistory": "33,36",
    "PatientID": null,
    "Plt": "",
    "PortableDevice": "0",
    "PulseRate": "",
    "ReasonforusingWarfarin": "-6,3,1-5",
    "Renaldisease": null,
    "RespiratoryRate": "",
    "Saturday": '1',
    "Sex": '1',
    "Stroke": '2',
    "Sunday": 2,
    "Thursday": null,
    "TimeofINRTest": "5:59 AM",
    "Tuesday": null,
    "Urea": "",
    "Vascular": 0,
    "Wednesday": '8',
    "bleeding": null,
    "dateofdiagnosis": "1395/01/01",
    "dateoffirstWarfarin": "1399/05/02",
    "drug": null,
    "predisposing": null,
}

