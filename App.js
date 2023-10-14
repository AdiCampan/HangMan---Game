import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { alpfabet } from "./Alphabet";
import { secretWordBox } from "./scretWord";
import hangMan from "./assets/hangMan.png";
import { useEffect, useState } from "react";

export default function App() {
  const [word, setWord] = useState("BICICLETA");
  const [secretWord, setSecretWord] = useState();
  const [separateLetters, setSeparateLetters] = useState([]);
  const [wordIndex, setWordIndex] = useState();
  const [newFilteredWord, setNewFilteredWord] = useState();

  useEffect(() => {
    setSeparateLetters(word.split(""));
  }, [word]);

  useEffect(() => {
    const toObjects = separateLetters.map((val, index) => {
      return { id: index, value: val, visible: false };
    });
    setSecretWord(toObjects);
  }, [word, separateLetters]);

  console.log("secretWord", secretWord);

  const searchLetter = (letter) => {
    const filteredWord = secretWord.map((object) => {
      console.log(letter);
      if (object.value === letter) {
        return { ...object, visible: true };
      } else {
        return object;
      }
    });
    // for (let i = 0; i < secretWord.length; i++) {
    //   if (secretWord[i].value === letter) {
    //     secretWord[i].visible = true;
    //   }
    // }
    setNewFilteredWord(filteredWord);
  };
  console.log("newfilteredWord", newFilteredWord);
  // console.log("search letter", searchLetter("B"));

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HANG MAN - GAME</Text>
        </View>
      </SafeAreaView>
      <View style={styles.image}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={hangMan}
        />
      </View>

      <View style={styles.wordContainer}>
        {newFilteredWord &&
          newFilteredWord.map((letter, index) => (
            <View key={index} style={styles.letterBox}>
              <Text style={letter.visible ? styles.visible : styles.hide}>
                {letter.value}
              </Text>
            </View>
          ))}
      </View>
      <View style={styles.alphabetButtonsContainer}>
        {alpfabet.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.alphabetButton}
            onPress={() => searchLetter(letter.value)}
          >
            <Text style={styles.alphabetLetters}>{letter.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footBarContainer}>
        <Text style={styles.footBar}>
          Create By Noelia & Adrian Campan 2023
        </Text>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe4e1",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  titleContainer: {
    padding: 4,
    alignItems: "center",
    backgroundColor: "grey",
  },
  image: {
    width: "90%",
    height: 250,
  },
  wordContainer: {
    height: 40,
    display: "flex",
    flexDirection: "row",
  },
  secretWord: {
    marginHorizontal: 5,
    fontSize: 23,
  },
  visible: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  letterBox: {
    margin: 2,
    height: 55,

    width: 32,
    borderBottomWidth: 3,
    borderBottomColor: "blue",
  },
  alphabetButtonsContainer: {
    marginTop: 20,
    borderRadius: 10,
    width: 300,
    height: 250,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  alphabetButton: {
    backgroundColor: "paleturquoise",
    margin: 4,
    borderRadius: 15,
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "blue",
    width: 50,
    height: 45,
  },
  alphabetLetters: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  footBar: {
    fontSize: 10,
  },
  footBarContainer: {
    marginTop: 25,
  },
});
