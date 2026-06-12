import type { Country, YearData } from '../../types';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { CountryCardRow } from '../country-card-row/country-card-row';

import styles from './country-list.module.css';
import { memo, useMemo } from 'react';
import { List, useDynamicRowHeight } from 'react-window';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

export const CountryList = memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const rowHeight = useDynamicRowHeight({
      defaultRowHeight: 284,
    });
    const filteredCountries = useMemo(() => {
      const query = searchQuery.toLowerCase();
      return countries.filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(query);
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      });
    }, [countries, searchQuery, selectedRegion]);

    const countryMapsByYear = useMemo(() => {
      const maps = new Map<string, Map<number, YearData>>();
      filteredCountries.forEach((c) => {
        maps.set(c.id, createYearDataMap(c.data));
      });
      return maps;
    }, [filteredCountries]);

    const sortedCountries = useMemo(() => {
      return [...filteredCountries].sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        } else {
          const popA = getPopulationForYear(countryMapsByYear.get(a.id)!, selectedYear) || 0;
          const popB = getPopulationForYear(countryMapsByYear.get(b.id)!, selectedYear) || 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        }
      });
    }, [filteredCountries, countryMapsByYear, sortField, sortOrder, selectedYear]);

    return (
      <div className={styles.countryList}>
        <List
          rowComponent={CountryCardRow}
          rowCount={sortedCountries.length}
          rowHeight={rowHeight}
          rowProps={{
            countries: sortedCountries,
            selectedYear,
            selectedColumns,
          }}
          style={{ height: '896px' }}
        />
      </div>
    );
  }
);
CountryList.displayName = 'CountryList';
