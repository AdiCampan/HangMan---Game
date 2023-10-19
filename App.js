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
import { words8 } from "./words8";
import audioWin from "./assets/audioWin.mp3";
// import Sound from "react-native-sound";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export default function App() {
  const [sound, setSound] = useState();
  const [alphabetButtons, setAlphabetButtons] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [word, setWord] = useState();
  const [secretWord, setSecretWord] = useState();
  const [tip, setTip] = useState();
  const [winner, setWinner] = useState(false);
  const randomWord = words8[Math.floor(Math.random() * words8.length)];

  async function play() {
    await Audio.Sound.createAsync(require("./assets/audioWin.mp3"), {
      shouldPlay: true,
    });
  }

  useEffect(() => {
    setWinner(false);
    setImage(hangMan[1]);
  }, []);
  const newGame = () => {
    setImageIndex(0);
    setWinner(false);
    setWord(randomWord);
    setTip();
  };

  const gameOverFunction = () => {
    setAlphabetButtons();
    setImage(lose);
    setTip();
  };
  useEffect(() => {
    const winnerFind =
      secretWord?.length > 0 &&
      secretWord.every((letter) => letter.visible === true);
    if (winnerFind) {
      play();
      setAlphabetButtons();
      setImage(null);
      setWinner(true);
    }
  }, [secretWord]);
  console.log("word", word);
  useEffect(() => {
    setAlphabetButtons(alpfabet);
    setSecretWord(
      word?.value
        .toUpperCase()
        .split("")
        .map((val, index) => {
          return { id: index, value: val, visible: false };
        })
    );
  }, [word]);
  useEffect(() => {
    setImage(hangMan[imageIndex]);
  }, [imageIndex, winner]);

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

  const showtip = () => {
    setTip(word.tip);
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
    setSecretWord(
      word?.value
        .toUpperCase()
        .split("")
        .map((val, index) => {
          return { id: index, value: val, visible: false };
        })
    );
    console.log("winner", winner);
    setImageIndex(0);
    const filteredLeters = alphabetButtons?.map((object) => {
      if (object.visible === false) {
        return { ...object, visible: true };
      } else {
        return object;
      }
    });
    setAlphabetButtons(filteredLeters);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HANG MAN - GAME</Text>
        </View>
      </SafeAreaView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={newGame} style={styles.newGameButton}>
          <Text style={styles.newGameText}>New Game</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.newGameButton}>
          <Text style={styles.newGameText}> RESET </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tipContainer}>
        <TouchableOpacity onPress={showtip} style={styles.tipButton}>
          <Text style={styles.newGameText}> EASY </Text>
        </TouchableOpacity>
        <Text style={styles.tip}> {tip}</Text>
      </View>
      <View style={styles.image}>
        {/* {winner && (
          <Image
            style={{ width: "80%", height: "100%", resizeMode: "contain" }}
            source={winImage}
          />
        )} */}
        <Image
          style={{
            width: "70%",
            height: "100%",
            resizeMode: "contain",
            marginLeft: 50,
          }}
          source={!winner ? image : winImage}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: "lightcyan",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  titleContainer: {
    width: 400,
    // width: "100%",
    padding: 4,
    alignItems: "center",
    backgroundColor: "lightsalmon",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  newGameButton: {
    margin: 5,
    height: 40,
    width: 100,
    backgroundColor: "#007bff", // Color de fondo del botón (azul en este caso)
    padding: 10, // Espaciado interior
    borderRadius: 15, // Borde redondeado para dar relieve
    elevation: 3, // Nivel de sombra (para Android)
    shadowColor: "rgba(0, 0, 0, 0.2)", // Color de la sombra (para iOS)
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (para iOS)
    shadowOpacity: 1, // Opacidad de la sombra (para iOS)
  },
  tipContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  tip: {
    fontSize: 25,
  },
  tipButton: {
    margin: 5,
    height: 40,
    width: 100,
    backgroundColor: "lawngreen", // Color de fondo del botón (azul en este caso)
    padding: 10, // Espaciado interior
    borderRadius: 15, // Borde redondeado para dar relieve
    elevation: 3, // Nivel de sombra (para Android)
    shadowColor: "rgba(0, 0, 0, 0.2)", // Color de la sombra (para iOS)
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra (para iOS)
    shadowOpacity: 1,
  },
  newGameText: {
    color: "white", // Color del texto
    textAlign: "center",
    fontWeight: "bold",
  },
  resetButton: {
    elevation: 3,
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

  visible: {
    textAlign: "center",
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
    justifyContent: "center",
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
