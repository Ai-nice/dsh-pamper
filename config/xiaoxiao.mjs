/**
 * 「小小桌宠」（xiaoxiao-zhuochong，基于 dsh-pet 改造）里的额外角色。
 *
 * 该项目的角色素材是**现成的透明 VP9 WebM + 与 dsh-pet 同构的 config.json**，
 * 所以不需要精灵图转换：直接把动画规范化成 640×360 / CRF 28 后装成 pet pack。
 * 角色目录：D:\PC\DSH\桌面宠物源代码\xiaoxiao-zhuochong桌面源代码\characters\<source>
 *
 * display 默认 none：安装后不自动出现（避免开机满屏）；在 DSH「设置 → 桌宠配置」里
 * 把某只的「显示位置」改成 仅桌面/仅浏览器/两者 并保存，它才会启动。
 */
export const XIAOXIAO_CHARACTERS = [
  {
    kind: 'xiaoxiao-ojousama',
    source: 'ojousama',
    name: '橙毛大小姐',
    size: 320,
    display: 'none',
    position: { corner: 'top-left', marginX: 480, marginY: 100 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: false,
    fixedEnabled: false
  },
  {
    kind: 'xiaoxiao-huangmao',
    source: 'character3',
    name: '黄毛该溜子',
    size: 300,
    display: 'none',
    position: { corner: 'top-left', marginX: 24, marginY: 370 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: false,
    fixedEnabled: false
  },
  {
    kind: 'xiaoxiao-bailong',
    source: 'character4',
    name: '白毛小龙娘',
    size: 320,
    display: 'none',
    position: { corner: 'top-right', marginX: 540, marginY: 100 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: false,
    fixedEnabled: false
  },
  {
    kind: 'xiaoxiao-heihu',
    source: 'character5',
    name: '黑毛小狐狸',
    size: 300,
    display: 'none',
    position: { corner: 'bottom-left', marginX: 480, marginY: 100 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: false,
    fixedEnabled: false
  },
  {
    kind: 'xiaoxiao-naicha',
    source: 'character6',
    name: '奶茶千金',
    size: 300,
    display: 'none',
    position: { corner: 'bottom-right', marginX: 480, marginY: 100 },
    balanceEnabled: false,
    whisperEnabled: false,
    workStatusEnabled: false,
    fixedEnabled: false
  }
];
