import { Component } from "react";
import { connect } from "react-redux";

// ESEMPIO DI CONNESSIONE DI UN COMPONENTE A CLASSE ALLO STORE REDUX

// connect è la funzione che connette il nostro componente allo Store
// accetta due parametri: mapStateToProps e mapDispatchToProps

// come dice il nome stesso, mapperanno, cioè applicheranno delle prop al nostro componente a classe
// che avrà sia prop riguardanti la porzione di stato che vogliamo leggere,
// sia la funzione che sarà in grado di fare il dispatch della nostra azione

const mapStateToProps = state => {
  // seleziono la parte di stato che voglio applicare alla prop, lo stato mi viene fornito dalla funzione connect come parametro "state" ( vedi sopra )
  return { cartLength: state.cart.content.length, userName: state.user.name };
  // la prop prenderà il nome dalla proprietà dell'oggetto che ritorniamo
  // sarà quindi this.props.cartLength
};

const mapDispatchToProps = dispatch => {
  // in questa funzione la connect ci fornirà la funzione dispatch come parametro

  // ritneremo sempre un oggetto che rappresenta le prop che verranno applicate al componente, in questo caso ne avremo una chiamata this.props.addToCart,
  // che sarà una funzione, che aspetterà di essere chiamata per poi chiamare la dispatch internamente e fornire un'action al reducer.
  return {
    addToCart: data => {
      // data è il valore che passiamo da sotto nell'onClick (la stringa "Stefano", !!! ATTENZIONE: inviare una stringa invece di un oggetto romperà la logica del carrello, prendilo solo come esempio di sintassi per il passaggio di dati dalla chiamata della prop)
      dispatch({ type: "ADD_TO_CART", payload: data });
      // qui siamo dentro la funzione contenuta in addToCart, solo quando this.props.addToCart() verrà chiamata allora dispatch verrà eseguito, non prima.
      // quando dispatch viene eseguito, invierà effettivamente l'oggetto action al reducer.
    }
  };
};

class Footer extends Component {
  render() {
    return (
      <footer
        className="epizon-footer"
        // onClick={() => this.props.addToCart("Stefano")}
      >
        <div>Username: {this.props.userName}</div>
        <div>Cart length: {this.props.cartLength}</div>
        <span className="text-muted">Epizon {new Date().getFullYear()}©</span>
      </footer>
    );
  }
}

// questo passaggio è fondamentale, è qui che la funzione connect() aumenterà il nostro componente con le prop dello stato e di dispatch,
// così come abbiamo istruito le due funzioni mapStateToProps e mapDispatchToProps che gli passiamo
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
