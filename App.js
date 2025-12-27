// App.js
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Ekranlar
import Contacts from './src/screens/Contacts';
import Favorites from './src/screens/Favorites';
import User from './src/screens/User';
import Profile from './src/screens/Profile';
import Options from './src/screens/Options';
import colors from './src/utils/colors';

// Yığınlar (Stacks) Oluşturuluyor
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Kişiler Yığını (Contacts -> Profile)
function ContactsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.blue },
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: 'Kişiler' }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          title: route.params.contact.name.split(' ')[0],
        })}
      />
    </Stack.Navigator>
  );
}

// 2. Favoriler Yığını (Favorites -> Profile)
function FavoritesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.blue },
      }}
    >
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: 'Favoriler' }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profil' }}
      />
    </Stack.Navigator>
  );
}

// 3. Kullanıcı Yığını (User -> Options)
function UserStack() {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.blue },
      }}
    >
      <Stack.Screen
        name="User"
        component={User}
        options={({ navigation }) => ({
          title: 'Ben',
          headerRight: () => (
            <Text
              onPress={() => navigation.navigate('Options')}
              style={{ color: 'white', marginRight: 15, fontWeight: 'bold' }}
            >
              Ayarlar
            </Text>
          ),
        })}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{ presentation: 'modal', title: 'Seçenekler' }}
      />
    </Stack.Navigator>
  );
}

// Ana Uygulama (Tab Menü)
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Stack header'larını kullanacağımız için Tab header'ını gizle
          tabBarActiveTintColor: colors.blue,
          tabBarInactiveTintColor: colors.greyDark,
          // İkon mantığı (Basit text olarak, kütüphane kurmana gerek kalmasın diye)
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'ContactsTab') iconName = '👥';
            else if (route.name === 'FavoritesTab') iconName = '⭐';
            else if (route.name === 'UserTab') iconName = '👤';
            return <Text style={{ fontSize: 24 }}>{iconName}</Text>;
          },
        })}
      >
        <Tab.Screen
          name="ContactsTab"
          component={ContactsStack}
          options={{ title: 'Kişiler' }}
        />
        <Tab.Screen
          name="FavoritesTab"
          component={FavoritesStack}
          options={{ title: 'Favoriler' }}
        />
        <Tab.Screen
          name="UserTab"
          component={UserStack}
          options={{ title: 'Ben' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
