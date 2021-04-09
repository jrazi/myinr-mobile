
import React from "react";
import {View, ScrollView, RefreshControl, StyleSheet} from "react-native";
import {EmptyList} from "./EmptyListMessage";
import {ScreenLayout} from "../screen/Layout";
import {useTheme} from "react-native-paper";
import {ConditionalRender} from "../../../doctor/view/patients/visit/first/forms/Layout";
import {hasValue} from "../../domain/util/Util";

export const ItemListContainer = ({loading, style, refreshing, onRefresh, refreshControlStyle, emptyListMessageEnabled=true, ...props}) => {
    const theme = useTheme();

    return (
        <ScrollView
            style={[styles.container, style]}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing || false}
                    onRefresh={onRefresh || (() => {})}
                    colors={[theme.colors.primary]}
                    progressBackgroundColor={theme.colors.surface}
                />
            }
        >
            <EmptyList
                hidden={(!emptyListMessageEnabled) || (refreshing || loading) || ( hasValue(props.children) && (props.children.length > 0) )}
                message={'رکوردی یافت نشد'}
            />
            {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
