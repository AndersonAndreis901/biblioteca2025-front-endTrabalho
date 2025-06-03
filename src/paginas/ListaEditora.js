import { useState, useEffect } from 'react';
import axios from 'axios';
import TituloLista from '../componentes/TituloLista';

export default function ListaEditora() {
  const [editoras, setEditoras] = useState([]);

  const listarEditoras = async () => {
    const { data } = await axios.get('http://localhost:4000/editora');
    setEditoras(data);
  };

  useEffect(() => {
    listarEditoras();
  }, []);

  return (
    <>
      <TituloLista 
        titulo="Editoras" 
        descricao="Gerencie as editoras cadastradas" 
        rota="/cadastroeditora" 
      />

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {editoras.map((editora) => (
              <tr key={editora.ideditora}>
                <td>{editora.nomeeditora}</td>
                <td>
                  <a 
                    href={`/cadastroeditora/${editora.ideditora}`} 
                    className="btn btn-primary btn-sm"
                  >
                    Editar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}