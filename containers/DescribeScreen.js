import { useRoute } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import styles from "../stylesheet";
import MapView from "react-native-maps";
import { Text, View, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-web";

export default function DescribeScreen() {
  const { params } = useRoute();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const markers = [
    {
      id: 1,
      latitude: 48.8564263,
      longitude: 2.3525276,
      title: "Paris",
      description: "Hotel de Ville",
    },
  ];

  const renderingStars = (review) => {
    let stars = [];
    for (let index = 1; index < 6; index++) {
      if (index <= review) {
        stars.push(<Entypo name="star" size={24} color="orange" />);
      } else {
        stars.push(<Entypo name="star" size={24} color="grey" />);
      }
    }
    return stars;
  };

  const fetchData = async () => {
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  ) : (
    <View>
      <View>
        <Image
          style={{
            width: "100%",
            height: 280,
            resizeMode: "cover",
          }}
          source={{
            uri: data.photos[0].url,
          }}
        />
        <Text style={styles.blockPrice}>{data.price} €</Text>
      </View>

      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <View style={{ width: 265 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.blockTitle}
            >
              {data.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Text>{renderingStars(data.ratingValue)}</Text>
              <Text style={{ color: "grey" }}>{data.reviews} Reviews</Text>
            </View>
          </View>

          <View>
            <View>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
                source={{
                  uri: data.user.account.photo.url,
                }}
              />
            </View>
          </View>
        </View>

        <Text
          ellipsizeMode="tail"
          numberOfLines={3}
          style={{ marginTop: 20, padding: 4, width: 400 }}
        >
          {data.description}
        </Text>
        <View style={{ marginTop: 15 }}>
          <MapView
            style={{ height: 270, width: "100%" }}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006,
            }}
            showsUserLocation={true}
          >
            {markers.map((marker) => {
              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                  description={marker.description}
                />
              );
            })}
          </MapView>
        </View>
      </View>
    </View>
  );
}
