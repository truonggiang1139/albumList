import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type albumType = {
  albumID: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
type modifyItemType = {
  id: number;
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
    id: -1,
    title: "",
  },
  loading: true,
};
const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbum(state, action: PayloadAction<albumType[]>) {
      state.albumList = [...state.albumList, ...action.payload];
      state.loading = false;
    },
    setModifyItem(state, action: PayloadAction<modifyItemType>) {
      state.modifyItem = action.payload;
      state.isModified = false;
    },
    updateAlbum(state, action: PayloadAction<modifyItemType>) {
      state.albumList = state.albumList.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title }
          : item
      );
      state.modifyItem = { id: -1, title: "" };
      state.isModified = false;
    },
  
    resetAlbum(state) {
      state.isModified=true;
    },
  },
});

export const {
  setAlbum,
  setModifyItem,
  updateAlbum,
  resetAlbum,
} = albumSlice.actions;
const albumReducer = albumSlice.reducer;
export default albumReducer;
