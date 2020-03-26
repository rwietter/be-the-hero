import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import '../../global.css';
import './styles.css';
import logo from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      const id = await api.get('ongs');
      console.log(id.data[0].name);

      for (let i = 0; i < id.data.length; i++) {
        if (id.data[i].name === name) {
          alert('Esta ONG já está cadastrada');
          return;
        }
      }
      const response = await api.post('ongs', data);
      alert(`Cadastro realizado, seu ID é: ${response.data.id}`);
      history.push('/');
    } catch (e) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajuda pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link to="/" className="back-link">
            <FiArrowLeft
              size={16}
              color="#E02041"
              className="logon-form-icon"
            />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nome da ONG"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="E-mail"
          />
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            type="number"
            placeholder="Whatsapp"
          />
          <div className="input-group">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="Cidade"
            />
            <input
              value={uf}
              onChange={(e) => setUF(e.target.value)}
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
