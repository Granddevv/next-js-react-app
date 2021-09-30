import React, { useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { useAppContext } from "../../context/state";
import axios from "axios";

const Setting = () => {
  const { title, desc, updateTitle, updateDesc } = useAppContext();
  const [statusTitle, setStatusTitle] = useState("Drag photos here");

  async function handleUploadFile(evt) {
    try {
      setStatusTitle("Uploading...");
      const formData = new FormData();
      Array.from(evt.target.files).forEach((file) => {
        formData.append(evt.target.name, file);
      });
      const res = await axios.post(`http://localhost:3000/api/photo`, formData);
      setStatusTitle("Successfully Uploaded! Do you want to upload more?");
    } catch (error) {}
  }

  async function handleDeleteAll() {
    try {
      await axios.delete(`http://localhost:3000/api/photo`);
    } catch (error) {}
  }

  return (
    <div className={styles.settingContainer}>
      <div className={styles.settingWrapper}>
        <div className={styles.linkBtn}>
          <Link href="/">
            <a>Back Home</a>
          </Link>
        </div>
        <input
          className={styles.textTitle}
          name="title"
          value={title}
          onChange={(evt) => updateTitle(evt.target.value)}
        />
        <textarea
          className={styles.textDesc}
          name="description"
          value={desc}
          onChange={(evt) => updateDesc(evt.target.value)}
        />
        <div className={styles.fileContainer}>
          <input
            multiple
            className={styles.fileInput}
            type="file"
            name="files"
            onChange={handleUploadFile}
          />
          <span className={styles.statusTitle}>{statusTitle}</span>
        </div>
        <button className={styles.btnDelete} onClick={handleDeleteAll}>
          Delete All Photos
        </button>
      </div>
    </div>
  );
};

export default Setting;
