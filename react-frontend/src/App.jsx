import { BrowserRouter, Route, Routes } from "react-router-dom";
import Website from "./pages/Website";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Services from "./pages/Services/Services";
import Guidance from "./pages/Guidance/Guidance";
import Feedback from "./pages/Feedback/Feedback";
import EstateDutyTax from "./pages/EstateDutyTax/EstateDutyTax";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="app">
      <Sidebar/>
      <main className="content">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Website />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/guidance" element={<Guidance/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/estate-duty-tax" element={<EstateDutyTax/>} />
        </Route>
      </Routes>
      </main>
    </div>
  );
}

export default App;
