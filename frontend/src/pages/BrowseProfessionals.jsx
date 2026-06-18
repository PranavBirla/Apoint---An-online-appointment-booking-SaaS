import Sidebar from "../components/layout/Sidebar";

import BrowseHero from "../components/browse/BrowseHero";
import SearchBar from "../components/browse/SearchBar";
import StatsSection from "../components/browse/StatsSection";
import CategoryChips from "../components/browse/CategoryChips";
import ProfessionalsGrid from "../components/browse/ProfessionalsGrid";
import HelpBanner from "../components/browse/HelpBanner";

import { useEffect, useState } from "react";

import { getProfessionals, } from "../services/professionalService";

export default function BrowseProfessionals() {
  const [professionals, setProfessionals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        const data =
          await getProfessionals();

        setProfessionals(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, []);

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <BrowseHero />

          <SearchBar />

          <StatsSection />

          <CategoryChips />

          <ProfessionalsGrid
            professionals={professionals}
          />

          <HelpBanner />
        </div>
      </main>
    </div>
  );

}