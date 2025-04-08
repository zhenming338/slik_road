import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from "mapbox-gl";
import perspective_1_1 from "./data/perspective/1/1t.json";
import perspective_1_2 from "./data/perspective/1/24t.json";
import perspective_1_3 from "./data/perspective/1/3t.json";
import perspective_2_1 from "./data/perspective/2/5t.json";
import perspective_3_1 from "./data/perspective/3/6.json";
import perspective_3_2 from "./data/perspective/3/7.json";
import perspective_3_3 from "./data/perspective/3/8.json";
import perspective_4_1 from "./data/perspective/4/6.json";
import perspective_4_2 from "./data/perspective/4/7.json";
import perspective_4_3 from "./data/perspective/4/8.json";
import perspective_5_1 from "./data/perspective/5/6.json";
import perspective_5_2 from "./data/perspective/5/7.json";
import perspective_5_3 from "./data/perspective/5/8.json";
import perspective_6_1 from "./data/perspective/6/6.json";
import perspective_6_2 from "./data/perspective/6/7.json";
import perspective_6_3 from "./data/perspective/6/8.json";
import perspective_7_1 from "./data/perspective/7/6.json";
import perspective_7_2 from "./data/perspective/7/7.json";
import perspective_8_1 from "./data/perspective/8/6.json";
import perspective_8_2 from "./data/perspective/8/7.json";
import perspective_9_1 from "./data/perspective/9/6.json";
import perspective_9_2 from "./data/perspective/9/7.json";
import perspective_10_1 from "./data/perspective/10/6.json";
import markList from "./data/markList.json"
import dunhuangData from "./data/dunhuang.json"
import wuweiData from "./data/wuwei.json"
import {createRoot} from "react-dom/client";
import "./map.scss"
import classNames from "classnames";
import importantSite from "./data/importantSite.json"
import store from "../store/store.jsx";

