import React from "react";
import {Button, Dialog, List, Portal, Subheading, Surface, Text, TouchableRipple} from "react-native-paper";
import {View} from 'react-native';
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {debugBorderRed} from "../../../../../root/view/styles/borders";
import * as Layout from "./forms/Layout";
import {IntraSectionDivider} from "./forms/Layout";
import {FormSubmissionStatus} from "../../../../../root/view/FormSubmissionStatus";
import {currentTheme} from "../../../../../../theme";
import * as Locale from "../../../../../login/view/Locale";

export class DrugDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Portal>
                <Dialog visible={this.props.visible} onDismiss={this.props.onDismiss} style={{elevation: 4}} dismissable={true}>
                        <Surface
                            style={{
                                elevation: 4,
                            }}
                        >
                            <Layout.InputTitle
                                title={'Consumption Period'}
                                style={{paddingHorizontal: 10, paddingTop: 20}}
                            />
                            <DateInput
                                title={'Since'}
                            />
                            <View style={{paddingHorizontal: 20}}>
                                <IntraSectionDivider none/>
                            </View>
                            <DateInput
                                title={'Until'}
                            />
                            <Button
                                style={styles.addDrugButton}
                                contentStyle={styles.addDrugButtonContent}
                                mode={'contained'}
                                loading={false}
                                disabled={false}
                                onPress={() => {}}
                            >
                                <Subheading style={{color: currentTheme.colors.background}}>Add Drug</Subheading>
                            </Button>
                        </Surface>
                </Dialog>
            </Portal>
        )
    }
}

const DateInput = (props) => {
    return (
        <Surface style={styles.dateInput.surface}>
            <TouchableRipple
                onPress={props.onPress != undefined ? props.onPress : (() => {})}
                rippleColor="rgba(0, 0, 0, .2)"
            >
                <List.Item
                    title={props.title}
                    titleStyle={{...styles.alignRight}}
                    right={() => <List.Icon icon="calendar-month-outline"/>}
                    left={props => <List.Icon icon="arrow-right"/>}
                />
            </TouchableRipple>
        </Surface>
    );
}

const styles = {
    dateInput: {
        surface: {
            // elevation: 4,
            // marginTop: 20,
        }
    },
    alignRight: {
        textAlign: 'right',
    },
    addDrugButton: {
        borderRadius: 0,
    },
    addDrugButtonContent: {

    }
}