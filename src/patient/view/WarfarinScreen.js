import React from "react";
import {rootDao} from "../../root/data/dao/RootDao";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../root/view/screen/Layout";
import {Avatar, Card, Surface, Text, useTheme} from "react-native-paper";
import {e2p, getFormattedJalaliDate, hasValue, noop} from "../../root/domain/util/Util";
import {StyleSheet, View, ScrollView, RefreshControl} from "react-native";
import {EmptyList} from "../../root/view/list/EmptyListMessage";
import {getPersianDayOfWeek} from "../../root/domain/util/DateUtil";
let moment = require('moment');
require('moment-precise-range-plugin');
require('moment-timezone');


function assignDatesToDosageRecords(records) {

    const now = Date.now();

    const todayDayOfWeek = getPersianDayOfWeek(now);

    const indexOfMatchingDayOfWeek = records.findIndex(record => todayDayOfWeek.no == getPersianDayOfWeek(record.dosageDate.timestamp).no);

    if (indexOfMatchingDayOfWeek < 0) return records;

    let recordsStartingFromToday = [];

    let currentDosageDate = moment(now);

    for (let i = indexOfMatchingDayOfWeek; i < indexOfMatchingDayOfWeek + records.length; i++) {
        const index = i % (records.length);
        const record = records[index];

        const _date = currentDosageDate.toDate();

        record.dosageDate.timestamp = _date.getTime();
        record.dosageDate.iso = _date.toISOString();

        currentDosageDate.add(1, 'd');

        recordsStartingFromToday.push(record)
    }

    return recordsStartingFromToday;
}

export default class WarfarinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loading: true,
        }
        this.user = null;
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            this.user = JSON.parse(JSON.stringify(user));
            this.user.latestWarfarinDosage = assignDatesToDosageRecords(this.user.latestWarfarinDosage);
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <ScreenLayout>
                <ControlHeader
                />
                <NextWeekPrescriptionInfo
                    lastWarfarinDosage={(this.user || {}).latestWarfarinDosage || []}
                    navigation={this.props.navigation}
                    refreshing={this.state.loading}
                />
            </ScreenLayout>
        );
    }
}



const ControlHeader = (props) => {
    const theme = useTheme();

    return (
        <Surface style={{elevation: 4}}>
            <TitleOnlyScreenHeader
                title="برنامه وارفارین"
                subtitle={'دوز تجویزشده برای هفته آینده'}
                style={{elevation: 0}}
            />
        </Surface>
    )
}

const NextWeekPrescriptionInfo = (props) => {
    const theme = useTheme();
    let dosageItems = props.lastWarfarinDosage.map((dosage, index) => {
        return (
            <_DosageCard
                key={`DosageCard_${dosage.id}_${dosage.dosageDate.timestamp}`}
                dosage={dosage}
                index={index}
                navigation={props.navigation}
            />
        )
    })


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1,
            }}
            contentContainerStyle={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 20,
            }}
            refreshControl={
                <RefreshControl
                    refreshing={props.refreshing}
                    onRefresh={noop}
                    colors={[theme.colors.primary]}
                    progressBackgroundColor={theme.colors.surface}
                />
            }
        >
            <EmptyList
                style={{
                }}
                hidden={(props.refreshing || (dosageItems.length > 0))}
                message={'تا کنون تجویزی از سوی پزشک برای شما صورت نگرفته است.'}
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {
                    dosageItems
                }
            </View>
        </ScrollView>
    )
    // return (
    //     <ItemListContainer
    //         refreshing={false && props.refreshing}
    //         onRefresh={noop}
    //     >
    //         {
    //             dosageItems
    //         }
    //     </ItemListContainer>
    // )
}

const _DosageCard = (props) => {

    const theme = useTheme();

    const dosageInMilliGrams = parseFloat(((props.dosage.dosagePH || 0)*1.25).toFixed(2)).toString()
    const numOfPills = parseFloat(((props.dosage.dosagePH || 0)/4).toFixed(2)).toString();

    const dosageDate = getFormattedJalaliDate(props.dosage.dosageDate.timestamp, 'DD MMMM');
    const dosageDayOfWeek = getPersianDayOfWeek(props.dosage.dosageDate.timestamp).fa;
    return (
        <Surface
            style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
                width: '47%',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                    <Card.Title
                        title={e2p(dosageDayOfWeek)}
                        subtitle={e2p(dosageDate) || ''}
                        style={{
                            flex: 1,
                        }}
                        titleStyle={{
                            fontSize: 18,
                        }}
                    />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Card.Title
                    title={e2p(numOfPills + ' ' + 'قرص')}
                    subtitle={e2p(dosageInMilliGrams + " " + "میلی‌گرم")}
                    style={{
                        flex: 1,
                        // flexGrow: 0,
                        // width: '60%',
                    }}
                    titleStyle={{
                        fontSize: 18,
                    }}
                    subtitleStyle={{
                        // fontSize: 14,
                    }}
                />
            </View>
        </Surface>
    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    dosageCardContainer: {},
    dosageCard: {},
});
