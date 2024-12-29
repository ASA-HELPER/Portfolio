import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./contact-styles.scss";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sendMessage } from "../../store/slices/messageSlice";
import CustomInput from "../input/CustomInput";
import CustomButton from "../button/CustomButton";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const {error,loading,message:responseMessage} = useSelector((state:RootState)=>state.messages)

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendMessage(senderName,subject,message));
    setSenderName("");
    setSubject("");
    setMessage("");
  };

  useEffect(()=>{
    if(responseMessage)
    {
      toast.success(responseMessage);
    }
    if(error)
    {
      toast.error(error || "Error sending message");
    }
  },[dispatch,loading,error])

  return (
    <div className="contact__container">
      <div className="contact__header">
        <Typography className="contact__title">
          CONTACT ME
        </Typography>
      </div>

      <form onSubmit={handleMessage} className="contact__form">
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setSenderName(e.target.value)}
            value={senderName}
            label="Name"         
          />
        </div>
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setSubject(e.target.value)}
            value={subject}
            label="Subject"
          />
        </div>
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setMessage(e.target.value)}
            value={message}
            label="Message"
            isMultiline
          />
        </div>
        <div className="contact__submit-button">
          <CustomButton title="SEND MESSAGE" className="contact__button"/>
        </div>
      </form>
      <hr className="contact__separator" />
    </div>
  );
};

export default Contact;
