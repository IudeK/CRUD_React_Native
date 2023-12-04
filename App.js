// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AdicionarLivroScreen  from './src/screens/AdicionarLivroScreen '
import ListarLivrosScreen from './src/screens/ListarLivrosScreen';
import AtualizarLivroScreen from './src/screens/AtualizarLivroScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Adicionar Livro" component={AdicionarLivroScreen} />
        <Stack.Screen name="Listar Livros" component={ListarLivrosScreen} />
        <Stack.Screen name="Atualizar Livro" component={AtualizarLivroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
