import Sidebar from "../components/layout/Sidebar";

import BrowseHero from "../components/browse/BrowseHero";
import SearchBar from "../components/browse/SearchBar";
import CategoryChips from "../components/browse/CategoryChips";
import ProfessionalsGrid from "../components/browse/ProfessionalsGrid";
import HelpBanner from "../components/browse/HelpBanner";

import { useEffect, useState } from "react";

import { getProfessionals } from "../services/professionalService";


export default function BrowseProfessionals() {

    const [professionals, setProfessionals] = useState([]);

    const [profession, setProfession] = useState("");

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState("");


    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);


        return () => {
            clearTimeout(timer);
        };

    }, [search]);


    useEffect(() => {

        async function fetchProfessionals() {

            try {

                setLoading(true);

                const data = await getProfessionals({
                    search: debouncedSearch,
                    profession,
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
        <div className="flex min-h-screen bg-[#FAFAF7]">

            <Sidebar />


            <main className="flex-1 min-w-0 px-4 pt-5 pb-28 sm:px-6 lg:px-8 lg:py-8">

                <div className="w-full max-w-[1500px] mx-auto">

                    <BrowseHero>

                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />

                    </BrowseHero>


                    <div className="mt-6 lg:mt-8">

                        <CategoryChips
                            profession={profession}
                            setProfession={setProfession}
                        />

                    </div>


                    <ProfessionalsGrid
                        professionals={professionals}
                        loading={loading}
                    />


                    <HelpBanner />

                </div>

            </main>

        </div>
    );
}