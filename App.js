import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MockServerGateway from "./src/service/server/MockServerGateway";

let server = new MockServerGateway();

export default function App() {
  let patient = server.fetchUserDataWithLogin(null, null);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start WHAT working on your app! {patient.fullName} BUDDY</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
