import React from "react";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {ChipBox, RadioChipBox} from "./forms/ContextSpecificComponents";
import ListUtil from "../../../../../root/domain/util/ListUtil";
import {View} from "react-native";

export class ElectrocardiographyStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.electrocardiographyItems = {...electrocardiographyItems};
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.firstVisit = firstVisitDao.getVisits(this.props.route.params.userId);
            const electrocardiographyInfo = this.firstVisit.electrocardiography

            Object.values(this.electrocardiographyItems.ecg).forEach(item => item.value = false);
            Object.values(this.electrocardiographyItems.avrBlock).forEach(item => item.value = false);

            if (electrocardiographyInfo.ecg != null)
                this.electrocardiographyItems.ecg[electrocardiographyInfo.ecg.id].value = true;

            if (electrocardiographyInfo.avrBlock != null)
                this.electrocardiographyItems.avrBlock[electrocardiographyInfo.avrBlock.id].value = true;

            this.setState({loaded: true});
        })
    }


    changeECGChipBoxValue = (selectedId, value) => {
        const electrocardiographyInfo = this.firstVisit.electrocardiography;
        if (value == false) {
            electrocardiographyInfo.ecg = null;
        }
        else {
            electrocardiographyInfo.ecg = selectedId ? electrocardiographyItems.ecg[selectedId] : null;
        }
    };

    changeAvrBlockChipBoxValue = (selectedId, value) => {
        const electrocardiographyInfo = this.firstVisit.electrocardiography;
        if (value == false) {
            electrocardiographyInfo.avrBlock = null;
        }
        else {
            electrocardiographyInfo.avrBlock = selectedId ? electrocardiographyItems.avrBlock[selectedId] : null;
        }

    };


    render() {
        const ecgItems = Object.values(this.electrocardiographyItems.ecg).sort((a, b) => b.name.length - a.name.length);
        const avrBlockItems = Object.values(this.electrocardiographyItems.avrBlock);

        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'ECG'}/>
                <Layout.FormSection>
                    <Layout.InputArea>
                        <Layout.ItemsBox>
                            <RadioChipBox
                                items={ecgItems}
                                onChange={(id, value) => {this.changeECGChipBoxValue(id, value)}}
                                disableAll={this.props.readonly}
                                key={`ECG_CHIPS${this.state.loaded}`}
                            />
                        </Layout.ItemsBox>
                    </Layout.InputArea>
                </Layout.FormSection>

                <IntraSectionInvisibleDivider s/>

                <Layout.FormSection>
                    <Layout.InputTitle title={'AVR Block'}/>
                    <Layout.InputArea>
                        <Layout.ItemsBox>
                            <RadioChipBox
                                items={avrBlockItems}
                                onChange={(id, value) => {this.changeAvrBlockChipBoxValue(id, value)}}
                                disableAll={this.props.readonly}
                                key={`AVR_BLOCK_CHIPS${this.state.loaded}`}
                            />
                        </Layout.ItemsBox>
                    </Layout.InputArea>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}

let electrocardiographyItems = {
    ecg: {
        46: {
            id: 46,
            name: 'Normal Sinus Rhythm',
            groupId: 6,
        },
        47: {
            id: 47,
            name: 'Atrial Fibrillation',
            groupId: 6,
        },
        48: {
            id: 48,
            name: 'Atrial Flatter',
            groupId: 6,
        },
        49: {
            id: 49,
            name: 'LAE',
            groupId: 6,
        },
        50: {
            id: 50,
            name: 'LVH',
            groupId: 6,
        },
        51: {
            id: 51,
            name: 'RVH',
            groupId: 6,
        },
    },
    avrBlock: {
        52: {
            id: 52,
            name: 'First',
            groupId: 7,
        },
        53: {
            id: 53,
            name: 'Second',
            groupId: 7,
        },
        54: {
            id: 54,
            name: 'Third',
            groupId: 7,
        },
    }
}