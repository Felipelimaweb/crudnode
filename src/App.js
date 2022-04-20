import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setLista(response.data);
    });
  }, []);

  const submitForm = () => {
    Axios.post("http://localhost:3001/api/insert", {
      nome: nome,
      telefone: telefone,
    });

    setLista([...lista, { nome: nome, telefone: telefone }]);
  };

  return (
    <div className="App">
      <h1>Crud node+reactjs</h1>

      <div className="form">
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          onChange={(e) => {
            setNome(e.target.value);
          }}
        ></input>
        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          onChange={(e) => {
            setTelefone(e.target.value);
          }}
        ></input>
        <button id="enviar" onClick={submitForm}>
          Enviar
        </button>

        {lista.map((val) => {
          return (
            <div className="card">
              <div class="row">
                <div class="col-6">
                  Nome: {val.nome} | Telefone: {val.telefone}
                  <button id="delete">Delete</button>
                </div>
                <div class="col-6">
                  <input type="text" id="updateForm" placeholder="Nome"></input>
                  <input
                    type="text"
                    id="updateForm"
                    placeholder="Telefone"
                  ></input>
                  <button id="update">Update</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
