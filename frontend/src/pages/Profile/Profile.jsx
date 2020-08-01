import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import LogoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

export default function Profile() {

  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongName = localStorage.getItem("ong_name")
  const ongId = localStorage.getItem("ong_id")

  useEffect(() => {
    api.get('profile', {
      headers: {
        authorization: ongId
      }
    }).then(res => {
      setIncidents(res.data)
    })
  }, [ongId])

  const handleDeleteIncident = async id => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));

    } catch (error) {
      alert("erro ao deletar caso, tente novamente")
      console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="logo" />
        <span>Bem vinda, {ongName}</span>

        <Link className="btn" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} onClick={handleLogout} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}</p>

              <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 size={20} color="A8A8B3" />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}