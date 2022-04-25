import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState(0);
  const [lista, setLista] = useState([]);
  const [NewNome, setNewNome] = useState("");
  const [NewTelefone, setNewTelefone] = useState(0);

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

  const updateForm = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      nome: NewNome,
      telefone: NewTelefone,
    }).then((response) => {
      setLista(
        lista.map((val) => {
          return val.id === id
            ? { id: val.id, nome: val.nome, telefone: val.telefone }
            : val;
        })
      );
    });
  };

  const deleteForm = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
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
              <div className="row">
                <div className="col-6">
                  {val.id} Nome: {val.nome} <br></br> Telefone: {val.telefone}
                  <button
                    id="delete"
                    onClick={() => {
                      deleteForm(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    id="updateForm"
                    placeholder="Nome"
                    onChange={(e) => {
                      setNewNome(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    id="updateForm"
                    placeholder="Telefone"
                    onChange={(e) => {
                      setNewTelefone(e.target.value);
                    }}
                  />
                  <button
                    id="update"
                    onClick={() => {
                      updateForm(val.id);
                    }}
                  >
                    Update
                  </button>
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
