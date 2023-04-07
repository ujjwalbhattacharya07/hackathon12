import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import DashboardComp from '../../components/DashboardComp'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import factoryABI from '../../constants/abi/factory.json'
import factoryAddress from '../../constants/contractAddresses.json'
import { useWeb3React } from '@web3-react/core'
import { toast,ToastContainer } from 'react-toastify'
import Footer from '../../components/Footer'


const dashboard = () => {
  const contractAddress = factoryAddress.tokenFactory
  const web3 = new Web3('https://liberty20.shardeum.org')

  const [tokenAddresses, setTokenAddresses] = useState([])
  const [tokensCreated, setTokensCreated] = useState(0)
  const { chainId, account, activate, active, library } = useWeb3React()


  const factoryTokenContract = new web3.eth.Contract(
    factoryABI,
    contractAddress,
  )

  useEffect(() => {
    if(active){
      async function fetchTokensCreated() {
        const tempTokensCreated = await factoryTokenContract.methods
          .getTokensCreatedLength(account)
          .call()
        setTokensCreated(tempTokensCreated)
      }
      fetchTokensCreated()
    }else{
      // toast.warning("Please Connect Your Wallet To View Dashboard")
    }
  }, [active])

  useEffect(() => {
    async function fetchTokensAddress() {
      for (var i = 0; i < tokensCreated; i++) {
        var tokenAddress = await factoryTokenContract.methods
          .creatorsMap(account, [i])
          .call()
        setTokenAddresses((arr) => [...new Set([...arr, tokenAddress])])
      }
    }
    fetchTokensAddress()
  }, [tokensCreated])

  return (
    <div className="lg:h-screen h-full relative">
      <Head>
        <title>Dashboard | Your NFTs</title>
      </Head>
      <div className="w-full h-full absolute top-0 left-0">
        <div
          className="w-full h-full absolute top-0 left-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, #01204c, #7149e1)`,
            animation: "pulse 2s ease-in-out infinite"
          }}
        />
      </div>
      <Header />
      <div className=' mt-16 flex justify-evenly flex-wrap w-full'>
        {tokenAddresses.map((value) => {
          return (
            <DashboardComp tokenAddress={value} />
          )
        })}
      </div>
      <Footer/>
    </div>
  )
}

export default dashboard
