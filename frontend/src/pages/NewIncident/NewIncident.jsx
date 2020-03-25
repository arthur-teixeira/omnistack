import React, { useState } from 'react'

import LogoImg from '../../assets/logo.svg'

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

export default function NewIncident() {
  const ongId = localStorage.getItem('ong_id');

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const handleNewIncident = async e => {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }
    try {
      await api.post("incidents", data, {
        headers: {
          authorization: ongId
        }
      })
      history.push("/profile")
    } catch (error) {
      alert("erro ao cadastrar novo caso")
      console.log(error)
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={LogoImg} alt="logo" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
          Voltar para home
        </Link>

        </section>

        <form onSubmit={handleNewIncident}>
          <input placeholder="título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea onChange={e => setDescription(e.target.value)} placeholder="Descrição">
            {description}
          </textarea>

          <input placeholder="Valor em reais"
            value={value}
            onChange={setValue}
          />

          <button type="submit" className="btn">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
