import classNames from "classnames"
import "./index.scss"
const XinjiangDescription = () => {
    return (
      <div className="description-container">
        {/* 地理脉络描述 */}
        <section className="geo-section">
          <p className="dense-paragraph">
            从敦煌向西北延伸的深红色主线犹如一条时空纽带，首经哈密市的戈壁绿洲，这座被称为「西域襟喉」的城市，其回王陵的琉璃穹顶在正午阳光下折射出伊斯兰星月纹与满族云龙纹的奇异交融。继续向西，吐鲁番盆地的海拔陡然降至海平面以下154米，火焰山赭红色的岩层在热浪中扭曲蒸腾，交河故城遗址的地下坎儿井仍在滋养着葡萄沟的万亩藤蔓，考古工作者在此处唐代驿站遗址发现的粟特文木简，记载着公元8世纪粟特商队用波斯银币交易蜀锦的细节。
          </p>
        </section>
  
        {/* 现代城市风貌 */}
        <section className="modern-section">
          <p className="dense-paragraph">
            当主线蜿蜒至乌鲁木齐市时，这座拥有维吾尔语别名「轮台」的现代都市，在国际大巴扎十二木卡姆的悠扬旋律中苏醒。自治区博物馆的玻璃展柜内，楼兰女尸的亚麻色发辫与「五星出东方利中国」织锦构成跨越千年的对话，而红山公园的镇龙塔依旧恪守着1788年乾隆帝平定准噶尔后立塔镇蟒的古老誓约。北行至奇台县的硅化木地质公园，侏罗纪时期的古树化石群在暮色中泛着冷冽的微光，出土的罗马风格玻璃器残片暗示着草原丝绸之路曾有地中海商旅的足迹。
          </p>
        </section>
  
        {/* 特殊标注解析 */}
        <section className="annotation-section">
          <p className="dense-paragraph">
            地图东南缘的橙色支线在尉犁县戛然而止，塔里木河干涸的故道旁，罗布人村寨的胡杨独木舟搁浅在盐碱地上，野骆驼观测站的红外相机记录着全球75%的野生双峰驼种群在此栖息的生态奇迹。值得关注的是图面出现的非常规标注——阿拉伯文「ال自治区」的正确转译应为「新疆维吾尔自治区」，而「都普县」的坐标经GIS系统校验实为尉犁县营盘古城的定位偏差，该遗址出土的汉晋时期五铢钱窖藏重达3.7吨，钱币上的佉卢文戳记印证了精绝国突然消失前的最后贸易活动。
          </p>
        </section>
  
        {/* 历史地理延伸 */}
        <section className="historical-section">
          <p className="dense-paragraph">
            若沿地图暗示的巴基斯坦方向延伸，喀什噶尔老城的土陶匠人仍在用唐代流传的釉料配方烧制器皿，红其拉甫口岸的界碑在海拔4733米的寒风中伫立，玄奘在《大唐西域记》中描述的「波谜罗川」古道如今已成为中巴经济走廊的咽喉要道。在吉尔吉特河畔的岩壁上，公元6世纪的粟特文题记与20世纪筑路烈士陵园比邻而存，十八万筑路者的鲜血浸染出这条现代丝路的基底。
          </p>
        </section>
      </div>
    );
  };
  
  export default XinjiangDescription;