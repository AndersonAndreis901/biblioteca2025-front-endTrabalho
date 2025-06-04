import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaFuncionario() {
  const [dados, setDados] = useState([]);

  const listar = async () => {
    const { data } = await axios.get(`http://localhost:4000/funcionario`);
    setDados(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista titulo="Funcionários" descricao="Gerencie os funcionários" rota="/cadastrofuncionario" />
      <table className="table">
        <thead>
          <tr>
            <th>Ações</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((func) => (
            <tr key={func.idfuncionario}>
              <td>
                <a href={`/cadastrofuncionario/${func.idfuncionario}`} className="btn btn-primary">
                  Editar
                </a>
              </td>
              <td>{func.nomefuncionario}</td>
              <td>{func.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
