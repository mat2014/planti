import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Alertas</Text>
      <Text style={styles.alertText}>• A cebolinha já pode ser colhida</Text>
      <Text style={styles.alertText}>• Hortelã hidratada automaticamente às 10h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default AlertCard;