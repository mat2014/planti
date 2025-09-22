import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type PlantiCardProps = {
  nome: string;
  local: string;
  imagem: any;
};

const PlantiCard = ({ nome, local, imagem }: PlantiCardProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('PlantDetail', { plantName: nome });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={imagem} style={styles.imagem} />
      <View style={styles.textoContainer}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.local}>{local}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  textoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  local: {
    fontSize: 14,
    color: '#E8F5E9',
  },
});

export default PlantiCard;