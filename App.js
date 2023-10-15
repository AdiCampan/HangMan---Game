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
import { hangMan } from "./hangMan";
import lose from "./assets/lose.png";
import gameOver from "./assets/gameOver.png";
import ConfettiCannon from "react-native-confetti-cannon";
import winImage from "./assets/winner.png";

import { useEffect, useState } from "react";

export default function App() {
  const [alphabetButtons, setAlphabetButtons] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const [image, setImage] = useState(hangMan[0]);
  const [word, setWord] = useState("BICICLETA");
  const [secretWord, setSecretWord] = useState();
  const [separateLetters, setSeparateLetters] = useState([]);
  const [winner, setWinner] = useState(false);

  const gameOverFunction = () => {
    setImage(lose);
  };
  useEffect(() => {
    const winnerFind = secretWord?.every((letter) => letter.visible === true);
    if (winnerFind) {
      setWinner(true);
    }
  }, [secretWord]);

  useEffect(() => {
    setAlphabetButtons(alpfabet);
    setSeparateLetters(word.split(""));
  }, [word]);
  useEffect(() => {
    setImage(hangMan[imageIndex]);
  }, [imageIndex]);
  useEffect(() => {
    const toObjects = separateLetters.map((val, index) => {
      return { id: index, value: val, visible: false };
    });
    setSecretWord(toObjects);
  }, [word, separateLetters]);

  // every time when it pulse a letter, if isn't present, change the index of image//
  const changeNextImage = () => {
    if (imageIndex < hangMan.length - 2) {
      setImageIndex((previndex) => previndex + 1);
    } else {
      setImage(hangMan[6]);
      setTimeout(gameOverFunction, 1000);
      console.log("You lose !");
    }
  };

  const searchLetter = (letter) => {
    const filteredWord = secretWord.map((object) => {
      if (object.value === letter.value) {
        return { ...object, visible: true };
      } else {
        return object;
      }
    });
    const coincidence = secretWord.filter(
      (object) => object.value === letter.value
    );
    if (coincidence.length > 0) {
    } else {
      changeNextImage();
    }
    setSecretWord(filteredWord);

    const filterLetter = alphabetButtons.map((object) => {
      if (object.value === letter.value) {
        return { ...object, visible: false };
      } else {
        return object;
      }
    });
    setAlphabetButtons(filterLetter);
  };

  const reset = () => {
    setWinner(false);
    setSeparateLetters(word.split(""));
    setImageIndex(0);
    const filteredLeters = alphabetButtons.map((object) => {
      if (object.visible === false) {
        return { ...object, visible: true };
      } else {
        return object;
      }
    });
    setAlphabetButtons(filteredLeters);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HANG MAN - GAME</Text>
        </View>
      </SafeAreaView>
      <View style={styles.image}>
        <TouchableOpacity onPress={reset} style={styles.resetButton}>
          <Text style={{ fontSize: 12 }}> RESET </Text>
        </TouchableOpacity>
        {winner && (
          <Image
            style={{ width: "80%", height: "100%", resizeMode: "contain" }}
            source={winImage}
          />
        )}
        <Image
          style={{ width: "80%", height: "100%", resizeMode: "contain" }}
          source={image}
        />
      </View>

      <View style={styles.wordContainer}>
        {secretWord &&
          secretWord.map((letter, index) => (
            <View key={index} style={styles.letterBox}>
              <Text style={letter.visible ? styles.visible : styles.hide}>
                {letter.value}
              </Text>
            </View>
          ))}
      </View>
      <View style={styles.alphabetButtonsContainer}>
        {alphabetButtons &&
          alphabetButtons.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.alphabetButton}
              onPress={() => searchLetter(letter)}
            >
              <Text
                style={letter.visible ? styles.alphabetLetters : styles.hide}
              >
                {letter.value}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.footBarContainer}>
        <Text style={styles.footBar}>
          Create By Noelia & Adrian Campan 2023
        </Text>
      </View>
      {winner && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
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
  resetButton: {
    marginVertical: 20,
    backgroundColor: "paleturquoise",
    display: "flex",
    borderRadius: 30,
    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "grey",
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
  },
  image: {
    display: "flex",
    flexDirection: "row",
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
    fontSize: 30,
    fontWeight: "bold",
    display: "flex",
  },
  hide: {
    display: "none",
  },
  letterBox: {
    margin: 2,
    height: 45,

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
    width: 40,
    height: 40,
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
