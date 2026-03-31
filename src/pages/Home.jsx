import React, { useContext, useEffect, useRef } from "react";
import "../App.css";
import { RiImageAiLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";
import { MdChatBubbleOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FaArrowUpLong } from "react-icons/fa6";
import { dataContext } from "../context/UserContext";
import Chat from "./Chat";

function Home() {
  let { startRes, setStartRes, popUp, setPopUp} = useContext(dataContext);
  const popUpRef = useRef(null);
  const addBtnRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!popUp) return;

      const clickedInsidePopup = popUpRef.current?.contains(e.target);
      const clickedAddButton = addBtnRef.current?.contains(e.target);

      if (!clickedInsidePopup && !clickedAddButton) {
        setPopUp(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setPopUp(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [popUp, setPopUp]);

  function handleSubmit(e) {
    e.preventDefault();
    setPopUp(false);
    setStartRes(true);
  }
  return (
    <div className="home">
      <nav>
        <div className="logo">Endtech AI Bot</div>
      </nav>
      {!startRes?<div className="hero">
        <span id="tag">What can I help you with ?</span>
        <div className="cate">
          <div className="upImg">
            <RiImageAddLine />
            <span>Upload Image</span>
          </div>
          <div className="genImg">
            <RiImageAiLine />
            <span>Generate Image</span>
          </div>
          <div className="chat">
            <MdChatBubbleOutline />
            <span>Let's Chat</span>
          </div>
        </div>
      </div>: 
      <Chat />}
      
      <form className="input-box" onSubmit={handleSubmit}>
        {popUp && <div className="pop-up" ref={popUpRef}>
          <div className="select-up">
            <RiImageAddLine />
            <span>Upload Image</span>
          </div>
          <div className="select-gen">
            <RiImageAiLine />
            <span>Generate Image</span>
          </div>
        </div>}
        <button id="add" type="button" ref={addBtnRef} onClick={() => setPopUp(prev => !prev)}>
          <FiPlus />
        </button>
        <input type="text" placeholder="Ask Something..." />
        <button id="submit" type="submit">
          <FaArrowUpLong />
        </button>
      </form>
    </div>
  );
}

export default Home;
