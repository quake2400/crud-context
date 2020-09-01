import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import EmpresaState from './context/empresa/empresaState';
import AlertaState from './context/alerta/alertaState';
import Home from './components/Home';
import CrearEmpresa from './components/CrearEmpresa';
import ActualizarEmpresa from './components/ActualizarEmpresa';

//npm start
function App() {
  return (
    <Router>
      <EmpresaState>
        <AlertaState>
          <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/empresa/crear" component={CrearEmpresa} />
              <Route exact path="/empresa/actualizar" component={ActualizarEmpresa} />
            </Switch>
           
          <Footer />
        </AlertaState>
      </EmpresaState>
    </Router>
  );
}

export default App;
