import {FirstVisit} from "../../../src/doctor/domain/visit/FirstVisit";

describe('test diff method of first visit. the compares two first visit objects and return new things in second one', function () {

    it('should return empty object when nothing is different', function() {
        const referenceVisit = FirstVisit.createNew();
        const updatedVisit = FirstVisit.createNew();

        const diff = FirstVisit.diff(referenceVisit, updatedVisit);

        expect(Object.keys(diff)).toHaveLength(0);
    });

    it('should return only warfarin info when it is the only things that is updated', function() {
        const referenceVisit = FirstVisit.createNew();
        const updatedVisit = FirstVisit.createNew();

        updatedVisit.warfarinInfo.dateOfFirstWarfarin = "99/12/02";

        const diff = FirstVisit.diff(referenceVisit, updatedVisit);

        expect(Object.keys(diff)).toHaveLength(1);
        expect(diff.warfarinInfo.dateOfFirstWarfarin).toEqual(updatedVisit.warfarinInfo.dateOfFirstWarfarin);
    });

    it('should return only null value of physical exam when that is the only change', function() {
        const referenceVisit = FirstVisit.createNew();
        const updatedVisit = FirstVisit.createNew();

        updatedVisit.physicalExam = null;

        const diff = FirstVisit.diff(referenceVisit, updatedVisit);

        expect(Object.keys(diff)).toHaveLength(1);
        expect(diff.physicalExam).toEqual(null);
    });

    it('should return test result, inr when those changed and some keys got removed from updated object', function() {
        const referenceVisit = FirstVisit.createNew();
        referenceVisit.testResult.Hb = 20;
        referenceVisit.inr.inrTargetRange = {
            from: 1.5,
            to: 4.7,
        }

        const updatedVisit = FirstVisit.createNew();
        updatedVisit.testResult.Hb = 100;
        updatedVisit.testResult.Plt = 847;
        updatedVisit.inr.inrTargetRange = {
            from: 2.8,
            to: 3.2,
        }
        delete updatedVisit.warfarinInfo;
        delete updatedVisit.flags;
        delete updatedVisit.echocardiography;

        const diff = FirstVisit.diff(referenceVisit, updatedVisit);

        expect(Object.keys(diff)).toHaveLength(2);
        expect(diff.testResult.Hb).toEqual(100);
        expect(diff.testResult.Plt).toEqual(847);
        expect(diff.inr.inrTargetRange.from).toEqual(2.8);
        expect(diff.inr.inrTargetRange.to).toEqual(3.2);

    });

});

