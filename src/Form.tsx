import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { albumSliceType, albumType, setAlbum, updateAlbum } from "./albumSlice";
import AlbumItem from "./AlbumItem";
import { RootState } from "./store";

export default function Form() {
  const dispatch = useDispatch();
  const albumList = useSelector((state: RootState) => state.album.albumList);
  const isModify = useSelector((state: RootState) => state.album.isModified);
  const loading = useSelector((state: RootState) => state.album.loading);
  const modifyItem = useSelector((state: RootState) => state.album.modifyItem);
  const handleUpdateList = () => {
    dispatch(updateAlbum(modifyItem));
  };

  useEffect(() => {
    const getPhotos = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos?&_start=0&_end=4"
      );

      dispatch(setAlbum(res.data));
    };
    setTimeout(() => {
      getPhotos();
    }, 2000);
  }, []);
  return (
    <div className=" mt-16 w-1/2">
      <div className="btn">
        <button
          disabled={!isModify}
          onClick={handleUpdateList}
          className="hover:cursor-pointer rounded px-3 mr-3 bg-blue-500 text-white cursor-default disabled:bg-gray-600 disabled:hover:cursor-auto"
        >
          Update
        </button>
        <button
          disabled={!isModify}
          className="hover:cursor-pointer rounded px-3 mr-3 bg-blue-500 text-white cursor-default disabled:bg-gray-600 disabled:hover:cursor-auto"
        >
          Reset
        </button>
      </div>
      {loading && <h2>loading</h2>}
      {!loading &&
        albumList.map((item) => (
          <AlbumItem
            key={item.id.toString()}
            title={item.title}
            id={item.id}
            thumbnailUrl={item.thumbnailUrl}
          ></AlbumItem>
        ))}
    </div>
  );
}
