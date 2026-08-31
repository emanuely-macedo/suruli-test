import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const filmes = [
    {
        id: "1",
        titulo: "Interestelar",
        genero: "Ficção científica",
        nota: "8.7",
        imagem: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        descricao: "Uma emocionante viagem pelo espaço, pelo tempo e pela relação entre pai e filha."
    },
];

export default function MoviesListScreen() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View>
                    <Text style={styles.titulo}>Recomendações</Text>
                    <Text style={styles.subtitulo}>Filmes que você talvez goste de assistir! ✨</Text>
                </View>
            </View>

            {/* Lista de filmes */}
            <FlatList
                data={filmes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}

                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.imagem }} style={styles.imagem}/>
                        <View style={styles.informacoes}>
                            <View style={styles.tituloContainer}>
                                <Text style={styles.nome}>{item.titulo}</Text>
                            </View>
                            <Text style={styles.genero}>
                                {item.genero}
                            </Text>
                            <View style={styles.notaContainer}>
                                <Text style={styles.estrela}>★</Text>
                                <Text style={styles.nota}>{item.nota}</Text>
                            </View>
                            <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F7FAFE",
        padding: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },

    titulo: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#004C94",
    },

    subtitulo: {
        fontSize: 14,
        color: "#7890A5",
    },

    lista: {
        paddingHorizontal: 10,
        paddingBottom: 100,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingTop: 10,
        marginBottom: 500,
        overflow: "hidden",
        shadowColor: "#004C94",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },

    imagem: {
        width: 345,
        height: 570,
        resizeMode: "cover",
    },

    informacoes: {
        padding: 16,
    },

    tituloContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    nome: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        color: "#17324D",
    },

    genero: {
        fontSize: 13,
        color: "#7890A5",
        marginTop: 5,
    },

    notaContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    estrela: {
        fontSize: 17,
        color: "#F4B942",
        marginRight: 5,
    },

    nota: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#42566A",
    },

    descricao: {
        fontSize: 14,
        color: "#64788B",
        lineHeight: 20,
        marginTop: 10,
    },

});