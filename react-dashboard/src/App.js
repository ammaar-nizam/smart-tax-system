import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import './App.css';

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./scenes/dashboard";

import Users from "./scenes/user/agents";
import AgentCreateForm from "./scenes/user/agentCreateForm";

import Feedbacks from "./scenes/feedback";

import Purchasers from "./scenes/purchaser";
import PurchaseTransactions from "./scenes/purchaserTransaction";
import PaidEDTReturns from "./scenes/edtReturn/paid";
import FiledEDTReturns from "./scenes/edtReturn/unpaid";

import Beneficiaries from "./scenes/beneficiary";
import InheritanceTransactions from "./scenes/inheritanceTransaction";
import PaidInheritanceTaxReturns from "./scenes/inheritanceTaxReturn/paid";
import FiledInheritanceTaxReturns from "./scenes/inheritanceTaxReturn/unpaid";

import Receivers from "./scenes/receiver";
import GiftTransactions from "./scenes/giftTransaction";
import PaidGiftTaxReturns from "./scenes/giftTaxReturn/paid";
import FiledGiftTaxReturns from "./scenes/giftTaxReturn/unpaid";

function App() {

  useEffect(() => {
    Axios.get('https://smart-tax-api.vercel.app/api/agents')
    .then(res => console.log(res.data)).catch(error => console.log(error))
  }, []);

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              {/* <Route path="/" element={<Team />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/agents" element={<Users />} />
              <Route path="/agents/create" element={<AgentCreateForm />} />

              <Route path="/feedbacks" element={<Feedbacks />} />

              <Route path="/purchasers" element={<Purchasers/>} />
              <Route path="/purchase-transactions" element={<PurchaseTransactions/>} />
              <Route path="/edt-returns/filed" element={<FiledEDTReturns/>} />
              <Route path="/edt-returns/paid" element={<PaidEDTReturns/>} />

              <Route path="/beneficiaries" element={<Beneficiaries/>} />
              <Route path="/inheritance-transactions" element={<InheritanceTransactions/>} />
              <Route path="/inheritance-tax-returns/filed" element={<FiledInheritanceTaxReturns/>} />
              <Route path="/inheritance-tax-returns/paid" element={<PaidInheritanceTaxReturns/>} />

              <Route path="/receivers" element={<Receivers/>} />
              <Route path="/gift-transactions" element={<GiftTransactions/>} />
              <Route path="/gift-tax-returns/filed" element={<FiledGiftTaxReturns/>} />
              <Route path="/gift-tax-returns/paid" element={<PaidGiftTaxReturns/>} />
			        
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
