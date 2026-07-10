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

  const [profession, setProfession] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };

  }, [search]);


  // FETCH PROFESSIONALS
  useEffect(() => {
    async function fetchProfessionals() {

      try {

        setLoading(true);
        const data =
          await getProfessionals({
            search: debouncedSearch,
            profession: profession
          });

        setProfessionals(data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }

    }
    fetchProfessionals();

  }, [debouncedSearch, profession]);

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 ">
        <div className="max-w-7xl mx-auto">
          <BrowseHero />

          <SearchBar
            search={search}
            setSearch={setSearch} />

          <StatsSection />

          <CategoryChips
            profession={profession}
            setProfession={setProfession} />

          <ProfessionalsGrid
            professionals={professionals}
          />

          <HelpBanner />
        </div>
      </main>
    </div>
  );

}