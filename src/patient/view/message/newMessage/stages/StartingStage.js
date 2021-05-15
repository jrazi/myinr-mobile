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
import {StageActivationContext} from "../MessageContext";
import {noop} from "../../../../../root/domain/util/Util";
import {STAGES} from "../StageMetadata";

const STAGE_DESCRIPTION = {
    [STAGES.INR_INFO.id]: 'گزارش آی‌ان‌آر',
    [STAGES.DOSAGE_REPORT.id]: 'گزارش تغییر دوز وارفارین',
}

class StartingStage extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: false,
        }
        this.optionalStages = {
            [STAGES.INR_INFO.id]: false,
            [STAGES.DOSAGE_REPORT.id]: false,
        }
    }

    static contextType = StageActivationContext;


    componentDidMount = async () => {
        this.optionalStages = {
            [STAGES.INR_INFO.id]: this.context.stageEnableStatus[STAGES.INR_INFO.id] || false,
            [STAGES.DOSAGE_REPORT.id]: this.context.stageEnableStatus[STAGES.DOSAGE_REPORT.id] || false,
        }

        this.setState({loaded: true});
    }

    changeOptionalStageStatus = (id, value) => {
        this.optionalStages[id] = value;

        (this.context.changeEnableStatus || noop)(id, value);
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
                <VisitScreen>
                    <View>
                        <SectionDescriptionText>{'لطفا مشخص کنید که چه محتوایی را میخواهید در این پیام ارسال کنید. در صورتی که قصد دارید فقط یک پیام متنی به پزشک ارسال کنید هیچ‌کدام از گزینه‌ها را انتخاب نکنید.'}</SectionDescriptionText>
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
                            key={'chip_' + this.state.loaded}
                        />
                    </View>
                </VisitScreen>
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
