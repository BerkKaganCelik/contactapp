import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { fetchContacts } from '../api'; // src/api.js'den veriyi çek

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const contacts = await fetchContacts();
        // ID'si 'my-profile-id' olan kullanıcıyı (Berk'i) buluyoruz
        // Veya listenin ilk elemanını alıyoruz: contacts[0]
        const myProfile = contacts.find(c => c.name === 'Berk') || contacts[0];

        setUser(myProfile);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    loadUser();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, color: 'red' }}>Veri yüklenemedi!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Profil Resmi Alanı */}
        {user?.avatar ? (
          <Image source={user.avatar} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: 'grey' }]} />
        )}
        <Text style={styles.name}>{user?.name}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Telefon</Text>
          <Text style={styles.value}>{user?.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cep</Text>
          <Text style={styles.value}>{user?.cell}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  details: { padding: 20 },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  label: { fontWeight: 'bold', width: 80, color: '#666' },
  value: { flex: 1, fontSize: 16, color: '#333' },
});
