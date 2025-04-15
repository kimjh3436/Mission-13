// all necessaru imports
import { useState, useEffect } from 'react';
import { Book as BookType } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import Books from '../components/Books.tsx';
import CookieConsent from 'react-cookie-consent'; 
import Fingerprint from '../components/Fingerprint.tsx';
import { fetchBooks } from '../api/BooksAPI.ts';
import CategoryFilter from '../components/CategoryFilter.tsx';
import Pagination from '../components/pagination.tsx'; // Importing Pagination component for future use

// taking selected categories as a parameter to the BookPage component.
// this is to make the api call to get the books based on the selected categories.
function BookPage() {
  // states to maintain all the books, the number of results per page, the page number, the total number of pages, if the books are sorted, and the quantity of the book to be added
  const [books, setBooks] = useState<BookType[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [sorted, setSorted] = useState<number>(1);
  const [quantities, setQuantities] = useState<{ [bookId: number]: number }>({});

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // setting the quantity for the book, this is used to set the quantity of the book when it is added to the cart
  const setQuantity = (bookId: number, value: number) => {
    setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [bookId]: value,
    }));
};

  // use navigate to allow us to route to the cart page
  const navigate = useNavigate();
  // add to cart function that we created in cartcontext
  const { addToCart } = useCart();

  // state to maintain categories and then make api calls using them
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // function to add item to cart, book is passed as a parameter and then it builds a cart item using the book object, it then adds the item and routes to the your cart page
  const handleAddToCart = (book: BookType) => {
    const newItem: CartItem = {
      bookId: book.bookId,
      title: book.title,
      price: book.price,
      quantity: quantities[book.bookId] || 1,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, page, sorted, selectedCategories); // uses the fetchbooks method we created in the api
        setBooks(data.books); // setting the book state
        const numberOfPages = Math.ceil(data.count / pageSize); // getting number of pages
        setNumPages(numberOfPages); // setting number of pages
      } catch (error) {
        setError((error as Error).message);
        console.error('Error fetching books:', error);
      } finally { // executes no matter what, even if there is an error
        setLoading(false);
      }
    };
    loadBooks();
}, [pageSize, page, sorted, selectedCategories]); // use effect dependencies, will run when any of these variables is updated

  // different return statements to manage the different potential states
  if (loading) { //shows that we are loading
    return <p>Loading...</p>
  }

  if (error) { // shows that there was an error
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar - Filter Component */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="sticky-top bg-light p-3 rounded shadow-sm" style={{ top: '1rem' }}>
            <h5 className="text-center mb-3">Filter Categories</h5>
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </div>
        </div>

        {/* Main Content - Books */}
        <div className="col-lg-9 col-md-8">
          <div className="row justify-content-center">
            {books.map((book) => (
              <Books
                key={book.bookId}
                book={book}
                onAddToCart={handleAddToCart}
                quantity={quantities[book.bookId] || 1} // Default to 1 if no quantity is set
                setQuantity={setQuantity} // Pass the setQuantity function
              />
            ))}
          </div>

          {/* Pagination and Sorting */}
          <div className="d-flex flex-column justify-content-center align-items-center p-3 bg-light rounded shadow-sm mt-4">
            <Pagination
              currentPage={page}
              totalPage={numPages}
              pageSize={pageSize}
              onPageChange={(newPage: number) => setPage(newPage)}
              onPageSizeChange={(newSize: number) => {
                setPageSize(newSize);
                setPage(1); // Reset to page 1 on page size change
              }}
            ></Pagination>
            <div className="mb-3">
              <div>
                <label className="form-label">Sort books alphabetically:</label>
                <select
                  className="form-select w-auto"
                  value={sorted}
                  onChange={(e) => setSorted(Number(e.target.value))}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="Cookies"
        style={{
          background: "white",
          color: "black",
          border: "2px solid black",
          fontWeight: "bold",
          textAlign: "center",
        }}
        buttonStyle={{
          background: "blue",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        expires={150}
      >
        This site uses cookies to enhance user experience.
      </CookieConsent>

      <Fingerprint />
    </div>
  );
}

export default BookPage;
