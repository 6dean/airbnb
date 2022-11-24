import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AroundMe() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const getPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const geolocation = await Location.getCurrentPositionAsync();
        setLatitude(geolocation.coords.latitude);
        setLongitude(geolocation.coords.longitude);
      } else {
        alert("Permission refusée");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  getPermission();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/around`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPermission(), fetchData();
  }, []);

  const markers = [];

  data.map((elem) =>
    markers.push({
      id: elem._id,
      longitude: elem.location[0],
      latitude: elem.location[1],
      title: elem.title,
      description: elem.description,
    })
  );

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  ) : (
    <MapView
      style={{ flex: 1 }}
      //   provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
      }}
      showsUserLocation={true}
    >
      {markers.map((marker) => {
        return (
          <MapView.Marker
            onCalloutPress={() =>
              navigation.navigate("Describe", { id: marker.id })
            }
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
  );
}
