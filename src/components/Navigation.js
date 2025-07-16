import { ethers } from 'ethers'
import { useState } from 'react'

const Navigation = ({ account, setAccount }) => {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectHandler = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask and try again.')
      return
    }
    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account)
    } catch (error) {
      if (error.code === 4001) {
        // User rejected request
        alert('Connection request was rejected.')
      } else {
        alert('An error occurred while connecting to MetaMask.')
        console.error(error)
      }
    }
    setIsConnecting(false)
  }

  return (
    <nav>
      <div className='nav__brand'>
        <h1>Dappcord</h1>
      </div>

      {account ? (
        <button
          type="button"
          className='nav__connect'
        >
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className='nav__connect'
          onClick={connectHandler}
          disabled={isConnecting || !window.ethereum}
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      )}
    </nav>
  );
}

export default Navigation;