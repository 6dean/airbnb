import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
import styles from "../stylesheet";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";

export default function DescribeScreen() {
  const { params } = useRoute();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <View>
      <Text>CHARGEMENT</Text>
    </View>
  ) : (
    <View>
      <Image
        style={{
          width: "100%",
          height: 300,
          resizeMode: "cover",
        }}
        source={{
          uri: data.photos[0].url,
        }}
      />
      <Text>{data.title}</Text>
      <Text>{data.description}</Text>
    </View>
  );
}
