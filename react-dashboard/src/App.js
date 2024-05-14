import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./scenes/dashboard";

import Users from "./scenes/user/agents";
import AgentCreateForm from "./scenes/user/agentCreateForm";

import Feedbacks from "./scenes/feedback";
import Purchasers from "./scenes/purchaser";
import PurchaseTransactions from "./scenes/purchaserTransaction";
import EDTReturns from "./scenes/edtReturn";

function App() {

  useEffect(() => {
    Axios.get('http://localhost:8000/api/agents')
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
              <Route path="/edt-returns" element={<EDTReturns/>} />
			        
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
