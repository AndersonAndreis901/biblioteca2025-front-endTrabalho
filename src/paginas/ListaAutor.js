import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaAutor() {
    //Declarando uma variável useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/autor`);
        setDados(data);
    }

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista titulo="Autores"
                descricao="Gerencie aqui os autores dos livros da biblioteca"
                rota="/cadastroautor" />


            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Foto</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((d, i) => (
                                <tr>
                                    <td>
                                        <a className="btn btn-primary"
                                            href={`/cadastroautor/${d.idautor}`}>Alterar</a>
                                    </td>
                                    <td>
                                        <img className="img-thumbnail"
                                            src={d.foto}
                                            style={{ width: '80px' }} />
                                    </td>
                                    <td>{d.idautor}</td>
                                    <td>{d.nomeautor}</td>
                                    <td>{d.nascimento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};
