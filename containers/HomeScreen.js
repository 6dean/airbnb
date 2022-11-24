import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import styles from "../stylesheet";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/rooms`
    );
    setData(response.data);
  };

  // BOUCLE POUR LES ETOILES
  const renderingStars = (item) => {
    let stars = [];
    for (let index = 1; index < 6; index++) {
      if (index <= item) {
        stars.push(<Entypo name="star" size={24} color="orange" key={index} />);
      } else {
        stars.push(<Entypo name="star" size={24} color="grey" key={index} />);
      }
    }
    return stars;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.homePage}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            // ------- IMAGE BLOCK -------

            <View style={styles.blockApp}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Describe", { id: item._id });
                }}
              >
                <View>
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                      resizeMode: "cover",
                    }}
                    source={{
                      uri: item.photos[0].url,
                    }}
                  />
                  <Text style={styles.blockPriceHome}>{item.price} €</Text>
                </View>
              </TouchableOpacity>

              {/* ------- INFO BLOCK ------- */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Describe", { id: item._id });
                  }}
                >
                  <View style={{ width: 265 }}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.blockTitle}
                    >
                      {item.title}
                    </Text>
                    {/* <Text>{item.price}</Text> */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text>{renderingStars(item.ratingValue)}</Text>
                      <Text style={{ color: "grey" }}>
                        {item.reviews} Reviews
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* ------- AVATAR USER ------- */}

                <View>
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 50,
                      resizeMode: "cover",
                    }}
                    source={{
                      uri: item.user.account.photo.url,
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
