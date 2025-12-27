import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const mapContact = contact => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: uuidv4(),
    name: `${name.first} ${name.last}`,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5,
  };
};

export const fetchContacts = async () => {
  try {
    const response = await fetch(
      'https://randomuser.me/api/?results=20&nat=tr,us',
    );
    const contactData = await response.json();
    const mappedContacts = contactData.results.map(mapContact);

    // SENİN PROFİLİN (Dosya uzantısına dikkat: .jpeg)
    const myProfile = {
      id: 'my-profile-id', // Sabit bir ID verelim ki kolay bulalım
      name: 'Berk',
      avatar: require('./assets/Berk.jpeg'), // HATA BURADAYDI, DÜZELTİLDİ
      phone: '0555 555 55 55',
      cell: '0532 000 00 00',
      email: 'berk@gmail.com',
      favorite: true,
    };

    return [myProfile, ...mappedContacts];
  } catch (e) {
    // İnternet yoksa bile senin profilin gelsin
    return [
      {
        id: 'my-profile-id',
        name: 'Berk',
        avatar: require('./assets/Berk.jpeg'),
        phone: '0555 555 55 55',
        cell: '0532 000 00 00',
        email: 'berk@gmail.com',
        favorite: true,
      },
    ];
  }
};
