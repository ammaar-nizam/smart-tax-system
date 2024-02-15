import Contact from "./components/Contact/Contact";
import Departments from "./components/Departments/Departments";
import Featured from "./components/Featured/Featured";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import NewsLetter from "./components/NewsLetter/NewsLetter";
import Tax from "./components/Tax/Tax";
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
        <Tax/>
        <Contact/>
        <NewsLetter/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
