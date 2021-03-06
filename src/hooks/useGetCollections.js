import { utopiaFactoryAbi } from '../ABI/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { utopiaFactoryContractAddress } from '../ContractsAddresses'
import axios from 'axios'

const useGetCollections = () => {

    const web3 = useWeb3();
    const graphUrl = 'https://api.thegraph.com/subgraphs/name/jafari-mi/utopia42-mumbai'
    const getCollections = async (account) => {
        let factories;
        let totalData = await axios.post(
            graphUrl,
            {

              query:
              `{
                factories (
                  where: {
                    owner: "${account.toLowerCase()}"
                  }
                
                  ) {
                  id
                    collectionAddress
                    utopiaAddress
                  }
            }
              `
            }
          ).then((res) => {
            factories  = res.data.data.factories
        })
        
        return factories


        //   console.log(totalData)



        // const contract = getContract(utopiaFactoryAbi, utopiaFactoryContractAddress, web3)

        // if (!contract) {
        //     console.error('contract is null')
        //     return
        // }

        // const collections =  await contract.methods.userInfo(account).call()

        // return collections

    }



    return getCollections
}

export default useGetCollections