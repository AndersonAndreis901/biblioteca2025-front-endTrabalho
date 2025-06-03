export default function TituloCadastro(props) {

    const titulo = (props.id) ? `Alterando` : `Inserindo`;

    return (
        <>
            <h1>{titulo} {props.titulo}</h1>
        </>
    );
}