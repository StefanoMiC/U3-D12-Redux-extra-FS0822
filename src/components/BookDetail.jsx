import { Col, Row, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction, addToCartActionWithThunk } from "../redux/actions";

const BookDetail = ({ bookSelected }) => {
  const dispatch = useDispatch();

  const userName = useSelector(state => state.user.name);
  // userName all'avvio è ''; in questo caso devo NASCONDERE il bottone "add to cart"

  return (
    <div className="mt-3 mb-4 mb-lg-0">
      {bookSelected ? (
        <>
          <Row>
            <Col sm={12}>
              <h1>{bookSelected.title}</h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={4}>
              <div className="mt-3">
                <img className="book-cover" src={bookSelected.imageUrl} alt="book selected" />
              </div>
            </Col>
            <Col sm={8}>
              <p>
                <span className="font-weight-bold">Description:</span>&nbsp;
                {bookSelected.description}
              </p>
              <p>
                <span className="font-weight-bold">Price:</span>&nbsp;
                {bookSelected.price}$
              </p>
              {userName ? (
                <Button
                  color="primary"
                  onClick={() => {
                    console.log("Questo è il dispatch da BookDetail");
                    // dispatch({
                    //   type: ADD_TO_CART,
                    //   payload: bookSelected
                    // });
                    dispatch(addToCartActionWithThunk(bookSelected));
                    // sto dispatchando un'action creator
                    // è la stessa cosa che dispatchare l'action
                    // perchè l'action creator è una funzione che torna l'action
                  }}
                >
                  ADD TO CART
                </Button>
              ) : (
                <Alert variant="warning">Log in to add this book to your cart</Alert>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <h3>Start by clicking on a book!</h3>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookDetail;
