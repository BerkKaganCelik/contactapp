// src/components/ContactListItem.js
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import colors from '../utils/colors';

export default function ContactListItem({ name, avatar, phone, onPress }) {
  // EĞER avatar bir yazıysa (https://...) URI kullan, yoksa direkt dosyayı kullan
  const imageSource = typeof avatar === 'string' ? { uri: avatar } : avatar;

  return (
    <TouchableHighlight
      underlayColor={colors.greyLight}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.contactInfo}>
        <Image source={imageSource} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: { paddingLeft: 24 },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: { borderRadius: 22, width: 44, height: 44 },
  details: { justifyContent: 'center', flex: 1, marginLeft: 20 },
  title: { color: colors.black, fontWeight: 'bold', fontSize: 16 },
  subtitle: { color: colors.blue, fontSize: 15, marginTop: 4 },
});
