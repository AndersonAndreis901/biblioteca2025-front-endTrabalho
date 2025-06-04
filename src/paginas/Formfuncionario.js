import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nomefuncionario, setNomeFuncionario] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [datanascimento, setDataNascimento] = useState("");
  const [salario, setSalario] = useState("");
  const [datacontratacao, setDataContratacao] = useState("");
  const [datademissao, setDataDemissao] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:4000/funcionario/${id}`).then(({ data }) => {
        setNomeFuncionario(data.nomefuncionario);
        setEmail(data.email);
        setCpf(data.cpf || "");
        setTelefone(data.telefone || "");
        setDataNascimento(data.datanascimento ? formataDataBR(data.datanascimento) : "");
        setSalario(data.salario);
        setDataContratacao(data.datacontratacao ? formataDataBR(data.datacontratacao) : "");
        setDataDemissao(data.datademissao ? formataDataBR(data.datademissao) : "");
      });
    }
  }, [id]);

  function formataDataBR(dataISO) {
    const d = new Date(dataISO);
    if (isNaN(d)) return "";
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function formataDataISO(dataBR) {
    if (!dataBR) return null;
    const partes = dataBR.split("/");
    if (partes.length !== 3) return null;
    return `${partes[2]}-${partes[1].padStart(2, "0")}-${partes[0].padStart(2, "0")}`;
  }

  function salvar() {
    const body = {
      nomefuncionario,
      email,
      cpf,
      telefone,
      datanascimento: formataDataISO(datanascimento),
      salario,
      datacontratacao: formataDataISO(datacontratacao),
      datademissao: formataDataISO(datademissao),
    };

    if (id) {
      axios.put(`http://localhost:4000/funcionario/${id}`, body).then(() => navigate("/listafuncionario"));
    } else {
      axios.post(`http://localhost:4000/funcionario`, body).then(() => navigate("/listafuncionario"));
    }
  }

  function excluir() {
    if (window.confirm("Confirma a exclusão?")) {
      axios.delete(`http://localhost:4000/funcionario/${id}`).then(() => navigate("/listafuncionario"));
    }
  }

  return (
    <>
      <TituloCadastro id={id} titulo="Funcionário" />
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
            value={nomefuncionario}
            onChange={(e) => setNomeFuncionario(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="text"
            className="form-control"
            value={datanascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            placeholder="DD/MM/AAAA"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salário</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Contratação</label>
          <input
            type="text"
            className="form-control"
            value={datacontratacao}
            onChange={(e) => setDataContratacao(e.target.value)}
            placeholder="DD/MM/AAAA"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Demissão</label>
          <input
            type="text"
            className="form-control"
            value={datademissao}
            onChange={(e) => setDataDemissao(e.target.value)}
            placeholder="DD/MM/AAAA"
          />
        </div>

        <button type="button" className="btn btn-primary me-2" onClick={salvar}>
          Salvar
        </button>
        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/listafuncionario")}>
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
