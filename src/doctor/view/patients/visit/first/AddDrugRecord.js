import React, {useState} from "react";
import * as Layout from "./forms/Layout";
import * as MainLayout from '../../../../../root/view/layout/Layout';
import {Caption, Searchbar, Appbar, Portal, Text, List, TouchableRipple} from "react-native-paper";
import {View, ScrollView, FlatList, Animated} from 'react-native';
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {debugBorderRed} from "../../../../../root/view/styles/borders";
import {IntraSectionDivider} from "./forms/Layout";
import {DrugHistoryStageData} from "./Data";
import {drugDao} from "../../../../data/dao/DrugDao";


export class AddDrugRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            drugGroups: {},
        }
    }

    componentDidMount() {
    }


    updateDrugs = (drugGroups) => {
        this.setState({drugGroups: drugGroups});
    }

    searchDrugs = (query) => {
        drugDao.aggregateSearchByRouteOfAdmin(query)
            .then(drugs => {
                this.updateDrugs(drugs);
            })
            .catch(err => {
                // TODO
            })
    }
    render() {
        return (
            <Portal>
                <ScreenLayout
                >
                    <Wrapper
                    >
                        <SearchBox searchDrugs={this.searchDrugs}/>
                        <IntraSectionDivider none/>
                        <DrugList drugGroups={this.state.drugGroups}/>
                    </Wrapper>
                </ScreenLayout>
            </Portal>
        );
    }
}

const Wrapper = (props) => {return (
    <View
        style={{
            paddingVertical: 40,
            // paddingHorizontal: 10,
            borderBottomWidth: 0,
        }}
    >
        {props.children}
    </View>
)}

const SearchBox = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
        props.searchDrugs(query);
    }

    return (
        <Searchbar
            placeholder="Search Drugs"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{
                flexDirection: 'row-reverse',
                marginHorizontal: 0,
                paddingHorizontal: 0,
                borderWidth: 0,
                elevation: 0,
                // paddingVertical: 20,
            }}
            inputStyle={{
                textAlign: 'left',
                paddingVertical: 20,
            }}
        />
    );
};

const DrugList = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
        }).start();
    }, [props.drugGroups]);

    return (
            <Animated.ScrollView
                style={{
                    opacity: fadeAnim,
                    marginBottom: 30
                }}
            >
            {
                Object.entries(props.drugGroups)
                    .map( ([key, drugList]) => {
                        return (
                            <List.Section>
                                <List.Subheader style={styles.drugListTitle}>{key}</List.Subheader>
                                {
                                    drugList.map((drug, index) => {
                                        return (
                                            <DrugInfo
                                                id={drug.IDDrug}
                                                name={drug.DrugName}
                                                isLast={index == drugList.length-1}
                                                dosageForm={drug.DosageForm}
                                                strength={drug.Strengh}
                                            />
                                        )
                                    })
                                }
                            </List.Section>
                        )
                    })
            }
            </Animated.ScrollView>
    )
}

const DrugInfo = (props) => {
    // TODO Better View
    const DrugDescription = (_props) => {
        return (
            <Layout.Row justifyBetween style={{alignItems: 'center'}}>
                <View style={{}}><Caption>{props.dosageForm}</Caption></View>
                <View style={{}}><Caption>{props.strength}</Caption></View>
            </Layout.Row>
        )
    }
    return (
        <TouchableRipple onPress={() => {}} delayPressIn={ 100 }>
            <View key={`DrugSearch${props.id}`} style={{paddingHorizontal: 10}}>
                <List.Item
                    title={props.name} titleStyle={styles.drugListItem.title}
                    descriptionStyle={styles.drugListItem.title}
                    description={DrugDescription}
                />
                {
                    props.isLast ? null
                        : <IntraSectionDivider none style={{marginHorizontal: 5, marginTop: 5,}}/>
                }
            </View>
        </TouchableRipple>
    )
}
const styles = {
    drugListItem: {
        title: {
            textAlign: 'right',
        }
    },
    drugListTitle: {
        textAlign: 'right',
    }
}