// form for a brand new book
import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

// the props interface for this component, defining the types for the onSuccess and onCancel callbacks
interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// defining the component
const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  // initializing the form data state with default values for a new book
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '', 
    category: '',
    pageCount: 0, 
    price: 0,
  });

  // handles changes in the input fields and updates the formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handles the form submission, calls the addBook function from the API and then calls the onSuccess callback
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit}> {/** This is the form */}
        <h2>Add New Book</h2>
        <div className="form-grid">
            <label>
            Book Name:
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            </label>
            <label>
            Author:
            <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
            />
            </label>
            <label>
            Publisher:
            <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
            />
            </label>
            <label>
            ISBN:
            <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
            />
            </label>
            <label>
            Classification:
            <input
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
            />
            </label>
            <label>
            Category:
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
            />
            </label>
            <label>
            Page Count:
            <input
                type="number"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleChange}
            />
            </label>
            <label>
            Price:
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />
            </label>
            {/**Buttons */}
            <button type="submit" className="btn btn-success">Add Book</button>
            <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancel
            </button>
        </div>
    </form>
  );
};
export default NewBookForm;
