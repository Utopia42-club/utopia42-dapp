import { unbcNFTAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'

const useUserNFTs =  (account) => {
    const web3 = useWeb3()
    const getNFTs = async () => {
        // console.log(account)
        // account = '0xF3cB8cb6170FA64Ea20DFe4D46762fb4d9BB23f4'
        if (account != undefined){
            const contractAddress = '0xb800B8AC21a451444A5E9d21ce0ac89Da219F3D4';
            const contract = getContract(unbcNFTAbi, contractAddress, web3)
            const res =  await contract.methods.tokensOfOwner(account).call();
            // console.log(res)
            return res
        }
    }

    return getNFTs
}

export default useUserNFTs