import React from "react";
import * as Layout from "../../first/forms/Layout";
import {IntraSectionInvisibleDivider} from "../../first/forms/Layout";
import {CheckboxGroup, ChipBox, RadioChipBox} from "../../first/forms/ContextSpecificComponents";
import ListUtil from "../../../../../../root/domain/util/ListUtil";
import {View} from "react-native";
import {getBleedingOrClottingTypes} from "../../../../../../root/data/dao/StaticDomainNameTable";

export class RecentIncidentsStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.visitInfo = this.props.route.params.visitInfo;
        this.bleedingTypeItems = getBleedingOrClottingTypes();
        this.recentIncidentInputs = {
            wasHospitalized: {
                id: 'wasHospitalized',
                name: 'Hospitalized since last visit',
                value: false,
            },
            hadERVisit: {
                id: 'wasHospitalized',
                name: 'ER visit since last visit?',
                value: false,
            },
            hasTakenWarfarinToday: {
                id: 'wasHospitalized',
                name: 'Did patient take dose today?',
                value: false,
            },
        }
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            const bleedingOrClottingTypes = this.visitInfo.bleedingOrClottingTypes

            Object.values(this.bleedingTypeItems).forEach(condition => {
                const isConditionListed = ListUtil.findOneById(bleedingOrClottingTypes, condition.id) != null;
                condition['value'] = isConditionListed;
            });

            Object.values(this.recentIncidentInputs).forEach(input => {
                input.value = this.visitInfo[input.id];
            });

            this.setState({loaded: true});
        })
    }


    modifyBleedingTypeList = (id, value) => {
        const bleedingOrClottingTypes = this.visitInfo.bleedingOrClottingTypes;
        if (value) {
            const condition = this.bleedingTypeItems[id] || null;
            ListUtil.addById(bleedingOrClottingTypes, condition)
        }
        else {
            ListUtil.removeById(bleedingOrClottingTypes, id);
        }
    };

    modifyRecentIncidentInput = (id, value) => {
        this.visitInfo[id] = value;
    };



    render() {
        const bleedingItems = Object.values(this.bleedingTypeItems);
        const recentIncidentInputs = Object.values(this.recentIncidentInputs);

        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'Recent Incidents'}/>
                <Layout.FormSection>
                    <Layout.InputTitle title={'Incidents since last visit'}/>
                    <Layout.InputArea>
                        <Layout.ItemsBox>
                            <CheckboxGroup
                                items={recentIncidentInputs}
                                onChange={(id, value) => {this.modifyRecentIncidentInput(id, value)}}
                                disableAll={this.props.readonly}
                                key={`RECENT_INCIDENTS${this.state.loaded}`}
                            />
                        </Layout.ItemsBox>
                    </Layout.InputArea>
                    <IntraSectionInvisibleDivider s/>
                    <Layout.InputArea>
                        <Layout.InputTitle title={'Recent bleeding or clotting incidents'}/>
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

