import classNames from "classnames"
import "./index.scss"
// XinjiangStories.jsx

const XinjiangStories = () => {
  return (
    <div className="story-container">
      {/* 天山北麓故事集 */}
      <section className="mountain-story">
        <h2>天山走廊：凝固在岩层中的史诗</h2>
        <div className="story-card shadow-soft">
          <h3>博乐市 · 银色边境</h3>
          <p>
            当赛里木湖的冰推声惊醒四月草原，阿拉套山口的岩画上，3000年前的乌孙牧人正在用赭石描绘牦牛迁徙。现代口岸的集装箱卡车轰鸣着驶向哈萨克斯坦，碾过汉代细君公主和亲时遗落的玉镯碎片。在温泉县的化石山，三叶虫的纹路与戍边将士甲胄的鳞片，在夕阳下泛着相似的青铜光泽。
          </p>
        </div>

        <div className="story-card shadow-soft">
          <h3>伊宁市 · 河谷密码</h3>
          <p>
            六星街的俄式回廊暗藏玄机——拱门阴影在夏至日正午会拼出锡伯族西迁路线图。喀赞其的维吾尔工匠正在捶打一件铜器，纹样竟与尼雅遗址出土的佉卢文木简上的星图完全吻合。伊犁河大桥下，哈萨克牧人的冬不拉弦音与河底沉船中的唐代鎏金琵琶，在月圆之夜产生神秘的共振频率。
          </p>
        </div>
      </section>

      {/* 塔克拉玛干传奇 */}
      <section className="desert-story">
        <h2>大漠书简：被风沙铭记的往事</h2>
        <div className="story-card shadow-soft">
          <h3>库车市 · 佛国余韵</h3>
          <p>
            克孜尔石窟第38窟的飞天衣袂间，仍残留着公元5世纪的龟兹乐舞韵律。盐水沟的唐代烽燧遗址中，戍卒刻在陶片上的思乡诗，与当代护林员的日记本隔着玻璃展柜对话。周五巴扎的香料堆里，孜然的辛香中忽然混入一缕檀香，那是苏巴什佛寺地宫刚刚启封的千年供香。
          </p>
        </div>

        <div className="story-card shadow-soft">
          <h3>于田县 · 玫瑰战争</h3>
          <p>
            沙漠玫瑰的根系在光伏板下悄然延伸，如同策勒达玛沟出土的木简上，屯田校尉用隶书记录的灌溉暗渠。艾德莱斯绸作坊的织机声中，老板娘颈间的和田玉坠突然闪烁——正是玄奘在《大唐西域记》中描述的"月光映玉，可鉴经文"奇观。当沙尘暴掠过克里雅河故道，岩画上的骆驼商队仿佛在黄雾中重新启程。
          </p>
        </div>
      </section>

      {/* 异常标注故事化处理 */}
      <div className="annotation-story">
        <h3>地图边缘的谜题</h3>
        <div className="mystery-card shadow-hard">
          <p>
            "Kapakon"的迷雾在柯坪县上空消散，牧民在雅丹群中发现刻有希腊字母的青铜马镫；"ICohK-Ken"的幻影消散处，地质队员的钻头带出了带有腓尼基文字的陶片。这些神秘的标注，或许正是古老文明留给我们的接头暗号。
          </p>
        </div>
      </div>
    </div>
  );
};

export default XinjiangStories;