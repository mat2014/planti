import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DADOS_LISTA = [
  { id: '1', texto: 'Comprar novo substrato', concluido: true },
  { id: '2', texto: 'Verificar umidade da Hortelã', concluido: false },
  { id:- '3', texto: 'Colher a Cebolinha', concluido: false },
  { id: '4', texto: 'Pesquisar sobre adubos orgânicos', concluido: false },
];

const ItemDaLista = ({ texto, concluido }) => (
  <View style={styles.itemContainer}>
    <Ionicons 
      name={concluido ? 'checkbox' : 'square-outline'} 
      size={24} 
      color={concluido ? '#4CAF50' : '#ccc'} 
    />
    <Text style={[styles.itemText, concluido && styles.itemTextConcluido]}>
      {texto}
    </Text>
  </View>
);

const ListaScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Lista de Tarefas</Text>
        </View>
        
        <FlatList
          data={DADOS_LISTA}
          renderItem={({ item }) => <ItemDaLista texto={item.texto} concluido={item.concluido} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
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

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  itemTextConcluido: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default ListaScreen;