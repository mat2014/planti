import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DetailRow from '../components/DetailRow'; // Supondo que você tenha este componente

// 1. Perfis específicos para plantas conhecidas
const SPECIFIC_PLANT_DATA = {
  'Hortelã': {
    imagem: require('../../assets/images/hortela.png'),
    frequencia: 'Automática (ajustada pelos sensores)',
    agua: 'Última irrigação: 150 ml',
    temperatura: 'Ideal mantida em 22 °C',
    luz: 'Recebendo 6h de luz indireta',
  },
  'Cebolinha': {
    imagem: require('../../assets/images/cebolinha.png'),
    frequencia: 'Automática (ajustada pelos sensores)',
    agua: 'Última irrigação: 120 ml',
    temperatura: 'Ideal mantida em 20 °C',
    luz: 'Recebendo 8h de luz indireta',
  },
};

// 2. Perfil Padrão para qualquer nova planta cadastrada
const DEFAULT_PLANT_PROFILE = {
    imagem: require('../../assets/images/hortela.png'), // Usamos uma imagem padrão
    frequencia: 'Ainda não monitorado',
    agua: 'Ainda não monitorado',
    temperatura: 'Ainda não monitorado',
    luz: 'Ainda não monitorado',
};

const PlantDetailScreen = ({ route }) => {
  // Recebe o nome da planta que foi clicada
  const { plantName } = route.params;

  // 3. Lógica principal:
  // Tenta encontrar um perfil específico. Se não encontrar, usa o perfil padrão.
  const plantData = SPECIFIC_PLANT_DATA[plantName] || DEFAULT_PLANT_PROFILE;

  // O componente para exibir cada linha de detalhe
  const DetailRowComponent = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.plantTitle}>{plantName}</Text>
                <Ionicons name="heart-outline" size={28} color="#333" />
            </View>

            <View style={styles.imageContainer}>
                <Image source={plantData.imagem} style={styles.headerImage} />
            </View>
            
            <DetailRowComponent label="Frequência" value={plantData.frequencia} />
            <DetailRowComponent label="Água" value={plantData.agua} />
            <DetailRowComponent label="Temperatura" value={plantData.temperatura} />
            <DetailRowComponent label="Luz" value={plantData.luz} />

            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Ver histórico da planta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Configurar preferências</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
};

// Seus estilos permanecem os mesmos
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F4F0',
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    plantTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 6,
    },
    headerImage: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    detailLabel: {
        backgroundColor: '#E6F2E6',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#333',
        flex: 1,
        textAlign: 'center',
        marginRight: 10,
    },
    detailValue: {
        backgroundColor: '#D9EAD3',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        flex: 2,
        textAlign: 'center',
    },
    actionButton: {
        backgroundColor: '#38761D', 
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PlantDetailScreen;