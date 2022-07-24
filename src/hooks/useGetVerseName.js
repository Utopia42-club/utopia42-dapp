import { verseAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'

const useGetVerseName = () => {
    const web3 = useWeb3();
    const getName = async (contractAddress) => {
        const contract = await getContract(verseAbi, contractAddress, web3)

        if (!contract) {
            console.error('contract is null')
            return
        }

        const name = await contract.methods.verseName().call()

        return name
    }

    return getName
}

export default useGetVerseName