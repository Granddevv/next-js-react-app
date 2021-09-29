import React, { useState } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import { useAppContext } from "../../context/state";

const Setting = () => {
  const { title, desc, updateTitle, updateDesc } = useAppContext();

  function handleDeleteAll() {}

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
          <input className={styles.fileInput} type="file" />
          <span>Drag photos here</span>
        </div>
        <button className={styles.btnDelete} onClick={handleDeleteAll}>
          Delete All Photos
        </button>
      </div>
    </div>
  );
};

export default Setting;
