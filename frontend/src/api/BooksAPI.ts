import { Book } from '../types/Book';
// this file serves as an interface for the BooksApi, we can all get, post update and delete methods all to this file
interface FetchBooksResponse {
    books: Book[];
    count: number; 
}

const url = 'https://localhost:7172/api/Books/';
// function to fetch books from the API, it takes pageSize, page, sorted and selectedCategories as parameters
export const fetchBooks = async (
    pageSize: number,
    page: number,
    sorted: number,
    selectedCategories: string[],
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
                .map((category) => `categories=${encodeURIComponent(category)}`)
                .join('&');
                
        const response = await fetch(
        `${url}SomeBooks?pageSize=${pageSize}&page=${page}&sorted=${sorted}${
            selectedCategories.length > 0 ? `&${categoryParams}` : ''
        }`,
        { credentials: 'include' }
    );
    // some simple error handling, throws an error if we don't get a 200 response from the server
    if (!response.ok) {
        throw new Error(`Error fetching books: ${response.statusText}`);
    }

    return await response.json(); // converting data to json to be used
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// function to add a book to the database
export const addBook = async (book: Book): Promise<Book> => {
    
    try {
        const response = await fetch(`${url}AddBook`, { // endpoint for adding a book
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
            credentials: 'include' // include cookies for authentication
        });

        if (!response.ok) {
            throw new Error(`Error adding book: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

export const updateBook = async (book: Book): Promise<Book> => {
    try {
        const response = await fetch(`${url}UpdateBook/${book.bookId}`, {   // endpoint for updating a book
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
            credentials: 'include' // include cookies for authentication
        });

        if (!response.ok) {
            throw new Error(`Error updating book: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

// function to delete a book, calls the api and takes a bookid as a parameter then deletes that joint
export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${url}DeleteBook/${bookId}`, { // endpoint for deleting a book
            method: 'DELETE',
            credentials: 'include' // include cookies for authentication
        });

        if (!response.ok) {
            throw new Error(`Error deleting book: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}
