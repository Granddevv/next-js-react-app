import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { IconView } from "..";

export default function PhotoItem(props) {
  const { url } = props;

  return (
    <div className={styles.imageContainer}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${url})` }}
      ></div>
      <div className={styles.maskContainer}>
        <div className={styles.backContainer}></div>
        <div className={styles.viewBtnContainer}>
          <IconView />
        </div>
      </div>
    </div>
  );
}

PhotoItem.propTypes = {
  url: PropTypes.string,
};
