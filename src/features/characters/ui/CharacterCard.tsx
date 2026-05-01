import { Component, type ReactNode } from 'react';
import type { Character } from '../../../services/api-interfaces';

interface Props {
  data: Character;
}

class CharacterCard extends Component<Props> {
  private getStatusColor = (status: string): string => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  private getStatusTextColor = (status: string): string => {
    switch (status) {
      case 'Alive':
        return 'text-green-600 dark:text-green-400';
      case 'Dead':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  private getGenderIcon = (gender: string): string => {
    switch (gender) {
      case 'Female':
        return '♀';
      case 'Male':
        return '♂';
      default:
        return '⚲';
    }
  };

  public render(): ReactNode {
    const { data } = this.props;
    const { id, name, status, gender, location } = data;

    return (
      <article
        id={id.toString()}
        className="group overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {name}
            </h3>
            <div className="ml-2 flex flex-shrink-0 items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${this.getStatusColor(status)} animate-pulse`}
              />
              <span
                className={`text-xs font-medium ${this.getStatusTextColor(status)}`}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-700 dark:text-slate-300">
                {this.getGenderIcon(gender)} {gender}
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="line-clamp-1 text-slate-600 dark:text-slate-400">
                {location.name}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default CharacterCard;
