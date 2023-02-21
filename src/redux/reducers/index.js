// qui si definisce la nostra funzione reducer
// il reducer prende lo stato corrente dell'app, prende anche l'azione che gli arriva dopo un dispatch, ne legge il type,
// con questi due dati genera un nuovo stato globale dell'app

import { ADD_TO_CART, REMOVE_FROM_CART, SET_USERNAME } from "../actions";

// da dove si comincia? si comincia con uno stato iniziale
const initialState = {
  cart: {
    content: []
  },
  // creo un nuovo slice (porzione) di stato per l'utente
  user: {
    name: ""
  }
};
// lo stato iniziale è quello che viene generato automaticamente ad ogni refresh del browser, prima di essere modificato

// il reducer è una PURE FUNCTION
// quindi non dovrà modificare i suoi parametri

const mainReducer = (state = initialState, action) => {
  // da questa funzione, in ogni condizione o situazione, dovremmo PER FORZA ritornare IL NUOVO STATO
  switch (action.type) {
    // qui inseriremo i vari casi, per i diversi "type" degli oggetti "action" che passeremo
    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          // content: state.cart.content.push(action.payload) !!! DA NON FARE MAI !!! (solo metodi che non mutano l'array originale)
          // content: state.cart.content.concat(action.payload) // concat è un metodo permesso, solo che trova la sua alternativa nello spread operator
          content: [...state.cart.content, action.payload]
        }
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          //   content: state.cart.content.splice(action.payload, 1) !!! DA NON FARE MAI !!! (solo metodi che non mutano l'array originale)
          content: state.cart.content.filter((_, i) => i !== action.payload)
          // prendiamo il precedente content, filtriamo prendendo in considerazione l'indice (i) del singolo elemento in quell'iterazione e
          // lo confrontiamo con l'indice che ci arriva dall'action.payload
          //   content: [...state.cart.content.slice(0, action.payload), ...state.cart.content.slice(action.payload + 1)]
        }
      };

    case SET_USERNAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload
        }
      };
    default:
      return state;
    // nel caso peggiore, quanto meno, ritorneremo lo stato precedente. Per OGNI chiamata di mainReducer, senza rompere il flusso di redux.
  }
};

export default mainReducer;
