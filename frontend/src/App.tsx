import BookPage from './pages/BookPage.tsx';
import Cart from './pages/CartPage.tsx';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.tsx';
import CartSummary from './components/CartSummary.tsx';
import './App.css';
import AdminBooksPage from './pages/AdminBooksPage.tsx';
// app function, has routing and all the necessary components like the CartProvider and Cart summary so that they are on every page
function App() {

  return (
    <div className="container">
      <div className="row">
        <CartProvider>
          <Router>
            <CartSummary />
            {/**The routes, only 2 routes right now but we can add more. */}
            <Routes>
              <Route path='/' element={<BookPage/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/admin/books' element={<AdminBooksPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </div>
    </div>
  )
}

export default App;
