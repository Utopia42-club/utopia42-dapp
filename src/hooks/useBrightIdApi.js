import axios from "axios";
import { useWeb3React } from '@web3-react/core'

const useBrightIdApi = () => {
    const { account } = useWeb3React()
    const getBrightIdData = async () => {
        let data = {}
        try{
          await axios({
            url: `https://app.brightid.org/node/v5/verifications/UNBC/${account}?signed=eth&timestamp=seconds`,
            method: "GET",
          })
        
            // Handle the response from backend here
            .then((res) => { data.contextIds = res.data.data.contextIds;
                             data.sigR = res.data.data.sig.r;
                             data.sigS = res.data.data.sig.s;
                             data.sigV = res.data.data.sig.v ; 
                             data.timestamp = res.data.data.timestamp;
            })
            .catch((err) => { return data.error = err.response.data.errorMessage });
        }
        catch{
          console.log('err')
        }

        
            // Catch errors if any


            return data
    }

    return getBrightIdData
}

export default useBrightIdApi