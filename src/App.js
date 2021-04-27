import "./App.scss";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <main className="app-wrapper">
        <h3>Постапокалиптическая служба заказа воды</h3>
        <Form />
      </main>
    </div>
  );
}

export default App;
