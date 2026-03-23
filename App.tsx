import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
export default function App() {
    // 1. Aqui entram as variáveis de estado (useState)

    // 2. Aqui entram as funções lógicas (adicionar, remover, favoritar)

    return (
        <View style={estilos.container}>
            {/* 3. Aqui entram os componentes visuais da tela (Inputs, Botões, Listas) */}
        </View>
    );
}

// Os estilos (CSS) ficam aqui embaixo
const estilos = StyleSheet.create({
    container: { flex: 1, padding: 20, marginTop: 40 },
});