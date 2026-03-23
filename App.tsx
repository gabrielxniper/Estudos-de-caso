import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
export default function App() {
    // 1. Aqui entram as variáveis de estado (useState)
    type Tarefa = {
        id: string;
        texto: string;
        favorito: boolean;
    };
    const [userText, setUserText] = useState('');
    const [tarefas, setTarefas] = useState <Tarefa[]>([]);
    // 2. Aqui entram as funções lógicas (adicionar, remover, favoritar)

    function adicionarTarefa( ){
        if (userText.trim() === ''){
            return Alert.alert("Escreva algo para add")
        }
        const novaTarefa = {
            id: Date.now().toString(),
            texto: userText,
            favorito: false
        }
        setTarefas([...tarefas, novaTarefa]);
        setUserText('');
    }
    function favoritarTarefa(id: string) {
        const novasTarefas = tarefas.map((tarefa) => {
            // Se for a tarefa que clicamos, criamos uma cópia dela (...) invertendo o "favorito"
            if (tarefa.id === id) {
                let novoStatusFavorito;
                if (tarefa.favorito === false) {
                    novoStatusFavorito = true;
                } else {
                    novoStatusFavorito = false;
                }

                // Criamos a cópia da tarefa (...tarefaAtual) e atualizamos só o favorito
                return { ...tarefa, favorito: novoStatusFavorito };
            }
            // Se não for, devolvemos a tarefa do jeito que já estava
            return tarefa;
        });

        // Atualizamos o estado com a nova lista
        setTarefas(novasTarefas);
    }
    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Digite uma nova tarefa..."
                value={userText}
                onChangeText={setUserText}
            />
            <Button title="Adicionar" onPress={adicionarTarefa} />
            {/* 3. Aqui entram os componentes visuais da tela (Inputs, Botões, Listas) */}
            <FlatList
                data={tarefas}
                keyExtractor={(tarefa) => tarefa.id}
                
                renderItem={({ item }) => {
                    let favoritado;
                    if (item.favorito === true) {
                        favoritado = '⭐';
                    } else {
                        favoritado = '';
                    }
                    let textoBotao;
                    if (item.favorito === true) {
                        textoBotao = 'Desfavoritar';
                    } else {
                        textoBotao = 'Favoritar';
                    }
                    return(
                    <View style={estilos.tarefaItem}>
                        <Text style={estilos.tarefaTexto}>
                            {/* Se a tarefa for favorita, mostramos uma estrela */}
                            {item.texto} 
                            {favoritado}
                        </Text>

                        {/* Botão que chama a nossa função de favoritar passando o ID desta tarefa */}
                        <Button title= {textoBotao} onPress={() => favoritarTarefa(item.id)} />
                    </View>
                )}}
            />
        </View>
    );
}

// Os estilos (CSS) ficam aqui embaixo
const estilos = StyleSheet.create({
    container: { flex: 1, padding: 20, marginTop: 40 },
    tarefaItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eee', padding: 15, marginTop: 10, borderRadius: 5 },
    tarefaTexto: { fontSize: 16 },
});