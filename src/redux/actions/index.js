// QUESTI SONO I TYPE DEFINITI COME COSTANTI

// permettono di evitare erorri di sintassi che romperebbero il funzionamento di redux e i suoi reducers

export const ADD_TO_CART = "ADD_TO_CART"; // non ci si riferirà più alla type tramite la stringa, ma importando la costante
// sbagliare l'import della costante ci avvertirà già vscode del problema, in anticipo
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_USERNAME = "SET_USERNAME";
export const GET_BOOKS = "GET_BOOKS";
export const GET_BOOKS_ERROR = "GET_BOOKS_ERROR";
export const GET_BOOKS_LOADING_ON = "GET_BOOKS_LOADING_ON";
export const GET_BOOKS_LOADING_OFF = "GET_BOOKS_LOADING_OFF";

// ACTION CREATOR --> una funzione che torna l'azione (oggetto)

// export const addToCartAction = bookSelected => {
//   return {
//     type: ADD_TO_CART,
//     payload: bookSelected
//   };
// };
export const addToCartAction = bookSelected => ({
  type: ADD_TO_CART, // type è obbligatoria in ogni action
  payload: bookSelected // payload non è obbligatorio, ma a volte sicuramente necessario
});

export const addToCartActionWithThunk = bookSelected => {
  return (dispatch, getState) => {
    const currentState = getState();
    console.log("DENTRO ADD TO CART THUNK", getState());
    console.log(
      "CHECK",
      currentState.cart.content.findIndex(book => book.id === bookSelected.id)
    );
    if (currentState.cart.content.findIndex(book => book.id === bookSelected.id) === -1) {
      dispatch({
        type: ADD_TO_CART, // type è obbligatoria in ogni action
        payload: bookSelected // payload non è obbligatorio, ma a volte sicuramente necessario
      });
    }
  };
};

export const removeFromCartAction = i => ({ type: REMOVE_FROM_CART, payload: i });

export const setUserNameAction = username => ({ type: SET_USERNAME, payload: username });

export const getBooksAction = () => {
  // grazie a redux-thunk, che è un middleware GIA' INTEGRATO nel nostro flow con configureStore() di redux toolkit
  // possiamo creare degli action creators che ritornano non solo una singola action (oggetto JS)
  // ma anche una funzione

  return async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_BOOKS_LOADING_ON
      });

      let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
      if (resp.ok) {
        let fetchedBooks = await resp.json();

        // a questo punto avremo aspettato la risoluzione della fetch e potremo fare il dispatch di un'action con fetchedBooks come payload!
        dispatch({
          type: GET_BOOKS,
          payload: fetchedBooks
        });
      } else {
        // siamo anche in grado di gestire errori nel caso in cui si presentino con un azione con type diverso
        dispatch({
          type: GET_BOOKS_ERROR,
          payload: "Resp not ok"
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_BOOKS_ERROR,
        payload: error.message
      });
    } finally {
      dispatch({
        type: GET_BOOKS_LOADING_OFF
      });
    }
  };

  //   return (dispatch, getState) => {
  //     fetch("https://striveschool-api.herokuapp.com/food-books")
  //       .then(resp => {
  //         if (resp.ok) {
  //           return resp.json();
  //         } else {
  //           console.log("error");
  //         }
  //       })
  //       .then(fetchedBooks =>
  //         dispatch({
  //           type: GET_BOOKS,
  //           payload: fetchedBooks
  //         })
  //       );
  //   };
};
