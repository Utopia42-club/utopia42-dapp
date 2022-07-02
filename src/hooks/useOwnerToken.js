import { unbcNFTAbi } from '../ABI/ABI'
import Swal from 'sweetalert2';
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import useWeb3 from './useWeb3'

const useOwnerToken = (id, account) => {
    const web3 = useWeb3()
    const contractAddress = '0x7A4aCd401DBea587fb7ecC42D6a74AED86694fE2';

    const ownerOfToken = async (data) => {
        if (!id) {
            return Swal.fire({
                text: 'Invalid NFT Id',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
    
            })
        }
        let contextIds = data.contextIds
        let sgiR = '0x' + data.sigR
        let sugS = '0x' + data.sigS
        let sigV = data.sigV
        let timestamp = data.timestamp
        try {
                // const {ethereum} = window
                // if (ethereum) {
                const NFTContract = getContract(unbcNFTAbi, contractAddress, web3)
                let res =  await NFTContract.methods.ownerOf(id).call()
                console.log(account, res, id)
                if (account == res) {
                 await sendTransaction(
                        NFTContract,
                        'setBrightId',
                        [id,
                            contextIds,
                            timestamp, 
                            sigV,
                            sgiR,
                            sugS,],
                            account
                        
                      )

                    return Swal.fire({
                      text: "Successful Register",
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500
                    }) 
                }
                else{
                    return Swal.fire({
                        text: "You are not Owner of this NFT",
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                      }) 
                }
            // }
        // else{
        //         console.log('err')
        //         return Swal.fire({
        //             text: "'Ethereum object dose not exist'",
        //             icon: 'error',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //     }
        }
        catch(err){
            let error;
            err.reason ?  error = err.reason : error = err.message 
            //  setMintName('Mint')
            return Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        }

    }
    return ownerOfToken
}

export default useOwnerToken