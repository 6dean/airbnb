import { useRoute } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import styles from "../stylesheet";
import { Text, View, Image, ActivityIndicator } from "react-native";
import axios from "axios";

export default function DescribeScreen() {
  const { params } = useRoute();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  //   console.log(data.photos[0].url);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  ) : (
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
          <View style={{ width: "65%" }}>
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
              <Text>{data.reviews} Reviews</Text>
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

        <Text ellipsizeMode="tail" numberOfLines={3} style={{ marginTop: 20 }}>
          {data.description}
        </Text>
      </View>
    </View>
  );
}