const Map = () => {
    //地图容器和地图实例的虚拟dom元素
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const intervalRefs = useRef([]);
    const intervalIndexRefs = useRef([]);
    const runningRef = useRef(true);
    const [currentMapIndex, setCurrentMapIndex] = useState(-999);
    const markerRefs = useRef([]);
    const coverMapInfo =
        {
            center: [116.4074, 39.9042],
            zoom: 3.5, // 目标缩放级别
            speed: 0.8, // 过渡速度，默认 1.2，值越大飞行越快
            curve: 0.6, // 过渡曲率，值越大曲线越陡峭
            pitch: 0,
            essential: true // 是否为必要动画，用户偏好减少动画时仍执行
        }
    const directoryMapInfo =
        {
            center: [108.8360596, 34.312109],
            zoom: 3,
            pitch: 25,
            speed: 0.8, // 过渡速度，默认 1.2，值越大飞行越快
            curve: 0.6, // 过渡曲率，值越大曲线越陡峭
            essential: true // 是否为必要动画，用户偏好减少动画时仍执行
        }

    const defaultMapInfo = {
        center: [110, 30],
        zoom: 2, // 目标缩放级别
        speed: 1.2, // 过渡速度，默认 1.2，值越大飞行越快
        curve: 1.5, // 过渡曲率，值越大曲线越陡峭
        essential: true // 是否为必要动画，用户偏好减少动画时仍执行
    }


    const [animationList] = useState([
        {
            type: "layer",
            perspective: [perspective_1_1, perspective_1_2, perspective_1_3],
            follow: 0,
            state: {zoom: 6, pitch: 55},
            sites: [importantSite[0], importantSite[1]]
        },
        {
            type: "coloring",
            data: wuweiData,
            state: {zoom: 7, pitch: 0},
            location: wuweiData[0],
            marks: markList[1]
        },
        {
            type: "layer",
            perspective: [perspective_2_1],
            follow: 0,
            state: {zoom: 6, pitch: 56},
            sites: [importantSite[2], importantSite[3], importantSite[4]]
        },
        {
            type: "coloring",
            data: dunhuangData,
            state: {zoom: 7, pitch: 0},
            location: dunhuangData[0],
            marks: markList[0]
        },
        {
            type: "layer",
            perspective: [perspective_3_1, perspective_3_2, perspective_3_3],
            follow: 1,
            state: {zoom: 6, pitch: 65},
            sites: [importantSite[5], importantSite[6]]
        },
        {
            type: "layer",
            perspective: [perspective_4_1, perspective_4_2, perspective_4_3],
            follow: 1,
            state: {zoom: 6, pitch: 50},
            sites: [importantSite[6], importantSite[7]]
        },
        {
            type: "layer",
            perspective: [perspective_5_1, perspective_5_2, perspective_5_3],
            follow: 1,
            state: {zoom: 6, pitch: 50},
            sites: [importantSite[7]]
        },
        {
            type: "layer",
            perspective: [perspective_6_1, perspective_6_2, perspective_6_3],
            follow: 1,
            state: {zoom: 6, pitch: 45},
            sites: [importantSite[8], importantSite[9]]
        },
        {
            type: "layer",
            perspective: [perspective_7_1, perspective_7_2],
            follow: 1, state: {zoom: 6, pitch: 55}
            , sites: [importantSite[10], importantSite[11]]
        },
        {
            type: "layer",
            perspective: [perspective_8_1, perspective_8_2],
            follow: 1, state: {zoom: 6, pitch: 55},
            sites: [importantSite[12]]
        },
        {
            type: "layer",
            perspective: [perspective_9_1, perspective_9_2],
            follow: 0, state: {zoom: 6, pitch: 55},
            sites: [importantSite[13]]
        },
        {
            type: "layer",
            perspective: [perspective_10_1],
            follow: 0, state: {zoom: 6, pitch: 55},
            sites: [importantSite[14]]
        }
    ]);

    const MAPBOX_TOKEN = "pk.eyJ1IjoibXlvc290aXMteSIsImEiOiJjbG55c293cGUwbnJ6MnRxaHEyemN5djhpIn0.0vv9uucFqUgg4EGpe41oaw";
    const storeCurrentPageIndex = useSelector(state => state.article.currentPageIndex);
    const [style] = useState({
        version: 8,
        sources: {
            "raster-tiles": {
                type: "raster",
                tiles: ["https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",],
                tileSize: 256,
            },
        },
        layers: [
            {
                id: "simple-tiles",
                type: "raster",
                source: "raster-tiles",
                minzoom: 0,
                maxzoom: 22,
                maxBounds: [
                    [-180, -85], // 西南角坐标
                    [180, 85],   // 东北角坐标
                ]
            },
        ],
    });
    const [styleLoaded, setStyleLoaded] = useState(false);


    const addPopulationLayer = (items, animationIndex, perspectiveIndex) => {
        const map = mapInstanceRef.current;
        const sourceId = `population-source-${animationIndex}-${perspectiveIndex}`;
        const layerId = `population-layer-${animationIndex}-${perspectiveIndex}`;
        // 避免重复添加
        if (map.getSource(sourceId)) {
            console.log("sourceId", sourceId, "避免重复添加");
            return;
        }

        const geojsonData = {
            type: "FeatureCollection",
            features: items.map((item, index) => ({
                type: "Feature",
                id: index,
                properties: {
                    id: index, // 添加 ID，便于后续更新
                    height: item.population / 0.01,
                    population: item.population,
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [item.location[0] - 0.05, item.location[1] - 0.05],
                        [item.location[0] + 0.05, item.location[1] - 0.05],
                        [item.location[0] + 0.05, item.location[1] + 0.05],
                        [item.location[0] - 0.05, item.location[1] + 0.05],
                        [item.location[0] - 0.05, item.location[1] - 0.05],
                    ]],
                },
            })),
        };

        // 只创建一个 Source
        map.addSource(sourceId, {type: "geojson", data: geojsonData});

        // 只创建一个 Layer
        map.addLayer({
            id: layerId,
            type: "fill-extrusion",
            source: sourceId,
            paint: {
                "fill-extrusion-height": ["get", "height"],
                "fill-extrusion-color": [
                    "case",
                    ["boolean", ["feature-state", "selected"], false],

                    "rgba(171,133,95,0.88)", // 选中状态颜色
                    "rgba(169,45,45,0)", // 默认颜色
                ],
            }
        });
    };

    const addColoring = (data, colorId, opacity) => {
        mapInstanceRef.current.addSource(`region-source-${colorId}`, {
            type: "geojson",
            data: data
        });

        console.log("addColoring whit sourceId ", `region-source-${colorId}`);
        mapInstanceRef.current.addLayer({
            id: `region-fill-${colorId}`,
            type: "fill-extrusion",
            source: `region-source-${colorId}`,
            layout: {},
            paint: {
                "fill-extrusion-color": [
                    "case",
                    ["boolean", ["feature-state", "selected"], false],

                    "rgba(171,133,95,0.88)",
                    "rgba(91,16,16,0)",
                ],
                "fill-extrusion-opacity": opacity
            }
        });
    }
    const changeColoringType = (colorId, mode) => {
        const sourceId = `region-source-${colorId}`;
        console.log("changeColoringType", sourceId);
        if (mapInstanceRef.current.getSource(sourceId)) {
            mapInstanceRef.current.setFeatureState(
                {
                    source: sourceId,
                    id: colorId
                },
                {
                    selected: mode
                }
            )
        } else {
            console.log(false)
        }
    }

    const addMark = (content, site) => {

        const popupContainer = document.createElement("div");

        const container = createRoot(popupContainer);

        container.render(
            <div style={{
                "text-align": "center",
                "padding": "0px",
                "margin": "0px",
                "height": "20px",
                "lineHeight": "20px"
            }}>
                <p style={{"fontSize:": "20px", "padding": "0px 10px"}}>{content.content}</p>
            </div>
        );

        const marker = new mapboxgl.Marker({color: "black"}) // 创建标

            .setLngLat([site[1], site[0]]) // 设置标记的经纬度 (例如天安门广场)

            .setPopup(
                new mapboxgl.Popup({offset: 30}) // 设置弹窗偏移
                    .setDOMContent(popupContainer)
            )
            .addTo(mapInstanceRef.current); // 将标记添加到地图

        markerRefs.current.push(marker)
    };

    const clearMarkers = () => {
        markerRefs.current.forEach((item) => {
            item.remove();
        })
        markerRefs.current = [];
    }

    const createGeojsonData = (data, id) => {
        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    id: id,
                    geometry: {
                        type: "Polygon",
                        coordinates: [data]
                    },
                    properties: {},
                },
            ],
        }
    }
    /**
     * 根据样式初始化地图实例
     * */
    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: defaultMapInfo.center,
            zoom: defaultMapInfo.zoom,
        })
        mapInstanceRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");
        mapInstanceRef.current.on('load', () => {
            setStyleLoaded(true);
            animationList.forEach((animationListItem, animationListIndex) => {
                if (animationListItem.type === "layer") {
                    animationListItem.perspective.forEach((perspectiveItem, perspectiveIndex) => {
                        addPopulationLayer(perspectiveItem, animationListIndex, perspectiveIndex);
                    })
                } else if (animationListItem.type === "coloring") {
                    addColoring(createGeojsonData(animationListItem.data, animationListIndex), animationListIndex, 0.7);
                }
            })
        })
    }, [style]);

    useEffect(() => {
        console.log(storeCurrentPageIndex)
    }, [storeCurrentPageIndex]);

    useEffect(() => {
        if (mapInstanceRef.current && mapInstanceRef.current.isStyleLoaded()) {
            setStyleLoaded(true);
        }
        return () => {
            mapInstanceRef.current?.remove();
        }
    }, [animationList]);

    const timerControl = (action, animationListIndex, perspectiveIndex) => {
        if (action === "start") {
            if (!verifyTimerParams(animationListIndex, perspectiveIndex)) {
                return;
            }
            if (intervalIndexRefs.current[perspectiveIndex] == null) {
                intervalIndexRefs.current[perspectiveIndex] = 0
            }
            intervalRefs.current[perspectiveIndex] = setInterval(() => {

                if (runningRef.current) {
                    if (intervalIndexRefs.current[perspectiveIndex]
                        <
                        animationList[animationListIndex].perspective[perspectiveIndex].length) {
                        changeLayerType(intervalIndexRefs.current[perspectiveIndex], animationListIndex, perspectiveIndex, true);
                        intervalIndexRefs.current[perspectiveIndex] += 1
                        if (animationList[animationListIndex].follow === perspectiveIndex) {
                            const newSite =
                                animationList[animationListIndex]
                                    .perspective[perspectiveIndex][intervalIndexRefs.current[perspectiveIndex]]
                                    .location;
                            const newState = animationList[animationListIndex].state
                            console.log(newState)
                            mapInstanceRef.current.easeTo({
                                center: newSite,
                                zoom: newState.zoom,
                                pitch: newState.pitch,
                                bearing: 0,
                                duration: 200,  // 持续时间（毫秒）
                                easing: (t) => t * (2 - t)  // 自定义缓动函数（easeInOutQuad）
                            });
                        }
                    } else {
                        // timerControl("clear", null, perspectiveIndex)
                        clearInterval(intervalRefs.current[perspectiveIndex])
                        intervalIndexRefs.current[perspectiveIndex] = null
                        intervalRefs.current[perspectiveIndex] = null

                    }
                }
            }, 100)
        } else if (action === "pause") {
            intervalRefs.current.forEach(item => {
                clearInterval(item);
            })
        } else if (action === "clear") {
            if (perspectiveIndex) {
                intervalRefs.current[perspectiveIndex] = null;
                intervalIndexRefs.current[perspectiveIndex] = null;
                clearInterval(intervalRefs.current[perspectiveIndex]);
            }
            intervalRefs.current.forEach(item => {
                clearInterval(item);
            })
            intervalIndexRefs.current = []
            intervalRefs.current = []
        }
    }
    const verifyTimerParams = (animationListIndex, perspectiveIndex) => {
        if (animationListIndex < 0 || animationListIndex > animationList.length) {
            console.log("animationListIndex error ", animationListIndex);
            return false;
        }
        if (perspectiveIndex < 0 || perspectiveIndex > animationList.length) {
            console.log("perspectiveIndex error ", perspectiveIndex);
            return false;
        }
        return true;
    }

    const changeLayersType = (animationIndex, mode) => {
        if (animationList[animationIndex].perspective) {
            animationList[animationIndex].perspective.forEach((perspectiveItem, perspectiveIndex) => {
                perspectiveItem.forEach((_, index) => {
                    changeLayerType(index, animationIndex, perspectiveIndex, mode);
                })
            })
        }

    }
    const changeLayerType = (index, animationIndex, perspectiveIndex, mode) => {
        const sourceId = `population-source-${animationIndex}-${perspectiveIndex}`;
        if (mapInstanceRef.current.getSource(sourceId)) {
            mapInstanceRef.current.setFeatureState(
                {
                    source: sourceId,
                    id: index
                },
                {
                    selected: mode
                }
            )
        }
    }


    useEffect(() => {

        //清除计时器以及其依赖的方法
        const clearAllIntervalRefAndIndex = () => {
            intervalRefs.current.forEach(item => {
                clearInterval(item);
            })
            intervalRefs.current = [];
            intervalIndexRefs.current = []
        }

        //如果地图样式加载完毕并且动画列表存在
        if (styleLoaded && animationList) {
            console.log({
                storeCurrentPageIndex: storeCurrentPageIndex,
                currentMapIndex: currentMapIndex,
            })
            //判断文章部分是否已经到达正文，-2代表在封面部分，-1代表在目录部分

            if (storeCurrentPageIndex >= 12) {
                clearAllIntervalRefAndIndex()
                importantSite.forEach(item => {
                    addMark({content: item.name, title: item.name}, item.location)
                })
                animationList.forEach((item, index) => {
                    if (item.type === "layer") {
                        changeLayersType(index, true)
                    }
                })
                mapInstanceRef.current.flyTo(directoryMapInfo)
            } else if (storeCurrentPageIndex > -1 && storeCurrentPageIndex < 12) {


                //用户将文章向下翻动
                if (storeCurrentPageIndex > currentMapIndex) {
                    clearMarkers()
                    //如果是从目录部分翻动到第一页，则需要将所有柱体先置为隐藏状态
                    if (storeCurrentPageIndex === 0) {
                        animationList.forEach((_, index) => {
                            changeLayersType(index, false);
                        })
                    }
                    //清理计时器以及计时器的状态信息
                    clearAllIntervalRefAndIndex()
                    if (animationList[currentMapIndex]) {
                        if (animationList[currentMapIndex].type === "coloring") {
                            console.log("animationList[currentMapIndex].coloring");
                        }
                    }
                    console.log("add")

                    //如果当前要显示的地图状态为色块类型
                    //则要将上一页的柱体置为隐藏状态 注：色块页面不会连续显示
                    if (animationList[storeCurrentPageIndex]) {
                        if (animationList[storeCurrentPageIndex].type === "coloring") {
                            console.log(storeCurrentPageIndex)
                            changeLayersType(currentMapIndex, false);
                            changeColoringType(storeCurrentPageIndex, true);
                            mapInstanceRef.current.flyTo({
                                center: animationList[storeCurrentPageIndex].location,
                                zoom: animationList[storeCurrentPageIndex].state.zoom, // 目标缩放级别
                                speed: 0.8, // 过渡速度，默认 1.2，值越大飞行越快
                                curve: 0.6, // 过渡曲率，值越大曲线越陡峭
                                pitch: animationList[storeCurrentPageIndex].state.zoom,
                                essential: true // 是否为必要动画，用户偏好减少动画时仍执行
                            })
                            animationList[storeCurrentPageIndex].marks.forEach(mark => {
                                addMark({title: mark.name, content: mark.name}, mark.location)
                            })
                            //更改地图当前状态为更改后的状态
                            setCurrentMapIndex(() => {
                                return storeCurrentPageIndex;
                            })
                        } else {
                            //将上一页的直接进行显示
                            if (animationList[currentMapIndex]) {
                                if (animationList[currentMapIndex].type === "coloring") {
                                    changeColoringType(currentMapIndex, false)
                                    if (animationList[currentMapIndex - 1]) {
                                        changeLayersType(currentMapIndex - 1, true);
                                    }
                                } else {
                                    changeLayersType(currentMapIndex, true);
                                }
                            }
                            animationList[storeCurrentPageIndex].sites.forEach(mark => {
                                addMark({title: mark.name, content: mark.name}, mark.location)
                            })
                            //当前页的柱体进行逐渐显示
                            animationList[storeCurrentPageIndex].perspective.forEach((_, perspectiveIndex) => {
                                timerControl("start", storeCurrentPageIndex, perspectiveIndex)
                            })
                            //更改地图当前状态为更改后的状态
                            setCurrentMapIndex(() => {
                                return storeCurrentPageIndex;
                            })
                        }
                    }
                }
                //用户将文章向上翻动
                else if (storeCurrentPageIndex < currentMapIndex) {
                    clearMarkers()
                    //清除计时器以及计时器的状态信息
                    clearAllIntervalRefAndIndex()
                    console.log("pop")
                    //将当前页的柱体先设置为不显示
                    if (animationList[storeCurrentPageIndex]) {
                        changeLayersType(storeCurrentPageIndex, false)
                        if (animationList[storeCurrentPageIndex].type === "coloring") {
                            changeLayersType(currentMapIndex, false);
                            if (animationList[storeCurrentPageIndex - 1]) {
                                changeLayersType(storeCurrentPageIndex - 1, false)
                            }
                            changeColoringType(storeCurrentPageIndex, true)
                            mapInstanceRef.current.flyTo({
                                center: animationList[storeCurrentPageIndex].location,
                                zoom: animationList[storeCurrentPageIndex].state.zoom, // 目标缩放级别
                                speed: 0.8, // 过渡速度，默认 1.2，值越大飞行越快
                                curve: 0.6, // 过渡曲率，值越大曲线越陡峭
                                pitch: animationList[storeCurrentPageIndex].state.zoom,
                                essential: true // 是否为必要动画，用户偏好减少动画时仍执行
                            })
                            animationList[storeCurrentPageIndex].marks.forEach(mark => {
                                addMark({title: mark.name, content: mark.name}, mark.location)
                            })
                            //更改地图当前状态为更改后的状态
                            setCurrentMapIndex(() => {
                                return storeCurrentPageIndex;
                            })
                        } else {
                            //将地图本来正在打印的柱体也设置为不显示
                            if (animationList[currentMapIndex]) {
                                if (animationList[currentMapIndex].type === "coloring") {
                                    changeColoringType(currentMapIndex, false);
                                } else {
                                    changeLayersType(currentMapIndex, false)
                                }
                            }
                            //对当前页的柱体进行逐渐显示
                            animationList[storeCurrentPageIndex].perspective.forEach((_, perspectiveIndex) => {
                                timerControl("start", storeCurrentPageIndex, perspectiveIndex)
                            })
                            animationList[storeCurrentPageIndex].sites.forEach((mark) => {
                                addMark({title: mark.name, content: mark.name}, mark.location)
                            })
                            //更改地图当前状态为更改后的状态
                            setCurrentMapIndex(() => {
                                return storeCurrentPageIndex;
                            })
                        }

                    }

                }
            } else {
                //如果用户向上翻动到了目录部分而地图状态仍为第一页的状态
                if (currentMapIndex === 0) {
                    //清除计时器及其状态
                    clearAllIntervalRefAndIndex()
                    //将第一页对应的柱体设置为不显示
                    changeLayersType(0, false)
                    //更新地图状态
                    setCurrentMapIndex(() => {
                        return storeCurrentPageIndex;
                    })
                }
                //设置地图在目录部分的行为
                if (storeCurrentPageIndex === -1) {
                    mapInstanceRef.current.flyTo(directoryMapInfo)
                    animationList.forEach((_, index) => {
                        changeLayersType(index, true);
                    })
                    clearMarkers()
                }
                //设置地图在封面部分的行为
                if (storeCurrentPageIndex === -2) {
                    mapInstanceRef.current.flyTo(coverMapInfo)
                    animationList.forEach((item, index) => {
                        if (item.type === "layer") {
                            changeLayersType(index, false);
                        }
                    })
                }
            }
        }

    }, [animationList, styleLoaded, storeCurrentPageIndex])

    return <div
        ref={mapContainerRef}
        className={classNames("map-con-container")}
        onMouseEnter={() => {
            runningRef.current = false
        }}
        onMouseLeave={() => {
            runningRef.current = true
        }}
    >
    </div>

}
export default Map;