import classNames from "classnames";
import "./app.scss"
import {useEffect, useState} from "react";
import Article from "./article/article.jsx";
import Map from "./map/map.jsx";

const App = () => {
    const [fullScreen, setFullScreen] = useState(window.innerWidth > 1300);
    const [showMap, setShowMap] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            setFullScreen(window.innerWidth > 1300);
        };

        window.addEventListener('resize', handleResize);

        // 清理事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log(fullScreen);
    }, [fullScreen]);
    return <div
        className={classNames("app-container", {"selectElement": !fullScreen}, {"hiddenMap": !fullScreen && !showMap})}>
        <div className={classNames("map-container")}>
            <Map/>
        </div>
        <div className={classNames("article-container")}>
            <Article/>
        </div>
        <div className={classNames("toggle-container")} onClick={() => {
            setShowMap(!showMap)
        }}/>
        <div className={classNames("toggle-item")}>
            toggle
        </div>
    </div>
}
export default App;