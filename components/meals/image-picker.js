"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();

  function handleClickPick() {
    imageInputRef.current.click();
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage && <Image src={pickedImage} alt="Picked" fill />}
          {!pickedImage && <p>No image picked.</p>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleClickPick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
