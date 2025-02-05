import style from '../styles/PotCard.module.css';
import truncateEthAddress from 'truncate-eth-address';
import { useAppContext } from '../context/context';
import { useEffect, useState } from 'react'; // Add this import
import Web3 from 'web3'; // Add this import

const LotteryCard = () => {
  const { lotteryId, lastWinner, lotteryPot, enterLottery, pickWinner } =
    useAppContext();
  const [web3, setWeb3] = useState(null);

  // Initialize Web3 and set it to state
  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable(); // Request user permission
        setWeb3(web3Instance);
      }
    }
    initWeb3();
  }, []);

  // Function to handle the "Enter" button click
  const handleEnterLottery = async () => {
    if (web3) {
      const contractAddress = '0x74556d3dd00567327cB7959E9694BaAb7e2CE537'; // Replace with your contract address
      const contractABI = [
      	{
      		"inputs": [],
      		"name": "enter",
      		"outputs": [],
      		"stateMutability": "payable",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "pickWinner",
      		"outputs": [],
      		"stateMutability": "nonpayable",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "address payable",
      				"name": "_treasury",
      				"type": "address"
      			}
      		],
      		"stateMutability": "nonpayable",
      		"type": "constructor"
      	},
      	{
      		"inputs": [],
      		"name": "getBalance",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "getLotteryId",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "getPlayers",
      		"outputs": [
      			{
      				"internalType": "address payable[]",
      				"name": "",
      				"type": "address[]"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "getRandomNumber",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "getWinners",
      		"outputs": [
      			{
      				"internalType": "address[]",
      				"name": "",
      				"type": "address[]"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "lotteryId",
      		"outputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "owner",
      		"outputs": [
      			{
      				"internalType": "address",
      				"name": "",
      				"type": "address"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"name": "players",
      		"outputs": [
      			{
      				"internalType": "address payable",
      				"name": "",
      				"type": "address"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [],
      		"name": "treasury",
      		"outputs": [
      			{
      				"internalType": "address payable",
      				"name": "",
      				"type": "address"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	},
      	{
      		"inputs": [
      			{
      				"internalType": "uint256",
      				"name": "",
      				"type": "uint256"
      			}
      		],
      		"name": "winners",
      		"outputs": [
      			{
      				"internalType": "address",
      				"name": "",
      				"type": "address"
      			}
      		],
      		"stateMutability": "view",
      		"type": "function"
      	}
      ]; // Replace with your contract ABI

      const lotteryContract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();

      try {
        await lotteryContract.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('777', 'ether'), // Sending 1 ETH, adjust as needed
        });
        console.log('Entered the lottery successfully');
      } catch (error) {
        console.error('Error entering the lottery', error);
      }
    } else {
      console.error('Web3 is not initialized. Make sure you have a compatible wallet and network connected.');
    }
  };
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        PWR-Ball{' '}
        <span className={style.textAccent}>#{lotteryId ? lotteryId : '0'}</span>
      </div>
      <div className={style.paragragh}>
        Welcome to the System 7 PWR-Ball To enter, youll need 777 PWR tokens. Drawn every 3 days. If youre feeling lucky, you could be the next winner of the PWR-Ball jackpot
      </div>
      <div className={style.recentWinnerTitle}>
        Winner takes all!
      </div>
      <div className={style.pot}>
        Pot 🍯: <span className={style.goldAccent}>{lotteryPot} PWR</span>
      </div>
      <div className={style.recentWinnerTitle}>🏆Last Winners🏆</div>
      {!lastWinner.length ? (
        <div className={style.winner}>No winner yet</div>
      ) : (
        lastWinner.length > 0 && (
          <div className={style.winner}>
            {truncateEthAddress(lastWinner[lastWinner.length - 1])}
          </div>
        )
      )}
      <div className={style.btn} onClick={handleEnterLottery}>
        Enter
      </div>
    </div>
  );
};
export default LotteryCard;
