import { create } from "zustand";
import { COUNTRIES, type Country } from "../shared/countries";

interface CountriesStoreState {
  countries: readonly Country[];
}

export const useCountriesStore = create<CountriesStoreState>()(
  (): CountriesStoreState => ({
    countries: COUNTRIES,
  }),
);

export const useCountries = (): CountriesStoreState["countries"] =>
  useCountriesStore((s) => s.countries);
