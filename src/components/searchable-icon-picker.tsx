import { icons } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

type LucideIconName = keyof typeof icons;

// A small, typed helper component to render an icon by its name.
const Icon = ({ name, className }: { name: LucideIconName; className?: string }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    return null; // Or return a default icon
  }
  return <LucideIcon className={className} />;
};

// Define the props for our main component
interface SearchableIconPickerProps {
  selectedIcon: LucideIconName;
  onSelectIcon: (iconName: LucideIconName) => void;
}

// The full list of available icon names
const allIconNames = Object.keys(icons) as LucideIconName[];

export function SearchableIconPicker({ selectedIcon, onSelectIcon }: SearchableIconPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = allIconNames
    .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 20); // Limit results for performance

  return (
    <div className="flex w-full flex-col gap-4">
      <input
        type="search"
        placeholder="Search for an icon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
      />

      <div className="grid max-h-64 grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2 overflow-y-auto pr-2">
        {filteredIcons.length > 0 ? (
          filteredIcons.map((iconName) => (
            <button
              key={iconName}
              type="button"
              onClick={() => onSelectIcon(iconName)}
              title={iconName}
              className={clsx(
                'flex aspect-square items-center justify-center rounded-md border transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                {
                  'border-blue-500 bg-blue-100 text-blue-600': selectedIcon === iconName,
                  'border-gray-300 bg-transparent text-gray-600 hover:bg-gray-100': selectedIcon !== iconName,
                }
              )}
            >
              <Icon name={iconName} className="h-5 w-5" />
            </button>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No icons found.</p>
        )}
      </div>
    </div>
  );
}
