import React, {useState} from "react";
import {Button, Dialog, List, Portal, Subheading, Surface, Text, TouchableRipple} from "react-native-paper";
import {View} from 'react-native';
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {debugBorderRed} from "../../../../../root/view/styles/borders";
import * as Layout from "./forms/Layout";
import {IntraSectionDivider} from "./forms/Layout";
import {FormSubmissionStatus} from "../../../../../root/view/FormSubmissionStatus";
import * as Locale from "../../../../../login/view/Locale";
import {DefaultDatePicker} from "./forms/JalaliDatePicker";
import {visitDao} from "../../../../data/dao/VisitDao";

export class DrugDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sinceDate: null,
            untilDate: null,
        }
        this.drugHistory = [];
    }

    componentDidMount() {
        this.drugHistory = visitDao.getVisits(this.props.userId).drugHistory;
    }

    setSinceDate = (date) => this.setState({sinceDate: date});
    setUntilDate = (date) => this.setState({untilDate: date});

    addDrug = () => {
        let index = this.drugHistory.findIndex(item => item.drugInfo.IDDrug == this.props.drugInfo.IDDrug);
        if (index < 0) {
            this.drugHistory.push(
                {
                    drugInfo: this.props.drugInfo,
                    since: this.state.sinceDate,
                    until: this.state.untilDate,
                }
            );
        }
        else {
            this.drugHistory[index] = {
                drugInfo: this.props.drugInfo,
                since: this.state.sinceDate,
                until: this.state.untilDate,
            }
        }
        this.props.navigation.goBack();
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
                            <Dialog.Title
                                style={{textAlign: 'right'}}
                            >
                                Consumption Period
                            </Dialog.Title>
                            <DateInput
                                title={'Since'}
                                value={this.state.sinceDate}
                                onDateChange={this.setSinceDate}
                            />
                            <View style={{paddingHorizontal: 20}}>
                                <IntraSectionDivider none/>
                            </View>
                            <DateInput
                                title={'Until '}
                                value={this.state.untilDate}
                                onDateChange={this.setUntilDate}
                            />
                            <Button
                                style={styles.addDrugButton}
                                contentStyle={styles.addDrugButtonContent}
                                mode={'contained'}
                                loading={false}
                                disabled={false}
                                onPress={this.addDrug}
                            >
                                <Subheading style={{color: theme.colors.background}}>Add Drug</Subheading>
                            </Button>
                        </Surface>
                </Dialog>
            </Portal>
        )
    }
}

const DateInput = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Surface style={styles.dateInput.surface}>
            <TouchableRipple
                onPress={() => setModalVisible(true)}
                rippleColor="rgba(0, 0, 0, .2)"
            >
                <List.Item
                    title={`${props.title} ${props.value || ''}`}
                    titleStyle={{...styles.alignRight}}
                    right={() => <List.Icon icon="calendar-month-outline" color={theme.colors.primary}/>}
                    left={props => <List.Icon icon="chevron-right" color={theme.colors.backdrop}/>}
                />
            </TouchableRipple>
            <DatePickerModal
                visible={modalVisible}
                onDateChange={(date) => {
                    setModalVisible(false);
                    props.onDateChange(date);
                }}
            />
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
        paddingVertical: 5,
    }
}

const DatePickerModal = (props) => {
    return (
        <DefaultDatePicker
            visible={props.visible}
            onDateChange={props.onDateChange}
        />
    )
}