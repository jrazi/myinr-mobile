import React from "react";
import {LoadingScreen} from "../../../../../root/view/loading/Loading";
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {Button, Surface, Text, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import {
    ConditionalRender,
    IntraSectionInvisibleDivider,
    VisitScreen
} from "../../../../../doctor/view/patients/visit/first/forms/Layout";
import {ChipBox} from "../../../../../doctor/view/patients/visit/first/forms/ContextSpecificComponents";
import {DescriptionText, SectionDescriptionText} from "../common/MessageStageLayout";
import {STAGES} from "../NewMessageNavigator";

const STAGE_DESCRIPTION = {
    [STAGES.INR_INFO.id]: 'گزارش آی‌ان‌آر',
    [STAGES.DOSAGE_REPORT.id]: 'گزارش تغییر دوز وارفارین',
}

class StartingStage extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: true,
        }
        this.optionalStages = {
            [STAGES.INR_INFO.id]: false,
            [STAGES.DOSAGE_REPORT.id]: false,
        }
    }

    componentDidMount = async () => {
    }

    changeOptionalStageStatus = (id, value) => {
        this.optionalStages[id] = value;
    }

    getOptionalStageList() {
        return Object.keys(this.optionalStages)
            .map(id => {
                return {
                    id: id,
                    value: this.optionalStages[id],
                    name: STAGE_DESCRIPTION[id],
                }
            });
    }

    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                <VisitScreen>
                    <View>
                        <SectionDescriptionText>{'لطفا مشخص کنید که چه محتوایی را میخواهید در این پیام ارسال کنید.'}</SectionDescriptionText>
                    </View>
                    <IntraSectionInvisibleDivider xs/>
                    <View>
                        <ChipBox
                            items={this.getOptionalStageList()}
                            onChange={this.changeOptionalStageStatus}
                            disableAll={false}
                            itemBoxStyle={{
                                flexDirection: 'row',
                            }}
                        />
                    </View>
                </VisitScreen>
            </LoadingScreen>
        );
    }
}

export default withTheme(StartingStage);


const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title="پیام به پزشک"
                style={{elevation: 0}}
            />
        </Surface>
    )
}
