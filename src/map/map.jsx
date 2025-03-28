import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
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
import {createRoot} from "react-dom/client";
import "./map.scss"
import classNames from "classnames";

const Map = () => {


    //地图容器和地图实例的虚拟dom元素
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const runningRef = useRef([]);
    const indexRef = useRef([]);
    const intervalRefs = useRef([])
    const itemRef = useRef([]);
    const infoRef = useRef([]);
    const [siteInfo, setSiteInfo] = useState([44, 44]);
    const [mapCurrentIndex, setMapCurrentIndex] = useState(-1);


    const coverMapInfo = {
        center: [45, 45],
        zoom: 6,
        pitch: 45,
        bearing: 0,
        duration: 200,  // 持续时间（毫秒）
        easing: (t) => t * (2 - t)  // 自定义缓动函数（easeInOutQuad）
    }

    const directoryMapInfo = {
        center: [108.8360596, 34.312109],
        zoom: 6,
        pitch: 45,
        bearing: 0,
        duration: 200,  // 持续时间（毫秒）
        easing: (t) => t * (2 - t)  // 自定义缓动函数（easeInOutQuad）
    }
    const [animationList, setAnimationList] = useState(
        [
            {
                type: "layer", perspective: [perspective_1_1, perspective_1_2, perspective_1_3], follow: 0,
            }, {
            type: "layer", perspective: [perspective_2_1], follow: 0,
        }, {
            type: "layer", perspective: [perspective_3_1, perspective_3_2, perspective_3_3], follow: 1,
        }, {
            type: "layer", perspective: [perspective_4_1, perspective_4_2, perspective_4_3], follow: 1,
        }, {
            type: "layer", perspective: [perspective_5_1, perspective_5_2, perspective_5_3], follow: 1,
        }, {
            type: "layer", perspective: [perspective_6_1, perspective_6_2, perspective_6_3], follow: 1,
        }, {
            type: "layer", perspective: [perspective_7_1, perspective_7_2], follow: 1,
        }, {
            type: "layer", perspective: [perspective_8_1, perspective_8_2], follow: 1,
        }, {
            type: "layer", perspective: [perspective_9_1, perspective_9_2], follow: 0,
        }, {
            type: "layer", perspective: [perspective_10_1], follow: 0,
        }
        ]
    );
    //mapbox的访问密钥
    const MAPBOX_TOKEN = "pk.eyJ1IjoibXlvc290aXMteSIsImEiOiJjbG55c293cGUwbnJ6MnRxaHEyemN5djhpIn0.0vv9uucFqUgg4EGpe41oaw";
    const storeCurrentPageIndex = useSelector(state => state.article.currentPageIndex);
    const [style, setStyle] = useState({
        version: 8,
        sources: {
            "raster-tiles": {
                type: "raster",
                tiles: [
                    "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
                    // "https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}",
                    // "https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
                    // "https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                ],
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
            },
        ],
    }
)
    ;
    const addPopulationLayer = (map, items, animationIndex, perspectiveIndex, show) => {
        const sourceId = `population-source-${animationIndex}-${perspectiveIndex}`;
        const layerId = `population-layer-${animationIndex}-${perspectiveIndex}`;
        // 避免重复添加
        if (map.getSource(sourceId)) {
            console.log("sourceId", sourceId, "避免重复添加");
            return;
        }

        console.log(show)
        // 创建 GeoJSON 数据（合并所有 items）
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
            paint: show ? {
                "fill-extrusion-height": ["get", "height"],
                "fill-extrusion-color": [
                    "case",
                    ["boolean", ["feature-state", "selected"], false],
                    "rgba(171,133,95,0.88)", // 选中状态颜色
                    "rgba(171,133,95,0.88)", // 默认颜色
                ],
            } : {
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


    /**
     * 根据样式初始化地图实例
     * */
    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, styles: style, center: [110, 40], zoom: 5,
        })
        mapInstanceRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");


    }, [style]);

    useEffect(() => {
        if (mapInstanceRef.current && mapInstanceRef.current.isStyleLoaded()) {
            console.log("add Mark")
            console.log(animationList[0].perspective[0][0].location)
            const contentExample = {

                title: "example title",

                content: "example text",

            };
            addMark(mapInstanceRef.current, contentExample, animationList[0].perspective[0][0].location);
        }
        return () => {
            // mapInstanceRef.current?.remove();
        }
    }, [mapInstanceRef.current]);

    /**
     * 根据当前article组件显示的页面下标更新map组件显示的状态
     * storeCurrentPageIndex : article组件正在显示的页面下标
     * mapCurrentIndex ： 当前map组件正在显示的柱状体对应在animationList中的下标
     * */
    useEffect(() => {
        console.log("storeCurrentPageIndex", storeCurrentPageIndex)
        console.log("mapIndex", mapCurrentIndex)
        if (mapInstanceRef.current && mapInstanceRef.current.isStyleLoaded()) {

            if (mapCurrentIndex !== storeCurrentPageIndex) {
                timerControl("clear", null, null)
                //状态1 : 当需要显示的是封面状态或目录状态
                //此状态与计时器无关
                if (storeCurrentPageIndex === -1) {
                    //显示的是封面
                    flay(mapInstanceRef.current, coverMapInfo)
                    removeLayers(0, animationList.length - 1, mapInstanceRef.current)
                } else if (storeCurrentPageIndex === 0) {
                    //显示的是目录
                    removeLayers(0, 1, mapInstanceRef.current)
                    flay(mapInstanceRef.current, directoryMapInfo)
                    addLayers(animationList.length - 1, 0, mapInstanceRef.current, true)
                }

                    //状态2 ： 当需要显示的是正文状态
                //此状态中，正在跟踪的柱状体部分需要使用定时器进行逐步显示，非跟踪部分需要直接显示
                else {
                    if (mapCurrentIndex === 0) {
                        //刚离开目录部分
                        removeLayers(0, animationList.length - 1, mapInstanceRef.current)
                    }

                    if (storeCurrentPageIndex > mapCurrentIndex) {
                        let newIndex = storeCurrentPageIndex - 1;
                        let oldIndex = mapCurrentIndex - 1;
                        if (oldIndex < 0) {
                            //当前显示的是animationList中的第一部分
                            addLayers(newIndex, 0, mapInstanceRef.current, false)
                            animationList[0].perspective.map((item, index) => {
                                timerControl("start", item, {
                                    follow: animationList[0].follow === index,
                                    animationIndex: 0,
                                    perspectiveIndex: index,
                                    showType: true
                                })
                            })
                        } else {
                            //当前显示的柱状体包含多个部分
                            addLayers(newIndex, newIndex, mapInstanceRef.current, false)
                            animationList[newIndex].perspective.map((item, index) => {
                                timerControl("start", item, {
                                    follow: animationList[newIndex].follow === index,
                                    animationIndex: newIndex,
                                    perspectiveIndex: index,
                                    showType: true
                                })
                            })
                            showLayers(newIndex - 1,
                                oldIndex - 1 < 0 ? 0 : oldIndex - 1,
                                mapInstanceRef.current, true)
                        }
                    } else {
                        let newIndex = storeCurrentPageIndex - 1;
                        let oldIndex = mapCurrentIndex - 1;
                        removeLayers(newIndex, oldIndex, mapInstanceRef.current)
                        addLayers(newIndex, newIndex, mapInstanceRef.current, false)
                        console.log("start to add layers")
                        animationList[newIndex].perspective.map((item, index) => {
                            timerControl("start", item, {
                                follow: animationList[newIndex].follow === index,
                                animationIndex: newIndex,
                                perspectiveIndex: index,
                                showType: true
                            })
                        })
                    }
                }
                setMapCurrentIndex(() => {
                    return storeCurrentPageIndex;
                })
            }
        }
    }, [mapCurrentIndex, storeCurrentPageIndex]);


    const flay = (map, siteInfo) => {
        map.easeTo(siteInfo)
    }
    const addLayers = (articleIndex, mapIndex, map, show) => {
        for (let i = mapIndex; i <= articleIndex; i++) {
            for (let j = 0; j < animationList[i].perspective.length; j++) {
                addPopulationLayer(map, animationList[i].perspective[j], i, j, show);
            }
        }
    }

    const removeLayers = (articleIndex, mapIndex, map) => {
        for (let i = articleIndex; i <= mapIndex; i++) {
            for (let j = 0; j < animationList[i].perspective.length; j++) {
                if (map.getSource(`population-source-${i}-${j}`)) {
                    map.removeLayer(`population-layer-${i}-${j}`)
                    map.removeSource(`population-source-${i}-${j}`)
                }
            }
        }
    }

    const showLayers = (articleIndex, mapIndex, map, type) => {

        if (!map) return;

        map.on("sourcedata", (e) => {
            if (e.isSourceLoaded) { // 确保数据已加载
                for (let i = mapIndex; i <= articleIndex; i++) {
                    for (let j = 0; j < animationList[i].perspective.length; j++) {
                        const sourceId = `population-source-${i}-${j}`;
                        if (map.getSource(sourceId)) {
                            animationList[i].perspective[j].forEach((item, index) => {
                                map.setFeatureState(
                                    {source: sourceId, id: index},
                                    {selected: type}
                                );
                            });
                        }
                    }
                }
            }
        });
    };

    const addMark = (mapInstance, content, site) => {

        const popupContainer = document.createElement("div");

        const container = createRoot(popupContainer);

        container.render(
            <div style={{width: "200px", height: "100px"}}>

                <p style={{margin: 0, fontWeight: "bold"}}>{content.title}</p>

                <hr/>

                <p style={{margin: 0}}>{content.content}</p>

            </div>
        );

        const marker = new mapboxgl.Marker({color: "black"}) // 创建标

            .setLngLat(site) // 设置标记的经纬度 (例如天安门广场)

            .setPopup(
                new mapboxgl.Popup({offset: 30}) // 设置弹窗偏移

                    .setDOMContent(popupContainer)
            )

            .addTo(mapInstance); // 将标记添加到地图

    };

    const timerControl = (action, item, info) => {
        if (action === "start") {
            if (!indexRef.current[info.perspectiveIndex]) {
                indexRef.current[info.perspectiveIndex] = 0;
            }
            if (!runningRef.current[info.perspectiveIndex]) {
                runningRef.current[info.perspectiveIndex] = false;
            }
            itemRef.current[info.perspectiveIndex] = item;
            infoRef.current[info.perspectiveIndex] = info;
            if (!runningRef.current[info.perspectiveIndex]) {
                runningRef.current[info.perspectiveIndex] = true
                if (mapInstanceRef.current) {
                    intervalRefs.current[info.perspectiveIndex] = setInterval(() => {
                        const itemIndex = indexRef.current[info.perspectiveIndex];
                        if (indexRef.current[info.perspectiveIndex] < item.length) {
                            const sourceId = `population-source-${info.animationIndex}-${info.perspectiveIndex}`;
                            if (info.follow) {
                                setSiteInfo(() => {
                                    const newSite = item[itemIndex].location;
                                    mapInstanceRef.current.easeTo({
                                        center: newSite,
                                        zoom: 6,
                                        pitch: 45,
                                        bearing: 0,
                                        duration: 200,  // 持续时间（毫秒）
                                        easing: (t) => t * (2 - t)  // 自定义缓动函数（easeInOutQuad）
                                    });
                                    return newSite;
                                });
                            }
                            mapInstanceRef.current.setFeatureState(
                                {
                                    source: sourceId,
                                    id: indexRef.current[info.perspectiveIndex],
                                },
                                {selected: info.showType}
                            );
                        } else {
                            // indexRef.current[info.perspectiveIndex] = 0
                            timerControl("clear", null, {
                                perspectiveIndex: info.perspectiveIndex,
                            })
                        }
                        indexRef.current[info.perspectiveIndex] += 1
                    }, 100);
                }
            }
        } else if (action === "stop") {
            console.log("stop")
            if (!info) {

                intervalRefs.current.map((item) => {
                    clearInterval(item)
                })
                runningRef.current.map((_, index) => {
                    runningRef.current[index] = false
                })
            }
        } else if (action === "restart") {
            console.log("restart")
            infoRef.current.map((info) => {
                timerControl("start", itemRef.current[info.perspectiveIndex], info)
            })
        } else if (action === "clear") {
            setSiteInfo([44, 44]);

            if (!info) {
                intervalRefs.current.map((item) => {
                    clearInterval(item)
                })
                indexRef.current = []
                runningRef.current = []
            } else {
                if (intervalRefs.current[info.perspectiveIndex]) {
                    clearInterval(intervalRefs.current[info.perspectiveIndex]);
                    indexRef.current[info.perspectiveIndex] = 0;
                    runningRef.current[info.perspectiveIndex] = false
                }
            }

        }
    }

    return <div
        ref={mapContainerRef}
        className={classNames("map-con-container")}
        onMouseEnter={() => timerControl("stop")}
        onMouseLeave={() => timerControl("restart")}
    >
    </div>

}
export default Map;