import React, {useContext, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Card, List, Surface, TouchableRipple, useTheme, withTheme, IconButton} from "react-native-paper";
import {PatientProfileContext} from "./ContextProvider";
import {ConditionalCollapsibleRender, IntraSectionInvisibleDivider} from "../visit/first/forms/Layout";
import {calcAge, e2p, getFormattedJalaliDate, hasValue} from "../../../../root/domain/util/Util";
import {getDateDifferenceDescribedInFarsi} from "../../../../root/domain/util/DateUtil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {InfoItem} from "../../common/cards/DefaultCard";
import {ItemListContainer} from "../../../../root/view/list/ItemList";
import {getDisplayableFarsiValue, getDisplayableValue} from "../../../../root/domain/util/DisplayUtil";
import {getReasonsForWarfarin} from "../../../../root/data/dao/StaticDomainNameTable";
import Patient from "../../../../root/domain/Patient";
import Collapsible from "react-native-collapsible";
import {debugBorderRed} from "../../../../root/view/styles/borders";

class PatientInfoTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static contextType = PatientProfileContext;

    componentDidMount = async () => {
    }

    render() {
        return (
            <PatientProfileContext.Consumer>
                {
                    value => (
                        <PatientInfoView
                            patientInfo={this.context.patient}
                            refreshing={false}
                            onRefresh={() => {}}
                        />
                    )
                }
            </PatientProfileContext.Consumer>
        );
    }
}

export default withTheme(PatientInfoTab);

const PatientInfoView = (props) => {
    return (
        <ItemListContainer
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            emptyListMessageEnabled={false}
        >
            <InfoSection index={0} sectionTitle={'مشخصات فردی'}>
                <PersonalInfoCard patientInfo={props.patientInfo}/>
            </InfoSection>
            <InfoSection index={1} sectionTitle={'اطلاعات تماس'}>
                <ContactInfoCard patientInfo={props.patientInfo}/>
            </InfoSection>
            <InfoSection index={2} sectionTitle={'سوابق پزشکی'}>
                <MedicalHistoryCard patientInfo={props.patientInfo}/>
            </InfoSection>
            <InfoSection index={3} sectionTitle={'ویزیت‌ها'}>
                <VisitsInfoCard patientInfo={props.patientInfo}/>
            </InfoSection>
        </ItemListContainer>
    )
}
const InfoSection = (props) => {
    const ListContainer = ({index, style, ...props}) => {
        if (index % 2 == 0) {
            return <View style={[{}, style]}>
                {props.children}
            </View>
        } else return <Surface style={[{elevation: 0,}, style]}>
            {props.children}
        </Surface>
    }
    const theme = useTheme();

    const [collapsed, setCollapsed] = useState(true);
    return (
        <ListContainer index={props.index} >
                <List.Section
                    style={{
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                        marginHorizontal: 0,
                        marginVertical: 0,
                    }}
                >
                    <TouchableRipple
                        style={{
                        }}
                        rippleColor="rgba(0, 0, 0, .1)"
                        delayPressIn={ 0 }

                        onPress={() => setCollapsed(!collapsed)}
                    >
                    <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: 15,
                                paddingVertical: 15,
                            }}
                        >
                            <List.Subheader style={{fontSize: 16,}} key={`LIST_HEADER`}>{props.sectionTitle}</List.Subheader>
                            <IconButton
                                icon={collapsed ? "chevron-double-down" : "chevron-double-up"}
                                color={theme.colors.placeholder}
                                size={28}
                            />
                        </View>
                    </TouchableRipple>
                    <Collapsible collapsed={collapsed}>
                        {props.children}
                    </Collapsible>
                </List.Section>
        </ListContainer>
    )

}

const PersonalInfoCard = (props) => {
    return <InfoCard
        patientInfo={props.patientInfo}
        items={[
            {
                id: 'ID',
                name: 'شناسه',
                value: props.patientInfo.userId,
            },
            {
                id: 'NAME',
                name: 'نام',
                value: props.patientInfo.fullName,
            },
            {
                id: 'AGE',
                name: 'سن',
                value: calcAge(props.patientInfo.birthDate),
            },
            {
                id: 'BIRTH_DATE',
                name: 'تاریخ تولد',
                value: props.patientInfo.birthDate,
            },
            {
                id: 'NATIONAL_ID',
                name: 'کد ملی',
                value: props.patientInfo.nationalId,
            },
            {
                id: 'LOCATION',
                name: 'محل زندگی',
                value: props.patientInfo.address,
            },
        ]}
    />
}

