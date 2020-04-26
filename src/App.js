import React, { useState, useEffect } from 'react';
import './App.css';
import './northland.scss';
import Item from './components/Item';
import Axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(false);
      await Axios.get('https://api.ervandra.com/pasar.json')
        .then(response => {
          if (response.status === 200) {
            setData(response.data);
          } else {
            setError(true)
          }
        })
        .catch(err => {
          console.log('err', err)
          setError(true)
        }).finally(() => setLoading(false))
    }
    if (data.length === 0 && !isError && !isLoading) {
      getData();
    }
  }, [data, isError, isLoading])

  // const data = {
  //   title: 'Nasi Lemak',
  //   description: 'Nasi, telor, bihun, kerupuk, timun, sambal mantap!',
  //   image: nasiLemak
  // }
  return (
    <div className="container">
      <header id="header">
        <h1><span>★</span> Pasar Northland <span>★</span></h1>
        <p>Kumpulan jajanan dan masakan apartemen Northland Ancol Residence.</p>
      </header>
      <section id="content">
        {data.length === 0 || isLoading || isError ? (
          <div className="loading">
            <p>Loading..</p>
          </div>
        ) : (
            <div className="list-jajanan">
              {data.length > 0 && data.map((item, index) => <Item key={item.title + index} data={item} />)}
            </div>
          )}

      </section>
      <footer id="footer">
        <div className="copyright"><small>v1.0</small> | Dibuat oleh <a href="https://www.ervandra.com" target="_blank" rel="noreferrer noopener">ervandra.com</a></div>
      </footer>
    </div>
  );
}

export default App;
