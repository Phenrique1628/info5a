import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cotacao, setCotacao] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega dados dos "clientes" e "produtos"
  useEffect(() => {
    async function fetchData() {
      try {
        const [clientesRes, produtosRes, cotacaoRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://fakestoreapi.com/products'),
          fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL?token=927c456f9a4bec44887e5cc0e2d154c8f843f33855ec2ec0d15db596ee7d19cd'),
          
        ]);

       // const clientesData = await clientesRes.json();
       // const produtosData = await produtosRes.json();
        const cotacaoData = await cotacaoRes.json();

        setClientes(clientesData);
        setProdutos(produtosData);
        

      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard com clientes e produtos" />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1>Dashboard</h1>

        {loading ? (
          <p>Carregando dados...</p>
        ) : (
          <>
            <section style={{ marginBottom: '2rem' }}>
              <h2>📋 Clientes</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cidade</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td style={{ padding: '0.5rem' }}>{cliente.name}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.address.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
              <h2>📦 Produtos</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((produto) => (
                    <tr key={produto.id}>
                      <td style={{ padding: '0.5rem' }}>{produto.title}</td>
                      <td>R$ {produto.price.toFixed(2)}</td>
                      <td>{produto.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
             <section>

        
            </section>
          </>
        )}
      </main>
    </>
  );
}
