import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
    return ( 
        <>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <NavLink className="navbar-brand" to="/">
                 CRUD Context
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/empresa/crear">
                                Crear <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/empresa/actualizar">
                                Actualizar
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <main role="main" className="flex-shrink-0">
            <div className="container">
                {props.children}
            </div>
        </main>
        </>
    );
}
    
export default Header;
