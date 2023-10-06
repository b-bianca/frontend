"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styles from '../styles/styles.module.css'

interface Transaction {
  Type: string
  DateOfSale: string
  Product: string
  Price: number
  Seller: string
  CreatedAt: string
}

export default function List() {
  
  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerBalance, setSellerBalance] = useState<string | null>(null)
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  const retrieveData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/transactions');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data. Please try again', error);
    }
  };

  const retrieveSellerBalance = async (sellerName: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/productor/balance?seller=${sellerName}`);
      if (response.data.includes("final balance is")) {
        setSellerBalance(response.data);
      } else {
        const secondResponse = await axios.get(`http://localhost:8080/api/v1/affiliate/balance?seller=${sellerName}`);
        setSellerBalance(secondResponse.data);
      }
    } catch (error) {
      console.error('Error fetching balance. Please try again.', error);
    }
  };

  useEffect(() => {
    retrieveData();
    const retrieve = async () => {
      await retrieveData();
    }
    retrieve()
  }, []);
;

  return (
    
    <div className={`flex flex-col bg-stone-500`}>
      <header className='flex justify-center bg-stone-600'>
        <svg width="300px" height="122px" viewBox= '-20 0 152 25' fill="none" xmlns="http://www.w3.org/2000/svg" 
        className="css-7zhfhb"><path d="M74.1304 14.1759C76.1527 12.7038 77.186 10.7273 77.186 8.16177C77.186 5.84796 76.3239 3.91173 74.6006 2.35509C72.9197 0.799463 70.8077 0 68.3513 0H56.3712V29.4523H78.3492V14.1759H74.1304ZM73.3941 24.9082H61.3274V4.54405H68.3513C70.5488 4.54405 72.2298 6.22755 72.2298 8.4145C72.2298 10.6014 70.5488 12.2849 68.3513 12.2849H66.2826V16.6608H73.393V24.9082H73.3941Z" fill="#1A1C18"></path><path d="M17.8839 0H22.8401V29.4523H17.8839V16.7041H4.95619V29.4533H0V0H4.95619V12.0755H17.8839V0Z" fill="#1A1C18"></path><path d="M28.2521 0H33.2083V19.3965C33.2083 22.973 35.3626 25.2868 39.6722 25.2868C43.9818 25.2868 46.1361 22.973 46.1361 19.3965V0H51.0923V19.6916C51.0923 22.8471 50.0146 25.3301 47.9036 27.223C45.7916 29.0747 43.0341 30 39.6722 30C36.3113 30 33.5528 29.0747 31.4418 27.223C29.3298 25.3301 28.2532 22.8471 28.2532 19.6916V0H28.2521Z" fill="#1A1C18"></path><path d="M88.5854 24.8246H100.868V29.4533H83.6292V0H88.5854V24.8246Z" fill="#1A1C18"></path><path d="M126.656 29.4523L124.544 23.5197H111.702L109.59 29.4523H104.204L115.15 0H121.098L132 29.4523H126.656ZM113.341 18.9757H122.907L118.125 5.67981L113.341 18.9757Z" fill="#1A1C18"></path></svg>
      </header>

        {isLoading ? 
        (
          <p>Loading...</p>
        ) : (
          <table style={{ borderCollapse: 'separate', borderSpacing: '10px' }}>
          <thead>
            <tr>
              <th>Type</th>
              <th>DateOfSale</th>
              <th>Product</th>
              <th>Price</th>
              <th>Seller</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
         {data.map((item) => (
              <tr key={item.Type} style={{ textAlign: 'center' }} >
              <td>{item.Type}</td>
              <td>{item.DateOfSale.substring(0, 10)}</td>
              <td>{item.Product}</td>
              <td>R${item.Price}</td>
              <td>
                 <button
                onClick={() => {
                  setSelectedSeller(item.Seller);
                  retrieveSellerBalance(item.Seller)
                }}
              >
                {item.Seller}
              </button>
              </td>
              <td>{item.CreatedAt.substring(0, 10)}</td>
            </tr>
          ))}
      </tbody>
      </table>
        )}
<Modal
        isOpen={selectedSeller !== null}
        onRequestClose={() => setSelectedSeller(null)}
        style={{
          content: {
            width: '560px',
            height: '150px', 
            margin: 'auto', 
            background: 'gray',
          },
        }}
      >
       {selectedSeller && (
          <div>
            <button className={styles.closebutton}  onClick={() => setSelectedSeller(null)}>Close</button>
            <br/>
            Seller: {selectedSeller}
            <br />
            {sellerBalance ? (
              <div>
                Ballance: {sellerBalance}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </Modal>
  </div>
  );
}