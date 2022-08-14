// import { Input, TriangleDown, Textarea } from "../common/FormControlls";
import {Table, Tbody, Tr, Td, Th, Input, Button} from './table.style'
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState, useRef } from "react";
import useUpdateSettings from '../../hooks/useUpdateSetting'
import Swal from "sweetalert2";
import axios from 'axios';
import { GradientTitle } from '../text/Title';

const AddNewItem = (props) => {
  const {citizenId} = props
  const { account } = useWeb3React();
  const updateSettings = useUpdateSettings()
  const [tableItem, setTableItem] = useState([])
  const optionList = ['Name', 'Bio', 'Instagram', 'Telegram', 'Discord', 'Facebook', 'Other']
  const [socialMedias, setSocialMedias ]= useState([])
  const refs = useRef([])
  const [saveBtnName, setSaveBtnName] = useState('Save')
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])
  const [intervalId, setIntervalId] = useState(null)

  const addNewItem = async () => {

    clearInterval(intervalId)

    if (tableItem.length > 0 ) {
      setData(prevState => ([
        ...prevState, {id:data[data.length-1].id + 1, value:'', key:socialMedias[0], dropDown:true}
      ]));
    }
    else {
      setData(prevState => ([
        ...prevState, {id:data.length, value:'', key:socialMedias[0], dropDown:true}
      ]));
    }
    
  };

  const isValidUrl = (url, key) => {
    let regex = {
      Telegram: "(https?://)?(www[.])?(telegram|t).me/([a-zA-Z0-9_-]*)/?$",
      Instagram: "(?:(?:http|https)://)?(?:www.)?instagram.com/?",
      Discord: "(?:(?:http|https)://)?(?:www.)?discord.com/?",
      Facebook: "(?:(?:http|https)://)?(?:www.)?facebook.com/?",
      Twitter: "(?:(?:http|https)://)?(?:www.)?twitter.com/?",
    };

    return url.match(regex[key]);
  };

  let valuesList = []
  let keysList = []

  const handleSave = async () => {
    let isCorrect = true
    data.map((item) => {
      if(item.value == '' && item.key == '') {
        isCorrect = false
        return Swal.fire({
          text: `Please enter value.`,
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        })
      }
      if(item.value == undefined || !item.value) {
        isCorrect = false
        return Swal.fire({
          text: `Please enter ${item.key}.`,
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        })
      }
      if(item.key == undefined || !item.key) {
        isCorrect = false
        return Swal.fire({
          text: 'Please enter key.',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        })
      }
      let editedData = originalData.filter(originalItem => originalItem.key == item.key)
      if(editedData[0] && editedData[0].value != item.value){
        valuesList.push(item.value)
        keysList.push(item.key)
      }
      if(!editedData[0]){
        valuesList.push(item.value)
        keysList.push(item.key)
      }
    })
    if (isCorrect) {
      // console.log(valuesList, keysList)
      if (valuesList.length == 0) {
        return Swal.fire({
          text: 'No data to update',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        })
      }
      setSaveBtnName('Saving ...')
      try{
        await updateSettings(account, keysList, valuesList, citizenId)
      }
      catch {
        setSaveBtnName('Save')
      }
      setSaveBtnName('Save')
      setIntervalId(setInterval(() => {
        getData()
      }, 3000)
      )
    }
  };

  const getData = async () => {
    // console.log('Get Item', citizenId, account)
    let res = await axios.post(
      'https://api.thegraph.com/subgraphs/name/jafari-mi/utopia42-settings-mumbai',
      {
        query: `
        {
          
            citizenIDs(where:{tokenID: "${citizenId}"}){
              id
              tokenID
              keys
              values
            
          }
        }
        
        `
      }
      ).then((res) => {
        // console.log(res.data.data.citizenIDs)
        let result;
        if (res.data.data.citizenIDs.length > 0){
          result = res.data.data.citizenIDs[0].keys.map((item, index) => {
            return {id:index, key:item, value:res.data.data.citizenIDs[0].values[index]}
          })
        }
        else{
          result = []
        }
        result.map((item) => {
          optionList = optionList.filter(i => i != item.key)
        })
        // console.log(result)
        setSocialMedias(optionList)
        setData(result)
        setOriginalData(result)

        // console.log(res.data.users.value)
      })
  }

  useEffect(() => {
      // setIntervalId(setInterval(() => {
        getData()
      // }, 3000)
    // )

  }, [account])

  const getKeys = () => {
    setTableItem([])
    // console.log(data)
    data.map((item, index) => {
      {item.key == 'avatar'? '' :
      item.dropDown == true && item.key != 'Other' && item.input != true?
        setTableItem(Item => [...Item,
          <Tr key={index}>
            <Th>
              <select onChange={(event) => handleChangeKey(event.target.value, item.id)}>
              {socialMedias.map((item) => {
                return <option>{item}</option>
              })
              }
              </select>
            </Th>
            <Td><Input className='table-input' style={{borderBottom:'2px solid #000'}} value={item.value ?? ''} onChange={(e) => handleChangeValue(e.target.value, item.key, item.id)}/></Td>
            <Td className="secondTd">
            <img
                style={{ cursor: "pointer", margin: "10px" }}
                onClick={() => deleteItem(item.id)}
                width="15px"
                src="/media/common/delete.png"
              />
            </Td>
          </Tr>])
        :
        item.key == "Other" || item.input ?
        setTableItem(Item => [...Item,
          <Tr key={index}>
            <Th><Input className='table-input' style={{borderBottom:'2px solid #000', color:'white', width:'50%'}} value={item.key ?? ''}  onChange={(e) => handleOtherKey(e.target.value,  item.id)}/></Th>
            <Td><Input className='table-input' style={{borderBottom:'2px solid #000'}} value={item.value ?? ''} onChange={(e) => handleChangeValue(e.target.value, item.key, item.id)}/></Td>
            <Td className="secondTd">
            <img
                style={{ cursor: "pointer", margin: "10px" }}
                onClick={() => deleteItem(item.id)}
                width="15px"
                src="/media/common/delete.png"
              />
            </Td>
          </Tr>,])
        :
        setTableItem(Item => [...Item,
          <Tr key={index}>
            <Th>{item.key}</Th>
            <Td><Input className='table-input' readOnly ref={(element) => {refs.current[index] = element;}} value={item.value ?? ''} onChange={(e) => handleChangeValue(e.target.value, item.key, item.id)}/></Td>
            <Td className="secondTd">
              <img style={{margin:'10px', cursor:'pointer'}} width='20px' src='/media/common/edit.png' onClick={() => editItem(item.id)} />
            </Td>
          </Tr>,])
      }
      })
  }

  const editItem = (id) => {
    clearInterval(intervalId)
    refs.current[id].focus();
    refs.current[id].readOnly = false
  }

  const deleteItem = (id) => {
    let res = data.filter((item) => {
      return item.id != id
    })
    setData(res)
  }

  useEffect(() => { 
    getKeys()
  }, [data])

  const handleOtherKey = (key, id) => {
    let res = data.map(item => item.id == id ? {...item, dropDown : false, input : true, key} : item)
    setData(res)
  }
  
  const handleChangeKey = (key, id) => {
    let res;
    if (key != 'Other'){
      res = data.map(item => item.id == id ? {...item, key} : item)
      
    }
    else{
      res = data.map(item => item.id == id ? {...item, key:'', dropDown : false, input : true} : item)
    }
    
    // setData(res)
    // res = data.map(item => item.key == 'Other' ? {...item, dropDown : false, input : true} : item)
    setData(res)
  }
  
  const handleChangeValue = (value, key, id) => {
    const res = data.map(item => item.id == id ? {...item, value} : item)
    setData(res)
    // console.log(data)
  }


  return (
    <>
      <div className="wrap-container">
        <div className="container">
          <div></div>
          <div>
            <div style={{textAlign:'center', marginBottom:'15px'}}>
              <GradientTitle margin="0 0 10px">Settings</GradientTitle></div>
            <div className="profile-item" >
              <Table id="table">
                <Tbody>
                  {tableItem}
                </Tbody>
              </Table>
              <button
                style={{ marginTop: "20px" }}
                className="profile-btn"
                onClick={addNewItem}
              >
                Add new Item
              </button>
              <div className='saveBtn'>
                    <button onClick={handleSave} className="profile-btn">
                      {saveBtnName}
                    </button>
              </div>
            </div>
            </div>
        </div>
      </div>
    </>
    
  );
};

export default AddNewItem;
