import MapView from "react-native-maps";
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AroundMe() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/rooms/around`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const location = [];

  data.map((elem) =>
    location.push({
      id: elem._id,
      longitude: elem.location[0],
      latitude: elem.location[1],
      title: elem.title,
      description: elem.description,
    })
  );

  //   console.log("ici =>", location);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  ) : (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 48.8564263,
        longitude: 2.3525276,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {location.map((marker) => {
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
  );
}
