import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, FlatList, Alert } from "react-native";
import { Header } from "../../components/Header";
import colors from "../../styles/colors";
import waterdrop from "../../assets/waterdrop.png";
import { PlantProps, loadPlants, removePlant } from "../../libs/storage";
import { formatDistance } from "date-fns/esm";
import { ptBR } from "date-fns/locale";
import fonts from "../../styles/fonts";
import { CardSecondary } from "../../components/Plant/CardSecondary";
import { Loader } from "../../components/Loader";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  async function loadStorageData() {
    const plants = await loadPlants();

    const nextTime = formatDistance(
      new Date(plants[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      { locale: ptBR }
    );

    setNextWaterd(
      `Não esqueça de regar a planta ${plants[0].name} -> ${nextTime}.`
    );

    setMyPlants(plants);
    setLoading(false);
  }

  function handleRemove(plant: PlantProps) {
    Alert.alert("Excluir", `Deseja excluir a planta ${plant.name}?`, [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim, excluir!",
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert(`Não foi possivel remover a planta ${plant.name} 😭`);
          }
        },
      },
    ]);
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image source={waterdrop} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardSecondary
              data={item}
              handleRemove={() => {
                handleRemove(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
