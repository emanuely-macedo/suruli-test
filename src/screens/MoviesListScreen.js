import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const filmes = [
    {
        id: "1",
        titulo: "Interestelar",
        genero: "Ficção científica",
        nota: "8.7",
        imagem: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        descricao: "Uma equipe de astronautas atravessa um buraco de minhoca em busca de um novo lar para a humanidade."
    },
    {
        id: "2",
        titulo: "O Poderoso Chefão",
        genero: "Crime / Drama",
        nota: "9.2",
        imagem: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        descricao: "A história da família Corleone e de sua influência no mundo do crime organizado."
    },
    {
        id: "3",
        titulo: "O Senhor dos Anéis: O Retorno do Rei",
        genero: "Fantasia / Aventura",
        nota: "9.0",
        imagem: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        descricao: "A batalha final pela Terra-média se aproxima enquanto Frodo e Sam tentam destruir o Um Anel."
    },
    {
        id: "4",
        titulo: "Titanic",
        genero: "Romance / Drama",
        nota: "7.9",
        imagem: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        descricao: "Um romance nasce durante a viagem do lendário navio Titanic."
    },
    {
        id: "5",
        titulo: "Matrix",
        genero: "Ficção científica / Ação",
        nota: "8.2",
        imagem: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        descricao: "Um programador descobre que a realidade como conhece é uma elaborada simulação."
    },
    {
        id: "6",
        titulo: "Vingadores: Ultimato",
        genero: "Ação / Ficção científica",
        nota: "8.2",
        imagem: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        descricao: "Os Vingadores enfrentam as consequências da batalha contra Thanos e tentam salvar o universo."
    },
    {
        id: "7",
        titulo: "Forrest Gump",
        genero: "Drama / Romance",
        nota: "8.8",
        imagem: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        descricao: "A vida extraordinária de Forrest Gump atravessa diversos momentos importantes da história dos Estados Unidos."
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
        fontSize: 20,
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
        width: "100%",
        height: 160,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#004c94",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },

    imagem: {
        width: 85,
        height: 125,
        borderRadius: 10,
        resizeMode: "cover",
    },

    informacoes: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },

    tituloContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    nome: {
        flexShrink: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: "#17324D",
    },

    genero: {
        fontSize: 12,
        color: "#7890A5",
        marginTop: 5,
    },

    notaContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    estrela: {
        fontSize: 15,
        color: "#F4B942",
        marginRight: 3,
    },

    nota: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#42566A",
    },

    descricao: {
        flexShrink: 1, 
        fontSize: 12,
        color: "#64788B",
        lineHeight: 20,
        marginTop: 10,
    },

});