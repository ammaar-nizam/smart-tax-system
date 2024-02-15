import Departments from "./components/Departments/Departments";
import Featured from "./components/Featured/Featured";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
function App() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient">
          <Header />
          <Hero />
        </div>
        <Departments />
        <Featured/>
      </div>
    </div>
  );
}

export default App;
