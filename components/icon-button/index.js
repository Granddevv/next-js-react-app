import React from "react";
import styles from "./style.module.scss";

export default function IconButton(props) {
  const { children } = props;
  return (
    <div className={styles.btnContainer} {...props}>
      {children}
    </div>
  );
}
