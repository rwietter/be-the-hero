import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';

import api from '../../services/api/api';

import Logo from '../../assets/logo.png';
import styles from './styles';
import currency from '../../utils/currency';

export default function Details() {
  const [incidents_details, setIncidentsDetails] = useState([]);
  const navigationHistory = useNavigation();
  const routeParams = useRoute();
  const incident = routeParams.params.incident;

  const message = `Olá ${
    incident.name
  }, estou entrando em contato, pois gostaria ajudar no caso "${
    incident.title
  }" com o valor de ${currency(incident.value)}`;

  const detailsToIncidents = () => {
    navigationHistory.navigate('Incidents');
  };

  const sendMailMessage = () => {
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  };

  const sendWhatsappMessage = () => {
    Linking.openURL(
      `whatsapp://send?text=${message}&phone=+55${incident.whatsapp}`
    );
  };

  useEffect(() => {
    async function getDataAPI() {
      const response = await api.get('incidents');
      setIncidentsDetails(response.data);
    }
    getDataAPI();
  }, [incidents_details]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />
        <TouchableOpacity onPress={detailsToIncidents}>
          <Feather name="arrow-left" size={28} color={'#e02041'} />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text
          style={
            ([styles.inicidentProperty],
            { margin: 0, fontWeight: 'bold', fontSize: 16 })
          }
        >
          ONG:
        </Text>
        <Text style={styles.inicidentValue}>
          {incident.name} | {incident.city}-{incident.uf}
        </Text>

        <Text style={styles.inicidentProperty}>Caso: </Text>
        <Text style={styles.inicidentValue}>{incident.description}</Text>

        <Text style={styles.inicidentProperty}>Valor:</Text>
        <Text style={styles.inicidentValue}>{currency(incident.value)}</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi desse caso!</Text>
        <Text style={styles.heroDescription}>Entre em contato!</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsappMessage}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMailMessage}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
