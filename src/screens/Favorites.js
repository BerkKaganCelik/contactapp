import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import { fetchContacts } from '../api';

export default function Favorites({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchContacts();
        // Sadece favori olanları filtreliyoruz
        setContacts(data.filter(c => c.favorite));
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    }
    loadData();
  }, []);

  const renderContact = ({ item }) => {
    const imageSource =
      typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar;

    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      >
        <Image source={imageSource} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <View style={styles.container}>
      {contacts.length === 0 && !loading ? (
        <View style={styles.center}>
          <Text>Favori kişi yok.</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={renderContact}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { fontSize: 14, color: '#666' },
});
