import React from "react";
import {rootDao} from "../../root/data/dao/RootDao";
import {ScreenLayout, TitleOnlyScreenHeader} from "../../root/view/screen/Layout";
import {Avatar, Card, Surface, Text, useTheme} from "react-native-paper";
import {e2p, noop} from "../../root/domain/util/Util";
import {StyleSheet, View, ScrollView} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {IntraSectionInvisibleDivider} from "../../doctor/view/patients/visit/first/forms/Layout";
import {debugBorderRed} from "../../root/view/styles/borders";


export default class WarfarinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: false,
        }
        this.user = null;
    }

    componentDidMount() {
        rootDao.getUser().then(user => {
            this.user = JSON.parse(JSON.stringify(user));
            this.setState({loaded: true});
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
                style={{elevation: 0}}
            />
        </Surface>
    )
}

const NextWeekPrescriptionInfo = (props) => {
    const dosageItems = props.lastWarfarinDosage.map((dosage, index) => {
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
            style={{
                flex: 1,
            }}
            contentContainerStyle={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                paddingHorizontal: 10,
            }}
        >
            {
                dosageItems
            }
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

    return (
        <Surface
            style={{
                marginVertical: 10,
                paddingVertical: 15,
                paddingHorizontal: 10,
                width: '45%',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // paddingVertical: 5,
                }}
            >
                    <Card.Title
                        title={e2p('۲۰ اردیبهشت')}
                        style={{
                            flex: 1,
                            // flexGrow: 0,
                            // width: '60%',
                        }}
                    />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 15,
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

