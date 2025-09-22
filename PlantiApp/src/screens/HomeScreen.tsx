import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AlertCard from '../components/AlertCard';
import PlantiCard from '../components/PlantiCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const defaultImg = require('../../assets/images/hortela.png');
const API_URL = 'http://192.168.15.3:3000';

const HomeScreen = () => {
  const [plants, setPlants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation(); // Hook para navegação

  const fetchPlants = async () => {
    try {
      const response = await fetch(`${API_URL}/plants`);
      if (!response.ok) throw new Error('A resposta da rede não foi boa.');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error("Falha ao buscar plantas na HomeScreen:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchPlants();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Olá, Usuário!</Text>
        <AlertCard />
        <Text style={styles.sectionTitle}>Plantis cadastradas</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }}/>
        ) : (
          plants.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma planta cadastrada para exibir.</Text>
          ) : (
            plants.map(plant => (
              <TouchableOpacity 
                key={plant.id} 
                onPress={() => navigation.navigate('PlantDetail', { plantData: plant })} // Navega e envia os dados da planta
              >
                <PlantiCard 
                  nome={plant.nome} 
                  local={plant.local} 
                  imagem={defaultImg}
                />
              </TouchableOpacity>
            ))
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ... (seus estilos permanecem os mesmos)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#F5F5F5' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 30, color: '#333' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
});


export default HomeScreen;