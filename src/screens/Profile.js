import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Profile({ route }) {
  // Contacts sayfasından gelen veriyi alıyoruz
  const { contact } = route.params || {};

  if (!contact) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Kullanıcı verisi bulunamadı.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {contact.avatar ? (
          <Image source={contact.avatar} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <Text style={{ fontSize: 40, color: 'white' }}>
              {contact.name[0]}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{contact.name}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{contact.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Telefon</Text>
          <Text style={styles.value}>{contact.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cep</Text>
          <Text style={styles.value}>{contact.cell}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  details: { padding: 20 },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  label: { fontWeight: 'bold', width: 80, color: '#666' },
  value: { flex: 1, fontSize: 16, color: '#333' },
});
