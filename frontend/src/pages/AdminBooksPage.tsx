// admin book page, displays a table and gives the user options for CRUD

import { useState, useEffect } from 'react';
import { Book as BookType } from '../types/Book';
import { fetchBooks, deleteBook, addBook, updateBook } from '../api/BooksAPI.ts';
import Pagination from '../components/pagination.tsx'; // Importing Pagination component for future use
import NewBookForm from '../components/NewBookForm.tsx'; // Importing the NewBookForm component to add new books
import EditBookForm from '../components/EditBookForm.tsx'; // Importing the EditBookForm component to edit existing books

const AdminBooksPage = () => {
    // states to manage the books, error messages, loading state, pagination, and form visibility
    const [books, setBooks] = useState<BookType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // more states for pagination
    const [pageSize, setPageSize] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);

    // more states for managing the visibility of the form for adding/editing books
    const [showForm, setShowForm] = useState(false); // detects the type, no need to declare boolean
    const [editingBook, setEditingBook] = useState<BookType | null>(null); // state to keep track of the book being edited
    
    // too many states? not unless there are 50

    // function to handle deleting a book, calls the deletebook api and updates the state
    const deleteBookHandler = async (bookId: number) => {
        try {
            setLoading(true);
            deleteBook(bookId);
            setBooks(books.filter(book => book.bookId !== bookId)); // filtering out the deleted book
        } catch (error) {
            setError((error as Error).message);
            console.error('Error deleting book:', error);
        } finally {
            setLoading(false);
        }
    };

    // function to load the books, originally was in the use effect but separated for reusability
    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await fetchBooks(pageSize, page, 1, []); // uses the fetchbooks method we created in the api
            const totalCount = data.count; // get the total count of books from the response
            setNumPages(Math.ceil(totalCount / pageSize)); // calculate total pages based on page size
            setBooks(data.books); // setting the book state
        } catch (error) {
            setError((error as Error).message);
            console.error('Error fetching books:', error);
        } finally { // executes no matter what, even if there is an error
            setLoading(false);
        }
    };

    // the good ole use effect, this will run when the component mounts and whenever page, pageSize, or numPages changes
    useEffect(() => {
        loadBooks();
    }, [page, pageSize, numPages]); // use effect dependencies, will run when any of these variables is updated

    // if the page is loading or error it shows this instead
    if (loading) return <p>Loading projects...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>; // Display error message in red
    
    return (
        <div>
            <h1>Admin Books</h1>

            {/**If the form isn't showing, show a button to add the new book */}
            {!showForm && (
                <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowForm(true)} // show the form when the button is clicked
                >
                    Add New Book
                </button>
            )}

            {/* Conditionally render the NewBookForm component if they have set it to show, one success close it, then setPage to 1 to 
            re render and in turn fetch the new projects.*/}
            { showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false); // hide the form if we are successful
                        loadBooks(); // Reload the books to get the updated list
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null); // hide the edit form
                        loadBooks(); // Reload the books to get the updated list after editing
                    }}
                    onCancel={() => setEditingBook(null)} // hide the edit form
                />
            )}

            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Isbn</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => ( // mapping through the books to create a row for each book
                        <tr key={book.bookId}>
                            <td>{book.bookId}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.classification}</td>
                            <td>{book.category}</td>
                            <td>{book.pageCount}</td>
                            <td>${book.price.toFixed(2)}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingBook(book)}>Edit</button> {/**sets the book to being edited */}
                                <button className="btn btn-danger btn-sm" onClick={() => deleteBookHandler(book.bookId)}>Delete</button> {/**uses the delete book handler function */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                currentPage={page}
                totalPage={numPages}
                pageSize={pageSize}
                onPageChange={(newPage: number) => {
                    setPage(newPage);
                }}
                onPageSizeChange={(newSize: number) => {
                    setPageSize(newSize);
                    setPage(1); // Reset to page 1 on page size change
                }}
            />
        </div>

    );

}

export default AdminBooksPage;