import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import type { RowComponentProps } from 'react-window';

type CountryCardRowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

export const CountryCardRow = ({
  index,
  style,
  countries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<CountryCardRowProps>) => {
  const country = countries[index];

  return (
    <div style={style}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};
