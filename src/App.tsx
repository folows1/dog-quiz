import Footer from "./components/Footer";
import Game from "./Game";

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Game />
      <Footer />
    </div>
  );
}

export default App;
