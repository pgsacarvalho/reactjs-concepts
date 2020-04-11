import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepository] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
      });
    }, []);

  async function handleAddRepository() {
    const techsNoSapce = techs.map((tech) => tech.trim());

    const newRepo = {
      title,
      url,
      techs: techsNoSapce,
    }

    const response = await api.post('repositories', newRepo);
    if (response.status === 200){
      setRepository([...repos, response.data]);
    }    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if (response.status === 204){
      setRepository(repos.filter(repo => repo.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>           
          ))
        }
      </ul>

      <input placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
      />
      <input placeholder="https://url.com"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
      />

      <input placeholder="ReactJS, AnotherTech, etc"
                        value={techs.join()}
                        onChange={e => setTechs(e.target.value.split(','))}
      />    


      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
