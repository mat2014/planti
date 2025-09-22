import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

// URL do seu servidor. Mude se necessário.
// Para emulador Android, use: 'http://10.0.2.2:3000'
// Para simulador iOS, use: 'http://localhost:3000'
const API_URL = 'http://192.168.15.3:3000';

const AddPlantScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // Validação para não enviar campos vazios
    if (!nome.trim() || !local.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Ativa o indicador de carregamento

    try {
      // Envia uma requisição POST para o servidor com os dados da planta
      const response = await fetch(`${API_URL}/plants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, local }),
      });

      // Se a resposta do servidor não for "ok", lança um erro
      if (!response.ok) {
        throw new Error('Falha ao salvar a planta no servidor.');
      }

      // Se deu tudo certo, mostra um alerta de sucesso
      Alert.alert('Sucesso!', `Planta "${nome}" salva com sucesso.`, [
        { text: 'OK', onPress: () => navigation.goBack() } // Volta para a tela anterior
      ]);

    } catch (error) {
      console.error(error);
      Alert.alert('Erro de Conexão', 'Não foi possível se comunicar com o servidor.');
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Planta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da planta (ex: Manjericão)"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Local (ex: Varanda)"
        placeholderTextColor="#999"
        value={local}
        onChangeText={setLocal}
      />

      {/* Botão de Salvar, que mostra um indicador de loading */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar Planta</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPlantScreen;