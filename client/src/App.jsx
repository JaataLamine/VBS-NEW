import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SingIn } from "./pages/SingIn";
import { SingUp } from "./pages/SingUp";
import { FaireDemande } from "./pages/FaireDemande";
import { CreatePrestataire } from "./pages/CreatePrestataire";
import { CreateService } from "./pages/CreateService";
import { Profile } from "./pages/Profile";
import { Demandes } from "./pages/Demandes";
import { Prestataires } from "./pages/Prestataires";
import {
  PrivateRoute,
  PrivateRouteAdmin,
  PrivateRouteSuperAdmin,
} from "./components/PrivateRoute";
import { Header } from "./components/Header";
import { ServicePage } from "./components/ServicePage";
import { PendingPrestataire } from "./pages/PendingPrestataire";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FaireDemande" element={<FaireDemande />} />
          <Route path="/CreatePrestataire" element={<CreatePrestataire />} />
          <Route element={<PrivateRouteSuperAdmin />}>
            <Route
              path="/PendingPrestataire"
              element={<PendingPrestataire />}
            />
          </Route>
          <Route path="/SingIn" element={<SingIn />} />
          <Route path="/SingUp" element={<SingUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/Profile" element={<Profile />} />
            <Route element={<PrivateRouteSuperAdmin />}>
              <Route path="/CreateService" element={<CreateService />} />
            </Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/Demandes" element={<Demandes />} />
              <Route path="/Prestataires" element={<Prestataires />} />
            </Route>
          </Route>
          <Route path="/service/:id" element={<ServicePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
