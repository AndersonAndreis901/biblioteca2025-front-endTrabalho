import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormAutor() {
    const navegacao = useNavigate();
    const { id } = useParams();

    //Declarar um useState para cada campo da tabela
    const [nomeautor, setNomeAutor] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [biografia, setBiografia] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [foto, setFoto] = useState('');

    const voltar = () => {
        navegacao('/listaautor');
    };

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/autor/${id}`);
        //carregar cada campo na sua respectiva variável
        setNomeAutor(data.nomeautor);
        setNascimento(data.nascimento);
        setBiografia(data.biografia);
        setNacionalidade(data.nacionalidade);
        setFoto(data.foto);
    }

    const alterar = async () => {
        //montar o json do body com todos os campos que precisam ser enviados
        let body = {
            "nomeautor": nomeautor,
            "nascimento": nascimento,
            "biografia": biografia,
            "nacionalidade": nacionalidade,
            "foto": foto
        };

        await axios.put(`http://localhost:4000/autor/${id}`, body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "nomeautor": nomeautor,
            "nascimento": nascimento,
            "biografia": biografia,
            "nacionalidade": nacionalidade,
            "foto": foto
        };

        await axios.post(`http://localhost:4000/autor`, body);
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
        await axios.delete(`http://localhost:4000/autor/${id}`);
        voltar();
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="autor" />

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
                        Nome do autor
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nomeautor}
                        onChange={(evento) => setNomeAutor(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Nascimento
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nascimento}
                        onChange={(evento) => setNascimento(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Nacionalidade
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nacionalidade}
                        onChange={(evento) => setNacionalidade(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Biografia
                    </label>
                    <textarea className="form-control"
                        value={biografia}
                        onChange={(evento) => setBiografia(evento.target.value)}
                        rows={10}
                    >
                    </textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Foto
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={foto}
                        onChange={(evento) => setFoto(evento.target.value)}
                    />
                    <img src={foto} className="img-thumbnail" style={{ width: '250px' }} />
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
