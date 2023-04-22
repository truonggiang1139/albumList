import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setModifyItem } from "./albumSlice";
import { memo } from "react";
import classNames from "classnames";
type AlbumItemType = {
  title: string;
  id: number;
  thumbnailUrl: string;
  isModified: boolean;
};
function AlbumItem({ title, id, thumbnailUrl, isModified }: AlbumItemType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();  
  const handleModifyItem = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(setModifyItem({ id, title: inputRef.current?.value||'' }));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = title;
    }
    if (isModified){
      dispatch(setModifyItem({id:-1,title:''}))
    }
  }, [isModified]);

  return (
    <div className={classNames("flex flex-row border border-black p-2 mt-5 ",{
      'bg-gray-400 text-white':id%2===0,
      '':id%2!==0
    })}>
      <img className="w-32 mr-3" src={thumbnailUrl} alt="" />
      <div className=" flex  flex-col w-full items-start justify-center">
        <input
          onInput={(event) => handleModifyItem(event)}
          ref={inputRef}
          type="text"
          className={classNames("w-full mb-5 hover:border outline-none focus:border ",{
            'bg-gray-400 text-white':id%2===0,
             'border-gray-400':id%2!==0
          })}
        />
        <div className="text-left">{Date.now()}</div>
      </div>
    </div>
  );
}
export default memo(AlbumItem);
