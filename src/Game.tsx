import { useEffect, useRef, useState } from "react";
import dogs from "./dogs";
import GifLoading from "./assets/load-loading.gif";
import ButtonDisabled from "./components/ButtonDisabled";
import AnswerMessage from "./components/AnswerMessage";
import ResetButton from "./components/ResetButton";

const scoreStorage = localStorage.getItem("score");
const errorsStorage = localStorage.getItem("errors");
const levelStorage = localStorage.getItem("level");

function Game() {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(scoreStorage ? +scoreStorage : 0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [errors, setErrors] = useState(errorsStorage ? +errorsStorage : 0);
  // const ref = useRef(0);
  const [message, setMessage] = useState<"c" | "e" | "">("");

  const fetchDogImage = async () => {
    setLoading(true);
    let response;
    let data;
    while (true) {
      try {
        response = await fetch("https://dog.ceo/api/breeds/image/random");
        data = await response.json();
        if (data.status !== "success") {
          continue;
        }
        break;
      } catch (error) {
        console.log(error);
      }
    }
    if (data.status !== "success") {
      return;
    }
    setDogImage(data.message);
    const url = data.message;
    let breedKey = url.match(/breeds\/(.+?)\//)[1];
    breedKey = breedKey.replace("-", "_");
    const breed = dogs[breedKey];
    setAnswer(breed);
    const dogsArray = Object.values(dogs);
    const optionsBreeds: string[] = [];
    while (true) {
      const randomIndex = Math.floor(Math.random() * dogsArray.length);
      const randomBreed = dogsArray[randomIndex] as string;
      if (randomBreed === breed || optionsBreeds.includes(randomBreed)) {
        continue;
      }
      optionsBreeds.push(randomBreed);
      if (optionsBreeds.length === 2) {
        break;
      }
    }
    optionsBreeds.push(breed);
    optionsBreeds.sort(() => Math.random() - 0.5);
    setOptions(optionsBreeds);
    console.log(optionsBreeds);
    setLoading(false);
  };

  useEffect(() => {
    // if (ref.current === 0) {
    //   ref.current = 1;
    //   return;
    // }
    fetchDogImage();
  }, []);

  const handleAnswer = (selected: string) => {
    selected === answer ? setMessage("c") : setMessage("e");
    setTimeout(() => {
      if (selected === answer) {
        setScore((prev) => prev + 1);
        localStorage.setItem("score", (score + 1).toString());
      } else {
        setErrors((prev) => prev + 1);
        localStorage.setItem("errors", (errors + 1).toString());
      }
      setQuestionNumber((prev) => prev + 1);
      fetchDogImage();
      setMessage("");
    }, 1700);
  };

  const handleReset = () => {
    setScore(0);
    setErrors(0);
    setQuestionNumber(1);
  };

  return (
    <main className="max-w-5xl mx-auto mb-6">
      <div className="text-center">
        <h1 className="text-5xl mt-6">DogQuiz</h1>
        <p className="mt-3">
          Bem-vindo ao "DogQuiz"! <br /> Adivinhe a raça do cão com base na
          foto.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center text-2xl">
        <span>
          Pontuação: <b>{score}</b>
        </span>
        <span className="mb-6">
          Erros: <b>{errors}</b>
        </span>
        {loading ? (
          <img
            src={GifLoading}
            alt="loading"
            className="mx-auto max-h-[300px] max-w-[300px] rounded-sm"
          />
        ) : (
          <img
            src={dogImage}
            alt="dog"
            className="mx-auto max-h-[300px] max-w-[300px] rounded-sm object-cover"
          />
        )}
      </div>
      {loading ? (
        <div className="mt-6 flex flex-col items-center justify-center">
          <ButtonDisabled />
          <ButtonDisabled />
          <ButtonDisabled />
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center">
          {options.map((option) => (
            <button
              key={option}
              className="bg-yellow-900 text-white p-3 rounded-md w-[280px] mb-5 text-sm hover:bg-yellow-800"
              disabled={message !== ""}
              onClick={() => {
                handleAnswer(option);
              }}
            >
              {option}
            </button>
          ))}
          {message === "c" && (
            <AnswerMessage message={message} correct={answer} />
          )}
          {message === "e" && (
            <AnswerMessage message={message} correct={answer} />
          )}
          {message === "" && <ResetButton handleReset={handleReset} />}
        </div>
      )}
    </main>
  );
}

export default Game;
