import Navbar from './components/Navbar/Navbar';
import CartPage from './pages/CartPage/CartPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useFetchCateogries from './hooks/use-fetchCategories';
import './App.css';

function App() {
  const categoriesListQuery = `{
    categories{
      name
    }
  }`
  const fetchCategories = useFetchCateogries(process.env.REACT_APP_API_URL, categoriesListQuery)
  return (
    <div className="App">
      <Router>
        <Navbar categories={fetchCategories} />
        <Routes>
          <Route path="/" element={<Navigate to="/categories/all" state={{ start: 0, max: 4 }} replace />} />
          <Route path="/categories/:categoryName" exact element={<CategoryPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
