import React, { useState } from "react";
import Script from 'next/script'

export default function Show3dAvatar(props) {
  const {avatarLink} = props
  const modelRef = React.useRef();
  const [annots, setAnnots] = useState([]);
  const modelViewerStyle = {
    border:'1px solid #ccc',
    cursor: 'grab',
    display: 'flex',
    height: '300px',
    width: '100%',
    overflow: 'hidden',
    background:'white',
    // position: 'relative',
    userSelect: 'none',
    borderRadius: '50%',
    boxShadow:'3px 5px 10px rgba(0,0,0, .2)',
    // maxWidth:"715px",
  }

  const handleClick = (event) => {
    const { clientX, clientY } = event;

    if (modelRef.current) {
      let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
      if (hit) {
        setAnnots((annots) => {
          return [...annots, hit];
        });
      }
    }
  };

  const getDataPosition = (annot) => {
    return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
  };

  const getDataNormal = (annot) => {
    return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
  };

  return (
    <>
    <Script
    type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
    ></Script>
    {avatarLink || avatarLink.trim() != '' ?
      <model-viewer
        style={modelViewerStyle}
        src={avatarLink}
        alt="A rock"
        camera-controls
        seamless-poster shadow-intensity="1"
        ar
        ar-modes="webxr scene-viewer quick-look"
        onClick={handleClick}
        ref={(ref) => {
          modelRef.current = ref;
        }}
      >
        {annots.map((annot, idx) => (
          <button
          style={{display:"none"}}
            key={`hotspot-${idx}`}
            className="view-button"
            slot={`hotspot-${idx}`}
            data-position={getDataPosition(annot)}
            data-normal={getDataNormal(annot)}
          ></button>
        ))}
      </model-viewer>
      :
      <div>
        <img className="noAvatar" height='200px' src='media/common/avatar-1.jpg'/>
      </div>
    }
    </>
  );
}
