import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormCategoria() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [nomecategoria, setNomeCategoria] = useState('');

    const voltar = () => {
        navegacao('/listacategoria');
    };

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/categoria/${id}`);
        setNomeCategoria(data.nomecategoria);
    }

    const alterar = async () => {
        let body = {
            "nomecategoria": nomecategoria
        };

        await axios.put(`http://localhost:4000/categoria/${id}`, body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "nomecategoria": nomecategoria
        };

        await axios.post(`http://localhost:4000/categoria`, body);
        voltar();
    }

    const salvar = async () => {
        if (id) {
            alterar();
        }
        else {
            inserir();
        }
    }

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/categoria/${id}`);
        voltar();
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="categoria" />

            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={id}
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">
                        Nome da categoria
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nomecategoria}
                        onChange={(evento) => setNomeCategoria(evento.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary"
                    onClick={() => salvar()}>
                    Salvar
                </button>
                <button type="button"
                    className="btn btn-secondary"
                    onClick={() => voltar()}>
                    Cancelar
                </button>
                {id && (
                    <button type="button"
                        className="btn btn-danger"
                        onClick={() => excluir()}>
                        Excluir
                    </button>
                )}
            </form>
        </>
    );
};
