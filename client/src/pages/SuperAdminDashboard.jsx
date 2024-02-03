import { Route, Router, Routes } from "react-router";
import { Home } from "./Home";
import { Admin } from "./Admin";
import { CreateService } from "./CreateService";
import { PendingPrestataire } from "./PendingPrestataire";
import { DemandeEffectuee } from "./Demandes";

export const SuperAdminDashboard = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/PendingPrestataire" element={<PendingPrestataire />} />
          <Route path="/CreateService" element={<CreateService />} />
          <Route path="/Demande" element={<DemandeEffectuee />} />
        </Routes>
      </Router>
    </div>
  );
};
