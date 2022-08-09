import { Input, TriangleDown, Textarea } from "../common/FormControlls";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import useUpdateSettings from '../../hooks/useUpdateSetting'
import Swal from "sweetalert2";

const AddNewItem = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const {citizenId} = props
  const [socialLinks, setSocialLinks] = useState([]);
  const [bio, setBio] = useState();
  const [userName, setUserName] = useState();
  const { account } = useWeb3React();
  const updateSettings = useUpdateSettings()

  const addNewItem = async (slag) => {
    let createID;
    try {
      createID = itemsList[itemsList.length - 1].id + 1;
    } catch {
      createID = itemsList.length;
    }
    setItemsList([
      ...itemsList,
      {
        id: createID,

        value: <div id={createID} key={createID}></div>,
        message: "",
      },
    ]);
    setSocialLinks([...socialLinks, { id: createID, key: "Instagram" }]);

    // handleChange('Instagram', createID, 'key')
  };

  const deleteItem = async (id) => {
    setItemsList(itemsList.filter((item) => item.id !== id));
    setSocialLinks(socialLinks.filter((item) => item.id !== id));
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

  const handleChange = async (value, id, status) => {
    let isValid;
    socialLinks.filter((item) => {
      if (item.id == id && status == "key") {
        item.key = value;
        if (item.value) {
          isValid = isValidUrl(item.value, item.key, status);
        }
      }
      if (item.id == id && status == "value") {
        isValid = isValidUrl(value, item.key, status);
        if (isValid != null) {
          item.value = value;
        }
      }
    });

    itemsList.filter((item) => {
      if (item.id == id) {
        if (isValid != null) {
          item.message = "";
        } else {
          item.message = "Invalid URL";
        }
      }
      setItemsList([...itemsList]);
    });
  };

  let valuesList = []
  let keysList = []

  const handleSave = async () => {
    if(!userName || userName.trim == '') {
      return Swal.fire({
        text: 'Please inter name',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    valuesList.push(userName)
    keysList.push('name')
    if(!bio || bio.trim == '') {
      return Swal.fire({
        text: 'Please inter bio',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    valuesList.push(bio)
    keysList.push('bio')
    console.log(socialLinks)
    socialLinks.map((item) => {
      if(item.value == undefined || !item.value) {
        return Swal.fire({
          text: 'Invalid URL',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      valuesList.push(item.value)
      keysList.push(item.key)
    })
    console.log(valuesList, keysList, citizenId)
    // await updateSettings(account, keysList, valuesList, citizenId)
  };

  return (
    <>
      <div className="wrap-container">
        <div className="container">
          <div></div>
          <div className="profile-item">
          <div className="item-p">
            <div>
                <Input
                  border="1px solid rgb(184, 184, 184)"
                  placeholder="Name*"
                  type="text"
                  fontSize="14px"
                  color="#999"
                  value={userName ?? ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <div>
                  <Textarea
                    border="1px solid rgb(184, 184, 184)"
                    placeholder="Bio*"
                    value={bio ?? ""}
                    color="#999"
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div id="newItems">
                {itemsList.map((item) => {
                  return (
                    <div key={item.id} style={{ marginBottom: "20px" }}>
                      <select
                        onChange={(event) =>
                          handleChange(event.target.value, item.id, "key")
                        }
                        className="profile-select select-box-profile"
                      >
                        <option>Instagram</option>
                        <option>Telegram</option>
                        <option>Discord</option>
                        <option>Facebook</option>
                        <option>Twitter</option>
                      </select>

                      <Input
                        border="1px solid rgb(184, 184, 184)"
                        style={{
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                        }}
                        placeholder="URL*"
                        type="text"
                        width="60%"
                        borderRadius="0px"
                        fontSize="14px"
                        color="#999"
                        onChange={(event) =>
                          handleChange(event.target.value, item.id, "value")
                        }
                      />

                      <img
                        style={{ cursor: "pointer", marginTop: "10px" }}
                        onClick={() => deleteItem(item.id)}
                        width="15px"
                        src="/media/common/delete.png"
                      />

                      {item.message && (
                        <p style={{ color: "red" }}>{item.message}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                style={{ marginTop: "30px" }}
                className="profile-btn"
                onClick={addNewItem}
              >
                Add new social link
              </button>
            </div>
            <div style={{ marginBottom: "10px", textAlign: "right" }}>
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
