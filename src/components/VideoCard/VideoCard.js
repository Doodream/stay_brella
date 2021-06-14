import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

export default function VideoCard({ thumbnail, videoId }) {
  const handleOpen = () => (modal.current.style.display = "flex");
  const handleClose = () => (modal.current.style.display = "none");

  return (
    <div>
      <Modal onClick={handleClose}>
        {/* //<!-- Modal content --> */}
        <div className="modal-content" onClick={(e) => e.preventDefault()}>
          <iframe
            id="iframe-video"
            width="1000"
            height="600"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            autoPlay={1}
            allow="accelerometer; ; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        </div>
      </Modal>
      <VideoCardButton onClick={() => handleOpen()}>
        <VideoCardBox>
          <img src={thumbnail} alt="썸네일"></img>
        </VideoCardBox>
      </VideoCardButton>
    </div>
  );
}

const Modal = styled.div`
  display: none; /* Hidden by default */
  justify-content: center;
  align-items: center;
  position: fixed; /* Stay in place */
  z-index: 200; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  .modal_content {
    z-index: 200;
  }
`;

const VideoCardButton = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const VideoCardBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 100%;
    height: 100%;
    margin-top: 0;
    margin-bottom: 0;
    border: none;
  }
`;
