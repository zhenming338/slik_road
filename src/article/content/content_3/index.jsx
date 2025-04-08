import classNames from "classnames"
import "./index.scss"
const Content_Three = () => {
    return (
        <div className={classNames("route-container")}>
          {/* 张掖篇 */}
          <div className="city-card zhangye">
            <h2>张掖：丹霞佛影的丝路画廊</h2>
            <div className="route-path">
              🚩 武威市 → 山丹县（汉明长城遗址） → 张掖市
            </div>
            <p>
              从武威沿<span className="emphasize">312国道</span>西北行130公里，穿越<span className="emphasize">焉支山峡谷</span>便进入张掖地界。这座西汉元鼎六年（公元前111年）设立的河西郡治，以"张国臂掖，以通西域"得名。
            </p>
            <p>
              <span className="emphasize">大佛寺</span>（1098年）的34.5米涅槃佛像，其瞳孔中保留着西夏时期的<span className="emphasize">琉璃眼珠</span>，反射着丝绸之路上24国使臣的倒影。而城南的<span className="emphasize">丹霞地貌</span>，在晨光中显现出<span className="emphasize">7种色谱</span>，恰似佛陀的袈裟铺展天地之间。
            </p>
          </div>
    
          {/* 酒泉篇 */}
          <div className="city-card jiuquan">
            <h2>酒泉：从烽燧到星辰的时空走廊</h2>
            <div className="route-path">
              🚩 张掖市 → 临泽县（黑河湿地） → 高台县 → 酒泉市
            </div>
            <p>
              沿<span className="emphasize">连霍高速</span>继续西北行220公里，过<span className="emphasize">黑河</span>九曲十八弯，便抵达霍去病倾酒入泉的传奇之地。这里的<span className="emphasize">果园镇魏晋墓</span>出土的驿使图，定格了1700年前快马递送<span className="emphasize">西域文书</span>的瞬间。
            </p>
            <p>
              现代酒泉的<span className="emphasize">卫星发射中心</span>（北纬40.6°）与<span className="emphasize">阳关遗址</span>（北纬39.9°）构成奇妙纬度线，汉代烽火台的狼烟与火箭发射的尾焰，在<span className="emphasize">弱水河</span>两岸演绎着时空对话。
            </p>
          </div>
    
          {/* 敦煌篇 */}
          <div className="city-card dunhuang">
            <h2>敦煌：沙海中的文明灯塔</h2>
            <div className="route-path">
              🚩 酒泉市 → 瓜州县（锁阳城） → 敦煌市
            </div>
            <p>
              从酒泉向西南行进400公里，穿越<span className="emphasize">莫贺延碛</span>戈壁，<span className="emphasize">鸣沙山</span>的曲线渐入眼帘。<span className="emphasize">莫高窟</span>第323窟的壁画中，张骞出使西域的使团正穿越同一片沙海，驼铃声响彻1980个寒暑。
            </p>
            <p>
              在<span className="emphasize">藏经洞</span>（第17窟）的5万卷文书中，粟特文《古兰经》与汉文《金刚经》比邻而居，<span className="emphasize">吐蕃占领时期</span>（781-848）的壁画中，飞天手持的五弦琵琶仍能弹奏出《凉州大曲》的遗韵。
            </p>
          </div>
        </div>
      );
    };

export default Content_Three