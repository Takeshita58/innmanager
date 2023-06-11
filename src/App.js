import './App.css';
import MediaQuery from "react-responsive";
import { useState, useEffect } from 'react'
import Web3 from 'web3'




function App() {
  const [shortAddress, setShortAddress] = useState(null);
  const [connect, setConnect] = useState(false);
  const [defaultAccount, setDefaiultAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [NFTBalance, SetNFTBlance] = useState(0);

  const [supply, setSupply] = useState(0);

  const [waiting, setWaiting] = useState(false);


  const [errorMessage, setErrorMessage] = useState(null);


  const metamaskLogin = async (e) => {
    e.preventDefault();
    setWaiting(true);
    

    if (window.ethereum && window.ethereum.isMetaMask){
      
        await window.ethereum.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(window.ethereum);
        let chainID = await web3.eth.net.getId();
        console.log(chainID)
              if(chainID == 56){
                  let account = (await web3.eth.getAccounts())[0];
                  
                  setShortAddress(account.substr(0, 5) + "..." + account.substr(-4, 4));
                  accountChangeHandlerM(account);
                  //const _NFTContract = new web3.eth.Contract(voxvotNFT_abi, NFTContractAddress);
                  //setContract(_NFTContract);
              } else {
                try{
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
                  })
                }catch(error){
                  setWaiting(false);
                }
                
                  setErrorMessage('Please chenge network to BSC mainnet. Change network and refresh page.');
                  setWaiting(false);
              }
    } else {
        //console.log("need to install metamask");
        setErrorMessage('Please install MetaMask');
        setWaiting(false);
    }
  };

  const initOnchanged = () =>{
    if(window.ethereum){
        window.ethereum.on("accountsChanged", () => {
            window.location.reload();
        });
        window.ethereum.on("chainChanged", () => {
            window.location.reload();
        });
    }
  };

  const accountChangeHandlerM = (newAddress) => {
    setDefaiultAccount(newAddress);
  }

  useEffect(() => {
    //initOnchanged();
    
  },[]);

  useEffect( () => {
    if(contract != null){
      (async () => {
        setConnect(true);
        setWaiting(false);
      })();
    }
  },[contract]);
  
  return (
    <div className="App">



   
          <header className="mApp-header">
            
            
              <img alt="icon" src={"/INN_logo.png"} className="logo"/>
              <div style={{display: "table"}}>
                <div style={{verticalAlign: "middle", display: "table-cell", fontWeight: "bold", color: "gray"}}>manager</div>
              </div>
            
            
          </header>

          <section style={{minHeight: "100vh", backgroundColor: "black"}}>
            <div style={{paddingTop: "9vh", color: "white", borderColor: "white"}}>group list</div>
          </section>



        

        

      <div className='mfooter' style={{marginTop: "-1px"}}>
        <div style={{width: "100%", height:"100%"}}>
          <div>
            <div style={{width:"30%", marginRight:"auto", marginLeft:"auto", marginBottom: "30px", marginTop: "10px"}}>
              <div className='flex between'>
                <img alt="icon" src={"/oumc.jpg"} className="logo"/>
                <div style={{display: "table"}}>
                  <div style={{verticalAlign: "middle", display: "table-cell", fontWeight: "bold", color: "#cc3600"}}>INN manager</div>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
