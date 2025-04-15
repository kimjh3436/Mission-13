import {Book as BookType} from '../types/Book.tsx'

interface BookProps {
  book: BookType;
  onAddToCart: (book: BookType) => void;
  quantity: number;
  setQuantity: (bookId: number, value: number) => void;
}

// book component, has props, takes a pop object, an addtocart function a quantity and a set quantity function
const Book = ({ book, onAddToCart, quantity, setQuantity }: BookProps) => {
  return (
    // the different parts of the object are displayed here and bootstrap classes are makinbg it look nice
    // bootstrap grid being used
    <div className="col-lg-6 col-md-8 col-sm-10 mb-4 d-flex justify-content-center">
      <div className="card shadow-sm hover-scale w-100" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text text-muted">by <strong>{book.author}</strong></p>
          <p className="card-text">Published by: <strong>{book.publisher}</strong></p>
          <p className="card-text">ISBN: <strong>{book.isbn}</strong></p>
          <p className="card-text">Classification: <strong>{book.classification}</strong></p>
          <p className="card-text">Page Count: <strong>{book.pageCount}</strong></p>
          <p className="card-text"><strong>${book.price}</strong></p>
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input
          // some extra values passed here to the input field, like the min value and the type of input, as well as the placeholder and the onChange function to set the quantity
            id="quantity"
            value={quantity}
            type="number"
            min="1"
            className="form-control mb-2"
            placeholder="Quantity"
            onWheel={(e) => e.preventDefault()} // Prevent accidental scrolling
            onKeyDown={(e) => e.preventDefault()} // Block manual typing
            onChange={(e) => setQuantity(book.bookId, Number(e.target.value))}
        />
        {/**Button that calls the add to cart function. */}
          <button className="btn btn-success" onClick={() => onAddToCart(book)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Book;