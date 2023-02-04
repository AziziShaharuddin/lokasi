import { createSlice } from "@reduxjs/toolkit";

const autoCompleteSlice = createSlice({
  name: 'autoComplete',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {
    retrievingData: state => {
      state.isLoading = true
      state.data = []
      state.error = null
    },
    retrievedDataSuccess: (state, action) => {
      state.isLoading = false
      state.data = action.payload
      state.error = null
    },
    retrievedDataFail: (state, action) => {
      state.isLoading = false
      state.data = []
      state.error = action.error
    }
  }
})

export const { retrievedDataFail, retrievedDataSuccess, retrievingData } = autoCompleteSlice.actions
export default autoCompleteSlice.reducer