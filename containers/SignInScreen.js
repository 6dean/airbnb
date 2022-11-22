import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import styles from "../stylesheet";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <View style={styles.page}>
      {/* ======= LOGO AND TITLE ======= */}

      <View
        style={
          Platform.OS !== "android" ? styles.logoTitle : styles.logoTitleAndroid
        }
      >
        <FontAwesome5 name="airbnb" size={120} color="#EB5A62" />
        <Text style={{ fontSize: 20 }}>Sign in</Text>
      </View>
      {/* ======= EMAIL AND PASSWORD ======= */}

      <View style={styles.containerLog}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(pass) => {
            setPassword(pass);
          }}
        />

        <View
          style={
            error
              ? { alignItems: "center", marginTop: 30 }
              : { display: "none" }
          }
        >
          <Text style={{ color: "red" }}>Vos identifiants sont incorrects</Text>
        </View>

        {/* ======= SIGN AND REGISTER ======= */}

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            title="Sign in"
            onPress={async () => {
              try {
                if (!email || !password) {
                  setError(true);
                } else {
                  const response = await axios.post(
                    `https://express-airbnb-api.herokuapp.com/user/log_in`,
                    {
                      email: email,
                      password: password,
                    }
                  );
                  console.log(response);
                  const userToken = response.data.token;
                  setToken(userToken);
                  setError(false);
                }
              } catch (error) {
                error && setError(true);
              }
            }}
          >
            <Text style={styles.buttonText}> Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.underbutton}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
