import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import '../../global.css';
import './styles.css';
import logo from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const ong_id = localStorage.getItem('ongId');

  useEffect(() => {
    async function fechProfile() {
      const response = await api.get('profile', {
        headers: {
          Authorization: ong_id,
        },
      });
      setIncidents(response.data);
    }
    fechProfile();
  }, [ong_id]);

  async function handleDeleteIncidents(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ong_id,
        },
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar caso');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar Novo Caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1> Casos cadastrados </h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO: </strong>
            <p>{incident.title}</p>
            <strong>Descrição:</strong>
            <p>{incident.description}</p>
            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>
            <button
              onClick={() => handleDeleteIncidents(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
