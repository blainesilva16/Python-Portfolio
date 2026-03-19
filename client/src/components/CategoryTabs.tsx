interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`category-tab ${activeCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
