import { Alert } from "react-bootstrap";
// import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import Book from "./Book";

const BookList = ({ books, changeBook, bookSelected }) => {
  const hasFetchError = useSelector(state => state.books.hasError);
  const hasErrorMessage = useSelector(state => state.books.errorMessage);

  return (
    <div className="mb-3">
      {hasFetchError && (
        <Alert variant="danger">{hasErrorMessage ? hasErrorMessage : "Something went wrong with your fetch"}</Alert>
      )}
      {books.map(book => (
        <Book key={book.id} book={book} changeBook={changeBook} bookSelected={bookSelected} />
      ))}

      {books.length === 0 && <Alert variant="info">No books yet here</Alert>}
    </div>
  );
};

export default BookList;
