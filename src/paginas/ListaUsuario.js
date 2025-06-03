import { useState, useEffect } from "react";
import axios from "axios";
import TituloLista from "../componentes/TituloLista";

export default function ListaUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  const listar = async () => {
    const { data } = await axios.get("http://localhost:4000/usuario");
    setUsuarios(data);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <>
      <TituloLista titulo="Usuários" descricao="Gerencie aqui os usuários" rota="/cadastrousuario" />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Nascimento</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.idusuario}>
              <td>
                <a className="btn btn-primary" href={`/cadastrousuario/${u.idusuario}`}>
                  Alterar
                </a>
              </td>
              <td>{u.nome}</td>
              <td>{u.nascimento}</td>
              <td>{u.cpf}</td>
              <td>{u.email}</td>
              <td>{u.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
