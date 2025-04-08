import classNames from "classnames";
import Content_1 from "./content_1";
import Content_2 from "./content_2";
import Content_3 from "./content_3";
import Content_4 from "./content_4";
import Content_5 from "./content_5";
import Content_6 from "./content_6";
import Content_7 from "./content_7";
import Content_8 from "./content_8";
import Content_9 from "./content_9";
import Content_10 from "./content_10";
import "./content.scss"
import {Cover} from "./cover/cover.jsx";
import {Directory} from "./directory/direcotry.jsx";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setCurrentPageIndex} from "../../store/article/article.jsx";

const Content = () => {

    const dispatch = useDispatch();
    const coverRef = useRef(null);
    const directoryRef = useRef(null);
    const contentRefs = useRef([]);
    const contentComponents = [
        <Content_1/>,
        <div style={{height: "100vh", background: "pink"}}></div>,
        <Content_2/>,
        <div style={{height: "100vh", background: "pink"}}></div>,

        <Content_3/>,
        <Content_4/>,
        <Content_5/>,
        <Content_6/>,
        <Content_7/>,
        <Content_8/>,
        <Content_9/>,
        <Content_10/>,
        <div style={{height: "100vh", background: "pink"}}></div>,
        <div style={{height: "100vh", background: "pink"}}></div>,
        <div style={{height: "100vh", background: "pink"}}></div>,
    ];
    const [contentList, setContentList] = useState(contentComponents.map((item, index) => {
        return {
            id: index,
            content: item,
            visible: false,
        }
    }))
    // 初始化 IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute("data-index"));
                    if (entry.isIntersecting) {
                        setContentList((prev) =>
                            prev.map((item, idx) =>
                                idx === index ? {...item, visible: true} : item
                            )
                        );
                        dispatch(setCurrentPageIndex(index));
                    }
                });
            },
            {threshold: 0.2}
        );
        contentRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        if (directoryRef.current) {
            observer.observe(directoryRef.current)
        }
        if (coverRef.current) {
            observer.observe(coverRef.current)
        }

        // 组件卸载时清除观察器
        return () => observer.disconnect();
    }, []);
    return <div className={classNames("content-container")}>
        <div
            ref={(el) => {
                coverRef.current = el
            }}
            data-index={-2}
        ><Cover/></div>
        <div style={{
            width: "100%",
            height: "100px",
            fontSize: "30px",
            textAlign: "center",
            background: "#dbc6c6",
            lineHeight: "100px",
        }}> {-2}</div>
        <div
            ref={(el) => {
                directoryRef.current = el
            }}
            data-index={-1}
        ><Directory/></div>
        <div style={{
            width: "100%",
            height: "100px",
            fontSize: "30px",
            textAlign: "center",
            background: "#dbc6c6",
            lineHeight: "100px",
        }}> {-1}</div>
        {
            contentList.map((item, index) => {
                return <div key={item.id}
                            ref={(el) => {
                                contentRefs.current[index] = el
                            }}
                            data-index={item.id}
                >
                    {item.content}
                    <div style={{
                        width: "100%",
                        height: "100px",
                        fontSize: "30px",
                        textAlign: "center",
                        background: "#dbc6c6",
                        lineHeight: "100px",
                    }}> {index}</div>
                </div>
            })
        }
    </div>
}
export default Content;