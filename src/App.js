
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './componentes/Menu';
import FormAutor from './paginas/FormAutor';
import FormCategoria from './paginas/FormCategoria';
import Home from './paginas/Home';
import ListaAutor from './paginas/ListaAutor';
import ListaCategoria from './paginas/ListaCategoria';
import FormEditora from './paginas/FormEditora';
import ListaEditora from './paginas/ListaEditora';
import FormLivro from './paginas/FormLivro';
import ListaLivro from './paginas/ListaLivro';
import FormUsuario from './paginas/FormUsuario';
import ListaUsuario from './paginas/ListaUsuario';



function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />

        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/listacategoria' element={<ListaCategoria />} />
            <Route path='/cadastrocategoria' element={<FormCategoria />} />
            <Route path='/cadastrocategoria/:id' element={<FormCategoria />} />

            <Route path='/listaautor' element={<ListaAutor />} />
            <Route path='/cadastroautor' element={<FormAutor />} />
            <Route path='/cadastroautor/:id' element={<FormAutor />} />


            <Route path='/listaeditora' element={<ListaEditora />} />
            <Route path='/cadastroeditora' element={<FormEditora />} />
            <Route path='/cadastroeditora/:id' element={<FormEditora />} />


            <Route path='/listalivro' element={<ListaLivro />} />
            <Route path='/cadastrolivro' element={<FormLivro />} />
            <Route path='/cadastrolivro/:id' element={<FormLivro />} />


            <Route path="/listausuario" element={<ListaUsuario />} />
            <Route path="/cadastrousuario" element={<FormUsuario />} />
            <Route path="/cadastrousuario/:id" element={<FormUsuario />} />




            <Route path='*' element={<Home />} />
          </Routes>
        </div>




      </BrowserRouter>
    </>
  );
}

export default App;
