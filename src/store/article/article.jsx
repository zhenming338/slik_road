import {createSlice} from "@reduxjs/toolkit";

const article = createSlice({
    name: "article",
    initialState: {
        currentPageIndex: -2,
        selectPageIndex: -2
    },
    reducers: {
        setCurrentPageIndex(state, action) {
            state.currentPageIndex = action.payload;
        },
        setSelectPageIndex(state, action) {
            state.selectPageIndex = action.payload;
        }
    }
})

const {setCurrentPageIndex, setSelectPageIndex} = article.actions;
export {setCurrentPageIndex, setSelectPageIndex}
export default article.reducer