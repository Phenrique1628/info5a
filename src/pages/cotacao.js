import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import styles from '../styles/Home.module.css';

function Converte(date) {
  return date.replace(/-/g, '');
}

export default function Home() {
  const [dataInicial, SetDataInicial] = useState('');
  const [dataFinal, SetDataFinal] = useState('');
  const [url, SetUrl] = useState(null);

  const { data, error, isLoading } = useSWR(url, fetcher);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataInicial && dataFinal) {
      const start = Converte(dataInicial);
      const end = Converte(dataFinal);

      SetUrl(
        `https://economia.awesomeapi.com.br/json/daily/USD-BRL/?start_date=${start}&end_date=${end}`
      );
    }
  };

  return (
    <main style={{ fontFamily: 'Arial' }}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <h1 style={{marginBottom: 30, marginTop: -10, marginLeft: 10, color: '#112A46'}}>COTAÇÃO DE MOEDAS</h1>
      <h2 style={{marginTop: 8, marginBottom: -10, color: '#112A46'}}>Data Inicial</h2>
        <input
          type='date'
          value={dataInicial}
          className={styles.input}
          onChange={(e) => SetDataInicial(e.target.value)}
        />
        <h2 style={{marginTop: 25, marginBottom: -10, color: '#112A46'}}>Data Final</h2>
        <input
          type='date'
          value={dataFinal}
          className={styles.input}
          onChange={(e) => SetDataFinal(e.target.value)}
        />
        <button type='submit' className={styles.button}>Buscar</button>
      </form>

      <h1 style={{marginLeft: 380, marginTop: 100}}>A Cotação aparecerá aqui 👉</h1>

      <div className={styles.div}>
        {isLoading && <p>Carregando...</p>}
        {error && <p>Erro ao carregar os dados.</p>}

        {data && Array.isArray(data) && (
          <ul>
            {data.map((cotacao) => (
              <li key={cotacao.timestamp} style={{ marginBottom: '1rem' }}>
                <strong>Data:</strong>{' '}
                {new Date(Number(cotacao.timestamp) * 1000).toLocaleDateString()}
                <br />
                <strong>Compra:</strong> R$ {cotacao.bid}
                <br />
                <strong>Venda:</strong> R$ {cotacao.ask}
                <br />
                <strong>Alta:</strong> R$ {cotacao.high}
                <br />
                <strong>Baixa:</strong> R$ {cotacao.low}
                <br />
                <strong>Variação:</strong> {cotacao.varBid} ({cotacao.pctChange}%)
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
