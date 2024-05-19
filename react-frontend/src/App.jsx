import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Website from "./pages/Website";
import Layout from "./components/Layout/Layout";
import Services from "./pages/Services/Services";
import Guidance from "./pages/Guidance/Guidance";
import Feedback from "./pages/Feedback/Feedback";
import EstateDutyTax from "./pages/EstateDutyTax/EstateDutyTax";
import GiftTax from "./pages/GiftTax/GiftTax";
import InheritanceTax from "./pages/InheritanceTax/InheritanceTax";
import SignIn from "./pages/SignIn/SignIn";
import AuthLayout from "./components/Layout/AuthLayout";
import EducationalResources from "./pages/EducationalResources/EducationalResources";
import RegisterForm from "./pages/Register/Register";
import PaymentForm from './pages/Payment/Payment';
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";

const stripePromise = loadStripe("pk_test_51PI2ZjSJLIdqTI05GmF4edWPhzL6bgFPFPaBTB6pv6VH8MpUhQZQa0iIV3Aanh4S9tKwpe6DnZ45ZWvuP1rLwmyi00gEQY2vxL");

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/register" element={<RegisterForm/>} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/" element={<Website />} />
            <Route path="/services" element={<Services />} />
            <Route path="/estate-duty-tax" element={<EstateDutyTax />} />
            <Route path="/gift-tax" element={<GiftTax />} />
            <Route path="/inheritance-tax" element={<InheritanceTax />} />
            <Route path="/easy-tax-payment" element={<EstateDutyTax />} />
            <Route path="/under-development"
              element={<UnderDevelopmentPage />} />
            <Route
              path="/under-development"
              element={<UnderDevelopmentPage />}
            />
            <Route path="/search-house-prices" element={<EstateDutyTax />} />
            <Route
              path="/under-development"
              element={<UnderDevelopmentPage />}
            />
            <Route
              path="/read-educational-resources"
              element={<EducationalResources />}
            />
            <Route path="https://www.rgd.gov.lk/" />
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route 
              path="/payment-form" 
              element={
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              } 
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
