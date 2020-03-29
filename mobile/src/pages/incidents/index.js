import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import Logo from '../../assets/logo.png';
import styles from './styles';
import currencyBRL from '../../utils/currency';

import api from '../../services/api/api';

export default function Incidents() {
  const navigationHistory = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total_incidents, setTotalIncidents] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDeatils(incident) {
    navigationHistory.navigate('Details', { incident });
  }

  const loadIncidents = async () => {
    if (loading) {
      return;
    }
    if (total_incidents > 0 && incidents.length === total_incidents) {
      return;
    }
    setLoading(true);
    const response = await api.get('incidents', {
      params: {
        page,
      },
    });
    setIncidents([...incidents, ...response.data]);
    setTotalIncidents(response.headers['k-total-count']);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, [incidents]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} />
        <Text style={styles.headerText}>
          Total de
          <Text style={styles.headerTextBold}> {total_incidents} casos.</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentsList}
        keyExtractor={(incident) => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={(0, 2)}
        showsVerticalScrollIndicator={true}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.inicidentProperty}>ONG:</Text>
            <Text style={styles.inicidentValue}>{incident.name}</Text>

            <Text style={styles.inicidentProperty}>Caso:</Text>
            <Text style={styles.inicidentValue}>{incident.title}</Text>

            <Text style={styles.inicidentProperty}>Valor:</Text>
            <Text style={styles.inicidentValue}>
              {currencyBRL(incident.value)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDeatils(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color={'#e02041'} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
