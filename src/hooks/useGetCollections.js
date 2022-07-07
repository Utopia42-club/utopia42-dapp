import { utopiaFactoryAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { utopiaFactoryContractAddress } from '../ContractsAddresses'
import axios from 'axios'

const useGetCollections = () => {
    const web3 = useWeb3();

    const getCollections = async (account) => {

        const contract = getContract(utopiaFactoryAbi, utopiaFactoryContractAddress, web3)

        if (!contract) {
            console.error('contract is null')
            return
        }

        const collections =  await contract.methods.userInfo(account).call()

        return collections

    }

    return getCollections
}

export default useGetCollections