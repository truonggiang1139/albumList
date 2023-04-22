import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetAlbum, setAlbum, updateAlbum } from "./albumSlice";
import AlbumItem from "./AlbumItem";
import { RootState } from "./store";
import Skeleton from "./Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Form() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const albumList = useSelector((state: RootState) => state.album.albumList);
  const isModify = useSelector((state: RootState) => state.album.isModified);
  const loading = useSelector((state: RootState) => state.album.loading);
  const modifyItem = useSelector((state: RootState) => state.album.modifyItem);

  const handleUpdateList = () => {
    dispatch(updateAlbum(modifyItem));
  };
  const handleResetList = () => {
    dispatch(resetAlbum());
  };

  const check=(id:number)=>{
    if (modifyItem.id===id && isModify===true){
      return true;
    }
    return false

  }
  const getPhotos = () => {
    setTimeout(async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?&_start=${page}&_end=${
          page + 6
        }`
      );

      dispatch(setAlbum(res.data));
    }, 500);
    setPage((prev) => prev + 4);
  };
  useEffect(() => {
    getPhotos();
  }, []);
  return (
    <div className=" mt-16 w-1/2">
      <div className="btn">
        <button
          disabled={modifyItem.id === -1}
          onClick={handleUpdateList}
          className="hover:cursor-pointer rounded px-3 mr-3 bg-blue-500 text-white cursor-default disabled:bg-gray-600 disabled:hover:cursor-auto"
        >
          Update
        </button>
        <button
          disabled={modifyItem.id===-1}
          onClick={handleResetList}
          className="hover:cursor-pointer rounded px-3 mr-3 bg-blue-500 text-white cursor-default disabled:bg-gray-600 disabled:hover:cursor-auto"
        >
          Reset
        </button>
      </div>
      {loading && (
        <>
          <Skeleton />
        </>
      )}
      {!loading && (
        <InfiniteScroll
          dataLength={albumList.length}
          next={getPhotos}
          hasMore={true}
          loader={<Skeleton />}
        >
          {albumList.map((item) => {
            return (
              <AlbumItem
                key={item.id.toString()}
                title={item.title}
                id={item.id}
                thumbnailUrl={item.thumbnailUrl}
                isModified={check(item.id)}
              ></AlbumItem>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
}
