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

import { fetchContacts } from '../api'; // src/api.js dosyasını çağırıyoruz

export default function Contacts({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchContacts();
        setContacts(data);
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
    // Resim kaynağını kontrol et (URL mi yoksa yerel dosya mı?)
    // Eğer 'http' ile başlıyorsa (API'den gelmiştir) uri: link şeklinde kullanılır.
    // Değilse (yerel dosyadır) doğrudan source={item.avatar} yapılır.
    // Ancak Image bileşeni akıllıdır, React Native'de genellikle doğrudan source'a verilebilir.

    // Ancak API'den gelen resimler string URL olduğu için { uri: ... } formatı gerekebilir.
    // Berk'in resmi ise 'require' ile geldiği için doğrudan sayıdır.
    const imageSource =
      typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar;

    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      >
        {item.avatar ? (
          <Image source={imageSource} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.phone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error)
    return (
      <View style={styles.center}>
        <Text>Hata oluştu.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={renderContact}
      />
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
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  textContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  description: { fontSize: 14, color: '#666' },
});
