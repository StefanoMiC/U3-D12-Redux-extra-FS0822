import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { addToCartAction, getBooksAction, removeFromCartAction } from "../redux/actions";

// nei componenti a Classe, non si possono usare gli hooks
// si può utilizzare connect per connettere qualsiasi tipo di componente (classe e/o funzione)

// connect crea un HOC -> Higher Order Component
// un HOC è un componente le cui props vengono arricchite
// queste props extra, in redux, saranno i valori che volete leggere e le azioni che volete dispatchare

// lo state è l'oggettone del Redux Store
// si parte da quello per assegnare alle proprietà i valori dal Redux Store

const mapStateToProps = state => ({
  // tutto quello che mettiamo qua diverrà una prop per ClassComponent
  cartContent: state.cart.content,
  booksInStock: state.books.stock
  // ora booksInStock è accessibile nel componente tramite this.props.booksInStock
});

// mapDispatchToProps è sempre una funzione che torna un oggetto
// le proprietà di questo oggetto finiscono nelle props del componente
const mapDispatchToProps = dispatch => ({
  // mapDispatchToProps viene riempito di METODI
  addBookToCart: bookSelected => {
    // cosa voglio fare quando chiamerò this.props.addRandomBookToCart()
    // probabilmente dispatchare un'azione
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
  // in questo esempio vedremo com'è possibile utilizzare funzionalità presenti in altri componenti,
  // riutilizzando le azioni e action creator definiti in precedenza senza ricreare praticamente nessuna funzionalità nuova

  // faremo il fetch dei libri senza copiare/incollare la funzionalità
  // di un altro componente e relativa gestione errori e stati di caricamento
  componentDidMount() {
    console.log("DID MOUNT");

    // dentro a getBooks stiamo chiamando dispatch con l'action creator getBooksAction che include la fetch all'interno
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

            {/* anche qui ora posso leggere e mappare tutti i libri presenti nello state.books.stock */}
            {this.props.booksInStock.map(book => (
              <div
                key={book.id}
                onClick={() => {
                  // per ogni libro vooglio essere in grado di poterli cliccare e mettere nel carrello
                  this.props.addBookToCart(book);
                }}
              >
                {book.title}
              </div>
            ))}

            {/* questo titolo sarà visibile solo se effettivamente sono presenti elementi nel carrello */}
            {this.props.cartContent.length !== 0 && <h2>Cart content</h2>}

            {/* posso anche leggere il contenuto del carrello e mappare i libri presenti, ed eliminare quelli che clicco*/}
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

// connect accetta fino a 2 parametri:
// 1) mapStateToProps -> una funzione che torna un oggetto; le proprietà che inserite in
// quest'oggetto saranno i valori che leggerete dallo store; questi valori arrivano nelle props
// 2) mapDispatchToProps -> una funzione che torna un oggetto: le proprietà che inserite in
// quest'oggetto saranno le azioni che potrete dispatchare da questo componente
export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
