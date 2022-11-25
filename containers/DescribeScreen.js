import { useRoute } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import styles from "../stylesheet";
import MapView from "react-native-maps";
import { Text, View, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import Swiper from "react-native-swiper";

export default function DescribeScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const markers = [
  //   {
  //     id: 1,
  //     latitude: 48.8564263,
  //     longitude: 2.3525276,
  //     title: "Paris",
  //     description: "Hotel de Ville",
  //   },
  // ];

  const renderingStars = (review) => {
    let stars = [];
    for (let index = 1; index < 6; index++) {
      if (index <= review) {
        stars.push(<Entypo name="star" size={24} color="orange" key={index} />);
      } else {
        stars.push(<Entypo name="star" size={24} color="grey" key={index} />);
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
  }, [params.id]);

  // console.log(data);r

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  ) : (
    <View>
      <View style={{ height: 300 }}>
        <Swiper
          dotColor="salmon"
          activeDotColor="red"
          autoplay
          style={{ height: 300 }}
        >
          {data.photos.map((slide) => {
            return (
              <View
                style={{
                  width: "100%",
                  height: 300,
                  resizeMode: "cover",
                }}
                key={slide.picture_id}
              >
                <Image
                  source={{ uri: slide.url }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
            );
          })}
        </Swiper>
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
            style={{ height: 260, width: "100%" }}
            initialRegion={{
              latitude: data.location[1],
              longitude: data.location[0],
              latitudeDelta: 0.007,
              longitudeDelta: 0.007,
            }}
            showsUserLocation={true}
          >
            <MapView.Marker
              key={data._id}
              coordinate={{
                latitude: data.location[1],
                longitude: data.location[0],
              }}
              title={data.title}
              description={data.description}
            />
          </MapView>
        </View>
      </View>
    </View>
  );
}
