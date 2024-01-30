import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prestataire: null,
  loading: false,
  error: null,
};

const prestataireSlice = createSlice({
  name: "prestataire",
  initialState,
  reducers: {
    prestataireSubscribe: (state) => {
      state.loading = true;
    },
    prestataireAccepted: (state, action) => {
      state.prestataire = action.payload;
      state.loading = false;
      state.error = null;
    },
    prestataireDeny: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    prestataireDeleted: (state) => {
      state.prestataire = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  prestataireSubscribe,
  prestataireAccepted,
  prestataireDeny,
  prestataireDeleted,
} = prestataireSlice.actions;
export default prestataireSlice.reducer;
