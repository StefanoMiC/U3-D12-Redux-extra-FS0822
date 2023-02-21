import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setUserNameAction } from "../redux/actions";

const CartIndicator = () => {
  const navigate = useNavigate();
  const cartLength = useSelector(state => state.cart.content.length);
  const userName = useSelector(state => state.user.name);
  // cartLength inzialmente è 0, ma rispecchierà in qualsiasi momento la lunghezza di state.cart.content
  const isLoading = useSelector(state => state.books.isLoading);
  const [formValue, setFormValue] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("stiamo inviando il form");
    // qua dobbiamo dispatchare un'azione per utilizzare formValue come payload
    dispatch(setUserNameAction(formValue));
  };
  return (
    <div className="d-flex ml-auto mt-3 mb-4">
      {isLoading && <Spinner animation="border" variant="primary" className="mr-2" />}
      {userName ? (
        <>
          <span className="mr-2">
            Hello, <strong>{userName}</strong>!
          </span>
          <Button color="primary" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Log in here"
              value={formValue}
              onChange={e => setFormValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default CartIndicator;
