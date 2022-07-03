import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'

const useUserRegisterNFTs =  (account) => {
    const web3 = useWeb3()
    const getRegisterNFTs = async () => {
        // console.log(account)
        // account = '0xF3cB8cb6170FA64Ea20DFe4D46762fb4d9BB23f4'
        if (account != undefined){
            const contractAddress = '0x7A4aCd401DBea587fb7ecC42D6a74AED86694fE2';
            const contract = getContract(unbcNFTAbi, contractAddress, web3)
            const res =  await contract.methods.uniqueOwner(account).call();
            // console.log(res)
            return res
        }
    }

    return getRegisterNFTs
}

export default useUserRegisterNFTs