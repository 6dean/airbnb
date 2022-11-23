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
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(false);

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
            setConfirm(pass);
          }}
        />

        {/* ======= SIGNUP AND REGISTER ======= */}

        <View style={styles.containerButtonSignUp}>
          <Text
            style={
              error
                ? { color: "red", marginBottom: 20, fontSize: 13 }
                : { display: "none" }
            }
          >
            This email already has an account.
          </Text>
          <TouchableOpacity
            style={styles.button}
            title="Sign in"
            onPress={async () => {
              try {
                if (!email || !password) {
                  alert`You need to complete form !`;
                  return null;
                }
                if (password !== confirm) {
                  alert`Your passwords are not identical !`;
                  return null;
                } else {
                  const response = await axios.post(
                    `https://express-airbnb-api.herokuapp.com/user/sign_up`,
                    {
                      email: email,
                      username: username,
                      description: description,
                      password: password,
                    }
                  );
                  const userToken = response.data.token;
                  setToken(userToken);
                }
              } catch (error) {
                error.response.data?.error ===
                "This username already has an account."
                  ? setError(true)
                  : null;
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
