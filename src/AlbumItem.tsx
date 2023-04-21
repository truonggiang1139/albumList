import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setModifyItem } from "./albumSlice";
import { memo } from "react";
type AlbumItemType = {
  title: string;
  id: Number;
  thumbnailUrl: string;
};
function AlbumItem({ title, id, thumbnailUrl }: AlbumItemType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleModifyItem = () => {
    if (inputRef.current) {
      dispatch(setModifyItem({ id, title: inputRef.current.value }));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = title;
    }
  }, [title]);

  return (
    <div className="flex flex-row border border-black p-2">
      <img className="w-32 mr-3" src={thumbnailUrl} alt="" />
      <div className=" flex  flex-col w-full items-start justify-center">
        <input
          onInput={handleModifyItem}
          ref={inputRef}
          type="text"
          className="w-full mb-5 hover:border outline-none focus:border border-gray-400"
        />
        <div className="text-left">{Date.now()}</div>
      </div>
    </div>
  );
}
export default memo(AlbumItem);
