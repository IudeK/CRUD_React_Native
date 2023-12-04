
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ref, update } from 'firebase/database';
import { database } from '../services/firebase';

const AtualizarLivroScreen = ({ route, navigation }) => {
  const { livro } = route.params;
  const [titulo, setTitulo] = useState(livro.titulo);
  const [autor, setAutor] = useState(livro.autor);
  const [ano, setAno] = useState(livro.ano);
  const [genero, setGenero] = useState(livro.genero);

  const generosDisponiveis = [
    'Fantasia',
    'Ficção científica',
    'Distopia',
    'Ação e aventura',
    'Ficção Policial',
    'Horror',
    'Thriller e Suspense',
    'Ficção histórica',
    'Romance',
    'Novela',
    'Religião e Espiritualidade',
    'Humanidades e Ciências Sociais',
    'Infantil',
  ];

  const handleAtualizarLivro = () => {
    if (!titulo || !autor || !ano || !genero) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const livroAtualizado = {
      ...livro,
      titulo,
      autor,
      ano,
      genero,
    };

    update(ref(database, 'book/' + livro.titulo), livroAtualizado).then(() => {
      alert('Livro atualizado!');
      navigation.goBack();
    });
  };

  const handleYearChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const truncatedValue = numericValue.slice(0, 4);
    setAno(truncatedValue);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Livro</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título do Livro:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o título"
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
          editable={false} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Autor do Livro:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira o autor"
          value={autor}
          onChangeText={(text) => setAutor(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ano do Livro:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ano"
          value={ano}
          onChangeText={handleYearChange}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Selecionar Gênero:</Text>
        <Picker
          style={styles.picker}
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
        >
          <Picker.Item label="Selecione um gênero" value="" />
          {generosDisponiveis.map((genero) => (
            <Picker.Item key={genero} label={genero} value={genero} />
          ))}
        </Picker>
      </View>

      <Button title="Atualizar Livro" onPress={handleAtualizarLivro} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    inputContainer: {
      marginBottom: 16,
      width: '80%',
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 8,
    },
    dateInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 8,
    },
    pickerContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 4,
      overflow: 'hidden',
    },
    picker: {
      height: 40,
      width: '100%',
    },
  });

export default AtualizarLivroScreen;
