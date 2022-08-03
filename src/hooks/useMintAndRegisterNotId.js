import { mrc721MinterAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { minterContractAddress } from '../ContractsAddresses';
import useWalletBalance from './useWalletBalance'
import { fromWei } from '../utils/wei'
import { sendTransaction } from '../utils/sendTx'
import Swal from 'sweetalert2'

const useMintAndRegisterNotId = (account, chainId) => {
    const web3 = useWeb3()
    let status = 'Mint and Register'
    const balance = useWalletBalance(account, chainId)
    const mintAndRegisterNotID = async () => {
        
        if (account != undefined){
            // const contractAddress = '0xb800B8AC21a451444A5E9d21ce0ac89Da219F3D4';
            // console.log(balance)
            const fetchBalance = await balance()
            const contract = getContract(mrc721MinterAbi, minterContractAddress, web3)
            const price =  await contract.methods.price('1').call()
            // console.log(fetchBalance)
            if (Number(fetchBalance) < fromWei(price)){
              return Swal.fire({
                text: 'Insufficient balance',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              })
            }
            // console.log(res)
            return sendTransaction(
                status,
                contract,
                'mintAndRegister',
                [account],
                account,
                price
              )
        }
    }

    return mintAndRegisterNotID
}

export default useMintAndRegisterNotId