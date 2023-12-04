// ModalButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ModalButtons = ({ onExcluir, onAtualizar, onFechar }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onExcluir}>
        <Text style={styles.buttonText}>Excluir Livro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onAtualizar}>
        <Text style={styles.buttonText}>Atualizar Livro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onFechar}>
        <Text style={styles.buttonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ModalButtons;
