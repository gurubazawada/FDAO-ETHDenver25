import React from "react";
import { Routes, Route } from "react-router-dom";
import CompetitionList from "./CompetitionList";
import CompetitionDetail from "./CompetitionDetail";

interface CompetitorRoutesProps {
  walletAddress: string;
}

const CompetitorRoutes: React.FC<CompetitorRoutesProps> = ({ walletAddress }) => {
  return (
    <Routes>
      <Route path="/" element={<CompetitionList />} />
      <Route path="/competition/:id" element={<CompetitionDetail walletAddress={walletAddress} />} />
    </Routes>
  );
};

export default CompetitorRoutes;
