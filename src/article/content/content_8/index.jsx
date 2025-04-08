import classNames from "classnames"
import "./index.scss"
const SilkRoadMap = () => {
    return (
      <div className="abc-container">
        {/* 地理叙事区块 */}
        <section className="geo-narrative">
          <h1 className="main-title">丝绸之路的现代镜像</h1>
          
          {/* 紫色商道描述 */}
          <div className="route-description purple-route">
            <h2>紫色血脉：古代商道的数字重生</h2>
            <p className="historical-text">
              从阿姆河（Amu Darya）西岸的Ambipay遗址启程，这条深紫色路线承载着波斯帝国驿站的双语碑文。在达绍古兹（Daşoguz）出土的粟特文木简中，发现用希腊数字加密的关税记录——每匹丝绸需缴纳<span className="highlight">3枚帕提亚银币</span>或<span className="highlight">5克和田玉</span>。阿什哈巴德（Asgabat）的大理石建筑群下，探地雷达揭示出10世纪塞尔柱商队旅馆的供水系统，其几何构造竟与当代输油管道支架完美契合。
            </p>
          </div>
  
          {/* 红色能源动脉描述 */}
          <div className="route-description red-route">
            <h2>红色脉搏：能源走廊的史诗叙事</h2>
            <p className="modern-text">
              始于Balkan welayat的"地狱之门"天然气田，红色动脉在勒巴普州（Lebop）的沙漠下方与13世纪驼队路线产生量子纠缠。Nókis的量子通信基站控制室内，<span className="tech-term">LIDAR扫描仪</span>在管道焊缝中发现蒙古西征时期的箭镞残片。当气压达到<span className="highlight">3.5MPa</span>时，管道振动频率会激活岩画上的突厥数字，投影出<span className="highlight">1219年花剌子模战役</span>的兵力部署图。
            </p>
          </div>
  
          {/* 特殊标注解密 */}
          <div className="cipher-section">
            <h3>地图密码破译局</h3>
            <ul className="cipher-list">
              <li className="arabic-cipher">
                <span className="original">رمّدوس</span> → 
                <span className="decoded">青铜时代炼铜遗址（北纬37.2°，东经58.9°）</span>
                <p className="cipher-story">碳14检测显示炉温可达1200°C，炉渣中发现于阗玉碎屑</p>
              </li>
              <li className="error-cipher">
                <span className="original">前列腺</span> → 
                <span className="decoded">坐标校准错误（实际为梅尔夫古城）</span>
                <p className="cipher-story">波斯语"پیشانی"（前额）的误译，该地出土拜火教前额祭祀器皿</p>
              </li>
              <li className="tech-cipher">
                <span className="original">06mcibhp</span> → 
                <span className="decoded">量子通信中继站</span>
                <p className="cipher-story">建筑基座发现8世纪粟特星盘残片，青铜刻度与现代激光校准器同位</p>
              </li>
            </ul>
          </div>
  
          {/* 时空叠印区 */}
          <div className="temporal-layer">
            <h3>多重现实叠加态</h3>
            <p className="mixed-reality">
              在Türkmenistan腹地，游牧民的北斗定位器与《突厥语大辞典》记载的"星路导航法"产生数据共振。Asgabat国家博物馆的增强现实展项中，<span className="ar-text">塞尔柱时期的坎儿井全息影像</span>与<span className="ar-text">中土天然气管道3D模型</span>在空间坐标（37.960°N, 58.326°E）处精确重叠，误差仅<span className="highlight">±1.2毫米</span>。
            </p>
          </div>
        </section>
  
        {/* 可视化地图容器 */}
        
      </div>
    );
  };
  
  export default SilkRoadMap;