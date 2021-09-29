import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconHome,
  IconButton,
  PhotoItem,
} from "../components";
import Link from "next/link";
import { useAppContext } from "../context/state";
import styles from "./style.module.scss";

const perPage = 10;

export default function Home(props) {
  const { data } = props;
  const { title, desc, updateTitle, updateDesc } = useAppContext();

  useEffect(() => {
    if (data?.title) {
      updateTitle(data.title);
    }

    if (data?.description) {
      updateDesc(data.description);
    }
  }, [data]);

  const [pageIndex, setPageIndex] = useState(0);
  function handlePrev() {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  }

  function handleHome() {
    setPageIndex(0);
  }

  function handleNext() {
    if (data.images.length > (pageIndex + 1) * perPage) {
      setPageIndex(pageIndex + 1);
    }
  }

  const pageStart = pageIndex * perPage;
  const pageEnd =
    data.images.length > (pageIndex + 1) * perPage
      ? (pageIndex + 1) * perPage
      : data.images.length - 1;

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeWrapper}>
        <div className={styles.linkBtn}>
          <Link href="/setting">
            <a>Go to Setting</a>
          </Link>
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className={styles.imageContainer}>
          {data.images.slice(pageStart, pageEnd).map((item, index) => (
            <PhotoItem key={`key-photo-item-${index}`} url={item.imageUrl} />
          ))}
        </div>
        <div className={styles.footer}>
          <IconButton onClick={handlePrev}>
            <IconArrowLeft />
          </IconButton>
          <IconButton onClick={handleHome}>
            <IconHome />
          </IconButton>
          <IconButton onClick={handleNext}>
            <IconArrowRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3000/api/photos`);
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { data: data.data },
  };
}
