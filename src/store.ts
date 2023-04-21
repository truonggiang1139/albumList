import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./albumSlice";

export const store = configureStore({
  reducer: {
    album: albumReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
