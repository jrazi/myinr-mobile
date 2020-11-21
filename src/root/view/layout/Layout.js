import React from "react";
import {StyleSheet, View} from "react-native";
import {Containers, Theme} from "../styles";

export const Layout = (props) => {return (
    <View style={styles.container}>
        {props.children}
    </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Containers.fullSize,
        ...Theme.bgDefault
    },
});