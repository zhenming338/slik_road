import { configureStore } from "@reduxjs/toolkit";
import article from "./article/article.jsx";
const store = configureStore({
    reducer: {
        article: article,
    }
})
export default store