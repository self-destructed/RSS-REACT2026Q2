import { Component, type ReactNode } from 'react';
import CharacterCard from './CharacterCard';
import type { Character } from '../../../shared/api/types';

interface Props {
  data: Character[];
}

class CharactersList extends Component<Props> {
  public render(): ReactNode {
    return (
      <section className="mt-6 px-4 md:px-8">
        <div className="mx-auto max-w-md sm:max-w-4xl lg:max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {this.props.data.map((item) => (
              <CharacterCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default CharactersList;
