import type { Country } from '../../types';
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
      return countries
        .filter((c) => {
          const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        })
        .sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          } else {
            const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
            const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
            return sortOrder === 'asc' ? popA - popB : popB - popA;
          }
        });
    }, [countries, searchQuery, selectedRegion, sortField, selectedYear, sortOrder]);

    return (
      <div className={styles.countryList}>
        <List
          rowComponent={CountryCardRow}
          rowCount={filteredCountries.length}
          rowHeight={rowHeight}
          rowProps={{
            countries: filteredCountries,
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
