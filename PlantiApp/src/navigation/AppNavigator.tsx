import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import HortaScreen from '../screens/HortaScreen';
import ListaScreen from '../screens/ListaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import AddPlantScreen from '../screens/AddPlantScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',

        tabBarPressColor: 'transparent',
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },

        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },

        tabBarLabelStyle: {
          fontSize: 10,
          textTransform: 'none',
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Início') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Horta') iconName = focused ? 'leaf' : 'leaf-outline';
          else if (route.name === 'Lista') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Horta" component={HortaScreen} />
      <Tab.Screen name="Lista" component={ListaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PlantDetail" 
        component={PlantDetailScreen}
        options={{ 
          title: 'Detalhes da Planta',
          headerBackTitle: 'Voltar',
        }}
      />
      <Stack.Screen 
        name="AddPlant" 
        component={AddPlantScreen}
        options={{ 
          title: 'Adicionar Planta',
          headerBackTitle: 'Voltar',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;