import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { useSelector, useDispatch } from "react-redux";
import { getBooksAction } from "../redux/actions";

const BookStore = () => {
  // const [books, setBooks] = useState([]); // lo stato interno non lo useremo più perché otteniamo il dato dallo store globale in booksInStock qui sotto
  const [bookSelected, setBookSelected] = useState(null);
  const dispatch = useDispatch();

  const booksInStock = useSelector(state => state.books.stock);

  useEffect(() => {
    // getBooks()
    dispatch(getBooksAction());
  }, []); // componentDidMount

  // la fetch la faremo dentro l'action creator getBooksAction così da avere la possibilità di richiamare la funzionalità da ogni componente senza replicare il codice
  // e gestire internamente al flusso redux gli eventuali dati delle API, Errori, Stati di caricamento ecc.

  // const getBooks = async () => {
  //   try {
  //     let resp = await fetch(
  //       'https://striveschool-api.herokuapp.com/food-books'
  //     )
  //     if (resp.ok) {
  //       let fetchedBooks = await resp.json()
  //       setBooks(fetchedBooks)
  //     } else {
  //       console.log('error')
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const changeBook = book => setBookSelected(book);

  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList bookSelected={bookSelected} changeBook={changeBook} books={booksInStock} />
      </Col>
      <Col lg={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookStore;
