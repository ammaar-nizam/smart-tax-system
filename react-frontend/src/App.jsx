import { BrowserRouter, Route, Routes } from "react-router-dom";
import Website from "./pages/Website";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Services from "./pages/Services/Services";
import Guidance from "./pages/Guidance/Guidance";
import Feedback from "./pages/Feedback/Feedback";
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Website />} />
            <Route path="/services" element={<Services/>} />
            <Route path="/guidance" element={<Guidance/>} />
            <Route path="/feedback" element={<Feedback/>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
