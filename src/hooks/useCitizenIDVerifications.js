import axios from 'axios'

const useCitizenIDVerifications = () => {
    const graphUrl = 'https://api.thegraph.com/subgraphs/name/jafari-mi/utopia42citizenid'
    const getData = async () => {
      let data;
      let object = `{
        counters{
          totalVerified
        }
      }`

        await axios.post(
            graphUrl,
            {

              query:object

            }
          ).then((res) => {

            data  = res
        })
        return data.data.data.counters[0].totalVerified
    }

    return getData
}

export default useCitizenIDVerifications