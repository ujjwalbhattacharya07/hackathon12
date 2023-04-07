import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Creator from '../../components/Creator'
import { useEffect, useState} from 'react'

const home = () => {
  const [account, setAccount] = useState()

  useEffect(() => {
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res) => setAccount(res[0]))
    } else {
      alert('install metamask extension!!')
    }
  })

  const styles = {
    container: {
      background: 'linear-gradient(180deg, #01204c 0%, #7149e1 100%)',
      minHeight: '100vh', // set a minimum height to ensure the gradient fills the whole page
    },
  };

  return (
    <div style={styles.container}>
      <Header />
      <Creator/>
      <Footer/>
    </div>
  )
}

export default home
