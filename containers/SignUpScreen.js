import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import styles from "../stylesheet";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.page}>
      {/* ======= LOGO AND TITLE ======= */}

      <View
        style={
          Platform.OS !== "android"
            ? styles.logoTitleSignUpiOs
            : styles.logoTitleSignUpAndroid
        }
      >
        <FontAwesome5
          name="airbnb"
          size={Platform.OS !== "android" ? 120 : 70}
          color="#EB5A62"
        />
        <Text style={{ fontSize: 20 }}>Sign up</Text>
      </View>
      {/* ======= EMAIL, USERNAME, DESCRIPTION & PASSWORD ======= */}

      <View style={styles.containerSign}>
        <TextInput
          style={styles.textInputSignUp}
          placeholder="Email"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <TextInput
          style={styles.textInputSignUp}
          placeholder="Username"
          onChangeText={(username) => {
            setUsername(username);
          }}
        />
        <TextInput
          multiline={true}
          textAlignVertical={"top"}
          numberOfLines={4}
          style={styles.textInputDescription}
          placeholder="Description"
          onChangeText={(description) => {
            setDescription(description);
          }}
        />

        <TextInput
          style={styles.textInputSignUp}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(pass) => {
            setPassword(pass);
          }}
        />

        <TextInput
          style={styles.textInputSignUp}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(pass) => {
            setPassword(pass);
          }}
        />

        {/* ======= SIGNUP AND REGISTER ======= */}

        <View style={styles.containerButtonSignUp}>
          <TouchableOpacity
            style={styles.button}
            title="Sign in"
            onPress={async () => {
              try {
                if (!email || !password) {
                  alert`Informations incomplètes`;
                } else {
                  const formData = new FormData();
                  formData.append("email", email);
                  formData.append("username", username);
                  formData.append("description", description);
                  formData.append("password", password);

                  console.log(username);

                  const response = await axios.post(
                    `https://express-airbnb-api.herokuapp.com/user/sign_up`,
                    formData
                  );
                  console.log(response.data);
                  const userToken = response.data.token;
                  setToken(userToken);
                }
              } catch (error) {
                console.log(error.response);
              }
            }}
          >
            <Text style={styles.buttonText}> Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.underbutton}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
