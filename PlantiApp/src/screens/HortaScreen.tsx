import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import PlantiCard from '../components/PlantiCard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Imagem padrão para as plantas carregadas
const defaultImg = require('../../assets/images/hortela.png');

// --- ATENÇÃO AQUI ---
// Mude para o mesmo IP que você usou na tela de adicionar planta.
// Ex: 'http://192.168.15.3:3000'
const API_URL = 'http://192.168.15.3:3000';


const HortaScreen = () => {
  const navigation = useNavigation();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar as plantas do servidor
  const fetchPlants = async () => {
    try {
      const response = await fetch(`${API_URL}/plants`);
      if (!response.ok) {
        throw new Error('A resposta da rede não foi boa.');
      }
      const data = await response.json();
      setPlants(data); // Salva as plantas no estado
    } catch (error) {
      console.error("Falha ao buscar plantas:", error);
      Alert.alert('Erro de Conexão', 'Não foi possível carregar suas plantas.');
    } finally {
      setLoading(false); // Termina o carregamento
    }
  };

  // useFocusEffect é chamado toda vez que a tela é exibida
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Mostra o loading ao focar na tela
      fetchPlants();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Plantis cadastradas</Text>
        </View>

        {/* Exibe o indicador de carregamento */}
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 50 }}/>
        ) : (
          // Se não houver plantas, exibe uma mensagem
          plants.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma planta cadastrada ainda.</Text>
          ) : (
            // Mapeia a lista de plantas e exibe um PlantiCard para cada uma
            plants.map(plant => (
              <PlantiCard 
                key={plant.id} 
                nome={plant.nome} 
                local={plant.local} 
                imagem={defaultImg} // Usando uma imagem padrão
              />
            ))
          )
        )}
        
      </ScrollView>

      {/* Botão para adicionar nova planta */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddPlant')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  }
});

export default HortaScreen;