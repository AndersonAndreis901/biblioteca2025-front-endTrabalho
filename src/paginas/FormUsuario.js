import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormUsuario() {
  const navegacao = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const voltar = () => navegacao("/listausuario");

  const selecionar = async () => {
    const { data } = await axios.get(`http://localhost:4000/usuario/${id}`);
    setNome(data.nome);
    setNascimento(data.nascimento);
    setCpf(data.cpf);
    setEmail(data.email);
    setTelefone(data.telefone);
  };

  const alterar = async () => {
    await axios.put(`http://localhost:4000/usuario/${id}`, {
      nome,
      nascimento,
      cpf,
      email,
      telefone,
    });
    voltar();
  };

  const inserir = async () => {
    await axios.post("http://localhost:4000/usuario", {
      nome,
      nascimento,
      cpf,
      email,
      telefone,
    });
    voltar();
  };

  const salvar = () => {
    id ? alterar() : inserir();
  };

  const excluir = async () => {
    await axios.delete(`http://localhost:4000/usuario/${id}`);
    voltar();
  };

  useEffect(() => {
    if (id) selecionar();
  }, [id]);

  return (
    <>
      <TituloCadastro id={id} titulo="usuário" />
      <form>
        {id && (
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input type="text" className="form-control" value={id} disabled />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nascimento</label>
          <input
            type="text"   
            className="form-control"
            value={nascimento}
            placeholder="dd/mm/aaaa"
            onChange={(e) => setNascimento(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={salvar}>
          Salvar
        </button>
        <button type="button" className="btn btn-secondary" onClick={voltar}>
          Cancelar
        </button>
        {id && (
          <button type="button" className="btn btn-danger" onClick={excluir}>
            Excluir
          </button>
        )}
      </form>
    </>
  );
}
