import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth-context';

import './nav.css'

const Nav = () => {

    const auth = useContext(AuthContext);
 

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Navbar</a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {!auth.isLoggedIn &&
                        <li className="nav-item  mr-sm-2">
                            <Link to="/login" className="nav-link navitem">Log-In</Link>
                        </li>
                    }
                    {!auth.isLoggedIn &&
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Sign-Up</Link>
                        </li>
                    }
                    {auth.isLoggedIn &&
                        <li className="nav-item">
                            <label onClick={auth.logout} className="nav-link">Log-Out</label>
                        </li>
                    }
                    {(auth.isLoggedIn && auth.role!='customer') &&
                        <li className="nav-item">
                            <Link to="/view-customers" className="nav-link">View-Customers</Link>
                        </li>
                    }
                    {(auth.isLoggedIn && auth.role == 'agent') &&
                        <li className="nav-item">
                            <Link to="/apply-loan" className="nav-link">Apply For Loan</Link>
                        </li>
                    }
                    {(auth.isLoggedIn && auth.role!='customer') &&
                        <li className="nav-item">
                            <Link to="/loans-applied" className="nav-link">Applied Loans</Link>
                        </li>
                    }
                </ul>
                <h5 className="mr-4" style={{color:"white"}}>{auth.name} ({auth.role})</h5>
                
            </div>
        </nav>
    )
}

export default Nav


