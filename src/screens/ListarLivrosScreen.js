import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Button, Modal } from 'react-native';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../services/firebase';
import ModalButtons from '../components/ModalButtons'; 
import { useNavigation } from '@react-navigation/native';

const ListarLivrosScreen = () => {
    const navigation = useNavigation();
    const [livros, setLivros] = useState([]);
    const [filtroGeral, setFiltroGeral] = useState('');
    const [livroSelecionado, setLivroSelecionado] = useState(null);

    useEffect(() => {
        carregarLivros();
    }, []);

    const carregarLivros = () => {
        const livrosRef = ref(database, 'book');

        onValue(livrosRef, (snapshot) => {
            const data = snapshot.val();
            const livrosArray = data ? Object.values(data) : [];
            setLivros(livrosArray);
        });
    };

    const filtrarLivros = () => {
        const filtroMinusculo = filtroGeral.toLowerCase();

        const livrosFiltrados = livros.filter((livro) => {
            const tituloMinusculo = livro.titulo.toLowerCase();
            const autorMinusculo = livro.autor.toLowerCase();
            const generoMinusculo = livro.genero.toLowerCase();

            return (
                tituloMinusculo.includes(filtroMinusculo) ||
                autorMinusculo.includes(filtroMinusculo) ||
                generoMinusculo.includes(filtroMinusculo)
            );
        });

        setLivros(livrosFiltrados);
    };

    const handleAbrirModal = (livro) => {
        setLivroSelecionado(livro);
    };

    const handleFecharModal = () => {
        setLivroSelecionado(null);
    };

    const handleExcluirLivro = async () => {
        if (livroSelecionado) {
            await remove(ref(database, `book/${livroSelecionado.titulo}`));
            handleFecharModal()
            carregarLivros();
        }
    };

    const handleAtualizarLivro = () => {
        navigation.navigate('Atualizar Livro', { livro: livroSelecionado });
        handleFecharModal();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Livros</Text>

            <View style={styles.filtrosContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por Título, Autor ou Gênero"
                    value={filtroGeral}
                    onChangeText={(text) => setFiltroGeral(text)}
                />
                <Button title="Buscar" onPress={filtrarLivros} />
                <View style={styles.separator}></View>
                <Button title="Limpar" onPress={carregarLivros} />
            </View>

            <FlatList
                data={livros}
                keyExtractor={(item) => item.titulo}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => handleAbrirModal(item)}>
                        <Text style={styles.itemTitulo}>{item.titulo}</Text>
                        <Text style={styles.itemDetalhes}>{`Autor: ${item.autor}, Ano: ${item.ano}, Gênero: ${item.genero}`}</Text>
                    </TouchableOpacity>
                )}
            />

            <Modal
                transparent={true}
                animationType="slide"
                visible={livroSelecionado !== null}
                onRequestClose={handleFecharModal}
            >
                <View style={styles.modalContainer}>
                    <ModalButtons
                        onExcluir={handleExcluirLivro}
                        onAtualizar={handleAtualizarLivro}
                        onFechar={handleFecharModal}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    filtrosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        marginRight: 8,
    },
    separator: {
        width: 5,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
    },
    itemTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDetalhes: {
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default ListarLivrosScreen;
