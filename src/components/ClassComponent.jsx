import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCartAction, getBooksAction, removeFromCartAction } from "../redux/actions";

const mapStateToProps = state => ({
  cartContent: state.cart.content,
  booksInStock: state.books.stock
});

const mapDispatchToProps = dispatch => ({
  addBookToCart: bookSelected => {
    dispatch(addToCartAction(bookSelected));
  },

  removeFromCart: i => {
    dispatch(removeFromCartAction(i));
  },

  getBooks: () => {
    console.log("GET BOOKS");
    dispatch(getBooksAction());
  }
});

class ClassComponent extends Component {
  componentDidMount() {
    console.log("DID MOUNT");
    this.props.getBooks();
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <h2>
              How to connect to Class Component using the connect() function! Cart Content{" "}
              {this.props.cartContent.length}
            </h2>

            {this.props.booksInStock.map(book => (
              <div key={book.id} onClick={() => this.props.addBookToCart(book)}>
                {book.title}
              </div>
            ))}

            {this.props.cartContent.length !== 0 && <h2>Cart content</h2>}
            {this.props.cartContent.map((book, i) => (
              <div key={book.id} onClick={() => this.props.removeFromCart(i)}>
                {book.title}
              </div>
            ))}
            {/* <Button onClick={() => this.props.addBookToCart({ id: 0, title: "Il mio libro" })}>Add To Cart</Button> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
