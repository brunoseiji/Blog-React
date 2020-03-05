import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome
        };
        this.logout = this.logout.bind(this);
    }

    logout = async() => {
        await firebase.logout()
        .catch((error) => {
            console.log(error);
        });
        localStorage.removeItem("nome");
        this.props.history.push('/');
    }

    async componentDidMount() {
        if(!firebase.getCurrent()) {
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            this.setState({nome: localStorage.nome});
        })
    }

    render() {
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá, {this.state.nome}</h1>
                    <button onClick={() => this.logout()}>Sair</button>
                </div>
                <div className="btn-post">
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Dashboard);