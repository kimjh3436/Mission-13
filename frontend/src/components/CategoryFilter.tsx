import { useState, useEffect } from 'react'; // importing necessary hooks

// creating an interface for the props that will be passed to the component
interface CategoryFilterProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void; // function to set the selected categories
}

// creating the component, it takes 2 props, as defined above in the interface
function CategoryFilter({ selectedCategories, setSelectedCategories }: CategoryFilterProps) {
    const [categories, setCategories] = useState<string[]>([]); // state to store the fetched categories

    // useEffect to get all of the categories from the api when the component is mounted, only called on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // fetching from the https endpoint we set up on the backend
                const response = await fetch('https://localhost:7172/api/Books/GetBookCategories', { credentials: 'include' });
                const data = await response.json(); // converting the data to a json format to be used
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories(); // calling the function we just defined
    }, []);

    // handling changes to the category. Called when a change is made
    const handleCategoryChange = ({ target }: { target: HTMLInputElement }) => {
        // if a category is selected, it will be removed from the selected categories, if not, it will be added to the selected categories
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((category) => category !== target.value)
            : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    };

    return (
        // return statmemnt to render the category component, has some bootstrap classes for sytling
        <div className="card p-3 shadow-sm w-100">
            <h5 className="card-title mb-3 text-center text-nowrap">Book Categories</h5>
            <div className="list-group">
                {categories.map((category) => (
                    <div key={category} className="list-group-item d-flex align-items-center">
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            id={category}
                            value={category}
                            onChange={handleCategoryChange}
                            checked={selectedCategories.includes(category)} // checks if the category is selected
                        />
                        <label className="form-check-label" htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;