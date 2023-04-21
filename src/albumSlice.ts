import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type albumType = {
  albumID: Number;
  id: Number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
type modifyItemType = {
  id: Number;
  title: string;
};
export type albumSliceType = {
  albumList: albumType[];
  isModified: boolean;
  modifyItem: modifyItemType;
  loading: boolean;
};

const initialState: albumSliceType = {
  albumList: [],
  isModified: false,
  modifyItem: {
    id: 0,
    title: "",
  },
  loading: true,
};
const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbum(state, action: PayloadAction<albumType[]>) {
      state.albumList = action.payload;
      state.loading = false;
    },
    setModifyItem(state, action: PayloadAction<modifyItemType>) {
      state.modifyItem = action.payload;
      state.isModified = true;
    },
    updateAlbum(state, action: PayloadAction<modifyItemType>) {
      state.albumList = state.albumList.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title }
          : item
      );
      state.isModified = false;
      state.modifyItem = { id: 0, title: "" };
    },
  },
});

export const { setAlbum, setModifyItem, updateAlbum } = albumSlice.actions;
const albumReducer = albumSlice.reducer;
export default albumReducer;
