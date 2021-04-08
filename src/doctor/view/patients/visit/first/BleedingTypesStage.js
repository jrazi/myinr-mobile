import React from "react";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {CheckboxGroup, ChipBox, RadioChipBox} from "./forms/ContextSpecificComponents";
import ListUtil from "../../../../../root/domain/util/ListUtil";
import {View} from "react-native";

export class BleedingTypesStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.bleedingTypeItems = {...bleedingTypeItems};
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.firstVisit = firstVisitDao.getVisits(this.props.route.params.userId);
            const bleedingOrClottingTypes = this.firstVisit.bleedingOrClottingTypes

            Object.values(this.bleedingTypeItems).forEach(condition => {
                const isConditionListed = ListUtil.findOneById(bleedingOrClottingTypes, condition.id) != null;
                condition['value'] = isConditionListed;
            });

            this.setState({loaded: true});
        })
    }


    modifyBleedingTypeList = (id, value) => {
        const bleedingOrClottingTypes = this.firstVisit.bleedingOrClottingTypes;
        if (value) {
            const condition = bleedingTypeItems[id] || null;
            ListUtil.addById(bleedingOrClottingTypes, condition)
        }
        else {
            ListUtil.removeById(bleedingOrClottingTypes, id);
        }
    };
    


    render() {
        const bleedingItems = Object.values(this.bleedingTypeItems).sort((a, b) => b.name.length - a.name.length);

        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'Recent Incidents'} description={'Recent bleeding or clotting incidents'}/>
                <Layout.FormSection>
                    <Layout.InputArea>

                        <Layout.ItemsBox>
                            <CheckboxGroup
                                items={bleedingItems}
                                onChange={(id, value) => {this.modifyBleedingTypeList(id, value)}}
                                disableAll={this.props.readonly}
                                key={`BLEEDING_TYPE_CHIPS_${this.state.loaded}`}
                            />
                        </Layout.ItemsBox>
                    </Layout.InputArea>
                </Layout.FormSection>

                <IntraSectionInvisibleDivider s/>

            </Layout.VisitScreen>
        )
    }
}

let bleedingTypeItems = {
    9: {
        id: 9,
        name: 'No Bleeding or Clotting occur since last visit',
        groupId: 3,
    },
    10: {
        id: 10,
        name: 'Minor-Gums bleed while brushing teeth',
        groupId: 3,
    },
    11: {
        id: 11,
        name: 'Minor-Easy bruising',
        groupId: 3,
    },
    12: {
        id: 12,
        name: 'Minor-Longer periods of bleeding after minor cuts',
        groupId: 3,
    },
    13: {
        id: 13,
        name: 'Minor-Prolonged menstrual bleeding',
        groupId: 3,
    },
    14: {
        id: 14,
        name: 'Minor- Occasional nose bleeds',
        groupId: 3,
    },
    15: {
        id: 15,
        name: 'Major-Red, dark, coffee or cola colored urine',
        groupId: 3,
    },
    16: {
        id: 16,
        name: 'Major-Red Stools or stools that look like tar',
        groupId: 3,
    },
    17: {
        id: 17,
        name: 'Major-Excessive amounts of bleeding from the gums or nose',
        groupId: 3,
    },
    18: {
        id: 18,
        name: 'Major-Vomiting (throwing up) of coffee colored or bright red material',
        groupId: 3,
    },
    19: {
        id: 19,
        name: 'Major-coughing up red tinged sputum',
        groupId: 3,
    },
    20: {
        id: 20,
        name: 'Major-Severe pain (example: severe headache or abdominal pain)',
        groupId: 3,
    },
    21: {
        id: 21,
        name: 'Major-The sudden appearance of several bruises for no apparent reason',
        groupId: 3,
    },
    22: {
        id: 22,
        name: 'Major-Excessive menstrual bleeding',
        groupId: 3,
    },
    23: {
        id: 23,
        name: 'Major-A cut that will not stop bleeding within 10-15 minutes',
        groupId: 3,
    },
    24: {
        id: 24,
        name: 'Major-A serious fall or if you hit your head',
        groupId: 3,
    },
    25: {
        id: 25,
        name: 'Clotting Signs-Sudden weakness in any limb (arm or leg)',
        groupId: 3,
    },
    26: {
        id: 26,
        name: 'Clotting Signs-Numbness or tingling anywhere',
        groupId: 3,
    },
    27: {
        id: 27,
        name: 'Clotting Signs-Visual changes or loss of sight in either eyes',
        groupId: 3,
    },
    28: {
        id: 28,
        name: 'Clotting Signs-Sudden start of slurred speech or not able to speak',
        groupId: 3,
    },
    29: {
        id: 29,
        name: 'Clotting Signs-Dizziness or faintness',
        groupId: 3,
    },
    30: {
        id: 30,
        name: 'Clotting Signs-New pain, swelling, redness, or heat in any extremity',
        groupId: 3,
    },
    31: {
        id: 31,
        name: 'Clotting Signs-New shortness of breath or chest pain',
        groupId: 3,
    },
    32: {
        id: 32,
        name: 'other',
        groupId: 3,
    },
}