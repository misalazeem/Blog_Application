'use client'
import React from 'react';

interface CategorySelectionProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (selected: string[]) => void;
}

const CategorySelect: React.FC<CategorySelectionProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const handleCheckboxChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    onCategoryChange(updatedCategories);
  };

  return (
    <div className="mt-4">
      <label>Categories:</label>
      {categories.map((category) => (
        <div key={category} className="flex items-center">
          <input
            type="checkbox"
            id={category}
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category)}
          />
          <label htmlFor={category} className="ml-2">
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategorySelect;