import React, { useState } from 'react'

import './styles.css'

import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import heroesImg from '../../assets/heroes.png'
import LogoImg from '../../assets/logo.svg'

export default function Logon() {

  const [id, setId] = useState('');

  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const res = await api.post('auth', { id });
      localStorage.setItem('ong_id', id);
      localStorage.setItem('ong_name', res.data.name);
      history.push("/profile");
    } catch (error) {
      alert("Falha no login")
      console.log(error)
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={LogoImg} alt="logo" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input placeholder="sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button className="btn" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não possuo cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  )
}
