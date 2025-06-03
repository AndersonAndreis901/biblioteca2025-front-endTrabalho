import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaLivro() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro`);
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista titulo="Livros" descricao="Gerencie aqui os livros" rota="/cadastrolivro" />
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Ano</th>
                                <th>Categoria</th>
                                <th>Editora</th>
                                <th>Edição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((d) => (
                                <tr key={d.idlivro}>
                                    <td>
                                        <a className="btn btn-primary" href={`/cadastrolivro/${d.idlivro}`}>Alterar</a>
                                    </td>
                                    <td>{d.titulo}</td>
                                    <td>{d.publicacao}</td>
                                    <td>{d.idcategoria}</td>
                                    <td>{d.ideditora}</td>
                                    <td>{d.edicao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
