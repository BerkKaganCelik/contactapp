// src/screens/Options.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

export default class Options extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ayarlar</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>Kapat X</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20 }}>Dil Seçimi</Text>
        <Text>Tema Rengi</Text>
        <Text>Çıkış Yap</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { padding: 10, backgroundColor: colors.greyLight, borderRadius: 5 },
  buttonText: { color: colors.blue },
});
