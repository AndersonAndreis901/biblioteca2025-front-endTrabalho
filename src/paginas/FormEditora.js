import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormEditora() {
    const navegacao = useNavigate();
    const { id } = useParams();

    const [nomeeditora, setNomeEditora] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    const voltar = () => navegacao('/listaeditora');

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/editora/${id}`);
        setNomeEditora(data.nomeeditora);
        setCnpj(data.cnpj);
        setEndereco(data.endereco);
    };

    const alterar = async () => {
        await axios.put(`http://localhost:4000/editora/${id}`, { nomeeditora, cnpj, endereco });
        voltar();
    };

    const inserir = async () => {
        await axios.post(`http://localhost:4000/editora`, { nomeeditora, cnpj, endereco });
        voltar();
    };

    const salvar = () => { id ? alterar() : inserir(); };

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/editora/${id}`);
        voltar();
    };

    useEffect(() => {
        if (id) selecionar();
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="editora" />
            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">Código</label>
                        <input type="text" className="form-control" value={id} disabled />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Nome da editora</label>
                    <input type="text" className="form-control" value={nomeeditora}
                        onChange={(e) => setNomeEditora(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">CNPJ</label>
                    <input type="text" className="form-control" value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Endereço</label>
                    <input type="text" className="form-control" value={endereco}
                        onChange={(e) => setEndereco(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={salvar}>Salvar</button>
                <button type="button" className="btn btn-secondary" onClick={voltar}>Cancelar</button>
                {id && (
                    <button type="button" className="btn btn-danger" onClick={excluir}>Excluir</button>
                )}
            </form>
        </>
    );
}
