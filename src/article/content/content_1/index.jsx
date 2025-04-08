import classNames from "classnames";
import "./index.scss";

const Content_One = () => {
  return (
    <div className={classNames("content-one-container")}>
      <div className="historical-content">
        <h2>长安：丝绸之路的文明熔炉</h2>
        
        <p>
          在渭河平原腹地崛起的汉都长安，以
          <span className="emphasize">36平方公里</span>的城垣规模重构了人类对都市的认知——
          <span className="emphasize">25.7公里城墙</span>与
          <span className="emphasize">12座城门</span>框定的"八街九陌"格局，不仅塑造了东方城市规划的基因模板，更通过丝绸之路将
          <span className="emphasize">2万余西域商贾</span>汇聚于专设的"蛮夷邸"，催生出古代世界首个跨国商贸共同体。
        </p>

        <p>
          这座用
          <span className="emphasize">日产500件铁器</span>的叠铸技术和
          <span className="emphasize">亩产6.6石</span>（198公斤）的代田法支撑起的超级都市，在东市、西市创造了
          <span className="emphasize">日交易3000万五铢钱</span>的商业神话，其贸易强度相当于罗马奥斯提亚港全年吞吐量的1.5倍。而深埋灞桥的
          <span className="emphasize">公元前2世纪麻纤维纸</span>，与误差仅
          <span className="emphasize">0.25日</span>的太初历共同证明：当驼队载着丝绸穿越葱岭时，长安早已在冶金、天文、造纸三大领域为人类文明树立了新的基准线。
        </p>
        <div className="route-description">
          <p>从西安出发，前往武威的三条路线各具特色，最终在河西走廊的咽喉——武威市交汇。</p>

          <p>北线自西安向北延伸，经铜川市进入陕北，过彬州市、庆阳市后，沿陇东高原西行，穿越平凉市的黄土沟壑与定西市的山地，最终抵达武威。这条路线途经宁夏与甘肃交界地带，历史上曾是中原与游牧民族贸易的重要通道。</p>

          <p>中线则从西安向西，沿渭河谷地行进，过宝鸡市后进入甘肃天水市（古秦州），再经陇南市的丘陵与河谷，北上至定西市，与北线、南线汇合后直抵武威。此线依托河谷地形，自古是佛教东传与商旅西行的主干道，天水麦积山石窟的遗存便印证了其文化交融的历史。</p>

          <p>南线从西安向西南出发，穿越秦巴山区，经安康市后进入甘肃陇南，沿白龙江流域的峡谷与山地蜿蜒北上，过定西市后与中、北两线并轨，共同通向武威。此线翻越秦岭余脉，连接汉水与黄河流域，环境险峻却承载着陕甘川毗邻地带的物资流动。</p>

          <p>三条路线在武威的汇合，不仅是地理上的连接，更是文明的汇聚。武威作为河西走廊的门户，自古控扼丝路要冲，将中原的物产、西域的珍宝、草原的马匹与高原的信仰融于一城。今日，这些路线仍以公路、铁路的形式延续着千年的使命，成为"一带一路"上贯通东西的动脉。</p>
        </div>


        <p className="data-annotation">
          （注：文中数据源自未央宫遗址考古报告、《三辅黄图》记载及社科院历史气候重建模型）
        </p>
      </div>
    </div>
  );
};

export default Content_One;