import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormLivro() {
    const navegacao = useNavigate();
    const { id } = useParams();

    const [titulo, setTitulo] = useState('');
    const [publicacao, setPublicacao] = useState('');
    const [paginas, setPaginas] = useState('');
    const [idcategoria, setIdCategoria] = useState('');
    const [ideditora, setIdEditora] = useState('');
    const [edicao, setEdicao] = useState('');
    const [resumo, setResumo] = useState('');

    const voltar = () => navegacao('/listalivro');

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo);
        setPublicacao(data.publicacao);
        setPaginas(data.paginas);
        setIdCategoria(data.idcategoria);
        setIdEditora(data.ideditora);
        setEdicao(data.edicao);
        setResumo(data.resumo);
    };

    const alterar = async () => {
        await axios.put(`http://localhost:4000/livro/${id}`, {
            titulo, publicacao, paginas, idcategoria, ideditora, edicao, resumo
        });
        voltar();
    };

    const inserir = async () => {
        await axios.post(`http://localhost:4000/livro`, {
            titulo, publicacao, paginas, idcategoria, ideditora, edicao, resumo
        });
        voltar();
    };

    const salvar = () => { id ? alterar() : inserir(); };

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/livro/${id}`);
        voltar();
    };

    useEffect(() => {
        if (id) selecionar();
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="livro" />
            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">Código</label>
                        <input type="text" className="form-control" value={id} disabled />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input type="text" className="form-control" value={titulo}
                        onChange={(e) => setTitulo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ano de Publicação</label>
                    <input type="text" className="form-control" value={publicacao}
                        onChange={(e) => setPublicacao(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de Páginas</label>
                    <input type="text" className="form-control" value={paginas}
                        onChange={(e) => setPaginas(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoria (ID)</label>
                    <input type="text" className="form-control" value={idcategoria}
                        onChange={(e) => setIdCategoria(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Editora (ID)</label>
                    <input type="text" className="form-control" value={ideditora}
                        onChange={(e) => setIdEditora(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número da Edição</label>
                    <input type="text" className="form-control" value={edicao}
                        onChange={(e) => setEdicao(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Resumo</label>
                    <textarea className="form-control" rows={5} value={resumo}
                        onChange={(e) => setResumo(e.target.value)}></textarea>
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
