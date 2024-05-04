import { BrowserRouter, Route, Routes } from "react-router-dom";
import Website from "./pages/Website";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Services from "./pages/Services/Services";
import Guidance from "./pages/Guidance/Guidance";
import Feedback from "./pages/Feedback/Feedback";
import EstateDutyTax from "./pages/EstateDutyTax/EstateDutyTax";
import GiftTax from "./pages/GiftTax/GiftTax";
import InheritanceTax from "./pages/InheritanceTax/InheritanceTax";
import SignIn from "./pages/SignIn/SignIn";
import AuthLayout from "./components/Layout/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route path="/signin" element={<SignIn/>} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<Website />} />
            <Route path="/services" element={<Services />} />
            <Route path="/estate-duty-tax" element={<EstateDutyTax />} />
            <Route path="/gift-tax" element={<GiftTax />} />
            <Route path="/inheritance-tax" element={<InheritanceTax />} />
            <Route path="/easy-tax-payment" element={<EstateDutyTax />} />
            <Route path="/value-assessment" element={<EstateDutyTax />} />
            <Route
              path="/search-property-ownership-information"
              element={<EstateDutyTax />}
            />
            <Route path="/search-house-prices" element={<EstateDutyTax />} />
            <Route
              path="/gift-and-inheritance-related-document-records"
              element={<EstateDutyTax />}
            />
            <Route
              path="/read-educational-resources"
              element={<EstateDutyTax />}
            />
            <Route path="https://www.rgd.gov.lk/" />
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
