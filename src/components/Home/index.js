import React, { Component } from 'react';
import firebase from '../../firebase';
import './home.css';

class Home extends Component {

  state = {
    posts: []
  };

  componentDidMount() {
    firebase.app.ref('posts').once('value', (snapshot) => {
      let state = this.state;
      state.posts = [];
      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          descricao: childItem.val().descricao,
          imagem: childItem.val().imagem,
          autor: childItem.val().autor,
        })
      });
      this.setState({state});
    })
  }

  render() {
    return(
      <section id="post">
        {this.state.posts.map((post) => {
          return(
            <article key={post.key}>
              <header>
                <div className="title">
                  <h2>{post.titulo}</h2>
                  <span>Autor: {post.autor}</span>
                </div>
              </header>
              <img src={post.imagem} alt="Capa do post"/>
              <footer>
                <p>{post.descricao}</p>
              </footer>
            </article>
          );
        })}
      </section>
    )
  }
}

export default Home;