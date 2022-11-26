import { TouchableOpacity, TextInput, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import styles from "../stylesheet";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ProfileUserScreen({ userToken, setToken, userID }) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateInfos = async () => {
    try {
      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update`,
        {
          email: email,
          username: username,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const userPicture = async () => {
    try {
      const tab = selectedPicture.split(".");

      const formData = new FormData();

      formData.append("photo", {
        uri: selectedPicture,
        name: `my-pic.${tab[1]}`,
        type: `image/${tab[1]}`,
      });
      console.log(formData);

      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();

      // setSelectedPicture(result.assets[0].uri);
      setSelectedPicture(result.uri);
    } else {
      console.log("Permission refusée");
    }
  };

  const getPermissionAndTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      // console.log(result.assets);

      setSelectedPicture(result.uri);
    } else {
      console.log("Permission refusée");
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            marginTop: 20,
            width: 180,
            height: 180,
            borderRadius: 90,
            borderColor: "#EB5A62",
            borderWidth: 2,
            resizeMode: "cover",
          }}
          source={
            !data.photo
              ? {
                  uri: selectedPicture,
                }
              : data.photo
          }
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 13,
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            getPermissionAndTakePhoto();
          }}
        >
          <MaterialIcons name="add-a-photo" size={40} color="grey" />
        </TouchableOpacity>
        <View style={{ marginLeft: 60 }}>
          <TouchableOpacity
            onPress={() => {
              getPermission();
            }}
          >
            <MaterialIcons name="photo-library" size={40} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerSign}>
        <TextInput
          style={styles.textInputSignUp}
          onChangeText={(email) => {
            setEmail(email);
          }}
        >
          {data.email}
        </TextInput>
        <TextInput
          style={styles.textInputSignUp}
          onChangeText={(username) => {
            setUsername(username);
          }}
        >
          {data.username}
        </TextInput>
        <TextInput
          multiline={true}
          textAlignVertical={"top"}
          numberOfLines={4}
          placeholder={description}
          style={styles.textInputDescription}
          onChangeText={(description) => {
            setDescription(description);
          }}
        >
          {data.description}
        </TextInput>
      </View>

      <View style={styles.containerButtonProfile}>
        <TouchableOpacity
          style={styles.button}
          title="Update"
          onPress={async () => {
            description && updateInfos();
            selectedPicture && userPicture();
          }}
        >
          <Text style={styles.buttonText}> Update</Text>
        </TouchableOpacity>
        <View style={styles.containerButtonProfile}>
          <TouchableOpacity
            style={styles.button}
            title="Log Out"
            onPress={() => {
              setToken(null);
            }}
          >
            <Text style={styles.buttonText}> Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
