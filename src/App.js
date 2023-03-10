import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CartIndicator from "./components/CartIndicator";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./components/Footer";
import ClassComponent from "./components/ClassComponent";
// import { useSelector } from "react-redux";

const App = () => {
  // const isLoading = useSelector(state => state.books.isLoading);
  return (
    <BrowserRouter>
      <Container className="epizon-container">
        <Row>
          <Col sm={12} className="text-center background-div">
            <Link to="/">
              <h1>Epizon Book Store</h1>
              {/* {isLoading && <Spinner animation="border" variant="primary" />} */}
            </Link>
          </Col>
          <CartIndicator />
        </Row>
        <Routes>
          <Route path="/" element={<BookStore />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/class" element={<ClassComponent />} />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