const ContactInfoCard = (props) => {
    return <InfoCard
        patientInfo={props.patientInfo}
        items={[
            {
                id: 'MOBILE',
                name: 'تلفن همراه',
                value: props.patientInfo.mobile,
            },
            {
                id: 'EMERGENCY_PHONE',
                name: 'تماس اضطراری',
                value: props.patientInfo.emergencyPhone,
            },
            {
                id: 'EMAIL',
                name: 'ایمیل',
                value: props.patientInfo.email,
                disableDigitConversion: true,
            },
        ]}
    />
}

const MedicalHistoryCard = (props) => {
    const theme = useTheme();
    const allConditions = Object.values(getReasonsForWarfarin());
    const items = allConditions.map(condition => {
        const hasCondition = Patient.hasMedicalCondition(props.patientInfo, condition.name);
        return {
            id: condition.id,
            name: condition.name,
            value: hasCondition ?
                <MaterialCommunityIcons name="checkbox-marked-outline" size={24} color={theme.colors.placeholder}/> :
                <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={theme.colors.placeholder}/>,
            showPureValue: true,
        }
    })
    return <InfoCard
        patientInfo={props.patientInfo}
        items={items}
    />
}

const VisitsInfoCard = (props) => {
    const context = useContext(PatientProfileContext);

    const firstVisitStatus = !props.patientInfo.firstVisitStatus.started ? 'شروع نشده'
            : !props.patientInfo.firstVisitStatus.flags.isEnded ? 'در انتظار تایید'
            : 'اتمام یافته';

    const visitCount = context.patient.visitStatus.visitCount;
    const lastVisitDate = visitCount == 0 ? 'ویزیت نشده' : context.patient.visitStatus.lastVisitDate.jalali.asString;
    return <InfoCard
        patientInfo={props.patientInfo}
        items={[
            {
                id: 'FIRST_VISIT_STATE',
                name: 'وضعیت ویزیت اول',
                value: firstVisitStatus,
            },
            {
                id: 'VISIT_COUNT',
                name: 'تعداد ویزیت‌ها',
                value: visitCount,
            },
            {
                id: 'LATEST_VISIT',
                name: 'آخرین ویزیت',
                value: lastVisitDate,
            },
            // {
            //     id: 'NEXT_VISIT_DATE',
            //     name: 'تاریخ ویزیت بعدی',
            //     value: '',
            // },
        ]}
    />
}
export const InfoCard = (props) => {
    return (
        <View
         style={[styles.patientInfoCardContainer]}
        >
            <View style={{
                paddingVertical: 10,
            }}>
                <Card.Content>
                    <View>
                        <InfoCardDetails items={props.items}/>
                    </View>
                </Card.Content>
                <IntraSectionInvisibleDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
            </View>
        </View>
    );
}

const InfoCardDetails = (props) => {
    const theme = useTheme();

    const itemNames = props.items.map(item => item.name);
    const itemValues = props.items.map(item =>
        item.showPureValue ? item.value :
            item.disableDigitConversion ?
            getDisplayableValue(item.value) :
            getDisplayableFarsiValue(item.value)
    );

    const TableColumn = ({list}) => (
        <View>
            {
                list.map((item, index) => (
                    <InfoItem
                        title={item}
                        key={`II_${props.items[index].id}`}
                        wrapperStyle={{
                            flexBasis: '50%',
                            justifyContent: 'flex-start',
                            paddingVertical: 10,
                        }}
                    />
                ))
            }
        </View>
    );

    return (
        <Row>
            <TableColumn list={itemNames}/>
            <TableColumn list={itemValues}/>
        </Row>
    )
}

const Row = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}
        >
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    fab: {
        position: 'absolute',
        margin: 24,
        left: 0,
        bottom: 0,
    },

    visitListContainer: {

    },
    patientInfoCardContainer: {
    },
    patientInfoCard: {
    },
    patientCardDetails: {
    }
});

