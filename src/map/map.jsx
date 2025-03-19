import classNames from "classnames";
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

const Map = () => {
    //地图容器和地图实例的虚拟dom元素
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const indexRef = useRef(0);
    const intervalRefs = useRef([])
    const [siteInfo, setSiteInfo] = useState([44, 44]);
    const [running, setRunning] = useState(false);

    const [animationList, setAnimationList] = useState([
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
    ]);

    console.log(animationList)

    //mapbox的访问密钥
    const MAPBOX_TOKEN = "pk.eyJ1IjoibXlvc290aXMteSIsImEiOiJjbG55c293cGUwbnJ6MnRxaHEyemN5djhpIn0.0vv9uucFqUgg4EGpe41oaw";
    const storeCurrentPageIndex = useSelector(state => state.article.currentPageIndex);
    const [style, setStyle] = useState({
        version: 8, sources: {
            // 使用 Mapbox 的矢量切片服务
            'mapbox-streets': {
                type: 'vector', url: 'mapbox://mapbox.mapbox-streets-v8',
            },
        }, layers: [{
            id: 'boundaries', // 地区边界线
            type: 'line', source: 'mapbox-streets', 'source-layer': 'admin', // 使用 admin 图层
            paint: {
                'line-color': '#000000', // 边界线颜色
                'line-width': 1, // 边界线宽度
            }, filter: ['==', 'admin_level', 2], // 只显示国家级别边界
        },],
    });
    const addPopulationLayer = (map, items, animationIndex, perspectiveIndex, isFollow) => {
        const sourceId = `population-source-${animationIndex}-${perspectiveIndex}`;
        const layerId = `population-layer-${animationIndex}-${perspectiveIndex}`;
        // 避免重复添加
        if (map.getSource(sourceId)) {
            console.log("sourceId", sourceId, "避免重复添加");
            return;
        }


        // 创建 GeoJSON 数据（合并所有 items）
        const geojsonData = {
            type: "FeatureCollection",
            features: items.map((item, index) => ({
                type: "Feature",
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
                    "interpolate",
                    ["linear"],
                    ["get", "height"],
                    0, "rgba(225, 200, 174, 0)",  // 低值时完全透明
                    1000, "rgba(225, 200, 174, 1)" // 高值时完全可见
                ],
            },
        });
    };


    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, styles: style, center: [110, 40], zoom: 5,
        })
        mapInstanceRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");
        return () => {
            mapInstanceRef.current?.remove();
        }
    }, [style]);

    useEffect(() => {
        if (mapInstanceRef.current && mapInstanceRef.current.isStyleLoaded()) {
            var mainRoadList = []
            animationList.map((animationItem, animationIndex) => {
                animationItem.perspective.map((perspectiveItem, perspectiveIndex) => {
                    addPopulationLayer(mapInstanceRef.current, perspectiveItem, animationIndex, perspectiveIndex, false);
                })
                console.log(animationItem);
                mainRoadList = [...mainRoadList, ...animationItem.perspective[animationItem.follow]]
            })
            console.log(mainRoadList)
            timerControl("start", mainRoadList);
        }
    }, [storeCurrentPageIndex]);

    const timerControl = (action, item) => {
        if (action === "start") {
            if (!running) {
                setRunning(true);
                if (mapInstanceRef.current) {
                    intervalRefs.current[0] = setInterval(() => {
                        console.log("startTimer");
                        console.log(item.length)
                        console.log(indexRef.current)
                        // 使用函数式更新
                        if (indexRef.current < item.length-1) {
                            setSiteInfo(() => {
                                console.log(item[indexRef.current].location)
                                const newSite = item[indexRef.current].location;
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

                        indexRef.current += 1
                        if (indexRef.current === item-1) {
                            timerControl("clear", null)
                        }

                    }, 100);
                }
            }
        } else if (action === "stop") {
            if (running) {
                setRunning(false);
                console.log(siteInfo); // 直接使用 siteInfo
                clearInterval(intervalRefs.current[0]);
            }
        } else if (action === "clear") {
            console.log("clear");
            if (intervalRefs.current[0]) {
                clearInterval(intervalRefs.current[0]);
            }
            setSiteInfo([44, 44]);
            setRunning(false);
        }
    };


    useEffect(() => {
        // startTimer();
        // timerControl("start")
        return () => {
            if (intervalRefs.current[0]) {
                // clearTimer()
                timerControl("clear")
            }
        }
    }, [])

    useEffect(() => {
        console.log(siteInfo)
    }, [siteInfo])


    return <div
        ref={mapContainerRef} // 设置地图容器的引用
        style={{// 宽度 60% 的视口宽度
            height: "100vh", // 高度为 100% 视口高度
            // position: "fixed", // 固定定位
            top: "0", // 顶部为 0
            left: "0", // 左侧为 0
        }}
        // onMouseEnter={() => timerControl("stop")}
        // onMouseLeave={() => timerControl("start")}
    >
    </div>

}
export default Map;