import { useWeb3React } from '@web3-react/core';

const LogOutButton = () => {

    const { account, deactivate } = useWeb3React()

    const handleLogOut = () => {
        localStorage.setItem('walletConnectedFlag', 'false')
        try{
            deactivate()
        }
        catch{
            
        }
    }

    return(
        <>
            <img style={{cursor:'pointer'}} onClick={handleLogOut} width="25px" src='/media/common/logout-wallet.svg'/>
        </>
    )
}

export default LogOutButton