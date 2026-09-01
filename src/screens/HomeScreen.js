import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_FILMES = "@suruli:filmes";

export default function HomeScreen() {

    const [filme, setFilme] = useState("");
    const [filmes, setFilmes] = useState([]);
    const [filmeSorteado, setFilmeSorteado] = useState(null);

    // Carregar filmes salvos quando a tela abrir
    useEffect(() => {
        carregarFilmes();
    }, []);

    // Buscar os filmes no AsyncStorage
    async function carregarFilmes() {
        try {
            const filmesSalvos = await AsyncStorage.getItem(CHAVE_FILMES);

            if (filmesSalvos !== null) {
                setFilmes(JSON.parse(filmesSalvos));
            }
        } catch (erro) {
            console.log("Erro ao carregar filmes:", erro);
        }
    }

    // Salvar filmes no AsyncStorage
    async function salvarFilmes(novaLista) {
        try {
            await AsyncStorage.setItem(
                CHAVE_FILMES,
                JSON.stringify(novaLista)
            );
        } catch (erro) {
            console.log("Erro ao salvar filmes:", erro);
        }
    }

    // Adicionar um novo filme
    async function adicionarFilme() {

        if (filme.trim() === "") {
            Alert.alert(
                "Atenção",
                "Digite o nome de um filme."
            );
            return;
        }

        const novoFilme = {
            id: Date.now().toString(),
            titulo: filme.trim(),
        };

        const novaLista = [...filmes, novoFilme];

        setFilmes(novaLista);
        await salvarFilmes(novaLista);

        setFilme("");
    }

    // Remover filme
    async function removerFilme(id) {

        const novaLista = filmes.filter(
            (item) => item.id !== id
        );

        setFilmes(novaLista);
        await salvarFilmes(novaLista);

        // Se o filme removido era o sorteado,
        // limpamos o resultado.
        if (filmeSorteado?.id === id) {
            setFilmeSorteado(null);
        }
    }

    // Sortear um filme aleatoriamente
    function sortearFilme() {

        if (filmes.length === 0) {
            Alert.alert(
                "Nenhum filme",
                "Adicione pelo menos um filme para realizar o sorteio."
            );
            return;
        }

        const indiceAleatorio = Math.floor(
            Math.random() * filmes.length
        );

        const filmeEscolhido = filmes[indiceAleatorio];

        setFilmeSorteado(filmeEscolhido);
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={filmes}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <View>

                        {/* CABEÇALHO */}
                        <View style={styles.header}>
                            <Text style={styles.titulo}>
                                🎬 Suruli
                            </Text>

                            <Text style={styles.subtitulo}>
                                Seu cinema, suas escolhas.
                            </Text>
                        </View>

                        {/* ADICIONAR FILME */}
                        <View style={styles.secao}>

                            <Text style={styles.tituloSecao}>
                                Adicione um filme
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Digite o nome do filme..."
                                placeholderTextColor="#7890A5"
                                value={filme}
                                onChangeText={setFilme}
                                onSubmitEditing={adicionarFilme}
                            />

                            <TouchableOpacity
                                style={styles.botaoAdicionar}
                                onPress={adicionarFilme}
                            >
                                <Text style={styles.textoBotao}>
                                    + Adicionar filme
                                </Text>
                            </TouchableOpacity>

                        </View>

                        {/* SORTEIO */}
                        <View style={styles.sorteio}>

                            <Text style={styles.tituloSorteio}>
                                🎲 O que vamos assistir?
                            </Text>

                            <Text style={styles.textoSorteio}>
                                Deixe o Suruli decidir por você.
                            </Text>

                            <TouchableOpacity
                                style={styles.botaoSortear}
                                onPress={sortearFilme}
                            >
                                <Text style={styles.textoBotaoSortear}>
                                    SORTEAR FILME
                                </Text>
                            </TouchableOpacity>

                            {/* RESULTADO */}
                            {filmeSorteado && (
                                <View style={styles.resultado}>

                                    <Text style={styles.labelResultado}>
                                        Filme escolhido:
                                    </Text>

                                    <Text style={styles.nomeSorteado}>
                                        🎬 {filmeSorteado.titulo}
                                    </Text>

                                </View>
                            )}

                        </View>

                        {/* TÍTULO DA LISTA */}
                        <View style={styles.cabecalhoLista}>

                            <Text style={styles.tituloSecao}>
                                Meus filmes
                            </Text>

                            <Text style={styles.quantidade}>
                                {filmes.length}
                            </Text>

                        </View>

                    </View>
                }

                ListEmptyComponent={
                    <View style={styles.vazio}>

                        <Text style={styles.iconeVazio}>
                            🎞️
                        </Text>

                        <Text style={styles.textoVazio}>
                            Nenhum filme adicionado ainda.
                        </Text>

                        <Text style={styles.subtextoVazio}>
                            Adicione alguns filmes para começar!
                        </Text>

                    </View>
                }

                renderItem={({ item }) => (

                    <View style={styles.card}>

                        <View style={styles.infoFilme}>

                            <Text style={styles.iconeFilme}>
                                🎬
                            </Text>

                            <Text style={styles.nomeFilme}>
                                {item.titulo}
                            </Text>

                        </View>

                        <TouchableOpacity
                            onPress={() => removerFilme(item.id)}
                        >
                            <Text style={styles.botaoRemover}>
                                🗑️
                            </Text>
                        </TouchableOpacity>

                    </View>

                )}

                contentContainerStyle={styles.lista}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F7FAFE",
    },

    lista: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        marginBottom: 25,
        marginTop: 10,
    },

    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#004C94",
    },

    subtitulo: {
        fontSize: 15,
        color: "#7890A5",
        marginTop: 4,
    },

    secao: {
        backgroundColor: "#FFFFFF",
        padding: 18,
        borderRadius: 20,
        marginBottom: 20,

        shadowColor: "#004C94",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },

    tituloSecao: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#17324D",
        marginBottom: 12,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D9E3ED",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#17324D",
        backgroundColor: "#F7FAFE",
    },

    botaoAdicionar: {
        backgroundColor: "#004C94",
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    textoBotao: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    sorteio: {
        backgroundColor: "#EAF3FC",
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        alignItems: "center",
    },

    tituloSorteio: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#004C94",
    },

    textoSorteio: {
        color: "#7890A5",
        marginTop: 5,
        marginBottom: 15,
    },

    botaoSortear: {
        backgroundColor: "#004C94",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
    },

    textoBotaoSortear: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },

    resultado: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        borderRadius: 15,
        padding: 15,
        marginTop: 18,
        alignItems: "center",
    },

    labelResultado: {
        fontSize: 13,
        color: "#7890A5",
    },

    nomeSorteado: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#17324D",
        marginTop: 5,
        textAlign: "center",
    },

    cabecalhoLista: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    quantidade: {
        backgroundColor: "#004C94",
        color: "#FFFFFF",
        fontWeight: "bold",
        minWidth: 28,
        textAlign: "center",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 20,
        marginLeft: 8,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        shadowColor: "#004C94",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 2,
    },

    infoFilme: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    iconeFilme: {
        fontSize: 24,
        marginRight: 12,
    },

    nomeFilme: {
        fontSize: 16,
        fontWeight: "600",
        color: "#17324D",
        flex: 1,
    },

    botaoRemover: {
        fontSize: 20,
        padding: 5,
    },

    vazio: {
        alignItems: "center",
        paddingVertical: 30,
    },

    iconeVazio: {
        fontSize: 40,
        marginBottom: 10,
    },

    textoVazio: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#42566A",
    },

    subtextoVazio: {
        fontSize: 13,
        color: "#7890A5",
        marginTop: 5,
    },

});