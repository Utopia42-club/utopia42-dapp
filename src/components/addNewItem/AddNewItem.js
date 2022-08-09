// import { Input, TriangleDown, Textarea } from "../common/FormControlls";
import {Table, Tbody, Tr, Td, Th, Input, Button} from './table.style'
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState, useRef } from "react";
import useUpdateSettings from '../../hooks/useUpdateSetting'
import Swal from "sweetalert2";
import { async } from 'muon';

const AddNewItem = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const {citizenId} = props
  const [socialLinks, setSocialLinks] = useState([]);
  const [bio, setBio] = useState();
  const [userName, setUserName] = useState();
  const { account } = useWeb3React();
  const [newItems, setNewItems] = useState([])
  const updateSettings = useUpdateSettings()
  const [tableItem, setTableItem] = useState([])
  const socialMedias = ['Instagram', 'Telegram', 'Discord', 'Facebook', 'Other']
  const refs = useRef([])


  const addNewItem = async () => {


    if (tableItem.length > 0 ) {
      setData(prevState => ([
        ...prevState, {id:data[data.length-1].id + 1, value:'', key:socialMedias[0], dropDown:true}
      ]));
    }
    else{
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
      if(item.value == undefined || !item.value) {
        isCorrect = false
        return Swal.fire({
          text: `Invalid ${item.key} URL`,
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        })
      }
      if(item.key == undefined || !item.key) {
        isCorrect = false
        return Swal.fire({
          text: 'Invalid key',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        })
      }
      valuesList.push(item.value)
      keysList.push(item.key)
    })
    console.log(valuesList, keysList, citizenId)
    if (isCorrect) {
      await updateSettings(account, keysList, valuesList, citizenId)
    }
  };


  const [data, setData] = useState(
    [{id:0, key: 'name', value: 'my name'}, 
    {id:1, key: 'bio', value:'this is my bio'}, 
    {id:2, key:'instagram', value:'www.instagram.com'}, 
    {id:3, key:'telegram', value:'www.telegram.com'}]
  )

  const getKeys = () => {
    setTableItem([])
    data.map((item, index) => {
      {item.dropDown == true && item.key != 'Other' && item.input != true?
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
            <Td><Input style={{borderBottom:'2px solid #000'}} value={item.value ?? ''} onChange={(e) => handleChangeValue(e.target.value, item.key, item.id)}/></Td>
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
            <Th><Input placeholder="Enter new data" style={{borderBottom:'2px solid #000', color:'white', width:'50%'}} value={item.key ?? ''}  onChange={(e) => handleOtherKey(e.target.value,  item.id)}/></Th>
            <Td><Input style={{borderBottom:'2px solid #000'}} value={item.value ?? ''} onChange={(e) => handleChangeValue(e.target.value, item.key, item.id)}/></Td>
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
            <Td><Input ref={(element) => {refs.current[index] = element;}} value={item.value ?? ''} onChange={(e) => handleChangeValue(e.target.value, item.key, item.id)}/></Td>
            <Td className="secondTd">
              <Button className='editBtn' onClick={() => editItem(item.id)}>Edit</Button>
            </Td>
          </Tr>,])
      }
      })
  }

  const editItem = (id) => {
    refs.current[id].focus();
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
    console.log(value, key)
    const res = data.map(item => item.id == id ? {...item, value} : item)
    setData(res)
    console.log(data)
  }


  return (
    <>
      <div className="wrap-container">
        <div className="container">
          <div></div>
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
                save
              </button>
        </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default AddNewItem;
