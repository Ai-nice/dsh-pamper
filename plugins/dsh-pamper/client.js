function __pamperErrorPlugin(error) {
  const message = String(error && (error.stack || error.message) || error);
  return {
    inject: ['slots'],
    apply(ctx) {
      const React = require('react');
      const Panel = () => React.createElement('pre', { style: { padding: 20, whiteSpace: 'pre-wrap', fontSize: 12 } }, message);
      ctx.slots.inject('sidebar.panellist', function* () {
        yield ctx.slots.register({ name: 'sidebar.panellist', id: 'pamper-error', order: 3, label: () => 'Pamper 错误' }, () => React.createElement('span', null, '!'));
      });
      ctx.slots.inject('main', function* () {
        yield ctx.slots.register({ name: 'main', key: 'pamper-error' }, Panel);
      });
    }
  };
}
window.__ModuleLoader__.load({
  id: 'dsh-pamper',
  factory(require) {
    try {
      const module = { exports: {} };
      (function (require, module, exports) {
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/constants.ts
function mountPrefixOf(baseURI) {
  if (baseURI === void 0 || baseURI === "") return "";
  try {
    const url = new URL(baseURI);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.pathname.replace(/\/+$/, "");
  } catch {
    return "";
  }
}
function routePathOf(baseURI) {
  return mountPrefixOf(baseURI) + ROUTE_SEGMENT;
}
var HIT_BOX, ROUTE_SEGMENT, ROUTE_PATH;
var init_constants = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/constants.ts"() {
    HIT_BOX = { x0: 200, y0: 50, x1: 440, y1: 335 };
    ROUTE_SEGMENT = "/dsh-pamper-7470";
    ROUTE_PATH = routePathOf(typeof document === "undefined" ? void 0 : document.baseURI);
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/avatar.ts
function avatarUrl(assetRoot, version) {
  const root = assetRoot.trim();
  const query = root === "" ? "" : "root=" + encodeURIComponent(root) + "&";
  return ROUTE_PATH + "/logo?" + query + "v=" + version;
}
var LOGO_URL;
var init_avatar = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/avatar.ts"() {
    init_constants();
    LOGO_URL = ROUTE_PATH + "/logo";
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/fonts.ts
var FONT_PRESETS, FONT_SIZE_MIN, FONT_SIZE_MAX, DEFAULT_FONT, FONT_REF_SIZE, BUBBLE_FONT_BASE_PX, TIP_FONT_BASE_PX;
var init_fonts = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/fonts.ts"() {
    FONT_PRESETS = [
      {
        id: "candy",
        stack: '"ShangshouSoftCandy","Yuanti SC","YouYuan","\u5E7C\u5706","Comic Sans MS","PingFang SC","Microsoft YaHei",sans-serif'
      },
      { id: "yahei", stack: '"Microsoft YaHei","PingFang SC",sans-serif' },
      { id: "youyuan", stack: '"YouYuan","Yuanti SC",sans-serif' },
      { id: "kaiti", stack: '"KaiTi","STKaiti",serif' },
      { id: "simsun", stack: '"SimSun","Songti SC",serif' },
      { id: "comic", stack: '"Comic Sans MS","Comic Sans",cursive' },
      { id: "system", stack: "system-ui,sans-serif" }
    ];
    FONT_SIZE_MIN = 4;
    FONT_SIZE_MAX = 200;
    DEFAULT_FONT = {
      family: "candy",
      size: 21,
      followPet: true
    };
    FONT_REF_SIZE = 462;
    BUBBLE_FONT_BASE_PX = 0.0455 * FONT_REF_SIZE;
    TIP_FONT_BASE_PX = 0.026 * FONT_REF_SIZE;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/constants.ts
var GRAVITY, RESTITUTION, GROUND_FRICTION, DEFAULT_PHYSICS;
var init_constants2 = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/constants.ts"() {
    GRAVITY = 1400;
    RESTITUTION = 0.78;
    GROUND_FRICTION = 2.5;
    DEFAULT_PHYSICS = {
      gravity: GRAVITY,
      restitution: RESTITUTION,
      groundFriction: GROUND_FRICTION,
      ceilingBounce: true,
      throwPower: 1,
      petCollision: true,
      hapticEnabled: true,
      tiltGravity: true,
      shakeThrow: true
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/squash.ts
var init_squash = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/squash.ts"() {
    init_constants2();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/displays.ts
var init_displays = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/displays.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/contact.ts
var init_contact = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/contact.ts"() {
    init_constants2();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/throw.ts
var init_throw = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/throw.ts"() {
    init_displays();
    init_constants2();
    init_contact();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/spring.ts
var init_spring = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/spring.ts"() {
    init_constants2();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/release.ts
var init_release = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/release.ts"() {
    init_constants2();
    init_spring();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/collide.ts
var init_collide = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics/collide.ts"() {
    init_constants();
    init_constants2();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics.ts
var init_physics = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/physics.ts"() {
    init_constants2();
    init_squash();
    init_throw();
    init_release();
    init_spring();
    init_collide();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/notify.ts
var NOTIFY_ICONS;
var init_notify = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/notify.ts"() {
    NOTIFY_ICONS = {
      done: "notify-done",
      error: "notify-error",
      truncated: "notify-truncated",
      approval: "notify-approval",
      question: "notify-question",
      test: "notify-test"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/notify.ts
function jumpToSession(sessionId) {
  if (sessionId !== void 0) {
    try {
      sessionNavigator?.openSession(sessionId);
    } catch {
    }
  }
  window.focus();
  if (!/electron/i.test(navigator.userAgent)) return;
  const frame = document.createElement("iframe");
  frame.style.display = "none";
  frame.src = "dsh://open";
  document.body.append(frame);
  setTimeout(() => frame.remove(), 1e3);
}
function wireNotificationClick(n, sessionId) {
  n.onclick = () => {
    n.close();
    jumpToSession(sessionId);
  };
}
async function requestNotificationPermission() {
  if (typeof Notification === "undefined") return { ok: false, reason: "unsupported" };
  if (Notification.permission === "granted") return { ok: true };
  if (Notification.permission === "denied") return { ok: false, reason: "denied" };
  try {
    const p = await Notification.requestPermission();
    if (p === "granted") return { ok: true };
    if (p === "denied") return { ok: false, reason: "rejected" };
    return { ok: false, reason: "error", message: "\u6743\u9650\u672A\u6388\u4E88\uFF08" + p + "\uFF09" };
  } catch (e) {
    return { ok: false, reason: "error", message: e instanceof Error ? e.message : String(e) };
  }
}
async function readNotificationsEnabled() {
  try {
    const r = await fetch(ROUTE_PATH + "/config");
    if (!r.ok) return true;
    const d = await r.json().catch(() => null);
    return typeof d?.main?.notificationsEnabled === "boolean" ? d.main.notificationsEnabled : true;
  } catch {
    return true;
  }
}
async function reloadNotifications() {
  notifyEnabled = await readNotificationsEnabled();
}
var pageVisible, pageFocused, PIC, NOTIFY_ICONS2, notifyEnabled, sessionNavigator;
var init_notify2 = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/notify.ts"() {
    init_notify();
    init_constants();
    pageVisible = typeof document !== "undefined" && !document.hidden;
    pageFocused = typeof document !== "undefined" && document.hasFocus();
    PIC = (name) => `${ROUTE_PATH}/pic/${name}.png`;
    NOTIFY_ICONS2 = {
      done: PIC(NOTIFY_ICONS.done),
      error: PIC(NOTIFY_ICONS.error),
      truncated: PIC(NOTIFY_ICONS.truncated),
      approval: PIC(NOTIFY_ICONS.approval),
      question: PIC(NOTIFY_ICONS.question),
      test: PIC(NOTIFY_ICONS.test)
    };
    notifyEnabled = true;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/css.ts
function injectSettingsCss() {
  if (typeof document === "undefined") return;
  if (document.querySelector('style[data-plugin-css="' + settingsCssTag + '"]') !== null) return;
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-pet";
  tag.dataset.pluginCss = settingsCssTag;
  tag.textContent = SETTINGS_CSS;
  document.head.appendChild(tag);
}
var SETTINGS_CSS, settingsCssTag;
var init_css = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/css.ts"() {
    SETTINGS_CSS = [
      ".dsh-pet-mp{position:relative;min-width:0;display:flex;flex-direction:column;gap:4px}",
      ".dsh-pet-mp__trigger{display:flex;align-items:center;gap:6px;width:100%;max-width:340px;height:28px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;text-align:left;cursor:pointer;outline:none}",
      ".dsh-pet-mp__trigger:hover:not(:disabled){border-color:var(--dsw-alias-state-business-primary)}",
      ".dsh-pet-mp__trigger:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary))}",
      ".dsh-pet-mp__trigger:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}",
      ".dsh-pet-mp__label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}",
      ".dsh-pet-mp__sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex-shrink:1000;color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary))}",
      ".dsh-pet-mp__chevron{flex:none;margin-left:auto;color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary));transition:transform .12s}",
      ".dsh-pet-mp__chevron.is-open{transform:rotate(180deg)}",
      // 浮层用 fixed 脱离设置页的滚动容器（不被 overflow 裁掉）；z-index 与插件右键菜单同一档。
      ".dsh-pet-mp__panel{position:fixed;z-index:2147483000;display:flex;flex-direction:column;gap:4px;padding:4px;overflow:hidden;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md,10px);background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-elevation-prominent,0 8px 30px rgba(0,0,0,.35));color:var(--dsw-alias-label-primary)}",
      ".dsh-pet-mp__search{box-sizing:border-box;width:100%;height:28px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:13px;outline:none}",
      ".dsh-pet-mp__search:focus{border-color:var(--dsw-alias-state-business-primary)}",
      // overflow-x 必须显式 hidden：只设 overflow-y 时 CSS 会把另一轴的 visible 抬成 auto，
      // 而条目是 width:100% + 左右 padding，横向会多出 16px，于是冒出没用的横向滚动条。
      ".dsh-pet-mp__list{display:flex;flex-direction:column;min-height:0;overflow-x:hidden;overflow-y:auto;scrollbar-width:thin}",
      ".dsh-pet-mp__group{padding:6px 8px 2px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}",
      ".dsh-pet-mp__item{display:flex;align-items:center;gap:8px;width:100%;padding:6px 8px;border:none;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:inherit;font-size:13px;line-height:20px;text-align:left;cursor:pointer}",
      ".dsh-pet-mp__item:hover:not(:disabled),.dsh-pet-mp__item.is-active{background:var(--dsw-alias-interactive-bg-hover)}",
      '.dsh-pet-mp__item[aria-checked="true"]{color:var(--dsw-alias-state-business-primary)}',
      ".dsh-pet-mp__item:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}",
      ".dsh-pet-mp__name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}",
      ".dsh-pet-mp__check{flex:none;margin-left:auto}",
      ".dsh-pet-mp__status{padding:8px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}",
      // 通用单选下拉：触发器叠加在 __inp 之上，只补按钮该有而输入框没有的排布；浮层与上面的模型选择器同一套外观。
      ".dsh-pet-sel{position:relative;min-width:0}",
      ".dsh-pet-sel__trigger{display:flex;align-items:center;gap:6px;text-align:left;cursor:pointer}",
      ".dsh-pet-sel__trigger:disabled{cursor:default}",
      ".dsh-pet-sel__label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}",
      // 箭头用小三角而不是字符：不依赖字体，旋转时的基线与折叠卡一致。
      ".dsh-pet-sel__chevron{flex:none;margin-left:auto;width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid currentColor;color:var(--dsw-alias-label-tertiary);transition:transform .12s}",
      ".dsh-pet-sel__chevron.is-open{transform:rotate(180deg)}",
      ".dsh-pet-sel__panel{position:fixed;z-index:2147483000;display:flex;flex-direction:column;gap:2px;padding:4px;overflow:hidden;border:1px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md,10px);background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-elevation-prominent,0 8px 30px rgba(0,0,0,.35));color:var(--dsw-alias-label-primary)}",
      ".dsh-pet-sel__list{display:flex;flex-direction:column;min-height:0;overflow-x:hidden;overflow-y:auto;scrollbar-width:thin}",
      ".dsh-pet-sel__item{display:flex;align-items:center;gap:8px;width:100%;padding:5px 8px;border:none;border-radius:var(--dsw-radius-sm,6px);background:transparent;color:inherit;font:inherit;font-size:13px;line-height:20px;text-align:left;cursor:pointer}",
      ".dsh-pet-sel__item:hover:not(:disabled),.dsh-pet-sel__item.is-active{background:var(--dsw-alias-interactive-bg-hover)}",
      '.dsh-pet-sel__item[aria-selected="true"]{color:var(--dsw-alias-state-business-primary)}',
      ".dsh-pet-sel__item:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}",
      ".dsh-pet-sel__name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}",
      ".dsh-pet-sel__check{flex:none;margin-left:auto}",
      ".dsh-pet-cfg{container-type:inline-size;display:flex;flex-direction:column;gap:12px;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px}",
      ".dsh-pet-cfg__title{display:flex;align-items:center;gap:6px;margin:0;font-size:16px;font-weight:500;line-height:24px}",
      ".dsh-pet-cfg__card{display:flex;flex-direction:column;gap:10px;padding:12px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px}",
      ".dsh-pet-cfg__cardHead{display:flex;align-items:center;gap:6px;min-height:20px}",
      ".dsh-pet-cfg__cardTitle{font-size:13px;font-weight:500;color:var(--dsw-alias-label-primary)}",
      // 折叠卡（高级配置 / 卸载与存储）：标题行常驻，正文收进裁剪层。
      // 卡片自身的 gap 归零，头与正文的间距改由正文内层的 padding-top 提供——收起时随裁剪一起消失，底部不留空缝。
      ".dsh-pet-cfg__card.is-fold{gap:0}",
      ".dsh-pet-cfg__foldToggle{display:flex;align-items:center;gap:6px;flex:1 1 auto;min-width:0;min-height:20px;padding:0;border:none;border-radius:4px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;outline:none}",
      ".dsh-pet-cfg__foldToggle:focus-visible{box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary))}",
      // 箭头用小三角而不是字符：不依赖字体、缩进也不受行高影响。
      ".dsh-pet-cfg__chevron{flex:none;margin-left:auto;width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid currentColor;color:var(--dsw-alias-label-tertiary);transition:transform .12s}",
      ".dsh-pet-cfg__chevron.is-open{transform:rotate(180deg)}",
      ".dsh-pet-cfg__fold{display:grid;grid-template-rows:0fr;transition:grid-template-rows .12s ease}",
      ".dsh-pet-cfg__card.is-open .dsh-pet-cfg__fold{grid-template-rows:1fr}",
      ".dsh-pet-cfg__foldClip{min-height:0;overflow:hidden}",
      ".dsh-pet-cfg__foldBody{display:flex;flex-direction:column;gap:10px;padding-top:10px}",
      ".dsh-pet-cfg__grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 16px;align-items:end}",
      ".dsh-pet-cfg__grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px 16px;align-items:end}",
      ".dsh-pet-cfg__grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 16px;align-items:end}",
      "@container (max-width:600px){.dsh-pet-cfg__grid4{grid-template-columns:repeat(2,minmax(0,1fr))}}",
      "@container (max-width:400px){.dsh-pet-cfg__grid2,.dsh-pet-cfg__grid3,.dsh-pet-cfg__grid4{grid-template-columns:minmax(0,1fr)}}",
      ".dsh-pet-cfg__field{display:flex;flex-direction:column;gap:4px;min-width:0}",
      ".dsh-pet-cfg__flabel{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--dsw-alias-label-secondary)}",
      // 顶部一行：头像作左列，右侧是 2×2 的输入网格；窄容器降成单列，头像回到输入之上。
      ".dsh-pet-cfg__topRow{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px 18px;align-items:stretch;margin-bottom:10px}",
      // 头像：宽度固定，高度**撑满右侧两行**——否则头像下方会空出一大块（右列比 72px 高得多）。
      // 能换的时候整块就是按钮：悬浮出遮罩、点它直接开文件框，没有独立按钮。
      ".dsh-pet-cfg__avatarCol{position:relative;width:120px;flex:none}",
      ".dsh-pet-cfg__avatarImg{display:block;width:100%;height:100%;min-height:72px;border-radius:14px;border:1px solid var(--dsw-alias-border-l2);object-fit:cover;background:var(--dsw-alias-bg-layer-1)}",
      ".dsh-pet-cfg__avatarPick{position:relative;display:block;height:100%;border-radius:14px}",
      // 键盘可达：input 铺满整块且透明（display:none 会让它不可聚焦）；焦点与悬浮一样出遮罩。
      ".dsh-pet-cfg__avatarPick:focus-within{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}",
      // 遮罩用 token，缺 token 时回退到半透明黑：与本文件其它「token + fallback」写法一致，
      // 不在规则里直接写字面色值。文字色同理用静态白 token。
      ".dsh-pet-cfg__avatarMask{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:14px;background:var(--dsw-alias-bg-mask,rgba(0,0,0,.55));color:var(--dsw-static-neutral-00,#fff);font-size:12px;line-height:1;opacity:0;transition:opacity .12s;pointer-events:none}",
      ".dsh-pet-cfg__avatarPick:hover .dsh-pet-cfg__avatarMask,.dsh-pet-cfg__avatarPick:focus-within .dsh-pet-cfg__avatarMask,.dsh-pet-cfg__avatarMask.is-busy{opacity:1}",
      ".dsh-pet-cfg__file{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;font-size:0}",
      // 竖排时没有「右侧两行」可撑：头像回到 72px 的方块，否则会被拉成整宽的大图。
      "@container (max-width:400px){.dsh-pet-cfg__topRow{grid-template-columns:minmax(0,1fr)}.dsh-pet-cfg__avatarCol{width:72px}.dsh-pet-cfg__avatarImg{height:72px;min-height:0}}",
      ".dsh-pet-cfg__inp{box-sizing:border-box;width:100%;min-height:28px;padding:4px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;outline:none}",
      ".dsh-pet-cfg__inp:focus{border-color:var(--dsw-alias-state-business-primary)}",
      ".dsh-pet-cfg__inp:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}",
      // 人设复用 __inp 的边框与字号，只补高度与纵向缩放；人设没有长度上限，右下角只显示字数、不阻断输入。
      ".dsh-pet-cfg__persona{display:flex;flex-direction:column;gap:2px;min-width:0}",
      ".dsh-pet-cfg__area{min-height:66px;resize:vertical;line-height:18px}",
      ".dsh-pet-cfg__count{font-size:11px;color:var(--dsw-alias-label-tertiary);text-align:right}",
      ".dsh-pet-cfg__toggle{display:flex;align-items:center;gap:6px;min-width:0;font-size:13px;color:var(--dsw-alias-label-primary)}",
      ".dsh-pet-cfg__toggle>label{display:inline-flex;align-items:center;gap:6px;cursor:pointer;min-width:0}",
      ".dsh-pet-cfg__toggle>label>span{overflow-wrap:anywhere}",
      ".dsh-pet-cfg__toggle input[type=checkbox]{flex:none;width:16px;height:16px;margin:0;accent-color:var(--dsw-alias-state-business-primary);cursor:pointer}",
      // 悬浮说明气泡：由 ./tip-layer 按光标挂到 body 上，不画在触发元素里——右列与贴顶的说明
      // 会被窗口边缘或滚动容器裁掉。这里只管外观，坐标由 tooltipPlacement 写进 style。
      ".pet-cfg-tip{position:fixed;left:0;top:0;z-index:2147483000;max-width:320px;padding:6px 10px;border-radius:8px;background:var(--dsw-alias-tooltip-bg);color:var(--dsw-static-neutral-00);font-size:12px;font-style:normal;font-weight:400;line-height:18px;text-align:left;white-space:pre-wrap;overflow-wrap:anywhere;pointer-events:none;opacity:0;transition:opacity .12s ease;box-shadow:var(--dsw-elevation-prominent,0 6px 20px rgba(0,0,0,.22))}",
      ".pet-cfg-tip.is-on{opacity:1}",
      // 问号：气泡的一个圆形宿主外观。
      ".dsh-pet-cfg__q{display:inline-flex;align-items:center;justify-content:center;flex:none;width:14px;height:14px;border:1px solid var(--dsw-alias-label-tertiary);border-radius:50%;color:var(--dsw-alias-label-tertiary);font-size:10px;font-style:normal;line-height:1;cursor:help;user-select:none}",
      // 折叠卡把问号放进了标题按钮里：包一层 span 以便单独拦截点击（点问号只出气泡、不开合）。
      ".dsh-pet-cfg__qWrap{display:inline-flex;flex:none;align-items:center}",
      ".dsh-pet-cfg__btn{border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary);border-radius:8px;padding:4px 14px;font:inherit;font-size:12px;line-height:20px;cursor:pointer;white-space:nowrap}",
      // 实心主按钮必须排除在通用 hover 外：半透明 hover 会顶掉 button-info-fill，让蓝色按钮一悬停就发白；
      // 主按钮的 hover 走主题自己的 button-info-hover。
      ".dsh-pet-cfg__btn:hover:not(:disabled):not(.is-primary){background:var(--dsw-alias-interactive-bg-hover)}",
      ".dsh-pet-cfg__btn:disabled{opacity:.5;cursor:default}",
      ".dsh-pet-cfg__btn.is-primary{border-color:var(--dsw-alias-button-info-fill);background:var(--dsw-alias-button-info-fill);color:#fff}",
      ".dsh-pet-cfg__btn.is-primary:hover:not(:disabled){border-color:var(--dsw-alias-button-info-hover);background:var(--dsw-alias-button-info-hover)}",
      ".dsh-pet-cfg__btn.is-danger{border-color:var(--dsw-alias-state-error-secondary);color:var(--dsw-alias-state-error-primary)}",
      ".dsh-pet-cfg__btn.is-sm{padding:2px 10px}",
      ".dsh-pet-cfg__btn.is-ghost{border-style:dashed;color:var(--dsw-alias-label-secondary)}",
      ".dsh-pet-cfg__tabs{display:flex;gap:8px;flex-wrap:wrap;align-items:center}",
      ".dsh-pet-cfg__tabsLabel{font-size:12px;color:var(--dsw-alias-label-secondary)}",
      // 种类条单独一行：与下面的宠物条隔开，避免两组按钮读成一行。
      ".dsh-pet-cfg__kinds{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}",
      ".dsh-pet-cfg__tab{border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary);border-radius:8px;padding:4px 12px;font:inherit;font-size:13px;cursor:pointer}",
      ".dsh-pet-cfg__tab:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}",
      ".dsh-pet-cfg__tab:disabled{opacity:.5;cursor:default}",
      ".dsh-pet-cfg__tab.is-active{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-interactive-bg-active)}",
      ".dsh-pet-cfg__tab.is-ghost{border-style:dashed;color:var(--dsw-alias-label-secondary)}",
      ".dsh-pet-cfg__actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px}",
      ".dsh-pet-cfg__msg{margin-left:4px;font-size:12px;color:var(--dsw-alias-state-success-primary)}",
      ".dsh-pet-cfg__msg.is-err{color:var(--dsw-alias-state-error-primary)}",
      ".dsh-pet-cfg__note{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}",
      ".dsh-pet-cfg__path{font-size:12px;line-height:18px;word-break:break-all;user-select:text;color:var(--dsw-alias-label-secondary)}",
      ".dsh-pet-cfg__path b{color:var(--dsw-alias-label-primary);font-weight:400}",
      '.dsh-pet-cfg__cmd{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Courier New",monospace;font-size:12px;line-height:18px;word-break:break-all;user-select:text;padding:6px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-label-primary)}'
    ].join("\n");
    settingsCssTag = "dsh-pet/settings.css";
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/ui.ts
function numberInputProps(value, onCommit, extra = {}) {
  return {
    ...extra,
    type: "number",
    className: INPUT_CLASS,
    defaultValue: String(value),
    key: String(value),
    onBlur: (e) => {
      const text = e.target.value.trim();
      const parsed = Number(text);
      const next = text !== "" && Number.isFinite(parsed) ? parsed : value;
      e.target.value = String(next);
      if (next !== value) onCommit(next);
    },
    onKeyDown: (e) => {
      if (e.key === "Enter") e.currentTarget.blur();
    }
  };
}
function makeUiKit(rt) {
  const { h: h2, t: t2 } = rt;
  const tip = (text) => ({ "data-tip": text });
  const q = (text) => h2("i", { className: "dsh-pet-cfg__q", ...tip(text), "aria-label": text, role: "img", children: "?" });
  return {
    tip,
    q,
    cardHead: (title, hint) => h2("div", {
      className: "dsh-pet-cfg__cardHead",
      children: [
        h2("span", { key: "t", className: "dsh-pet-cfg__cardTitle", children: title }),
        hint ? q(hint) : null
      ]
    }),
    field: (label, control, hint) => h2("div", {
      className: "dsh-pet-cfg__field",
      children: [
        h2("span", {
          key: "l",
          className: "dsh-pet-cfg__flabel",
          children: hint ? [label, q(hint)] : label
        }),
        control
      ]
    }),
    toggleCell: (label, value, disabled, onToggle) => h2("div", {
      className: "dsh-pet-cfg__toggle",
      children: [
        h2("label", {
          key: "l",
          children: [
            h2("input", {
              key: "i",
              type: "checkbox",
              checked: value,
              disabled,
              onChange: (e) => onToggle(e.target.checked)
            }),
            h2("span", { key: "t", children: t2(label) })
          ]
        }),
        q(t2(label + "Hint"))
      ]
    }),
    foldCard: (options) => h2("div", {
      className: "dsh-pet-cfg__card is-fold" + (options.open ? " is-open" : ""),
      children: [
        // 整行可点：标题、问号与箭头都在按钮里。问号自己拦掉冒泡，点它只出气泡、不开合。
        h2("button", {
          key: "head",
          type: "button",
          className: "dsh-pet-cfg__foldToggle",
          "aria-expanded": options.open,
          "aria-controls": options.id,
          onClick: options.onToggle,
          children: [
            h2("span", { key: "t", className: "dsh-pet-cfg__cardTitle", children: options.title }),
            h2("span", {
              key: "q",
              className: "dsh-pet-cfg__qWrap",
              onClick: (e) => e.stopPropagation(),
              children: q(options.hint)
            }),
            // 箭头：展开时转 180°，与模型选择器的展开指示一致。
            h2("i", {
              key: "c",
              className: "dsh-pet-cfg__chevron" + (options.open ? " is-open" : ""),
              "aria-hidden": "true"
            })
          ]
        }),
        // 裁剪层承担 overflow，正文内层出高度：收起时 0fr 把 padding 一起裁掉，卡片底不留空缝。
        h2("div", {
          key: "body",
          id: options.id,
          className: "dsh-pet-cfg__fold",
          "aria-hidden": options.open ? void 0 : "true",
          children: h2("div", {
            className: "dsh-pet-cfg__foldClip",
            children: h2("div", { className: "dsh-pet-cfg__foldBody", children: options.body })
          })
        })
      ]
    })
  };
}
var INPUT_CLASS, MONO_STACK;
var init_ui = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/ui.ts"() {
    INPUT_CLASS = "dsh-pet-cfg__inp";
    MONO_STACK = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Courier New", monospace';
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/actions.ts
function makeActions(rt) {
  const { h: h2, t: t2 } = rt;
  const { tip, q } = makeUiKit({ h: h2, t: t2 });
  return function Actions(props) {
    const { busy, msg, permMsg } = props;
    return h2("div", {
      className: "dsh-pet-cfg__actions",
      children: [
        h2("button", {
          type: "button",
          disabled: busy,
          onClick: props.onSave,
          className: "dsh-pet-cfg__btn is-primary",
          // 悬浮按钮即出快捷键气泡。
          ...tip(t2("saveHotkey")),
          children: t2("save")
        }),
        h2("button", {
          type: "button",
          disabled: busy,
          onClick: props.onSync,
          className: "dsh-pet-cfg__btn",
          children: t2("sync")
        }),
        h2("button", {
          type: "button",
          onClick: props.onTestNotification,
          className: "dsh-pet-cfg__btn",
          children: t2("notifyTest")
        }),
        q(t2("syncHint")),
        // 两个反馈各归各的：msg 是保存 / 同步结果，permMsg 是测试通知结果。
        msg.text ? h2("span", {
          className: "dsh-pet-cfg__msg" + (msg.kind === "err" ? " is-err" : ""),
          children: msg.text
        }) : null,
        permMsg.text ? h2("span", {
          className: "dsh-pet-cfg__msg" + (permMsg.kind === "err" ? " is-err" : ""),
          children: permMsg.text
        }) : null
      ]
    });
  };
}
var init_actions = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/actions.ts"() {
    init_ui();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/bridge.ts
var petBridge;
var init_bridge = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/bridge.ts"() {
    petBridge = {
      current: [],
      reload: () => {
      },
      template: void 0
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/weights.ts
function actionPercent(weights) {
  return Math.max(0, WEIGHTS_TOTAL - weights.idle - weights.turn - weights.move);
}
function withWeight(weights, key, value) {
  const others = weights.idle + weights.turn + weights.move - weights[key];
  return { ...weights, [key]: clampInt(value, 0, WEIGHTS_TOTAL - others) };
}
function parseWeights(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return void 0;
  const record = raw;
  const idle = Number(record.idle);
  const turn = Number(record.turn);
  const move = Number(record.move);
  if ([idle, turn, move].some((value) => !Number.isFinite(value) || value < 0)) return void 0;
  return { idle, turn, move };
}
var WEIGHT_KEYS, WEIGHTS_TOTAL, DEFAULT_WEIGHTS, clampInt;
var init_weights = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/weights.ts"() {
    WEIGHT_KEYS = ["idle", "turn", "move"];
    WEIGHTS_TOTAL = 100;
    DEFAULT_WEIGHTS = { idle: 10, turn: 5, move: 5 };
    clampInt = (value, min, max) => {
      const rounded = Math.round(value);
      if (!Number.isFinite(rounded)) return min;
      const upper = Math.max(min, max);
      return Math.min(Math.max(rounded, min), upper);
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/read.ts
function readMainConfig(merged) {
  const main = merged.main;
  if (!main || !Array.isArray(main.pets)) return null;
  const pets = main.pets;
  const patch = {
    // 位置深拷贝：编辑列表与容器手里的成品列表必须是两份数据。
    pets: pets.map((pet) => ({ ...pet, position: { ...pet.position } }))
  };
  if (typeof main.whisperPrompt === "string") patch.entryPrompt = main.whisperPrompt;
  if (typeof main.notificationsEnabled === "boolean") patch.notificationsEnabled = main.notificationsEnabled;
  if (typeof main.clickSoundEnabled === "boolean") patch.clickSoundEnabled = main.clickSoundEnabled;
  if (typeof main.whisperImageEnabled === "boolean") patch.whisperImageEnabled = main.whisperImageEnabled;
  if (typeof main.chatImageEnabled === "boolean") patch.chatImageEnabled = main.chatImageEnabled;
  if (typeof main.chatAnimationEnabled === "boolean") patch.chatAnimationEnabled = main.chatAnimationEnabled;
  if (typeof main.confineToScreen === "boolean") patch.confineToScreen = main.confineToScreen;
  if (typeof main.trayEnabled === "boolean") patch.trayEnabled = main.trayEnabled;
  if (typeof main.voiceEnabled === "boolean") patch.voiceEnabled = main.voiceEnabled;
  if (typeof main.voiceName === "string") patch.voiceName = main.voiceName;
  if (typeof main.voiceWhisperEnabled === "boolean") patch.voiceWhisperEnabled = main.voiceWhisperEnabled;
  if (typeof main.voiceTodoEnabled === "boolean") patch.voiceTodoEnabled = main.voiceTodoEnabled;
  if (typeof main.voiceNotifyEnabled === "boolean") patch.voiceNotifyEnabled = main.voiceNotifyEnabled;
  if (main.physics && typeof main.physics === "object") {
    patch.physics = { ...DEFAULT_PHYSICS, ...main.physics };
  }
  if (main.font && typeof main.font === "object") {
    patch.font = { ...DEFAULT_FONT, ...main.font };
  }
  const weights = parseWeights(main.animationWeights);
  if (weights) patch.animationWeights = weights;
  const whisperModel = readModel(main.whisperModel);
  if (whisperModel) patch.whisperModel = whisperModel;
  const chatModel = readModel(main.chatModel);
  if (chatModel) patch.chatModel = chatModel;
  const rounds = nonNegative(main.chatMemoryRounds);
  if (rounds !== void 0) patch.chatMemoryRounds = rounds;
  const limit = nonNegative(main.chatImageLimit);
  if (limit !== void 0) patch.chatImageLimit = limit;
  const volume = nonNegative(main.voiceVolume);
  if (volume !== void 0 && volume <= 1) patch.voiceVolume = volume;
  return patch;
}
function readConfigEntries(merged) {
  const main = merged.main;
  if (!main || !Array.isArray(main.pets)) return null;
  const out = [];
  for (const [key, conf] of Object.entries(merged)) {
    const pets = Array.isArray(conf?.pets) ? conf.pets : [];
    out.push({
      key,
      kind: key === "main" ? "main" : "pack",
      ...typeof conf?.whisperPrompt === "string" ? { entryPrompt: conf.whisperPrompt } : {},
      pets: pets.map((pet) => ({ ...pet, position: { ...pet.position }, assetRoot: key }))
    });
  }
  return out;
}
var nonNegative, readModel;
var init_read = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/read.ts"() {
    init_fonts();
    init_physics();
    init_weights();
    nonNegative = (value) => {
      const n = Number(value);
      return Number.isFinite(n) && n >= 0 ? n : void 0;
    };
    readModel = (value) => {
      const model = value;
      if (!model || typeof model.provider !== "string" || typeof model.model !== "string") return void 0;
      return { provider: model.provider, model: model.model };
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/http.ts
function buildSaveBody(fields) {
  return {
    pets: fields.pets,
    notificationsEnabled: fields.notificationsEnabled,
    clickSoundEnabled: fields.clickSoundEnabled,
    whisperImageEnabled: fields.whisperImageEnabled,
    chatImageEnabled: fields.chatImageEnabled,
    chatAnimationEnabled: fields.chatAnimationEnabled,
    confineToScreen: fields.confineToScreen,
    trayEnabled: fields.trayEnabled,
    voiceEnabled: fields.voiceEnabled,
    voiceName: fields.voiceName,
    voiceVolume: fields.voiceVolume,
    voiceWhisperEnabled: fields.voiceWhisperEnabled,
    voiceTodoEnabled: fields.voiceTodoEnabled,
    voiceNotifyEnabled: fields.voiceNotifyEnabled,
    physics: fields.physics,
    whisperModel: fields.whisperModel,
    chatModel: fields.chatModel,
    chatMemoryRounds: fields.chatMemoryRounds,
    chatImageLimit: fields.chatImageLimit,
    font: fields.font,
    animationWeights: fields.animationWeights
  };
}
async function loadConfig(signal) {
  try {
    const response = await fetch(ROUTE_PATH + "/config", signal === void 0 ? {} : { signal });
    if (!response.ok) return null;
    const body = await response.json();
    if (body.ok === false) return null;
    return body;
  } catch {
    return null;
  }
}
async function loadMeta() {
  try {
    const response = await fetch(ROUTE_PATH + "/config/meta");
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
async function loadModelCatalog() {
  try {
    const response = await fetch(ROUTE_PATH + "/models");
    if (!response.ok) return null;
    const body = await response.json();
    if (!body || !Array.isArray(body.providers)) return null;
    return body.providers;
  } catch {
    return null;
  }
}
async function saveConfig(body, force) {
  try {
    const response = await fetch(ROUTE_PATH + "/config" + (force === true ? "?force=1" : ""), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    const payload = await response.json().catch(() => null);
    if (payload && payload.ok === false) {
      if (payload.reason === "user-config-unparsable") {
        return { kind: "corrupt", userFile: typeof payload.userFile === "string" ? payload.userFile : null };
      }
      if (payload.reason === "bad-request" || payload.reason === "invalid-json") return { kind: "invalid" };
      return { kind: "error" };
    }
    if (!response.ok) return { kind: "error" };
    return { kind: "ok", merged: payload };
  } catch {
    return { kind: "error" };
  }
}
async function syncConfig() {
  try {
    const response = await fetch(ROUTE_PATH + "/config", { method: "POST" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
async function savePetLayer(entry, pets) {
  try {
    const response = await fetch(ROUTE_PATH + "/pet-config", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ entry, pets })
    });
    const payload = await response.json().catch(() => null);
    if (payload && payload.ok === false) {
      if (payload.reason === "bad-request" || payload.reason === "unknown-entry") {
        return { kind: "invalid", message: typeof payload.message === "string" ? payload.message : "" };
      }
      return { kind: "error" };
    }
    if (!response.ok) return { kind: "error" };
    return { kind: "ok", merged: payload };
  } catch {
    return { kind: "error" };
  }
}
var init_http = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/http.ts"() {
    init_constants();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/pack-writes.ts
function fingerprint(pet) {
  return JSON.stringify([
    pet.id,
    pet.name,
    pet.size,
    pet.sizePercent ?? "",
    pet.balanceEnabled,
    pet.whisperEnabled,
    pet.workStatusEnabled,
    pet.fixedEnabled,
    pet.display,
    pet.position.corner,
    pet.position.marginX,
    pet.position.marginY,
    pet.whisperPrompt ?? ""
  ]);
}
function diffPackWrites(loaded, current2) {
  const groups = /* @__PURE__ */ new Map();
  for (const pet of current2) {
    const entry = pet.assetRoot ?? "";
    if (entry === "" || entry === "main") continue;
    const list = groups.get(entry);
    if (list) list.push(pet);
    else groups.set(entry, [pet]);
  }
  const out = [];
  for (const [entry, pets] of groups) {
    const before = loaded.find((item) => item.key === entry)?.pets ?? [];
    const unchanged = before.length === pets.length && before.every((pet, i) => fingerprint(pet) === fingerprint(pets[i]));
    if (!unchanged) out.push({ entry, pets });
  }
  return out;
}
var init_pack_writes = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/pack-writes.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/persist.ts
async function persistSettings(fields, packWrites, force, fallbackUserFile) {
  const outcome = await saveConfig(buildSaveBody(fields), force);
  if (outcome.kind === "corrupt") return { kind: "corrupt", path: outcome.userFile ?? fallbackUserFile };
  if (outcome.kind !== "ok") return { kind: outcome.kind };
  let merged = outcome.merged;
  const failed = [];
  for (const write of packWrites) {
    const result = await savePetLayer(write.entry, write.pets);
    if (result.kind === "ok") merged = result.merged;
    else failed.push(write.entry);
  }
  petBridge.reload(merged);
  void reloadNotifications();
  return failed.length > 0 ? { kind: "partial", failed } : { kind: "ok" };
}
async function syncSettings() {
  const merged = await syncConfig();
  if (merged === null) return null;
  petBridge.reload(merged);
  void reloadNotifications();
  return merged;
}
var init_persist = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/persist.ts"() {
    init_notify2();
    init_bridge();
    init_http();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/pet-size.ts
function isValidSizePercent(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= SIZE_PERCENT_MIN;
}
var BODY_WIDTH_RATIO, SIZE_PERCENT_MIN, SIZE_PERCENT_DEFAULT;
var init_pet_size = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/pet-size.ts"() {
    init_constants();
    BODY_WIDTH_RATIO = (HIT_BOX.x1 - HIT_BOX.x0) / 640;
    SIZE_PERCENT_MIN = 1;
    SIZE_PERCENT_DEFAULT = 20;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/validate-form.ts
function validateForm(values) {
  if (!values.pets.every(petValid)) return "invalid";
  if (!physicsValid(values.physics)) return "invalidPhysics";
  if (!modelPairValid(values.whisperModel) || !modelPairValid(values.chatModel)) return "invalidModel";
  if (!Number.isFinite(values.chatMemory) || values.chatMemory < 0) return "invalidChatMemory";
  if (!Number.isFinite(values.chatImageLimit) || values.chatImageLimit < 0) return "invalidChatImageLimit";
  if (!fontValid(values.font)) return "invalidFont";
  return null;
}
var modelPairValid, petValid, physicsValid, fontValid;
var init_validate_form = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/validate-form.ts"() {
    init_fonts();
    init_pet_size();
    modelPairValid = (model) => model.provider.trim() === "" === (model.model.trim() === "");
    petValid = (pet) => Number.isFinite(pet.size) && pet.size > 0 && (pet.sizePercent === void 0 || isValidSizePercent(pet.sizePercent)) && Number.isFinite(pet.position.marginX) && Number.isFinite(pet.position.marginY);
    physicsValid = (physics) => Number.isFinite(physics.gravity) && physics.gravity >= 0 && Number.isFinite(physics.restitution) && physics.restitution >= 0 && physics.restitution <= 1 && Number.isFinite(physics.groundFriction) && physics.groundFriction >= 0 && Number.isFinite(physics.throwPower) && physics.throwPower > 0;
    fontValid = (font) => FONT_PRESETS.some((preset) => preset.id === font.family) && Number.isFinite(font.size) && font.size >= FONT_SIZE_MIN && font.size <= FONT_SIZE_MAX;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/write-flow.ts
function createWriteFlow(deps) {
  const { setBusy, setMsg, setDialog, t: t2 } = deps;
  const save = async (force = false) => {
    if (deps.busy()) return;
    const fields = deps.fields();
    const invalid = validateForm({
      pets: fields.pets,
      physics: fields.physics,
      whisperModel: fields.whisperModel,
      chatModel: fields.chatModel,
      chatMemory: fields.chatMemoryRounds,
      chatImageLimit: fields.chatImageLimit,
      font: fields.font
    });
    if (invalid !== null) {
      setMsg({ kind: "err", text: t2(invalid) });
      return;
    }
    setBusy(true);
    setMsg({ kind: "", text: "" });
    try {
      const result = await persistSettings(fields, deps.packWrites(), force, deps.userFile());
      if (result.kind === "ok") {
        setMsg({ kind: "ok", text: t2("saved") });
        return;
      }
      if (result.kind === "corrupt") {
        setDialog({ kind: "corrupt", path: result.path });
        return;
      }
      if (result.kind === "partial") {
        setMsg({ kind: "err", text: t2("savePartial").replace("{names}", result.failed.join("\u3001")) });
        return;
      }
      setMsg({ kind: "err", text: t2(result.kind === "invalid" ? "saveInvalid" : "saveError") });
    } finally {
      setBusy(false);
    }
  };
  const doSync = async () => {
    setBusy(true);
    setMsg({ kind: "", text: "" });
    try {
      const merged = await syncSettings();
      if (merged === null) {
        setMsg({ kind: "err", text: t2("syncError") });
        return;
      }
      deps.applyConfig(merged);
      setMsg({ kind: "ok", text: t2("saved") });
    } finally {
      setBusy(false);
    }
  };
  return {
    save,
    requestSync: () => setDialog({ kind: "sync" }),
    confirmDialog: () => {
      const pending = deps.dialog();
      if (pending === null) return;
      setDialog(null);
      if (pending.kind === "remove") deps.onRemove();
      else if (pending.kind === "corrupt") void save(true);
      else if (pending.kind === "sync") void doSync();
    }
  };
}
var init_write_flow = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/write-flow.ts"() {
    init_persist();
    init_validate_form();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/use-config-load.ts
function useConfigLoad(rt, onMerged) {
  const { useState, useEffect } = rt;
  const [loadState, setLoadState] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    void loadConfig(controller.signal).then((merged) => {
      if (!alive) return;
      if (merged === null) {
        setLoadState("error");
        return;
      }
      onMerged(merged);
      setLoadState("ready");
    }).catch(() => {
      if (alive) setLoadState("error");
    });
    return () => {
      alive = false;
      controller.abort();
    };
  }, [onMerged, attempt]);
  const retry = () => {
    setLoadState("loading");
    setAttempt((value) => value + 1);
  };
  return { loadState, retry };
}
var init_use_config_load = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/use-config-load.ts"() {
    init_http();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/index.ts
var init_config = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/config/index.ts"() {
    init_read();
    init_http();
    init_pack_writes();
    init_persist();
    init_write_flow();
    init_use_config_load();
    init_validate_form();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/dialog.ts
function bodyText(dialog, t2, selId) {
  if (dialog.kind === "remove") return t2("confirmRemove").replace("{id}", selId);
  if (dialog.kind === "lastOne") return t2("atLeastOne");
  if (dialog.kind === "lastOfKind") return t2("lastOfKind").replace("{entry}", dialog.entry);
  if (dialog.kind === "corrupt") return t2("corruptBody").replace("{path}", dialog.path);
  return t2("confirmSync");
}
function confirmLabel(kind, t2) {
  if (kind === "remove") return t2("remove");
  if (kind === "corrupt") return t2("corruptConfirm");
  return t2("sync");
}
function makeDialog(rt) {
  const { h: h2, t: t2 } = rt;
  return function SettingsDialog(props) {
    const { dialog } = props;
    const confirmable = dialog.kind === "lastOne" || dialog.kind === "lastOfKind" ? null : dialog;
    return h2("div", {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.45)"
      },
      onClick: props.onDismiss,
      children: h2("div", {
        style: {
          width: "340px",
          maxWidth: "calc(100vw - 40px)",
          background: "var(--dsw-alias-bg-layer-1)",
          border: "1px solid var(--dsw-alias-border-l2)",
          borderRadius: "12px",
          padding: "16px 18px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        },
        onClick: (e) => e.stopPropagation(),
        children: [
          h2("div", {
            style: { fontSize: "14px", fontWeight: 500, color: "var(--dsw-alias-label-primary)" },
            children: t2(dialog.kind === "corrupt" ? "corruptTitle" : "confirmTitle")
          }),
          h2("div", {
            style: { fontSize: "13px", lineHeight: "20px", color: "var(--dsw-alias-label-secondary)" },
            children: bodyText(dialog, t2, props.selId)
          }),
          h2("div", {
            style: { display: "flex", gap: "8px", justifyContent: "flex-end" },
            // 只剩一只没有可确认的动作，只给「知道了」；其余都是取消 + 确认双按钮。
            children: confirmable === null ? [
              h2("button", {
                key: "ok",
                type: "button",
                onClick: props.onDismiss,
                className: "dsh-pet-cfg__btn is-primary",
                children: t2("ok")
              })
            ] : [
              h2("button", {
                key: "cancel",
                type: "button",
                onClick: props.onDismiss,
                className: "dsh-pet-cfg__btn",
                children: t2("cancel")
              }),
              h2("button", {
                key: "confirm",
                type: "button",
                onClick: props.onConfirm,
                className: "dsh-pet-cfg__btn " + (confirmable.kind === "sync" ? "is-primary" : "is-danger"),
                children: confirmLabel(confirmable.kind, t2)
              })
            ]
          })
        ]
      })
    });
  };
}
var init_dialog = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/dialog.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/panel/placement.ts
function computePanelPlacement(anchor, viewport, options = {}) {
  const minWidth = options.minWidthPx ?? 240;
  const maxWidth = options.maxWidthPx ?? 420;
  const maxHeight = options.maxHeightPx ?? 360;
  const flipThreshold = options.flipThresholdPx ?? 240;
  const below = viewport.height - anchor.bottom - PANEL_GAP_PX;
  const above = anchor.top - PANEL_GAP_PX;
  const available = Math.max(MIN_AVAILABLE_WIDTH_PX, Math.min(maxWidth, viewport.width - VIEWPORT_INSET_PX));
  const width = Math.min(Math.max(anchor.width, minWidth), available);
  const left = Math.max(EDGE_MARGIN_PX, Math.min(anchor.left, viewport.width - width - EDGE_MARGIN_PX));
  const openUp = below < flipThreshold && above > below;
  return openUp ? { left, bottom: viewport.height - anchor.top + PANEL_OFFSET_PX, width, maxHeight: Math.min(maxHeight, above) } : { left, top: anchor.bottom + PANEL_OFFSET_PX, width, maxHeight: Math.min(maxHeight, below) };
}
var PANEL_GAP_PX, PANEL_OFFSET_PX, EDGE_MARGIN_PX, VIEWPORT_INSET_PX, MIN_AVAILABLE_WIDTH_PX;
var init_placement = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/panel/placement.ts"() {
    PANEL_GAP_PX = 12;
    PANEL_OFFSET_PX = 4;
    EDGE_MARGIN_PX = 8;
    VIEWPORT_INSET_PX = 16;
    MIN_AVAILABLE_WIDTH_PX = 200;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/panel/select.ts
function makeSelect(rt) {
  const { h: h2, useState, useEffect, useRef } = rt;
  return function Select(props) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const [pos, setPos] = useState(null);
    const rootRef = useRef(null);
    const panelRef = useRef(null);
    const selectedAt = props.options.findIndex((option) => option.id === props.value);
    const currentLabel = selectedAt >= 0 ? props.options[selectedAt].label : "";
    const openAt = (index) => {
      setActive(index >= 0 ? index : 0);
      setOpen(true);
    };
    const commit = (index) => {
      const option = props.options[index];
      setOpen(false);
      if (option !== void 0 && option.id !== props.value) props.onChange(option.id);
    };
    const step = (dir) => {
      const count = props.options.length;
      if (count === 0) return;
      const next = (Math.max(active, 0) + dir + count) % count;
      setActive(next);
      panelRef.current?.querySelector('[data-row="' + next + '"]')?.scrollIntoView({ block: "nearest" });
    };
    useEffect(() => {
      if (!open) return;
      const root = rootRef.current;
      const place = () => {
        if (!root) return;
        setPos(
          computePanelPlacement(
            root.getBoundingClientRect(),
            { width: window.innerWidth, height: window.innerHeight },
            // 与触发器等宽：240 的下限是给「服务商 + 模型」两段文字留的，单行下拉不该继承。
            { minWidthPx: 0 }
          )
        );
      };
      place();
      const onDown = (e) => {
        const target = e.target;
        if (target && (rootRef.current?.contains(target) === true || panelRef.current?.contains(target) === true)) {
          return;
        }
        setOpen(false);
      };
      const onKey = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", onDown, true);
      document.addEventListener("keydown", onKey, true);
      window.addEventListener("scroll", place, true);
      window.addEventListener("resize", place);
      return () => {
        document.removeEventListener("mousedown", onDown, true);
        document.removeEventListener("keydown", onKey, true);
        window.removeEventListener("scroll", place, true);
        window.removeEventListener("resize", place);
      };
    }, [open]);
    useEffect(() => {
      if (props.disabled) setOpen(false);
    }, [props.disabled]);
    const toggle = () => {
      if (props.disabled) return;
      if (open) setOpen(false);
      else openAt(selectedAt);
    };
    const onTriggerKey = (e) => {
      const count = props.options.length;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (open) step(e.key === "ArrowDown" ? 1 : -1);
        else openAt(selectedAt);
        return;
      }
      if (open && (e.key === "Home" || e.key === "End")) {
        e.preventDefault();
        setActive(e.key === "Home" || count === 0 ? 0 : count - 1);
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (open) commit(active);
        else openAt(selectedAt);
      }
    };
    const panel = open && pos ? h2("div", {
      ref: panelRef,
      className: "dsh-pet-sel__panel",
      role: "listbox",
      "aria-label": props.label,
      style: {
        left: pos.left + "px",
        top: pos.top === void 0 ? void 0 : pos.top + "px",
        bottom: pos.bottom === void 0 ? void 0 : pos.bottom + "px",
        width: pos.width + "px",
        maxHeight: pos.maxHeight + "px"
      },
      children: h2("div", {
        className: "dsh-pet-sel__list",
        children: props.options.map(
          (option, index) => h2("button", {
            key: option.id,
            type: "button",
            role: "option",
            "aria-selected": option.id === props.value,
            "data-row": index,
            className: "dsh-pet-sel__item" + (index === active ? " is-active" : ""),
            onMouseMove: () => setActive(index),
            onClick: () => commit(index),
            children: [
              h2("span", { key: "n", className: "dsh-pet-sel__name", children: option.label }),
              h2("span", {
                key: "c",
                className: "dsh-pet-sel__check",
                children: option.id === props.value ? "\u2713" : ""
              })
            ]
          })
        )
      })
    }) : null;
    return h2("div", {
      ref: rootRef,
      className: "dsh-pet-sel",
      children: [
        h2("button", {
          key: "trigger",
          type: "button",
          className: INPUT_CLASS + " dsh-pet-sel__trigger",
          disabled: props.disabled,
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "aria-label": props.label,
          onClick: toggle,
          onKeyDown: onTriggerKey,
          children: [
            h2("span", { key: "l", className: "dsh-pet-sel__label", children: currentLabel }),
            h2("span", { key: "c", className: "dsh-pet-sel__chevron" + (open ? " is-open" : "") })
          ]
        }),
        panel
      ]
    });
  };
}
var init_select = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/panel/select.ts"() {
    init_ui();
    init_placement();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/font-card.ts
function makeFontCard(rt) {
  const { h: h2, t: t2 } = rt;
  const { cardHead, field, toggleCell } = makeUiKit({ h: h2, t: t2 });
  const Select = makeSelect(rt);
  return function FontCard(props) {
    const { busy, font } = props;
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        cardHead(t2("fontTitle"), t2("fontHint")),
        h2("div", {
          className: "dsh-pet-cfg__grid2",
          children: [
            field(
              t2("fontFamilyLabel"),
              h2(Select, {
                label: t2("fontFamilyLabel"),
                value: font.family,
                options: FONT_PRESETS.map((preset) => ({ id: preset.id, label: t2("font." + preset.id) })),
                disabled: busy,
                onChange: (id) => props.onChange({ family: id })
              }),
              t2("fontFamilyHint")
            ),
            field(
              t2("fontSizeLabel"),
              h2(
                "input",
                numberInputProps(font.size, (v) => props.onChange({ size: v }), {
                  step: "1",
                  min: String(FONT_SIZE_MIN),
                  max: String(FONT_SIZE_MAX),
                  disabled: busy
                })
              ),
              t2("fontSizeHint")
            )
          ]
        }),
        h2("div", {
          className: "dsh-pet-cfg__grid2",
          children: [toggleCell("fontFollowToggle", font.followPet, busy, (v) => props.onChange({ followPet: v }))]
        })
      ]
    });
  };
}
var init_font_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/font-card.ts"() {
    init_fonts();
    init_ui();
    init_select();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/global-card.ts
function makeGlobalCard(rt) {
  const { h: h2, t: t2 } = rt;
  const { cardHead, toggleCell } = makeUiKit({ h: h2, t: t2 });
  return function GlobalCard(props) {
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        cardHead(t2("globalTitle"), t2("globalHint")),
        h2("div", {
          className: "dsh-pet-cfg__grid4",
          children: TOGGLES.map(
            (toggle) => toggleCell(
              toggle.label,
              props.values[toggle.key],
              props.busy,
              (value) => props.onChange(toggle.key, value)
            )
          )
        })
      ]
    });
  };
}
var TOGGLES;
var init_global_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/global-card.ts"() {
    init_ui();
    TOGGLES = [
      { key: "notificationsEnabled", label: "notifyToggle" },
      { key: "clickSoundEnabled", label: "clickSoundToggle" },
      { key: "confineToScreen", label: "confineToggle" },
      { key: "trayEnabled", label: "trayToggle" }
    ];
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/load-status.ts
function makeLoadStatus(rt) {
  const { h: h2, t: t2 } = rt;
  return function LoadStatus(props) {
    if (props.loadState === "ready") return null;
    const failed = props.loadState === "error";
    return h2("div", {
      role: failed ? "alert" : "status",
      className: "dsh-pet-cfg__actions",
      children: [
        h2("span", { children: t2(failed ? "loadError" : "loading") }),
        failed ? h2("button", {
          type: "button",
          className: "dsh-pet-cfg__btn",
          onClick: props.onRetry,
          children: t2("retry")
        }) : null
      ]
    });
  };
}
var init_load_status = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/load-status.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/model-card.ts
function makeModelCard(rt, picker) {
  const { h: h2, t: t2 } = rt;
  const { cardHead, field, toggleCell } = makeUiKit({ h: h2, t: t2 });
  return function ModelCard(props) {
    const { busy, catalog, failed } = props;
    const numField = (label, value, setter) => field(
      t2(label),
      h2("input", numberInputProps(value, setter, { step: "1", min: "0", disabled: busy })),
      t2(label + "Hint")
    );
    const modelCell = (key, value) => {
      const label = t2(key === "whisperModel" ? "whisperModelLabel" : "chatModelLabel");
      return field(
        label,
        h2(picker, {
          label,
          value,
          disabled: busy,
          catalog,
          failed,
          onChange: (next) => props.onModelChange(key, next)
        }),
        t2("modelFieldHint")
      );
    };
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        cardHead(t2("modelTitle"), t2("modelHint")),
        failed ? h2("p", {
          className: "dsh-pet-cfg__note",
          style: { color: "var(--dsw-alias-state-error-primary)" },
          children: t2("modelCatalogFailed")
        }) : null,
        h2("div", {
          className: "dsh-pet-cfg__grid2",
          children: [modelCell("whisperModel", props.whisperModel), modelCell("chatModel", props.chatModel)]
        }),
        h2("div", {
          className: "dsh-pet-cfg__grid4",
          children: [
            numField("chatMemory", props.chatMemory, props.onChatMemoryChange),
            numField("chatImageLimit", props.chatImageLimit, props.onChatImageLimitChange)
          ]
        }),
        h2("div", {
          className: "dsh-pet-cfg__grid3",
          children: CHAT_TOGGLES.map(
            (toggle) => toggleCell(toggle.label, props.values[toggle.key], busy, (value) => props.onFlagChange(toggle.key, value))
          )
        })
      ]
    });
  };
}
var CHAT_TOGGLES;
var init_model_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/model-card.ts"() {
    init_ui();
    CHAT_TOGGLES = [
      { key: "whisperImageEnabled", label: "whisperImageToggle" },
      { key: "chatImageEnabled", label: "chatImageToggle" },
      { key: "chatAnimationEnabled", label: "chatAnimationToggle" }
    ];
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/pet/device-tilt.ts
async function requestMotionPermission(kinds) {
  const ask = async (ctor) => {
    if (ctor === void 0) return false;
    const fn = ctor.requestPermission;
    if (typeof fn !== "function") return true;
    try {
      return await fn.call(ctor) === "granted";
    } catch {
      return false;
    }
  };
  const granted = [];
  if (kinds.tilt) granted.push(await ask(globalThis.DeviceOrientationEvent));
  if (kinds.shake) granted.push(await ask(globalThis.DeviceMotionEvent));
  return granted.every(Boolean);
}
var init_device_tilt = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/pet/device-tilt.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/mobile-card.ts
function makeMobileCard(rt) {
  const { h: h2, t: t2 } = rt;
  const { cardHead, toggleCell } = makeUiKit({ h: h2, t: t2 });
  return function MobileCard(props) {
    const { busy, physics } = props;
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        cardHead(t2("mobileTitle"), t2("mobileHint")),
        h2("div", {
          className: "dsh-pet-cfg__grid3",
          children: [
            toggleCell(
              "physicsHaptic",
              physics.hapticEnabled !== false,
              busy,
              (v) => props.onChange({ hapticEnabled: v })
            ),
            toggleCell("physicsTilt", physics.tiltGravity === true, busy, (v) => {
              if (v) void requestMotionPermission({ tilt: true, shake: false });
              props.onChange({ tiltGravity: v });
            }),
            toggleCell("physicsShake", physics.shakeThrow === true, busy, (v) => {
              if (v) void requestMotionPermission({ tilt: false, shake: true });
              props.onChange({ shakeThrow: v });
            })
          ]
        })
      ]
    });
  };
}
var init_mobile_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/mobile-card.ts"() {
    init_device_tilt();
    init_ui();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/motion-card.ts
function makeMotionCard(rt) {
  const { h: h2, t: t2 } = rt;
  const { cardHead, field } = makeUiKit({ h: h2, t: t2 });
  return function MotionCard(props) {
    const { busy, weights } = props;
    const weightFields = WEIGHT_KEYS.map(
      (key) => field(
        t2("motion." + key),
        h2(
          "input",
          numberInputProps(weights[key], (value) => props.onChange(withWeight(weights, key, value)), {
            step: "1",
            min: "0",
            max: "100",
            disabled: busy
          })
        )
      )
    );
    const actionField = field(
      t2("motion.action"),
      h2("input", {
        className: INPUT_CLASS,
        type: "number",
        value: actionPercent(weights),
        readOnly: true,
        tabIndex: -1,
        "aria-label": t2("motion.action")
      })
    );
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        cardHead(t2("motionTitle"), t2("motionHint")),
        h2("div", { className: "dsh-pet-cfg__grid4", children: [...weightFields, actionField] })
      ]
    });
  };
}
var init_motion_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/motion-card.ts"() {
    init_ui();
    init_weights();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/model-rows.ts
function matchModelQuery(text, query) {
  const needle = query.trim().toLowerCase();
  if (needle === "") return true;
  let at = 0;
  for (const char of text.toLowerCase()) {
    if (char === needle[at]) at += 1;
    if (at >= needle.length) return true;
  }
  return false;
}
function buildModelRows(groups, query) {
  const needle = query.trim().toLowerCase();
  const rows = [];
  if (needle === "") rows.push({ kind: "follow", key: "__follow" });
  for (const group of groups) {
    const models = group.models.filter((model) => matchModelQuery(model.name + " " + model.id, needle));
    if (models.length === 0 && !(needle === "" && group.models.length === 0)) continue;
    rows.push({ kind: "group", key: group.id, name: group.name });
    if (models.length === 0) {
      rows.push({ kind: "none", key: group.id + "/__none" });
      continue;
    }
    for (const model of models) {
      rows.push({ kind: "model", key: group.id + "/" + model.id, provider: group.id, model });
    }
  }
  return rows;
}
function selectableIndexes(rows) {
  return rows.map((row, index) => row.kind === "group" || row.kind === "none" ? -1 : index).filter((i) => i >= 0);
}
var init_model_rows = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/model-rows.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/model-picker-panel.ts
function buildModelPanel(view) {
  const { h: h2, t: t2 } = view;
  const emptyHint = view.catalog !== null && view.catalog.length === 0 ? t2("modelNoModels") : view.rows.length === 0 ? t2("modelEmpty") : "";
  return h2("div", {
    ref: view.panelRef,
    className: "dsh-pet-mp__panel",
    role: "menu",
    "aria-label": view.label,
    style: {
      left: view.pos.left + "px",
      top: view.pos.top === void 0 ? void 0 : view.pos.top + "px",
      bottom: view.pos.bottom === void 0 ? void 0 : view.pos.bottom + "px",
      width: view.pos.width + "px",
      maxHeight: view.pos.maxHeight + "px"
    },
    children: [
      searchNode(view),
      view.catalog === null ? statusNode(h2, "loading", view.failed ? t2("modelCatalogFailed") : t2("modelLoading"), false) : emptyHint !== "" ? statusNode(h2, "empty", emptyHint, true) : h2("div", {
        key: "list",
        className: "dsh-pet-mp__list",
        role: "group",
        children: view.rows.map((row, index) => rowNode(view, row, index))
      })
    ]
  });
}
function statusNode(h2, key, text, live) {
  return h2("div", {
    key,
    className: "dsh-pet-mp__status",
    role: live ? "status" : void 0,
    children: text
  });
}
function searchNode(view) {
  const { h: h2, t: t2 } = view;
  return h2("input", {
    key: "search",
    type: "text",
    className: "dsh-pet-mp__search",
    role: "searchbox",
    placeholder: t2("modelSearch"),
    "aria-label": t2("modelSearch"),
    value: view.query,
    disabled: view.disabled,
    onChange: (event) => view.onQueryChange(event.target.value),
    onKeyDown: view.onKeyDown
  });
}
function rowNode(view, row, index) {
  const { h: h2, t: t2 } = view;
  if (row.kind === "group") {
    return h2("div", { key: row.key, className: "dsh-pet-mp__group", children: row.name });
  }
  if (row.kind === "none") {
    return h2("div", { key: row.key, className: "dsh-pet-mp__status", children: t2("modelNone") });
  }
  const checked = row.kind === "follow" ? view.value.provider === "" : view.value.provider === row.provider && view.value.model === row.model.id;
  return h2("button", {
    key: row.key,
    type: "button",
    role: "menuitemradio",
    "aria-checked": checked,
    "data-row": index,
    className: "dsh-pet-mp__item" + (index === view.active ? " is-active" : ""),
    disabled: view.disabled,
    onClick: () => view.onPick(row),
    onMouseMove: () => view.onHover(index),
    children: [
      h2("span", {
        key: "n",
        className: "dsh-pet-mp__name",
        children: row.kind === "follow" ? t2("modelFollow") : row.model.name
      }),
      h2("span", { key: "c", className: "dsh-pet-mp__check", children: checked ? "\u2713" : "" })
    ]
  });
}
var init_model_picker_panel = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/model-picker-panel.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/model-picker.ts
function makeModelPicker(rt) {
  const { h: h2, useState, useEffect, useRef, t: t2 } = rt;
  return function ModelPicker(props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [pos, setPos] = useState(null);
    const rootRef = useRef(null);
    const panelRef = useRef(null);
    const groups = props.catalog ?? [];
    const group = groups.find((g) => g.id === props.value.provider);
    const picked = group?.models.find((m) => m.id === props.value.model);
    const isFollow = props.value.provider === "";
    const triggerLabel = isFollow ? t2("modelFollow") : picked?.name ?? props.value.model;
    const triggerSub = isFollow ? "" : group?.name ?? props.value.provider + t2("modelUnknown");
    const rows = buildModelRows(groups, query);
    const selectable = selectableIndexes(rows);
    const commit = (value) => {
      props.onChange(value);
      setOpen(false);
      setQuery("");
    };
    const pick = (row) => {
      if (!row) return;
      if (row.kind === "follow") commit({ provider: "", model: "" });
      else if (row.kind === "model") commit({ provider: row.provider, model: row.model.id });
    };
    const step = (dir) => {
      if (selectable.length === 0) return;
      const at = selectable.indexOf(active);
      const next = selectable[at < 0 ? 0 : (at + dir + selectable.length) % selectable.length];
      setActive(next);
      panelRef.current?.querySelector('[data-row="' + next + '"]')?.scrollIntoView({ block: "nearest" });
    };
    useEffect(() => {
      if (!open) return;
      const el = rootRef.current;
      const place = () => {
        if (!el) return;
        setPos(
          computePanelPlacement(el.getBoundingClientRect(), {
            width: window.innerWidth,
            height: window.innerHeight
          })
        );
      };
      place();
      panelRef.current?.querySelector("input")?.focus();
      const onDown = (e) => {
        const target = e.target;
        if (target && (rootRef.current?.contains(target) === true || panelRef.current?.contains(target) === true)) {
          return;
        }
        setOpen(false);
      };
      const onKey = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", onDown, true);
      document.addEventListener("keydown", onKey, true);
      window.addEventListener("scroll", place, true);
      window.addEventListener("resize", place);
      return () => {
        document.removeEventListener("mousedown", onDown, true);
        document.removeEventListener("keydown", onKey, true);
        window.removeEventListener("scroll", place, true);
        window.removeEventListener("resize", place);
      };
    }, [open]);
    const toggle = () => {
      if (props.disabled) return;
      if (!open) {
        setQuery("");
        const at = rows.findIndex(
          (r) => r.kind === "model" && r.provider === props.value.provider && r.model.id === props.value.model
        );
        setActive(at >= 0 ? at : 0);
      }
      setOpen(!open);
    };
    const panel = open && pos ? buildModelPanel({
      h: h2,
      t: t2,
      label: props.label,
      disabled: props.disabled,
      catalog: props.catalog,
      failed: props.failed,
      rows,
      active,
      query,
      value: props.value,
      pos,
      panelRef,
      onQueryChange: (value) => {
        setQuery(value);
        setActive(selectable.length > 0 ? selectable[0] : 0);
      },
      onPick: pick,
      onHover: setActive,
      onKeyDown: (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          step(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          step(-1);
        } else if (event.key === "Enter") {
          event.preventDefault();
          pick(rows[active]);
        }
      }
    }) : null;
    return h2("div", {
      ref: rootRef,
      className: "dsh-pet-mp",
      children: [
        h2("button", {
          key: "trigger",
          type: "button",
          className: "dsh-pet-mp__trigger",
          disabled: props.disabled,
          "aria-haspopup": "menu",
          "aria-expanded": open,
          "aria-label": t2("modelTriggerAria").replace("{model}", triggerLabel),
          onClick: toggle,
          children: [
            h2("span", { key: "l", className: "dsh-pet-mp__label", children: triggerLabel }),
            triggerSub ? h2("span", { key: "s", className: "dsh-pet-mp__sub", children: triggerSub }) : null,
            h2("span", { key: "c", className: "dsh-pet-mp__chevron" + (open ? " is-open" : ""), children: "\u25BE" })
          ]
        }),
        panel
      ]
    });
  };
}
var init_model_picker = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/model-picker.ts"() {
    init_model_rows();
    init_placement();
    init_model_picker_panel();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/index.ts
var init_picker = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/index.ts"() {
    init_model_rows();
    init_placement();
    init_model_picker_panel();
    init_model_picker();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/voice-picker.ts
function makeVoicePicker(rt) {
  const { h: h2 } = rt;
  const Select = makeSelect(rt);
  return function VoicePicker(props) {
    return h2(Select, {
      label: props.label,
      value: props.value,
      options: props.options.map((option) => ({ id: option.id, label: `${option.name}\uFF08${option.tag}\uFF09` })),
      disabled: props.disabled,
      onChange: props.onChange
    });
  };
}
var init_voice_picker = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/picker/voice-picker.ts"() {
    init_select();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/notify-test.ts
async function runNotificationTest(deps) {
  const { t: t2, report } = deps;
  report({ kind: "", text: "" });
  const result = await requestNotificationPermission();
  if (!result.ok) {
    const reason = result.reason === "unsupported" ? t2("notifyDenyUnsupported") : result.reason === "denied" ? t2("notifyDenyBlocked") : result.reason === "rejected" ? t2("notifyDenyRejected") : t2("notifyDenyError") + (result.message ? "\uFF1A" + result.message : "");
    report({ kind: "err", text: reason + (result.reason === "unsupported" ? "" : " " + t2("notifyGuide")) });
    return;
  }
  try {
    wireNotificationClick(
      new Notification("\u6D4B\u8BD5\u901A\u77E5", { body: "\u3010dsh-pet\u3011\u7CFB\u7EDF\u901A\u77E5\u5DF2\u5C31\u7EEA\u3002", icon: NOTIFY_ICONS2.test })
    );
  } catch {
  }
  report({ kind: "ok", text: t2("notifyTestOk") });
}
var init_notify_test = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/notify-test.ts"() {
    init_notify2();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/kind-tabs.ts
function makeKindTabs(rt) {
  const { h: h2, t: t2 } = rt;
  return function KindTabs(props) {
    return h2("div", {
      className: "dsh-pet-cfg__kinds",
      children: [
        h2("span", { key: "label", className: "dsh-pet-cfg__tabsLabel", children: t2("kindLabel") }),
        ...props.kinds.map(
          (item) => h2("button", {
            key: item.entry,
            type: "button",
            disabled: props.busy,
            onClick: () => props.onSelect(item.entry),
            className: "dsh-pet-cfg__tab" + (item.entry === props.kind ? " is-active" : ""),
            // 主条目固定显示「内置」；文件宠物直接显示目录前缀（与素材根一致）。
            children: (item.kind === "main" ? t2("kindMain") : item.entry) + " (" + item.count + ")"
          })
        )
      ]
    });
  };
}
var init_kind_tabs = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/kind-tabs.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/paths-cards.ts
function makePathsCards(rt) {
  const { h: h2, t: t2, useState } = rt;
  const { foldCard } = makeUiKit({ h: h2, t: t2 });
  function ConfigMetaCard(props) {
    const { paths } = props;
    const [open, setOpen] = useState(false);
    const line = (key, value, suffix = "") => value === void 0 ? null : h2("div", { key, className: "dsh-pet-cfg__path", children: t2(key) + "\uFF1A" + value + suffix });
    const body = [
      line("defaultConfig", paths.default),
      line("userConfig", paths.user),
      line("todosFile", paths.todos),
      line("animationDir", paths.animations),
      line("memesDir", paths.memes),
      // 日志文件路径 + 一句说明；其余位置的用途都在问号里，唯独这条写在明面上——反馈问题时要先找它。
      line("logFile", paths.logs),
      paths.logs ? h2("div", { key: "logNote", className: "dsh-pet-cfg__note", children: t2("logFileNote") }) : null
    ];
    return foldCard({
      id: BODY_ID.meta,
      title: t2("configMeta"),
      hint: t2("configMetaHint"),
      body,
      open,
      onToggle: () => setOpen(!open)
    });
  }
  function StorageCard(props) {
    const { paths } = props;
    const [open, setOpen] = useState(false);
    const storage = paths.storage ?? [];
    if (storage.length === 0) return null;
    const body = [
      // 存储位置清单：每条都是「路径（等宽、可选中复制）到作用」。
      ...storage.map(
        (entry) => h2("div", {
          key: entry.key,
          className: "dsh-pet-cfg__path",
          children: [
            h2("b", { key: "p", style: { fontFamily: MONO_STACK }, children: entry.path }),
            // 尚未产生的目录标一下，避免用户去找不存在的文件夹。
            h2("span", {
              key: "d",
              children: " \u2014 " + t2("storage." + entry.key) + (entry.exists === false ? t2("storageMissing") : "")
            })
          ]
        })
      ),
      h2("div", {
        key: "ut",
        className: "dsh-pet-cfg__cardTitle",
        style: { marginTop: "4px" },
        children: t2("uninstallTitle")
      }),
      h2("div", { key: "u1", className: "dsh-pet-cfg__note", children: t2("uninstallStep1") }),
      h2("div", { key: "u2", className: "dsh-pet-cfg__note", children: t2("uninstallStep2") }),
      h2("div", {
        key: "cmd",
        className: "dsh-pet-cfg__cmd",
        children: t2("uninstallCmd").replace("{profile}", paths.profile || "<profile>")
      }),
      h2("div", { key: "u3", className: "dsh-pet-cfg__note", children: t2("uninstallStep3") })
    ];
    return foldCard({
      id: BODY_ID.storage,
      title: t2("storageTitle"),
      hint: t2("storageHint"),
      body,
      open,
      onToggle: () => setOpen(!open)
    });
  }
  return { ConfigMetaCard, StorageCard };
}
var BODY_ID;
var init_paths_cards = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/paths-cards.ts"() {
    init_ui();
    BODY_ID = {
      meta: "pet-cfg-paths-meta",
      storage: "pet-cfg-paths-storage"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/config.ts
var PET_DISPLAYS;
var init_config2 = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/config.ts"() {
    PET_DISPLAYS = ["web", "desktop", "both", "none"];
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-card-parts.ts
function makePetAvatarCell(rt) {
  const { h: h2, t: t2 } = rt;
  const { tip } = makeUiKit({ h: h2, t: t2 });
  const image = (src) => h2("img", { className: "dsh-pet-cfg__avatarImg", src, alt: t2("avatarLabel"), loading: "lazy" });
  return function PetAvatarCell(props) {
    if (props.onAvatar === void 0) {
      return h2("div", { className: "dsh-pet-cfg__avatarCol", children: image(props.avatarSrc) });
    }
    return h2("div", {
      className: "dsh-pet-cfg__avatarCol",
      children: h2("div", {
        className: "dsh-pet-cfg__avatarPick",
        ...tip(t2("avatarHint")),
        children: [
          image(props.avatarSrc),
          h2("span", {
            key: "mask",
            className: "dsh-pet-cfg__avatarMask" + (props.avatarBusy ? " is-busy" : ""),
            children: props.avatarBusy ? t2("avatarUploading") : t2("avatarChange")
          }),
          h2("input", {
            key: "file",
            className: "dsh-pet-cfg__file",
            type: "file",
            accept: "image/png,image/jpeg,image/webp,image/gif",
            disabled: props.avatarBusy || props.busy,
            "aria-label": t2("avatarUpload"),
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file !== void 0) props.onAvatar?.(file);
              e.target.value = "";
            }
          })
        ]
      })
    });
  };
}
function makePetIdentityFields(rt) {
  const { h: h2, t: t2 } = rt;
  const { field } = makeUiKit({ h: h2, t: t2 });
  const Select = makeSelect(rt);
  const sizeInput = (value, disabled, setter) => h2("input", numberInputProps(value, setter, { step: "10", min: "120", disabled }));
  const percentInput = (value, disabled, setter) => h2("input", numberInputProps(value, setter, { min: String(SIZE_PERCENT_MIN), step: "1", disabled }));
  const cells = (props) => {
    const { pet, busy, onChange } = props;
    return [
      field(
        t2("nameLabel"),
        h2("input", {
          type: "text",
          className: INPUT_CLASS,
          value: String(pet.name ?? ""),
          disabled: busy,
          maxLength: 50,
          onChange: (e) => onChange({ name: e.target.value })
        }),
        t2("nameHint")
      ),
      field(
        t2("sizeLabel"),
        sizeInput(pet.size, busy, (v) => onChange({ size: v })),
        t2("sizeHint")
      ),
      field(
        t2("sizePercentLabel"),
        percentInput(pet.sizePercent ?? SIZE_PERCENT_DEFAULT, busy, (v) => onChange({ sizePercent: v })),
        t2("sizePercentHint")
      ),
      field(
        t2("displayLabel"),
        h2(Select, {
          label: t2("displayLabel"),
          value: pet.display,
          options: PET_DISPLAYS.map((d) => ({ id: d, label: t2("display." + d) })),
          disabled: busy,
          onChange: (id) => onChange({ display: id })
        }),
        t2("displayHint")
      )
    ];
  };
  return function PetIdentityFields(props) {
    return h2("div", { className: "dsh-pet-cfg__grid2", children: cells(props) });
  };
}
function makePetPositionFields(rt) {
  const { h: h2, t: t2 } = rt;
  const { field } = makeUiKit({ h: h2, t: t2 });
  const Select = makeSelect(rt);
  const marginInput = (value, disabled, setter) => h2("input", numberInputProps(value, setter, { step: "1", min: "", disabled }));
  return function PetPositionFields(props) {
    const { pet, busy, onChange } = props;
    return h2("div", {
      className: "dsh-pet-cfg__grid3",
      children: [
        field(
          t2("cornerLabel"),
          h2(Select, {
            label: t2("cornerLabel"),
            value: pet.position.corner,
            options: CORNERS.map((c) => ({ id: c, label: t2("corner." + c) })),
            disabled: busy,
            onChange: (id) => onChange({ position: { corner: id } })
          }),
          t2("cornerHint")
        ),
        field(
          t2("marginX"),
          marginInput(pet.position.marginX, busy, (v) => onChange({ position: { marginX: v } })),
          t2("marginXHint")
        ),
        field(
          t2("marginY"),
          marginInput(pet.position.marginY, busy, (v) => onChange({ position: { marginY: v } })),
          t2("marginYHint")
        )
      ]
    });
  };
}
var CORNERS;
var init_pet_card_parts = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-card-parts.ts"() {
    init_config2();
    init_pet_size();
    init_ui();
    init_select();
    CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-card.ts
function makePetCard(rt) {
  const { h: h2, t: t2 } = rt;
  const { tip, q, field, toggleCell } = makeUiKit({ h: h2, t: t2 });
  const AvatarCell = makePetAvatarCell(rt);
  const IdentityFields = makePetIdentityFields(rt);
  const PositionFields = makePetPositionFields(rt);
  return function PetCard(props) {
    const { pet, busy, msg } = props;
    if (pet === null) return h2("p", { className: "dsh-pet-cfg__note", children: t2("emptyPets") });
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        h2("div", {
          className: "dsh-pet-cfg__cardHead",
          children: [
            h2("span", { key: "t", className: "dsh-pet-cfg__cardTitle", children: t2("petCardTitle") }),
            q(t2("petCardHint")),
            // 右侧动作组：auto margin 挂在这层 wrapper 上，保存结果出现 / 消失时按钮位置不会跳。
            h2("div", {
              key: "acts",
              style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" },
              children: [
                // 保存结果就近反馈（与页面底部同一份 msg 状态），否则在卡片上点保存看不到结果。
                msg.text ? h2("span", {
                  key: "msg",
                  className: "dsh-pet-cfg__msg" + (msg.kind === "err" ? " is-err" : ""),
                  children: msg.text
                }) : null,
                // 就近保存：宠物这一块改完就地存盘，不必滚到底部的「保存」；悬浮按钮即出快捷键气泡。
                h2("button", {
                  key: "sv",
                  type: "button",
                  onClick: props.onSave,
                  disabled: busy,
                  className: "dsh-pet-cfg__btn is-primary is-sm",
                  ...tip(t2("saveHotkey")),
                  children: t2("save")
                }),
                h2("button", {
                  key: "rm",
                  type: "button",
                  onClick: props.onRemove,
                  disabled: busy,
                  className: "dsh-pet-cfg__btn is-danger is-sm",
                  children: t2("remove")
                })
              ]
            })
          ]
        }),
        // 顶部一行：头像作左列，右侧是 2×2 的输入网格。
        h2("div", {
          className: "dsh-pet-cfg__topRow",
          children: [
            h2(AvatarCell, {
              avatarSrc: props.avatarSrc,
              avatarBusy: props.avatarBusy,
              busy,
              onAvatar: props.onAvatar
            }),
            h2(IdentityFields, { pet, busy, onChange: props.onChange })
          ]
        }),
        h2(PositionFields, { pet, busy, onChange: props.onChange }),
        h2("div", {
          className: "dsh-pet-cfg__grid4",
          children: [
            toggleCell("balanceEnabled", !!pet.balanceEnabled, busy, (v) => props.onChange({ balanceEnabled: v })),
            toggleCell("whisperEnabled", !!pet.whisperEnabled, busy, (v) => props.onChange({ whisperEnabled: v })),
            toggleCell(
              "workStatusEnabled",
              !!pet.workStatusEnabled,
              busy,
              (v) => props.onChange({ workStatusEnabled: v })
            ),
            toggleCell("fixedEnabled", !!pet.fixedEnabled, busy, (v) => props.onChange({ fixedEnabled: v }))
          ]
        }),
        // 人设（可选，实例级）：写在这只宠物上的 whisperPrompt，空 = 跟随所属条目的人设。
        // 只存储与回显，不在这里拼 system；拼装（名字声明 + 时间背景）在宿主半侧。
        // 占位符直接用条目人设正文，让「跟随的是什么」可见；人设没有长度上限，右下角只显示字数。
        field(
          t2("personaLabel"),
          h2("div", {
            className: "dsh-pet-cfg__persona",
            children: [
              h2("textarea", {
                className: INPUT_CLASS + " dsh-pet-cfg__area",
                rows: 3,
                value: String(pet.whisperPrompt ?? ""),
                disabled: busy,
                placeholder: props.entryPrompt,
                onChange: (e) => props.onChange({ whisperPrompt: e.target.value })
              }),
              h2("span", {
                className: "dsh-pet-cfg__count",
                children: t2("personaCount").replace("{n}", String(String(pet.whisperPrompt ?? "").length))
              })
            ]
          }),
          t2("personaHint")
        )
      ]
    });
  };
}
var init_pet_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-card.ts"() {
    init_ui();
    init_pet_card_parts();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/image-pick.ts
var IMAGE_TYPES, IMAGE_ACCEPT;
var init_image_pick = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/image-pick.ts"() {
    IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
    IMAGE_ACCEPT = IMAGE_TYPES.join(",");
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/encode.ts
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("\u8FD9\u4E2A\u6587\u4EF6\u8BFB\u4E0D\u51FA\u6765"));
    reader.onload = () => {
      const url = typeof reader.result === "string" ? reader.result : "";
      if (!url) {
        reject(new Error("\u8FD9\u4E2A\u6587\u4EF6\u8BFB\u4E0D\u51FA\u6765"));
        return;
      }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("\u8FD9\u4E2A\u6587\u4EF6\u89E3\u4E0D\u51FA\u56FE\u7247"));
      img.src = url;
    };
    reader.readAsDataURL(file);
  });
}
function bytesToBase64(bytes) {
  let bin = "";
  const CHUNK = 32768;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}
var IMAGE_MAX_BYTES;
var init_encode = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/encode.ts"() {
    init_image_pick();
    IMAGE_MAX_BYTES = 640 * 1024;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/avatar-upload.ts
async function encodeAvatarFile(file) {
  const img = await loadImage(file);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  if (Math.max(width, height) <= AVATAR_MAX_SIDE_PX) {
    return { base64: bytesToBase64(new Uint8Array(await file.arrayBuffer())), mediaType: file.type || "image/png" };
  }
  const scale = AVATAR_MAX_SIDE_PX / Math.max(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u7F29\u653E\u8FD9\u5F20\u56FE");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/png");
  return { base64: dataUrl.slice(dataUrl.indexOf(",") + 1), mediaType: "image/png" };
}
async function postAvatar(assetRoot, base64, fetchImpl = fetch) {
  const res = await fetchImpl(ROUTE_PATH + "/pet-avatar?root=" + encodeURIComponent(assetRoot), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ base64 })
  });
  const raw = await res.json().catch(() => null);
  if (!res.ok || raw === null) return { ok: false, message: "\u4E0A\u4F20\u5931\u8D25\uFF08HTTP " + res.status + "\uFF09" };
  if (raw.ok !== true) return { ok: false, message: typeof raw.message === "string" ? raw.message : "\u4E0A\u4F20\u5931\u8D25" };
  return { ok: true };
}
async function uploadPetAvatar(assetRoot, file) {
  const { base64 } = await encodeAvatarFile(file);
  return postAvatar(assetRoot, base64);
}
var AVATAR_MAX_SIDE_PX;
var init_avatar_upload = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/avatar-upload.ts"() {
    init_constants();
    init_encode();
    AVATAR_MAX_SIDE_PX = 512;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-tabs.ts
function makePetTabs(rt) {
  const { h: h2, t: t2 } = rt;
  return function PetTabs(props) {
    return h2("div", {
      className: "dsh-pet-cfg__tabs",
      children: [
        h2("span", { key: "label", className: "dsh-pet-cfg__tabsLabel", children: t2("petsLabel") }),
        ...props.pets.map(
          (pet) => h2("button", {
            key: pet.id,
            type: "button",
            onClick: () => props.onSelect(pet.id),
            className: "dsh-pet-cfg__tab" + (pet.id === props.selId ? " is-active" : ""),
            children: (pet.name || pet.id) + " (" + pet.size + "px" + (pet.sizePercent === void 0 || pet.sizePercent >= 100 ? "" : " / " + pet.sizePercent + "%") + ")"
          })
        ),
        h2("button", {
          key: "add",
          type: "button",
          onClick: props.onAdd,
          disabled: props.busy,
          className: "dsh-pet-cfg__tab is-ghost",
          children: "+ " + t2("add")
        })
      ]
    });
  };
}
var init_pet_tabs = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-tabs.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/physics-card.ts
function makePhysicsCard(rt) {
  const { h: h2, t: t2 } = rt;
  const { cardHead, field, toggleCell } = makeUiKit({ h: h2, t: t2 });
  return function PhysicsCard(props) {
    const { busy, physics } = props;
    const physField = (key, step, min) => field(
      t2("physics." + key),
      h2(
        "input",
        numberInputProps(physics[key], (v) => props.onChange({ [key]: v }), { step, min, disabled: busy })
      ),
      t2("physics." + key + "Hint")
    );
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        cardHead(t2("physicsTitle"), t2("physicsHint")),
        h2("div", {
          className: "dsh-pet-cfg__grid4",
          children: [
            physField("gravity", "50", "0"),
            physField("restitution", "0.01", "0"),
            physField("groundFriction", "0.1", "0"),
            physField("throwPower", "0.05", "0.05")
          ]
        }),
        h2("div", {
          className: "dsh-pet-cfg__grid2",
          children: [
            toggleCell(
              "physicsCeilingBounce",
              physics.ceilingBounce,
              busy,
              (v) => props.onChange({ ceilingBounce: v })
            ),
            toggleCell("physicsPetCollision", physics.petCollision, busy, (v) => props.onChange({ petCollision: v }))
          ]
        })
      ]
    });
  };
}
var init_physics_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/physics-card.ts"() {
    init_ui();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/hotkey.ts
var init_hotkey = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/hotkey.ts"() {
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/hear-hold.ts
var HEAR_HOTKEY_HINT;
var init_hear_hold = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/hear-hold.ts"() {
    init_hotkey();
    HEAR_HOTKEY_HINT = "M \u952E";
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/hotkey.ts
var CHAT_HOTKEY_HINT, CAPTURE_HOTKEY_HINT;
var init_hotkey2 = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/chat/hotkey.ts"() {
    init_hotkey();
    init_hotkey();
    CHAT_HOTKEY_HINT = "L \u952E";
    CAPTURE_HOTKEY_HINT = "S \u952E";
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/display-hotkey.ts
var DISPLAY_ORDER, DISPLAY_HOTKEY_HINTS;
var init_display_hotkey = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/display-hotkey.ts"() {
    init_hotkey();
    DISPLAY_ORDER = ["web", "desktop", "both", "none"];
    DISPLAY_HOTKEY_HINTS = DISPLAY_ORDER.map((_, index) => String(index + 1) + " \u952E");
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/sleep-hotkey.ts
var SLEEP_HOTKEY_HINT;
var init_sleep_hotkey = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/sleep-hotkey.ts"() {
    init_hotkey();
    SLEEP_HOTKEY_HINT = "Z \u952E";
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/todo/hotkey.ts
var TODO_HOTKEY_HINT;
var init_hotkey3 = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/todo/hotkey.ts"() {
    init_hotkey();
    TODO_HOTKEY_HINT = "D \u952E";
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/app-shortcut.ts
function keycapOf(binding) {
  const isMac = /Mac/i.test(navigator.platform || navigator.userAgent);
  const modifiers = binding.modifiers.map(
    (modifier) => modifier === "primary" ? isMac ? "Cmd" : "Ctrl" : MODIFIER_LABELS[modifier] ?? modifier
  );
  return [...modifiers, binding.code.replace(/^Key/, "")].join("+");
}
function readShortcutKeycap(ctx, id) {
  const catalog = ctx.get?.("shortcuts")?.catalog;
  if (catalog === void 0) return void 0;
  const row = catalog.getSnapshot().find((item) => item.id === id);
  return row === void 0 || row.keys.length === 0 ? void 0 : row.keys.join("");
}
function subscribeShortcutKeycaps(ctx, listener) {
  const catalog = ctx.get?.("shortcuts")?.catalog;
  if (catalog === void 0) return () => {
  };
  return catalog.subscribe(listener);
}
var MODIFIER_LABELS;
var init_app_shortcut = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/app-shortcut.ts"() {
    MODIFIER_LABELS = {
      alt: "Alt",
      control: "Ctrl",
      meta: "Cmd",
      shift: "Shift"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/chat/shortcut.ts
function petChatShortcutKeycap(ctx) {
  return readShortcutKeycap(ctx, PET_CHAT_COMMAND_ID) ?? keycapOf(BINDING);
}
var PET_CHAT_COMMAND_ID, BINDING;
var init_shortcut = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/chat/shortcut.ts"() {
    init_app_shortcut();
    PET_CHAT_COMMAND_ID = "pet-chat.open";
    BINDING = { code: "KeyP", modifiers: ["primary", "shift"] };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/pet/card/registry.ts
var init_registry = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/pet/card/registry.ts"() {
    init_bridge();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/pet/card/shortcut.ts
function petShortcutKeycap(ctx, key) {
  const command = COMMANDS[key];
  return readShortcutKeycap(ctx, command.id) ?? keycapOf(command.binding);
}
var PET_FLOAT_COMMAND_ID, PET_HEAR_COMMAND_ID, PET_CAPTURE_COMMAND_ID, FLOAT_BINDING, HEAR_BINDING, CAPTURE_BINDING, COMMANDS;
var init_shortcut2 = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/pet/card/shortcut.ts"() {
    init_app_shortcut();
    init_registry();
    PET_FLOAT_COMMAND_ID = "pet-chat.float";
    PET_HEAR_COMMAND_ID = "pet-chat.hear";
    PET_CAPTURE_COMMAND_ID = "pet-chat.capture";
    FLOAT_BINDING = { code: "KeyL", modifiers: ["primary", "shift"] };
    HEAR_BINDING = { code: "KeyM", modifiers: ["primary", "shift"] };
    CAPTURE_BINDING = { code: "KeyS", modifiers: ["primary", "shift"] };
    COMMANDS = {
      chat: { id: PET_FLOAT_COMMAND_ID, binding: FLOAT_BINDING },
      hear: { id: PET_HEAR_COMMAND_ID, binding: HEAR_BINDING },
      capture: { id: PET_CAPTURE_COMMAND_ID, binding: CAPTURE_BINDING }
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/shortcuts-card.ts
function readKeycaps(ctx) {
  return {
    open: petShortcutKeycap(ctx, "chat"),
    hear: petShortcutKeycap(ctx, "hear"),
    capture: petShortcutKeycap(ctx, "capture"),
    sidebar: petChatShortcutKeycap(ctx)
  };
}
function makeShortcutsCard(rt, ctx) {
  const { h: h2, t: t2, useState, useEffect } = rt;
  const { foldCard } = makeUiKit({ h: h2, t: t2 });
  return function ShortcutsCard() {
    const [open, setOpen] = useState(false);
    const [keycaps, setKeycaps] = useState(readKeycaps(ctx));
    useEffect(() => subscribeShortcutKeycaps(ctx, () => setKeycaps(readKeycaps(ctx))), []);
    const row = (label, keys) => h2("div", {
      className: "dsh-pet-cfg__field",
      children: [
        h2("span", { key: "l", className: "dsh-pet-cfg__flabel", children: t2(label) }),
        h2("span", { key: "v", className: "dsh-pet-cfg__note", children: keys })
      ]
    });
    return foldCard({
      id: BODY_ID2,
      title: t2("shortcutCardTitle"),
      hint: t2("shortcutCardHint"),
      body: [
        h2("p", { key: "petTitle", className: "dsh-pet-cfg__cardTitle", children: t2("shortcutGroupPet") }),
        h2("p", { key: "petHint", className: "dsh-pet-cfg__note", children: t2("shortcutGroupPetHint") }),
        h2("div", {
          key: "petRows",
          className: "dsh-pet-cfg__grid2",
          children: [
            row("shortcutRowChat", CHAT_HOTKEY_HINT),
            row("shortcutRowHold", HEAR_HOTKEY_HINT),
            row("shortcutRowCapture", CAPTURE_HOTKEY_HINT),
            row("shortcutRowPaste", PASTE_KEYCAP),
            row("shortcutRowTodo", TODO_HOTKEY_HINT),
            row("shortcutRowSleep", SLEEP_HOTKEY_HINT),
            row("shortcutRowDisplay", DISPLAY_HOTKEY_HINTS.join(" \xB7 "))
          ]
        }),
        h2("p", { key: "globalTitle", className: "dsh-pet-cfg__cardTitle", children: t2("shortcutGroupGlobal") }),
        h2("p", { key: "globalHint", className: "dsh-pet-cfg__note", children: t2("shortcutGroupGlobalHint") }),
        h2("div", {
          key: "globalRows",
          className: "dsh-pet-cfg__grid2",
          children: [
            row("shortcutRowChat", keycaps.open),
            row("shortcutRowHear", keycaps.hear),
            row("shortcutRowCapture", keycaps.capture),
            row("shortcutRowSidebar", keycaps.sidebar)
          ]
        })
      ],
      open,
      onToggle: () => setOpen(!open)
    });
  };
}
var BODY_ID2, PASTE_KEYCAP;
var init_shortcuts_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/shortcuts-card.ts"() {
    init_hear_hold();
    init_hotkey2();
    init_display_hotkey();
    init_sleep_hotkey();
    init_hotkey3();
    init_app_shortcut();
    init_shortcut();
    init_shortcut2();
    init_ui();
    BODY_ID2 = "pet-cfg-shortcuts";
    PASTE_KEYCAP = keycapOf({ code: "KeyV", modifiers: ["primary"] });
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/tooltip.ts
function tooltipPlacement(cursor, tip, bounds, gap) {
  const clamp = (v, lo, hi) => hi < lo ? lo : Math.min(Math.max(v, lo), hi);
  const rightMax = bounds.x + bounds.w;
  const bottomMax = bounds.y + bounds.h;
  let x = cursor.x + gap;
  if (x + tip.w > rightMax) x = cursor.x - gap - tip.w;
  x = clamp(x, bounds.x, rightMax - tip.w);
  let y = cursor.y + gap;
  if (y + tip.h > bottomMax) y = cursor.y - gap - tip.h;
  y = clamp(y, bounds.y, bottomMax - tip.h);
  return { x, y };
}
var TOOLTIP_CSS;
var init_tooltip = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/shared/tooltip.ts"() {
    TOOLTIP_CSS = [
      ".pet-tooltip{",
      // fixed + 坐标由 JS 按光标写：left/top 只是未定位前的兜底，不会真的显示
      "position:fixed;left:0;top:0;",
      "max-width:calc(var(--dsh-pet-size,var(--pet-size,462px))*0.8);",
      "padding:calc(var(--dsh-pet-size,var(--pet-size,462px))*0.010) calc(var(--dsh-pet-size,var(--pet-size,462px))*0.021);",
      "border-radius:calc(var(--dsh-pet-size,var(--pet-size,462px))*0.016);",
      // 白底黑字：对齐原生提示的观感，深色胶囊落在浅色宠物身上太抢眼
      "background:rgba(255,255,255,.96);color:#1f1f1f;",
      // 细边框：白底压在浅色宠物或浅色页面上会糊成一片，靠它划出轮廓
      "border:1px solid rgba(0,0,0,.12);",
      // 字体与气泡同一套；字体族走全局配置变量（注入在 documentElement），继承不到宠物根容器
      'font-family:var(--dsh-pet-font-family,"ShangshouSoftCandy","Yuanti SC","YouYuan","\u5E7C\u5706","Comic Sans MS","PingFang SC","Microsoft YaHei",sans-serif);',
      // 字号对齐 Windows 原生提示（9pt ≈ 12px）：462px 的宠物下 0.026 → 约 12px。
      // --dsh-pet-font-tip 由两端按该宠物尺寸算好注入（shared/fonts.ts 的 resolveFontPx），未注入时回退原表达式。
      "font-size:var(--dsh-pet-font-tip,calc(var(--dsh-pet-size,var(--pet-size,462px))*0.026));line-height:1.4;",
      // nowrap + 截断：宽度锁成一行才好和光标一起摆（换行会让宽度随位置跳变）
      "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      // 不设 backdrop-filter：白底没必要，原生提示也没有毛玻璃
      "box-shadow:0 calc(var(--dsh-pet-size,var(--pet-size,462px))*0.004) calc(var(--dsh-pet-size,var(--pet-size,462px))*0.013) rgba(0,0,0,.18);",
      // 层级低于气泡：两者不抢同一块地方（提示跟光标、气泡在头顶），保留层序只是兜底
      "opacity:0;transition:opacity .12s ease;pointer-events:none;z-index:2}",
      ".pet-tooltip.is-on{opacity:1}"
    ].join("");
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/tip-layer.ts
function hideTip() {
  bubble?.classList.remove("is-on");
  current = void 0;
}
function ensureTip() {
  if (bubble !== void 0 && bubble.parentNode === document.body) return bubble;
  const el = document.createElement("div");
  el.setAttribute("class", TIP_CLASS);
  el.setAttribute("role", "tooltip");
  document.body.appendChild(el);
  bubble = el;
  return el;
}
function triggerOf(node) {
  const host = node;
  if (host === null || typeof host.closest !== "function") return void 0;
  return host.closest("[" + TIP_ATTR + "]") ?? void 0;
}
function showTip(text, cursor) {
  const el = ensureTip();
  el.textContent = text;
  el.style.left = "0px";
  el.style.top = "0px";
  const placed = tooltipPlacement(
    cursor,
    { w: el.offsetWidth, h: el.offsetHeight },
    { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight },
    TIP_GAP_PX
  );
  el.style.left = placed.x + "px";
  el.style.top = placed.y + "px";
  el.classList.add("is-on");
}
function onOver(event) {
  const trigger = triggerOf(event.target);
  if (trigger === void 0 || trigger === current) return;
  const text = trigger.getAttribute(TIP_ATTR);
  if (text === null || text === "") return;
  showTip(text, { x: event.clientX, y: event.clientY });
  current = trigger;
}
function onOut(event) {
  const from = triggerOf(event.target);
  if (from === void 0) return;
  if (triggerOf(event.relatedTarget ?? null) === from) return;
  hideTip();
}
function attachTipLayer() {
  if (detach !== void 0) return detach;
  const root = document;
  root.addEventListener("pointerover", onOver);
  root.addEventListener("pointerout", onOut);
  root.addEventListener("pointerdown", hideTip);
  root.addEventListener("scroll", hideTip, true);
  detach = () => {
    root.removeEventListener("pointerover", onOver);
    root.removeEventListener("pointerout", onOut);
    root.removeEventListener("pointerdown", hideTip);
    root.removeEventListener("scroll", hideTip, true);
    bubble?.remove();
    bubble = void 0;
    current = void 0;
    detach = void 0;
  };
  return detach;
}
var TIP_CLASS, TIP_ATTR, TIP_GAP_PX, bubble, current, detach;
var init_tip_layer = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/tip-layer.ts"() {
    init_tooltip();
    TIP_CLASS = "pet-cfg-tip";
    TIP_ATTR = "data-tip";
    TIP_GAP_PX = 10;
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-draft.ts
function nextPetId(list, kind = "main") {
  const prefix = kind === "main" ? "pet" : kind;
  for (let n = 2; ; n += 1) {
    const id = prefix + "-" + n;
    if (!list.some((pet) => pet.id === id)) return id;
  }
}
function draftPet(template, id) {
  return {
    id,
    name: id,
    size: template.size,
    sizePercent: template.sizePercent ?? SIZE_PERCENT_DEFAULT,
    balanceEnabled: template.balanceEnabled,
    whisperEnabled: template.whisperEnabled,
    workStatusEnabled: template.workStatusEnabled,
    fixedEnabled: template.fixedEnabled,
    display: template.display,
    position: { ...template.position }
  };
}
var init_pet_draft = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/pet-draft.ts"() {
    init_pet_size();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/use-pet-list.ts
function petKinds(pets) {
  const order = [];
  const counts = /* @__PURE__ */ new Map();
  for (const pet of pets) {
    const entry = pet.assetRoot ?? "main";
    if (!counts.has(entry)) order.push(entry);
    counts.set(entry, (counts.get(entry) ?? 0) + 1);
  }
  return order.map((entry) => ({
    entry,
    kind: entry === "main" ? "main" : "pack",
    count: counts.get(entry) ?? 0
  }));
}
function mainPetsOf(pets) {
  return pets.filter((pet) => (pet.assetRoot ?? "main") === "main");
}
function usePetList(rt, requestDialog) {
  const { useState, useCallback, useRef } = rt;
  const initial = petBridge.current;
  const [pets, setPets] = useState(initial.map((pet) => ({ ...pet, position: { ...pet.position } })));
  const [kind, setKind] = useState(initial[0]?.assetRoot ?? "main");
  const [selId, setSelId] = useState(initial[0]?.id ?? "");
  const loadedRef = useRef([]);
  const kindRef = useRef(kind);
  kindRef.current = kind;
  const update = (patch) => setPets(
    (list) => list.map((pet) => {
      if (pet.id !== selId) return pet;
      const { position: posPatch, ...rest } = patch;
      return { ...pet, ...rest, position: posPatch ? { ...pet.position, ...posPatch } : pet.position };
    })
  );
  const add = () => {
    const group = pets.filter((pet) => (pet.assetRoot ?? "main") === kind);
    const template = group[0];
    if (!template) return;
    const id = nextPetId(pets, kind);
    const draft = { ...draftPet(template, id), assetRoot: kind };
    setPets((list) => {
      const next = [...list];
      let at = -1;
      for (let i = 0; i < next.length; i += 1) if ((next[i].assetRoot ?? "main") === kind) at = i;
      next.splice(at + 1, 0, draft);
      return next;
    });
    setSelId(id);
  };
  const remove = () => {
    const list = pets.filter((pet) => pet.id !== selId);
    setPets(list);
    setSelId(list[0]?.id ?? "");
  };
  const replace = useCallback((entries) => {
    loadedRef.current = entries;
    const loaded = entries.flatMap((entry) => entry.pets);
    const nextKind = entries.some((entry) => entry.key === kindRef.current) ? kindRef.current : entries[0]?.key ?? "main";
    setPets(loaded);
    setKind(nextKind);
    setSelId((id) => {
      if (loaded.some((pet) => pet.id === id)) return id;
      return loaded.find((pet) => (pet.assetRoot ?? "main") === nextKind)?.id ?? "";
    });
  }, []);
  const selectKind = (entry) => {
    setKind(entry);
    const first = pets.find((pet) => (pet.assetRoot ?? "main") === entry);
    if (first) setSelId(first.id);
  };
  const current2 = pets.find((pet) => pet.id === selId);
  const entryPrompt = loadedRef.current.find((item) => item.key === kind)?.entryPrompt ?? "";
  const requestRemove = () => {
    if (!current2) return;
    const entry = current2.assetRoot ?? "main";
    const groupSize = pets.filter((pet) => (pet.assetRoot ?? "main") === entry).length;
    if (groupSize <= 1) requestDialog(entry === "main" ? { kind: "lastOne" } : { kind: "lastOfKind", entry });
    else requestDialog({ kind: "remove" });
  };
  return {
    pets,
    mainPets: mainPetsOf(pets),
    kinds: petKinds(pets),
    kind,
    visiblePets: pets.filter((pet) => (pet.assetRoot ?? "main") === kind),
    selId,
    entryPrompt,
    select: setSelId,
    selectKind,
    update,
    add,
    requestRemove,
    remove,
    replace,
    packWrites: () => diffPackWrites(loadedRef.current, pets)
  };
}
var init_use_pet_list = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/use-pet-list.ts"() {
    init_config();
    init_bridge();
    init_pet_draft();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/use-remote-data.ts
function useRemoteData(rt) {
  const { useState, useEffect } = rt;
  const [paths, setPaths] = useState(null);
  const [catalog, setCatalog] = useState(null);
  const [catalogFailed, setCatalogFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    void loadMeta().then((meta) => {
      if (alive) setPaths(meta);
    });
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    let alive = true;
    void loadModelCatalog().then((groups) => {
      if (!alive) return;
      if (groups === null) setCatalogFailed(true);
      else setCatalog(groups);
    });
    return () => {
      alive = false;
    };
  }, []);
  return { paths, catalog, catalogFailed };
}
var init_use_remote_data = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/use-remote-data.ts"() {
    init_config();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/voice-card.ts
function makeVoiceCard(rt, picker) {
  const { h: h2, t: t2 } = rt;
  const { cardHead, field, toggleCell } = makeUiKit({ h: h2, t: t2 });
  return function VoiceCard(props) {
    return h2("div", {
      className: "dsh-pet-cfg__card",
      children: [
        cardHead(t2("voiceTitle"), t2("voiceHint")),
        // 第一行四个开关：四类语音各一个，必须相邻，读得出是「同一类」；第二行两个输入：音色与音量。
        // 音色不挂文字标签也不挂问号：下拉当前值「晓伊（女·活泼）」自己就说明了它是什么。
        h2("div", {
          className: "dsh-pet-cfg__grid4",
          children: [
            toggleCell("voiceEnabled", props.enabled, props.busy, props.onToggle),
            toggleCell("voiceWhisperEnabled", props.whisperEnabled, props.busy, props.onWhisperToggle),
            toggleCell("voiceTodoEnabled", props.todoEnabled, props.busy, props.onTodoToggle),
            toggleCell("voiceNotifyEnabled", props.notifyEnabled, props.busy, props.onNotifyToggle)
          ]
        }),
        h2("div", {
          className: "dsh-pet-cfg__grid2",
          children: [
            h2(picker, {
              label: t2("voiceNameLabel"),
              value: props.voiceName,
              options: props.voices,
              disabled: props.busy,
              onChange: props.onVoiceChange
            }),
            field(
              t2("voiceVolumeLabel"),
              h2(
                "input",
                numberInputProps(props.volume, props.onVolumeChange, {
                  step: "0.05",
                  min: "0",
                  max: "1",
                  disabled: props.busy
                })
              ),
              t2("voiceVolumeHint")
            )
          ]
        })
      ]
    });
  };
}
var init_voice_card = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/voice-card.ts"() {
    init_ui();
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/de.ts
var de;
var init_de = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/de.ts"() {
    de = {
      nav: "Desktop-Pet-Konfiguration",
      intro: "Mehrere Pets verwalten: Jedes Pet hat eigene Gr\xF6\xDFe und Position (gilt sofort nach dem Speichern).",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "Pet-Konfiguration",
      avatarLabel: "Avatar",
      avatarHint: 'Das kleine Bild neben den Nachrichten dieses Pets im Chatfenster. Ohne Upload erscheint das Standard-Logo des Plugins; ein Upload greift sofort und ersetzt das vorherige \u2014 \u201ESpeichern" ist nicht n\xF6tig.',
      avatarUpload: "Avatar hochladen",
      avatarChange: "\xC4ndern",
      avatarUploading: "Wird hochgeladen\u2026",
      avatarUploaded: "Avatar aktualisiert",
      petCardHint: 'Einstellungen pro Pet: Name / Gr\xF6\xDFe / Anzeige / Position / Offsets / die vier Funktionsschalter. Nach dem \xC4ndern unten auf \u201ESpeichern" klicken \u2013 gilt sofort.',
      globalTitle: "Globale Schalter",
      globalHint: 'Gilt f\xFCr alle Pets (ein Pet-Pack kann dies in seiner Art-Datei \xFCberschreiben). Diese Schalter \xE4ndern nur den lokalen Zustand und werden beim \u201ESpeichern" mit in die Benutzerkonfiguration geschrieben (kein sofortiges Schreiben); Systembenachrichtigungen werden nach dem Speichern sofort neu eingelesen, ohne Neuladen der Seite.',
      cornerHint: "An welcher Bildschirmecke das Pet klebt (im Desktop-Modus pro Monitor-Arbeitsbereich).",
      marginXHint: "Horizontaler Abstand zur gew\xE4hlten Ecke (px), beliebige Zahl.",
      marginYHint: "Vertikaler Abstand zur gew\xE4hlten Ecke (px), beliebige Zahl.",
      // 「/」命令菜单的行标题（图标由 app.ts 经 command-faces.ts 补上）。
      "cmd.chat": "Chat",
      "cmd.pet": "Pet",
      "cmd.balance": "Guthaben",
      "shortcut.open": "Pet-Chat \xF6ffnen",
      "shortcut.chat": "Chatfenster \xF6ffnen",
      "shortcut.hear": "Spracheingabe",
      "shortcut.capture": "Bildschirmfoto in den Chat",
      shortcutCardTitle: "Tastenk\xFCrzel",
      shortcutCardHint: "Aufgeklappt zwei Gruppen: Pet-Tastenk\xFCrzel und globale Tastenk\xFCrzel.",
      shortcutRowChat: "Chat \xF6ffnen",
      shortcutRowHold: "Zum Sprechen halten",
      shortcutRowHear: "Spracheingabe",
      shortcutRowCapture: "Bildschirmfoto",
      shortcutRowPaste: "Bild einf\xFCgen",
      shortcutRowTodo: "Aufgaben",
      shortcutRowSleep: "Schlafen / Aufwachen",
      shortcutRowDisplay: "Anzeigeposition",
      shortcutRowSidebar: "Seitenleisten-Chat \xF6ffnen",
      shortcutGroupPet: "Pet-Tastenk\xFCrzel",
      shortcutGroupPetHint: "Im Web gen\xFCgt der Zeiger auf dem Pet. Im Desktop-Fenster zuerst auf das Pet klicken, damit es den Tastaturfokus bekommt.",
      shortcutGroupGlobal: "Globale Tastenk\xFCrzel",
      shortcutGroupGlobalHint: "Werden von DSH im Web und im Desktop-Fenster verteilt; \xE4nderbar unter Einstellungen \u2192 Allgemein \u2192 Tastenk\xFCrzel.",
      petsLabel: "Pet-Liste",
      add: "Pet hinzuf\xFCgen",
      remove: "Entfernen",
      confirmRemove: 'Pet \u201E{id}" wirklich l\xF6schen?',
      confirmTitle: "Aktion best\xE4tigen",
      cancel: "Abbrechen",
      ok: "Verstanden",
      atLeastOne: "Mindestens ein Pet muss erhalten bleiben.",
      emptyPets: 'Noch keine Pets \u2013 auf \u201EPet hinzuf\xFCgen" klicken, um eines zu erstellen.',
      sizeLabel: "Gr\xF6\xDFe (Breite px)",
      sizeHint: "H\xF6he automatisch = Breite \xD7 9/16.",
      sizePercentLabel: "Max. Bildschirmbreite (%)",
      sizePercentHint: "Wie viel der Bildschirmbreite der Pet h\xF6chstens einnimmt: 100 = nie breiter als ein Bildschirm (bei breiten Fenstern identisch mit px); 30\u201340 macht ihn auf dem Handy deutlich kleiner, ohne den Desktop zu ver\xE4ndern. Wird beim Laden einmal berechnet; nach Gr\xF6\xDFen\xE4nderung neu laden.",
      nameLabel: "Name",
      nameHint: 'Anzeigename: erscheint beim Hovern \xFCber dem Pet und flie\xDFt in die KI-Persona ein (\u201EDein Name ist X"). Doppelt erlaubt; leer = es gilt die Pet-ID.',
      personaLabel: "Persona (optional)",
      personaHint: 'Gilt nur f\xFCr dieses Pet. Leer lassen = Persona des Eintrags \xFCbernehmen \u2013 der graue Text im Feld ist genau diese. Das tats\xE4chlich an das Modell gesendete System = dieser Text + automatisch angeh\xE4ngtem Hinweis \u201EDein Name ist <Name>" + aktuellem Zeitkontext; Name und Datum hier also nicht wiederholen.',
      personaCount: "{n} Zeichen",
      balanceEnabled: "Guthaben-Funktion",
      balanceEnabledHint: "Wenn aktiv, spielt dieses Pet Guthaben-Animationen und zeigt die Guthaben-Blase.",
      whisperEnabled: "Fl\xFCstern",
      whisperEnabledHint: 'Wenn aktiv, erzeugt dieses Pet regelm\xE4\xDFig per KI einen Satz und spielt die Fl\xFCstern-Animation (Persona siehe Feld \u201EPersona" unten; leer = Eintrag \xFCbernehmen).',
      workStatusEnabled: "Arbeitsstatus-Kopplung",
      workStatusEnabledHint: "Wenn aktiv, folgt dieses Pet dem DSH-Arbeitsstatus: Denken / Arbeiten / Warten auf Best\xE4tigung / Fertig / Fehler wechseln automatisch die passende Animation und zeigen eine Blase (Animationspool in der Top-Level-Konfiguration; nur Zuh\xF6ren, keine Modellaufrufe).",
      fixedEnabled: "Pet fixieren",
      fixedEnabledHint: "Wenn aktiv, dreht sich das Pet bei Zufallsanimationen nicht mehr selbst um und l\xE4uft nicht weg \u2013 es spielt nur Leerlauf und kleine Aktionen am Platz. Rechtsklick-Auswahl, API-Ausl\xF6ser sowie Guthaben-/Fl\xFCstern-/Arbeitsstatus-Animationen sind nicht betroffen.",
      displayLabel: "Anzeige",
      displayHint: "web = nur Browser / desktop = nur Desktop / both = beides / none = nichts",
      "display.web": "Nur Browser",
      "display.desktop": "Nur Desktop",
      "display.both": "Beides",
      "display.none": "Nichts",
      cornerLabel: "Position",
      "corner.top-left": "Oben links",
      "corner.top-right": "Oben rechts",
      "corner.bottom-left": "Unten links",
      "corner.bottom-right": "Unten rechts",
      marginX: "Horizontaler Versatz",
      marginY: "Vertikaler Versatz",
      save: "Speichern",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "Synchronisieren",
      confirmSync: "Wirklich synchronisieren? Die mitgelieferte Standardkonfiguration (alle Felder + Kommentare) \xFCberschreibt die Benutzerkonfiguration; Ihre aktuellen Anpassungen gehen verloren.",
      corruptTitle: "Benutzerkonfiguration besch\xE4digt \u2013 nicht gespeichert",
      corruptConfirm: "Trotzdem speichern",
      corruptBody: "Die Benutzerkonfigurationsdatei ist nicht lesbar (besch\xE4digt, kein g\xFCltiges JSON/JSONC): {path}. Beim Weiterspeichern wird die Datei anhand der Whitelist neu aufgebaut \u2013 alle aktuellen Inhalte (animations / physics / memes und weitere eigene Felder) gehen verloren. Abbrechen = Datei unver\xE4ndert lassen (zuerst die Konfiguration reparieren, dann speichern); Best\xE4tigen = trotzdem speichern (vorhandene Inhalte verwerfen).",
      syncHint: '\u201ESynchronisieren" schreibt die mitgelieferte Standardkonfiguration (inkl. Kommentare und aller erweiterten Felder) in die Benutzerkonfigurationsdatei und \xFCberschreibt die aktuellen Anpassungen; danach ist die Datei direkt bearbeitbar. Zwei Hinweise: (1) Sobald die Datei existiert, ist sie eine explizite Override-Schicht \u2013 sp\xE4tere \xC4nderungen an den mitgelieferten Standards greifen nicht automatisch (au\xDFer bei erneuter Synchronisierung oder L\xF6schen der Datei); (2) \u201ESpeichern" auf dieser Seite schreibt die Datei anhand der Whitelist neu (Feldwerte bleiben, Kommentare entfallen).',
      configMeta: "Erweitert (Dateien)",
      configMetaHint: 'Die Benutzerkonfiguration kann Pet-Liste / Animationspools / Wiedergabegewichtung \xFCberschreiben; \xC4nderungen greifen nach Aktualisieren oder Neustart: im Browser die Seite neu laden, im Desktop-Modus Rechtsklick auf das Pet \u2192 \u201EKonfiguration neu laden" (l\xE4dt alle Desktop-Pet-Fenster neu); die Standardkonfiguration ist die vollst\xE4ndige Referenz.',
      defaultConfig: "Standardkonfiguration (schreibgesch\xFCtzt, vollst\xE4ndige Referenz)",
      userConfig: "Benutzerkonfiguration (eigene \xDCberschreibungen)",
      todosFile: "To-do-Daten (Listentext, F\xE4lligkeit und Erledigt-Status; L\xF6schen entspricht alle To-dos leeren)",
      animationDir: "Verzeichnis der Animations-Assets (Animationen anpassen/erg\xE4nzen)",
      memesDir: "Verzeichnis der Meme-Bilder (Bilder anpassen/erg\xE4nzen)",
      logFile: "Protokolldatei (f\xFCr die Fehlersuche; kann geleert werden)",
      logFileNote: "Die Desktop-Version hat keine Konsole, daher gehen alle Laufzeitprotokolle des Plugins (Start, Absturz/Neustart des Desktop-Pets, Fehler und Warnungen) in diese eine Datei; bitte bei Problemmeldungen anh\xE4ngen. Maximal 1 MB pro Datei, danach bleiben nur die letzten 512 KB erhalten.",
      saved: "Gespeichert \u2013 die Pets gelten sofort.",
      loadError: "Konfiguration konnte nicht geladen werden",
      saveError: "Konfiguration konnte nicht gespeichert werden. Bitte Serververbindung, Schreibrechte im Konfigurationsverzeichnis und Serverprotokoll pr\xFCfen.",
      saveInvalid: "Konfiguration konnte nicht gespeichert werden: Inhalt ung\xFCltig. Bitte pr\xFCfen und erneut versuchen.",
      syncError: "Synchronisieren fehlgeschlagen. Bitte Serververbindung und Schreibrechte im Konfigurationsverzeichnis pr\xFCfen.",
      loading: "Konfiguration wird geladen\u2026",
      retry: "Erneut versuchen",
      invalid: "Bitte Eingaben pr\xFCfen: Gr\xF6\xDFe muss positiv sein, R\xE4nder d\xFCrfen beliebige Zahlen sein.",
      busy: "Wird gespeichert\u2026",
      extraPetsHint: 'Weitere {n} Art(en) stammen aus Dateien im Verzeichnis pet/ (<Name>-config.json + <Name>-animation/); oben in der Zeile \u201EArten" umschalten und bearbeiten. Speichern schreibt jeweils in die eigene Paketkonfiguration, nie in main-config.jsonc.',
      kindLabel: "Arten",
      kindMain: "Integriert",
      lastOfKind: '\u201E{entry}" hat nur noch dieses eine Pet \u2013 beim L\xF6schen verschwindet die ganze Art. Zum vollst\xE4ndigen Entfernen die Pet-Pack-Dateien l\xF6schen.',
      savePartial: "Haupt-Pets gespeichert, aber {names} konnten nicht zur\xFCckgeschrieben werden: Pr\xFCfen Sie, ob die Pack-Konfiguration g\xFCltig und das Verzeichnis beschreibbar ist.",
      notifyToggle: "Systembenachrichtigungen",
      notifyToggleHint: "System-Toasts (unten rechts auf dem Desktop) bei Abschluss einer Konversation, Fehlern, Berechtigungsanfragen und R\xFCckfragen \u2013 nur wenn das Fenster nicht fokussiert ist.",
      clickSoundToggle: "Klick-Sound",
      clickSoundToggleHint: 'Beim Klick auf ein Pet ert\xF6nt der integrierte Klick-Sound (assets/sound/click-duck.wav, Lautst\xE4rke 0.5); Klicks innerhalb von 100 ms werden nur einmal abgespielt, auch bei mehreren Pets \xFCberlagert sich nichts. Aus = v\xF6llig stumm. Wird beim \u201ESpeichern" in die Benutzerkonfiguration geschrieben.',
      whisperImageToggle: "Fl\xFCstern-Bilder",
      whisperImageToggleHint: "H\xE4ngt an jede Fl\xFCstern-Zeile ein zuf\xE4lliges Meme aus dem Pool (Bildzuordnung im Top-Level-Feld `memes` der Konfiguration). Token: Fl\xFCstern ruft ohnehin pro Zyklus das Modell auf, das Bild f\xFCgt nur Name + Beschreibung des gezogenen Memes (ca. 100 Zeichen / \u224860 Token) an dieselbe Anfrage an \u2013 vernachl\xE4ssigbar.",
      chatImageToggle: "Chat-Bilder",
      chatImageToggleHint: "Die KI w\xE4hlt im Chat passend zum Kontext ein Meme aus dem Pool (optional; Zuordnung im Top-Level-Feld `memes`). Token: Jede Nachricht f\xFChrt den gesamten Katalog mit \u2013 aktuell ca. 1,1k Zeichen (\u2248650 Token, etwa 11-mal so viel wie beim Fl\xFCstern) und linear mit der Bildanzahl wachsend; aus = es wird kein Zeichen angeh\xE4ngt.",
      chatAnimationToggle: "Chat-Aktionen",
      chatAnimationToggleHint: "Wenn an, enth\xE4lt die Chat-Anfrage die Liste der spielbaren Animationen (alle Aktionen unter animations.categories): H\xE4lt das Modell die Zeile f\xFCr eine tats\xE4chliche Auff\xFChrung, spielt das Pet sie sofort; sonst antwortet es nur mit Text. Token: Jede Nachricht f\xFChrt die ganze Liste mit; aus = es wird nichts angeh\xE4ngt. Globaler Standard f\xFCr alle Pets (ein Pet-Pack kann ihn in seiner eigenen Konfigurationsdatei \xFCberschreiben).",
      confineToggle: "Auf aktuellen Bildschirm begrenzen",
      confineToggleHint: "Mehrere Monitore: Wenn an, bleibt das Pet auf dem Bildschirm, auf dem es sich gerade befindet \u2013 ein geworfenes Pet prallt nur innerhalb des Bildschirms ab, auf dem es losgelassen wurde (Bildschirmfugen wirken als W\xE4nde, es fliegt nicht zum Nachbarmonitor), und autonomes Umherlaufen bleibt auf dem aktuellen Bildschirm (ein Schritt \xFCber die Fuge wird einfach verworfen). Aus = \xDCberqueren der Bildschirme wie gewohnt. Nur Desktop-Modus \u2013 das Browser-Overlay bleibt ohnehin im Viewport.",
      trayToggle: "System-Tray",
      trayToggleHint: 'Zeigt im Desktop-Modus ein Tray-Symbol (Windows: Infobereich, macOS: Men\xFCleiste). Es listet alle Pets der Konfiguration und schaltet die Anzeige um \u2013 auch f\xFCr Pets, die gerade nicht auf dem Desktop sind und kein Fenster zum Rechtsklicken haben. Ohne Tray l\xE4sst sich ein Pet nur \xFCber den Browser (Einstellungsseite oder Rechtsklick auf das Web-Pet) zur\xFCck auf den Desktop holen. Windows blendet das Symbol ohnehin in die \u201Eausgeblendeten Symbole" aus. Nur Desktop-Modus.',
      voiceTitle: "Sprachausgabe",
      voiceHint: 'Vier Schalter und eine Stimme: Jede Art von Sprachausgabe hat ihren eigenen Schalter, keiner h\xE4ngt von einem anderen ab. Standardm\xE4\xDFig alle aus; wird beim \u201ESpeichern" in die Benutzerkonfiguration geschrieben (kein sofortiges Schreiben).',
      voiceEnabled: "Manuelles Fl\xFCstern sprechen",
      voiceEnabledHint: "Spricht Fl\xFCstern-S\xE4tze, die \xFCber das Kontextmen\xFC oder einen Slash-Befehl ausgel\xF6st werden, sowie Chat-Antworten. Die Lautsprecher-Schaltfl\xE4che im Chat-Panel spricht einen einzelnen Satz, sobald Sie sie dr\xFCcken. Es betrifft nur das Sprechen: Blasen, Chat-Ged\xE4chtnis und Systembenachrichtigungs-Popups bleiben unber\xFChrt; eine fehlgeschlagene Synthese wird nur protokolliert und unterbricht den Chat nicht.",
      voiceWhisperEnabled: "Fl\xFCstern sprechen",
      voiceWhisperEnabledHint: "Spricht den regelm\xE4\xDFig erzeugten Fl\xFCstern-Satz. Standardm\xE4\xDFig aus \u2013 Fl\xFCstern ist Hintergrundbegleitung und sollte nicht ungefragt Ger\xE4usche machen.",
      voiceTodoEnabled: "To-do-Erinnerungen sprechen",
      voiceTodoEnabledHint: "Spricht eine f\xE4llige To-do-Erinnerung (die Blase erscheint weiterhin; dieser Schalter entscheidet nur, ob gesprochen wird). Standardm\xE4\xDFig aus.",
      voiceNotifyEnabled: "Arbeitsstatus sprechen",
      voiceNotifyEnabledHint: "Spricht eine konfigurierte Arbeitsstatus-Zeile, wenn eine Aufgabe abgeschlossen ist, fehlschl\xE4gt oder auf Ihre Best\xE4tigung wartet. Wie Systembenachrichtigungen wird nur gesprochen, w\xE4hrend Sie nicht auf dieser Seite sind (weggewechselt, ohne Fokus, minimiert) \u2013 keine Unterbrechung, w\xE4hrend Sie auf den Bildschirm schauen. Nur die konfigurierte Zeile wird gesprochen, nie das Aufgabendetail. Standardm\xE4\xDFig aus.",
      voiceNameLabel: "Stimme",
      voiceVolumeLabel: "Lautst\xE4rke",
      voiceVolumeHint: "Wiedergabelautst\xE4rke als Dezimalzahl 0\u20131: 1 ist die maximale Lautst\xE4rke (100 %), 0 ist stumm. \xC4ndert nur die Lautheit und synthetisiert kein Audio neu, kostet also nichts extra. Alle vier Arten von Sprachausgabe teilen sich diese eine Lautst\xE4rke.",
      physicsTitle: "Physik (Zieh- und Wurfgef\xFChl)",
      physicsHint: 'Globaler Standard f\xFCr alle Pets (ein Pet-Pack kann ihn in seiner Art-Datei \xFCberschreiben); wird beim \u201ESpeichern" in die Benutzerkonfiguration geschrieben (kein sofortiges Schreiben). Im Browser sofort wirksam, im Desktop-Modus, sobald das Speichern die Pet-Fenster neu l\xE4dt.',
      mobileTitle: "Mobil-Effekte",
      mobileHint: "Nur im Handy-Browser sinnvoll: Vibration braucht einen Motor, die beiden Bewegungs-Schalter brauchen Neigungs-/Beschleunigungssensoren, und Sensoren gibt es nur \xFCber HTTPS oder localhost.",
      "physics.gravity": "Schwerkraft",
      "physics.gravityHint": "px/s\xB2, gr\xF6\xDFer = f\xE4llt schneller; 0 = schwerelos (fliegt geradeaus weiter)",
      "physics.restitution": "Elastizit\xE4t",
      "physics.restitutionHint": "0\u20131, Geschwindigkeitsanteil beim Abprallen von Wand/Boden (1 = voll elastisch, 0 = bleibt sofort stehen)",
      "physics.groundFriction": "Kontaktreibung",
      "physics.groundFrictionHint": "/s, Abklingen der Geschwindigkeit entlang jeder Kontaktfl\xE4che (Wand, Boden, Decke); 0 = \xFCberall eisglatt",
      "physics.throwPower": "Wurfkraft",
      "physics.throwPowerHint": "> 0, Gesamtfaktor f\xFCr Federfolge und Abwurfgeschwindigkeit (1 = Standard; h\xF6her = folgt enger, wirft h\xE4rter)",
      physicsCeilingBounce: "Deckenabprall",
      physicsCeilingBounceHint: "Aus: W\xFCrfe k\xF6nnen oben aus dem Bildschirm fliegen (die Schwerkraft holt sie zur\xFCck)",
      physicsPetCollision: "Pet-Kollisionen",
      physicsPetCollisionHint: "Ein fliegendes Pet prallt mit Impulserhaltung von anderen ab (Masse \u221D Gr\xF6\xDFe\xB2)",
      physicsHaptic: "Kollisions-Vibration",
      physicsHapticHint: "Ein Impuls pro Treffer (Wand, Boden, Decke, andere Pets). Funktioniert in Chrome/Edge; nicht auf iOS oder in WebView-H\xFCllen wie Via. \u201ENicht st\xF6ren\u201C blockiert die Vibration.",
      physicsTilt: "Schwerkraft per Neigung",
      physicsTiltHint: "Handy neigen: die Schwerkraft folgt der Neigung (Betrag = der Wert oben). Bei Schwerkraft 0 bewirkt Neigen nichts. Ben\xF6tigt HTTPS/localhost.",
      physicsShake: "Sch\xFCtteln zum Werfen",
      physicsShakeHint: "Sch\xFCtteln schleudert den Pet in Wurfrichtung; die St\xE4rke folgt throwPower. Unabh\xE4ngig von der Schwerkraft, funktioniert also auch bei 0. Ben\xF6tigt HTTPS/localhost.",
      invalidPhysics: "Bitte Physikwerte pr\xFCfen: Schwerkraft / Bodenreibung \u2265 0, Elastizit\xE4t 0\u20131, Wurfkraft > 0.",
      fontTitle: "Aussehen & Schrift",
      fontHint: 'Die Schriftart gilt f\xFCr alle Texte, die derzeit die Candy-Schrift nutzen: Pet-Blase, Hover-Tooltip, Chat-Fenster, Score-Popup; die Schriftgr\xF6\xDFe gilt nur f\xFCr Pet-Blase und Hover-Tooltip (Chat- und Score-Popup behalten ihre Gr\xF6\xDFe). Globaler Standard f\xFCr alle Pets (ein Pet-Pack kann ihn in seiner Art-Datei \xFCberschreiben); wird beim \u201ESpeichern" in die Benutzerkonfiguration geschrieben \u2013 im Browser sofort wirksam, im Desktop-Modus, sobald das Speichern die Pet-Fenster neu l\xE4dt.',
      fontFamilyLabel: "Schriftart",
      fontFamilyHint: '\u201ECandy (integriert)" wird mit dem Plugin geliefert; die \xFCbrigen sind Systemschriften. Fehlt eine Schrift auf diesem Rechner, greift die n\xE4chste im Stapel (nie leer, kein Fehler).',
      fontSizeLabel: "Schriftgr\xF6\xDFe (px)",
      fontSizeHint: "Schriftgr\xF6\xDFe des Blasentexts; Tooltip und kleinere Zeilen in der Blase skalieren anteilig. Bereich 4\u2013200.",
      fontFollowToggle: "Schriftgr\xF6\xDFe mit Pet-Gr\xF6\xDFe skalieren",
      fontFollowToggleHint: "An (Standard): die Schrift w\xE4chst mit dem Pet \u2013 bei 462 px Breite entspricht sie genau der obigen Gr\xF6\xDFe. Aus: die Gr\xF6\xDFe bleibt unabh\xE4ngig von der Pet-Gr\xF6\xDFe konstant.",
      invalidFont: "Bitte Schrifteinstellungen pr\xFCfen: Die Schriftart muss in der Liste stehen, die Gr\xF6\xDFe eine Zahl zwischen 4 und 200 sein.",
      "font.candy": "Candy (integriert)",
      "font.yahei": "Microsoft YaHei / PingFang",
      "font.youyuan": "YouYuan",
      "font.kaiti": "KaiTi",
      "font.simsun": "SimSun",
      "font.comic": "Comic Sans MS",
      "font.system": "Systemstandard",
      modelTitle: "Chat & Modelle",
      modelHint: 'Welches Modell Fl\xFCstern und Chat jeweils nutzen und wie viel Verlauf jeder Chat-Aufruf mitf\xFChrt. \u201EAktueller Konversation folgen" = das Modell, das Ihre aktuelle Konversation verwendet (Standard). Globaler Standard: gilt f\xFCr alle Pets, ein Pet-Pack kann ihn in seiner Art-Datei \xFCberschreiben. Die Optionen stammen aus derselben Quelle wie die Modellauswahl von DSH und werden vom Host live geliefert.',
      modelFollow: "Aktueller Konversation folgen",
      modelSearch: "Modelle suchen\u2026",
      modelEmpty: "Keine passenden Modelle.",
      modelNoModels: "Keine Modelle verf\xFCgbar.",
      modelLoading: "Modellliste wird aktualisiert\u2026",
      modelTriggerAria: "Modell w\xE4hlen, aktuell {model}",
      modelUnknown: " (aktuelle Konfiguration, nicht in der Liste)",
      modelNone: "F\xFCr diesen Anbieter sind keine Modelle verf\xFCgbar",
      whisperModelLabel: "Fl\xFCstern-Modell",
      chatModelLabel: "Chat-Modell",
      modelFieldHint: '\u201EAktueller Konversation folgen" = Modell der aktuellen Konversation; schl\xE4gt ein gew\xE4hltes Modell fehl, f\xE4llt das Plugin auf das Modell der aktuellen Konversation zur\xFCck und versucht es einmal erneut.',
      invalidModel: "Bitte Modelleinstellungen pr\xFCfen: Anbieter und Modell entweder beide w\xE4hlen oder beide leer lassen (aktuelle Konversation folgen).",
      modelCatalogFailed: "Modellliste konnte nicht geladen werden (Seite neu laden f\xFCr einen neuen Versuch); die aktuellen Konfigurationswerte bleiben unver\xE4ndert erhalten.",
      chatMemory: "Chat-Verlaufsrunden",
      chatMemoryHint: "Wie viele der letzten Runden jeder Chat-Aufruf mitf\xFChrt (1 Runde = 1 Frage + 1 Antwort; 0 = kein Verlauf, jede Nachricht ist neu). Das Ged\xE4chtnis selbst beh\xE4lt alles \u2013 dieser Wert bestimmt nur, wie viel in den Kontext kommt: mehr merkt mehr und kostet mehr Token. Globaler Standard f\xFCr alle Pets (ein Pet-Pack kann ihn in seiner Art-Datei \xFCberschreiben).",
      invalidChatMemory: "Bitte Chat-Verlaufsrunden pr\xFCfen: Zahl \u2265 0 erforderlich.",
      chatImageLimit: "Max. Chat-Bilder",
      chatImageLimitHint: 'Wie viele Memes beim Chat h\xF6chstens an das Modell gelistet werden (\u201Eerste N" = die ersten N in der Konfiguration; was bevorzugt gesendet werden soll, nach vorne verschieben). Die ganze Liste wird an jede Nachricht angeh\xE4ngt, Token wachsen linear mit der Anzahl \u2013 eine lange Liste kostet nur. Mit der Grenze auf die ersten N w\xE4hlt das Modell nur daraus. 0 = keine Grenze (alles senden). Integrierter Standard 10. Globaler Standard f\xFCr alle Pets (ein Pet-Pack kann ihn in seiner Art-Datei \xFCberschreiben). Nur Chat-Auswahl: Fl\xFCstern f\xFChrt nur das gezogene Meme mit.',
      invalidChatImageLimit: "Bitte das Limit f\xFCr Chat-Bilder pr\xFCfen: Zahl \u2265 0 erforderlich (0 = keine Grenze).",
      notifyTest: "Testbenachrichtigung",
      notifyTestOk: "Testbenachrichtigung gesendet \u2013 bitte unten rechts auf dem Desktop pr\xFCfen.",
      notifyDenyUnsupported: "Systembenachrichtigungen werden in dieser Umgebung nicht unterst\xFCtzt (keine Notification-API).",
      notifyDenyBlocked: "Die Benachrichtigungsberechtigung ist im Browser blockiert.",
      notifyDenyRejected: 'Sie haben im Berechtigungsdialog \u201EBlockieren" gew\xE4hlt.',
      notifyDenyError: "Fehler beim Anfordern der Berechtigung",
      notifyGuide: 'Anleitung: links neben der Adressleiste auf \u{1F512}/\u24D8 klicken \u2192 \u201EWebsite-Einstellungen" \u2192 \u201EBenachrichtigungen" \u2192 auf \u201EZulassen" setzen, Seite neu laden und erneut versuchen.',
      storageTitle: "Deinstallation & Speicher",
      storageHint: 'Alle Orte, an denen das Plugin auf diesem Rechner Daten ablegt. Cache l\xF6schen ist unsch\xE4dlich (wird automatisch neu geladen/neu aufgebaut); \u201EPlugin-Benutzerdaten" l\xF6schen kostet Konfiguration und Chat-Ged\xE4chtnis.',
      "storage.userData": "Plugin-Benutzerdaten: eigene Konfiguration main-config.jsonc, Chat-Ged\xE4chtnis memory.json, eigene Animations-Assets main-animation/, Datei-Pets pet/",
      "storage.electron": "Electron-Laufzeit f\xFCr das Desktop-Pet (gro\xDF; wird beim n\xE4chsten Start des Desktop-Modus automatisch neu heruntergeladen)",
      "storage.desktopCache": "Cache der Desktop-Pet-Fenster und Skalierungs-Cache des Hauptbildschirms (l\xF6schbar, wird automatisch neu aufgebaut)",
      "storage.electronCache": "Download-Cache des Electron-Installers (l\xF6schbar, wird bei Bedarf neu geladen)",
      "storage.package": "Das Plugin selbst (von DSH verwaltet \u2013 mit dem Befehl unten entfernen, nicht von Hand l\xF6schen)",
      storageMissing: " (noch nicht erstellt)",
      uninstallTitle: "So deinstallieren Sie",
      uninstallStep1: "1. Zuerst DSH beenden (das Desktop-Pet beendet sich mit); die obigen Dateien nicht l\xF6schen, w\xE4hrend das Pet l\xE4uft.",
      uninstallStep2: "2. Das Plugin selbst entfernen (im Terminal ausf\xFChren; entfernt es auch aus der Bundle-Schicht des Profils):",
      uninstallStep3: '3. Die obigen Orte nach Bedarf l\xF6schen: Caches sind unsch\xE4dlich; \u201EPlugin-Benutzerdaten" l\xF6schen kostet Konfiguration und Chat-Ged\xE4chtnis (vorher main-config.jsonc sichern, wenn Sie es behalten wollen).',
      motionTitle: "Aktionsh\xE4ufigkeit",
      motionHint: "Vier Felder: Leerlauf / Drehen / Bewegen sind editierbar, die Zufallsaktion wird berechnet (100 \u2212 die anderen drei). Globaler Standard f\xFCr alle Pets; ein Pet-Pack kann ihn in seiner Art-Datei \xFCberschreiben.",
      "motion.idle": "Leerlauf",
      "motion.turn": "Drehen",
      "motion.move": "Bewegen",
      "motion.action": "Zufallsaktion",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/en.ts
var en;
var init_en = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/en.ts"() {
    en = {
      nav: "Pet Config",
      intro: "Manage multiple pets: each pet has its own size and position (applies instantly after saving).",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "Pet",
      avatarLabel: "Avatar",
      avatarHint: "The small image shown next to this pet\u2019s messages in the chat panel. Without an upload it falls back to the plugin logo; an upload takes effect immediately and replaces the previous one \u2014 no need to click Save.",
      avatarUpload: "Upload avatar",
      avatarChange: "Change",
      avatarUploading: "Uploading\u2026",
      avatarUploaded: "Avatar updated",
      petCardHint: 'Per-pet settings: name / size / display / corner / offsets / the four feature switches. Click "Save" at the bottom to apply instantly.',
      globalTitle: "Global switches",
      globalHint: 'Shared by every pet (a pet pack may override them in its own kind file). These switches only change local state and are written to the user config on "Save" (never written immediately); system notifications re-read right after saving, no page refresh needed.',
      cornerHint: "Which screen corner the pet sticks to (per-monitor work area in desktop mode).",
      marginXHint: "Horizontal distance from the chosen corner (px); any number.",
      marginYHint: "Vertical distance from the chosen corner (px); any number.",
      // 「/」命令菜单的行标题（图标由 app.ts 补上）。
      "cmd.chat": "Chat",
      "cmd.pet": "Pet",
      "cmd.balance": "Balance",
      "shortcut.open": "Open pet chat",
      "shortcut.chat": "Open chat bubble",
      "shortcut.hear": "Voice input",
      "shortcut.capture": "Screenshot to chat",
      shortcutCardTitle: "Shortcuts",
      shortcutCardHint: "Two groups once expanded: pet shortcuts and global shortcuts.",
      shortcutRowChat: "Open chat",
      shortcutRowHold: "Hold to talk",
      shortcutRowHear: "Voice input",
      shortcutRowCapture: "Screenshot",
      shortcutRowPaste: "Paste image",
      shortcutRowTodo: "Todo list",
      shortcutRowSleep: "Sleep / wake",
      shortcutRowDisplay: "Display position",
      shortcutRowSidebar: "Open sidebar chat",
      shortcutGroupPet: "Pet shortcuts",
      shortcutGroupPetHint: "On the web, hovering the pet is enough. In the desktop pet window, click the pet first so it takes keyboard focus.",
      shortcutGroupGlobal: "Global shortcuts",
      shortcutGroupGlobalHint: "Dispatched by DSH in the web app and the desktop window; rebind them in Settings \u2192 General \u2192 Shortcuts.",
      petsLabel: "Pets",
      add: "Add pet",
      remove: "Remove",
      confirmRemove: 'Delete pet "{id}"?',
      confirmTitle: "Confirm action",
      cancel: "Cancel",
      ok: "Got it",
      atLeastOne: "Keep at least one pet.",
      emptyPets: 'No pets yet \u2014 click "Add pet" to create one.',
      sizeLabel: "Size (width px)",
      sizeHint: "Height is automatic = width \xD7 9/16.",
      sizePercentLabel: "Max screen width (%)",
      sizePercentHint: "How much of the screen width the pet may take: 100 = never wider than one screen (identical to px on wide windows); try 30\u201340 to make it clearly smaller on a phone without changing the desktop. Computed once on page load; refresh after resizing.",
      nameLabel: "Name",
      nameHint: 'Shown on hover and added to AI personas ("your name is X"). Duplicates allowed; empty falls back to the pet id.',
      personaLabel: "Persona (optional)",
      personaHint: 'Applies to this pet only. Leave empty to follow the entry persona \u2014 the grey text inside the box is exactly that. The system prompt actually sent = this text + an appended \u300Cyour name is "<name>"\u300D line + the current time context, so do not repeat the name or the date here.',
      personaCount: "{n} chars",
      balanceEnabled: "Balance",
      balanceEnabledHint: "When enabled, this pet plays balance animations and shows the balance bubble.",
      whisperEnabled: "Whisper",
      whisperEnabledHint: "When enabled, this pet periodically generates a line via AI and plays the whisper animation (persona = the field below; empty follows the entry).",
      workStatusEnabled: "Work status",
      workStatusEnabledHint: "When enabled, this pet follows DSH work state: thinking / working / waiting / done / error switch animations and show bubbles (pool in top-level config; listening only, no model calls).",
      fixedEnabled: "Pin in place",
      fixedEnabledHint: "When enabled, the random chain no longer turns this pet or walks it away \u2014 only idle and in-place actions play. Right-click picks, API triggers and balance / whisper / work-status animations are unaffected.",
      displayLabel: "Display",
      displayHint: "web = browser only / desktop = desktop only / both = both / none = neither",
      "display.web": "Browser only",
      "display.desktop": "Desktop only",
      "display.both": "Both",
      "display.none": "Neither",
      cornerLabel: "Position",
      "corner.top-left": "Top-left",
      "corner.top-right": "Top-right",
      "corner.bottom-left": "Bottom-left",
      "corner.bottom-right": "Bottom-right",
      marginX: "Horizontal offset",
      marginY: "Vertical offset",
      save: "Save",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "Sync",
      confirmSync: "Sync? This overwrites the user config with the bundled default config (all fields + comments); current customizations are lost.",
      corruptTitle: "User config is corrupted \u2014 not saved",
      corruptConfirm: "Save anyway",
      corruptBody: "The user config file cannot be parsed (corrupted, not valid JSON/JSONC): {path}. Saving now rebuilds it from the whitelist \u2014 everything currently in that file (animations / physics / memes \u2026) will be lost. Cancel = leave the file untouched (fix it and save again); Confirm = save anyway (discard what is in the file).",
      syncHint: '"Sync" writes the bundled default config (comments + every advanced field included) to the user config file, overwriting your current customizations; the file is then directly editable. Two caveats: (1) once created, that file is an explicit override layer \u2014 later changes to the bundled defaults will not take effect automatically (until you sync again or delete the file); (2) clicking "Save" on this page rewrites the file from a whitelist \u2014 field values are kept, comments are dropped.',
      configMeta: "Advanced (files)",
      configMetaHint: 'User config may override pets / animation pools / weights \u2014 refresh or restart to apply: refresh the page in the browser, or right-click a desktop pet \u2192 "Reload config" (rebuilds every desktop pet window). The default config is the complete reference.',
      defaultConfig: "Default config (read-only, complete reference)",
      userConfig: "User config (custom overrides)",
      todosFile: "Todo data (text, due time and done state; deleting it clears every todo)",
      animationDir: "Animation assets dir (add/customize animations here)",
      memesDir: "Meme images dir (add/customize images here)",
      logFile: "Log file (for troubleshooting; safe to clear)",
      logFileNote: "The DSH desktop app has no console, so every runtime log of the plugin (startup, desktop pet crashes/restarts, errors and warnings) goes into this single file \u2014 attach it when reporting a problem. It is capped at 1 MB; once full, only the latest 512 KB is kept.",
      saved: "Saved \u2014 the pets updated instantly.",
      loadError: "Failed to load config",
      saveError: "Failed to save config. Check the server connection, configuration directory write permissions and server log.",
      saveInvalid: "Failed to save config: invalid configuration. Check the values and try again.",
      syncError: "Failed to sync config. Check the server connection and configuration directory write permissions.",
      loading: "Loading config\u2026",
      retry: "Retry",
      invalid: "Check your input: size must be positive; margins can be any number.",
      busy: "Saving\u2026",
      extraPetsHint: "{n} more kind(s) come from files in the pet/ directory (<name>-config.json + <name>-animation/). Switch to them in the Kinds row above; Save writes back to each pack's own config, never into main-config.jsonc.",
      kindLabel: "Kinds",
      kindMain: "Built-in",
      lastOfKind: '"{entry}" has only this pet left \u2014 deleting it would remove the whole kind. Delete the pet pack files to remove it entirely.',
      savePartial: "Main pets saved, but {names} could not be written back: check that the pack config is valid and the directory is writable.",
      notifyToggle: "System notifications",
      notifyToggleHint: "OS-level toasts (bottom-right of the desktop) for conversation completion, failures, permission requests, and questions \u2014 only while this window is unfocused.",
      clickSoundToggle: "Click sound",
      clickSoundToggleHint: "Plays the built-in click sound (assets/sound/click-duck.wav, volume 0.5) when a pet is clicked; repeated clicks within 100ms play only once, so multiple pets never stack up. Turn it off for silence. Written to the user config together with Save.",
      whisperImageToggle: "Whisper images",
      whisperImageToggleHint: "Attach one random meme from the pool to each whisper line (image mapping lives in the top-level `memes` config field). Tokens: a whisper already calls the model every cycle, so the image only appends the name + description of that one meme (~100 chars / ~60 tokens) to the same request \u2014 negligible.",
      chatImageToggle: "Chat images",
      chatImageToggleHint: "Let the AI pick one meme from the pool that fits the current context (optional; mapping lives in the top-level `memes` config field). Tokens: every message carries the whole catalog \u2014 currently ~1.1k chars (~650 tokens, about 11x the whisper case) and growing with the number of images; turning this off appends nothing at all.",
      chatAnimationToggle: "Chat actions",
      chatAnimationToggleHint: "When on, the chat request carries the list of playable animations (every action under animations.categories): if the model judges that the line really performs one, the pet acts it out on the spot; otherwise it replies in text only. Tokens: every message carries the whole list; off appends nothing. Global default for all pets (a pet pack can override it in its own config file).",
      confineToggle: "Lock to the current screen",
      confineToggleHint: "Multi-monitor: when on, the pet stays inside the screen it is currently on \u2014 a thrown pet bounces only inside the screen it was released on (screen seams act as walls, so it never flies to the neighbouring monitor), and autonomous wandering only walks within the screen it is currently on (a step that would cross the seam is simply cancelled). Turn this off to let it cross screens as usual. Desktop only \u2014 the browser overlay always stays inside the viewport anyway.",
      trayToggle: "System tray",
      trayToggleHint: 'Shows a tray icon (notification area on Windows, menu bar on macOS) once desktop mode is running. It lists every pet in the config and toggles each one between desktop and web/none \u2014 including pets that are currently off the desktop and therefore have no window to right-click. With it off, bringing a pet back to the desktop requires opening the browser (the settings page, or right-clicking a web pet there). Windows already folds third-party icons into the "hidden icons" overflow. Desktop mode only.',
      voiceTitle: "Voice",
      voiceHint: 'Four switches plus a voice: each kind of speech has its own switch and none of them depends on another. All off by default; written to the user config on "Save" (never written immediately).',
      voiceEnabled: "Speak manual whispers",
      voiceEnabledHint: "Speaks whispers triggered from the context menu or a slash command, plus chat replies. The speaker button in the chat panel speaks a single line whenever you press it. It only affects whether sound is produced \u2014 bubbles, chat memory and system notification pop-ups are untouched; a failed synthesis is logged and never interrupts the conversation.",
      voiceWhisperEnabled: "Speak whispers",
      voiceWhisperEnabledHint: "Speaks the periodically generated whisper. Off by default \u2014 whispers are background narration and should not make noise unasked.",
      voiceTodoEnabled: "Speak todo reminders",
      voiceTodoEnabledHint: "Speaks a todo reminder when it comes due (the bubble still appears; this only decides whether it is spoken). Off by default.",
      voiceNotifyEnabled: "Speak work status",
      voiceNotifyEnabledHint: "Speaks a configured work-status line when a task completes, fails, or waits for your confirmation. Like system notifications, it only speaks while you are away from this page (switched away, unfocused, minimized) \u2014 no interruption while you are looking at the screen. Only the configured line is spoken, never the task detail. Off by default.",
      voiceNameLabel: "Voice",
      voiceVolumeLabel: "Volume",
      voiceVolumeHint: "Playback volume as a 0\u20131 decimal: 1 is full volume (100%), 0 is muted. Changes loudness only and never re-synthesizes audio, so adjusting it costs nothing extra. All four kinds of speech share this one volume.",
      physicsTitle: "Physics (drag & throw feel)",
      physicsHint: 'Global default, shared by every pet (a pet pack may override it in its own kind file); written to the user config on "Save" (never written immediately). Applies instantly in the browser; on the desktop it applies once Save reloads the pet windows.',
      mobileTitle: "Mobile effects",
      mobileHint: "Only meaningful in a phone browser: haptics needs a vibration motor, the two motion switches need tilt / accelerometer sensors, and sensors require HTTPS or localhost.",
      "physics.gravity": "Gravity",
      "physics.gravityHint": "px/s\xB2 \u2014 the higher, the faster it falls; 0 = weightless (flies straight forever)",
      "physics.restitution": "Bounciness",
      "physics.restitutionHint": "0\u20131, speed kept when bouncing off a wall or the floor (1 = perfectly elastic, 0 = stops dead)",
      "physics.groundFriction": "Contact friction",
      "physics.groundFrictionHint": "per second, damping along any surface hit (wall, floor, ceiling); 0 = frictionless ice everywhere",
      "physics.throwPower": "Throw power",
      "physics.throwPowerHint": "> 0, overall multiplier for spring tracking and release speed (1 = default; higher = tighter tracking, harder throws)",
      physicsCeilingBounce: "Ceiling bounce",
      physicsCeilingBounceHint: "Turn this off to let a throw fly out through the top of the screen (gravity still pulls it back)",
      physicsPetCollision: "Pet collisions",
      physicsPetCollisionHint: "A flying pet bounces off the others with momentum conservation (mass \u221D size\xB2)",
      physicsHaptic: "Collision haptics",
      physicsHapticHint: "One buzz per hit (walls, floor, ceiling, other pets). Works in Chrome/Edge; not on iOS or WebView shells like Via. Do Not Disturb blocks it.",
      physicsTilt: "Tilt gravity",
      physicsTiltHint: "Tilt the phone and gravity follows it (magnitude = the gravity value above); with gravity at 0 tilt has no effect. Requires HTTPS/localhost.",
      physicsShake: "Shake to throw",
      physicsShakeHint: "Shake to fling the pet along the shake direction; strength scales with throwPower. Independent of gravity, so it still works at gravity 0. Requires HTTPS/localhost.",
      invalidPhysics: "Check the physics values: gravity / ground friction \u2265 0, bounciness 0\u20131, throw power > 0.",
      fontTitle: "Appearance & font",
      fontHint: 'The family applies to every place that currently uses the candy font: pet bubble, hover tooltip, chat popup, score popup. The size applies only to the pet bubble and the hover tooltip (chat and score popups keep their own size). Global default, shared by every pet (a pet pack may override it in its own kind file); written to the user config on "Save" \u2014 instant in the browser, and on the desktop it applies once Save reloads the pet windows.',
      fontFamilyLabel: "Font",
      fontFamilyHint: '"Candy (bundled)" ships with the plugin; the others are system fonts. If a font is missing on this machine, it falls back to the next one in the stack (never blank, never an error).',
      fontSizeLabel: "Font size (px)",
      fontSizeHint: "Bubble body text size; the tooltip and the smaller lines inside the bubble scale proportionally. Range 4\u2013200.",
      fontFollowToggle: "Scale font with pet size",
      fontFollowToggleHint: "On (default): the font grows with the pet \u2014 at 462 px width it is exactly the size above. Off: the size stays fixed regardless of pet size.",
      invalidFont: "Check the font settings: the family must be in the list and the size must be a number between 4 and 200.",
      "font.candy": "Candy (bundled)",
      "font.yahei": "Microsoft YaHei / PingFang",
      "font.youyuan": "YouYuan",
      "font.kaiti": "KaiTi",
      "font.simsun": "SimSun",
      "font.comic": "Comic Sans MS",
      "font.system": "System default",
      modelTitle: "Chat & models",
      modelHint: 'Which model each of whisper and chat uses, and how much history every chat request carries. "Follow current conversation" uses the model your current conversation is on (default). Global default: applies to every pet, and a pet pack may override it in its own kind file. The options come from the same source as the DSH model picker, served live by the host.',
      modelFollow: "Follow current conversation",
      modelSearch: "Search models\u2026",
      modelEmpty: "No matching models.",
      modelNoModels: "No models available.",
      modelLoading: "Refreshing model list\u2026",
      modelTriggerAria: "Select model, current {model}",
      modelUnknown: " (current config, not in the list)",
      modelNone: "No models available for this provider",
      whisperModelLabel: "Whisper model",
      chatModelLabel: "Chat model",
      modelFieldHint: '"Follow current conversation" uses the conversation model; if a chosen model fails, the plugin falls back to the conversation model and retries once.',
      invalidModel: "Check the model settings: pick both a provider and a model, or leave both empty (follow the current conversation).",
      modelCatalogFailed: "Failed to load the model list (refresh the page to retry); your current values are kept as they are.",
      chatMemory: "Chat history rounds",
      chatMemoryHint: "How many recent rounds each chat request carries (1 round = 1 question + 1 answer; 0 = no history, every message starts fresh). The memory itself keeps everything \u2014 this only decides how much goes into the context: higher remembers more and costs more tokens. Global default, shared by every pet (a pet pack may override it in its own kind file).",
      invalidChatMemory: "Check the chat history rounds: it must be a number \u2265 0.",
      chatImageLimit: "Chat image limit",
      chatImageLimitHint: 'How many memes at most are listed to the model during chat ("first N" = the first N you wrote in the config, so move the ones you want sent to the front). That whole list is attached to every message and tokens grow linearly with the count, so a long list is pure burn; capping it to the first N makes the model pick only among those. 0 = no limit (send everything). Built-in default 10. Global default, shared by every pet (a pet pack may override it in its own kind file). Chat only \u2014 a whisper carries just the one meme it drew.',
      invalidChatImageLimit: "Check the chat image limit: it must be a number \u2265 0 (0 = no limit).",
      notifyTest: "Test notification",
      notifyTestOk: "Test notification sent \u2014 check the bottom-right of your desktop.",
      notifyDenyUnsupported: "System notifications are not supported in this environment (no Notification API).",
      notifyDenyBlocked: "Notification permission is blocked by the browser.",
      notifyDenyRejected: 'You chose "Block" in the permission prompt.',
      notifyDenyError: "Failed to request permission",
      notifyGuide: 'Guide: click the \u{1F512}/\u24D8 icon next to the address bar \u2192 Site settings \u2192 Notifications \u2192 set to "Allow", then refresh and retry.',
      storageTitle: "Uninstall & storage",
      storageHint: 'Every location this plugin writes to. Deleting cache folders is harmless (they re-download / rebuild); deleting "plugin user data" loses your config and chat memory.',
      "storage.userData": "Plugin user data: custom config main-config.jsonc, chat memory memory.json, custom animation assets main-animation/, file pets pet/",
      "storage.electron": "Electron runtime used by the desktop pet (large; re-downloaded automatically the next time desktop mode starts)",
      "storage.desktopCache": "Desktop pet window cache and primary-monitor scale cache (safe to delete, rebuilt automatically)",
      "storage.electronCache": "Electron installer download cache (safe to delete, re-downloaded when needed)",
      "storage.package": "The plugin itself (managed by DSH \u2014 remove it with the command below instead of deleting it)",
      storageMissing: " (not created yet)",
      uninstallTitle: "How to uninstall",
      uninstallStep1: "1. Quit DSH first (the desktop pet exits with it); do not delete these files while the pet is running.",
      uninstallStep2: "2. Remove the plugin itself (run in a terminal; this also drops it from the profile bundle layer):",
      uninstallStep3: '3. Delete the locations above as needed: cache folders are harmless; deleting "plugin user data" loses your config and chat memory (back up main-config.jsonc first if you want to keep it).',
      motionTitle: "Action frequency",
      motionHint: "Four boxes: idle / turn / move are editable, and the random action is computed (100 \u2212 the other three). Global default, shared by every pet; a pet pack may override it in its own kind file.",
      "motion.idle": "Idle",
      "motion.turn": "Turn",
      "motion.move": "Move",
      "motion.action": "Random action",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/es.ts
var es;
var init_es = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/es.ts"() {
    es = {
      nav: "Configuraci\xF3n de mascotas",
      intro: "Gestiona varias mascotas: cada una tiene su propio tama\xF1o y posici\xF3n (se aplica al instante despu\xE9s de guardar).",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "Mascota",
      avatarLabel: "Avatar",
      avatarHint: 'La imagen peque\xF1a que aparece junto a los mensajes de esta mascota en el panel de chat. Sin subir nada se usa el logotipo predeterminado del plugin; al subir una imagen se aplica al instante y reemplaza la anterior, sin pulsar "Guardar".',
      avatarUpload: "Subir avatar",
      avatarChange: "Cambiar",
      avatarUploading: "Subiendo\u2026",
      avatarUploaded: "Avatar actualizado",
      petCardHint: 'Ajustes por mascota: nombre / tama\xF1o / visualizaci\xF3n / esquina / m\xE1rgenes / los cuatro interruptores de funciones. Pulsa "Guardar" abajo para aplicar al instante.',
      globalTitle: "Interruptores globales",
      globalHint: 'Compartidos por todas las mascotas (un pet pack puede sobrescribirlos en el archivo de su propio tipo). Estos interruptores solo cambian el estado local y se escriben en la configuraci\xF3n del usuario al "Guardar" (nunca al instante); las notificaciones del sistema se vuelven a leer justo despu\xE9s de guardar, sin necesidad de recargar la p\xE1gina.',
      cornerHint: "En qu\xE9 esquina de la pantalla se pega la mascota (en escritorio se calcula por el \xE1rea de trabajo de cada monitor).",
      marginXHint: "Distancia horizontal desde la esquina elegida (px); puede ser cualquier n\xFAmero.",
      marginYHint: "Distancia vertical desde la esquina elegida (px); puede ser cualquier n\xFAmero.",
      // 「/」命令菜单的行标题（图标由 app.ts 经 command-faces.ts 补上）。
      "cmd.chat": "Chat",
      "cmd.pet": "Mascota",
      "cmd.balance": "Saldo",
      "shortcut.open": "Abrir el chat de la mascota",
      "shortcut.chat": "Abrir la ventana de chat",
      "shortcut.hear": "Entrada de voz",
      "shortcut.capture": "Captura de pantalla al chat",
      shortcutCardTitle: "Atajos",
      shortcutCardHint: "Al expandir hay dos grupos: atajos de la mascota y atajos globales.",
      shortcutRowChat: "Abrir chat",
      shortcutRowHold: "Mantener para hablar",
      shortcutRowHear: "Entrada de voz",
      shortcutRowCapture: "Captura de pantalla",
      shortcutRowPaste: "Pegar imagen",
      shortcutRowTodo: "Tareas",
      shortcutRowSleep: "Dormir / despertar",
      shortcutRowDisplay: "Posici\xF3n de visualizaci\xF3n",
      shortcutRowSidebar: "Abrir el chat lateral",
      shortcutGroupPet: "Atajos de la mascota",
      shortcutGroupPetHint: "En la web basta con pasar el puntero sobre la mascota. En la ventana del escritorio hay que hacer clic en la mascota para que reciba el foco del teclado.",
      shortcutGroupGlobal: "Atajos globales",
      shortcutGroupGlobalHint: "Los distribuye DSH en la web y en la ventana del escritorio; se cambian en Ajustes \u2192 General \u2192 Atajos.",
      petsLabel: "Mascotas",
      add: "Agregar mascota",
      remove: "Eliminar",
      confirmRemove: '\xBFEliminar la mascota "{id}"?',
      confirmTitle: "Confirmar acci\xF3n",
      cancel: "Cancelar",
      ok: "Entendido",
      atLeastOne: "Debe quedar al menos una mascota.",
      emptyPets: 'A\xFAn no hay mascotas; haz clic en "Agregar mascota" para crear una.',
      sizeLabel: "Tama\xF1o (ancho px)",
      sizeHint: "La altura es autom\xE1tica = ancho \xD7 9/16.",
      sizePercentLabel: "Ancho de pantalla m\xE1x. (%)",
      sizePercentHint: "Cu\xE1nto del ancho de pantalla puede ocupar la mascota: 100 = nunca m\xE1s ancha que una pantalla (igual que px en ventanas anchas); 30\u201340 la hace claramente m\xE1s peque\xF1a en el m\xF3vil sin cambiar el escritorio. Se calcula una vez al cargar; recarga tras redimensionar.",
      nameLabel: "Nombre",
      nameHint: 'Se muestra al pasar el cursor y se a\xF1ade a las personas de la IA ("tu nombre es X"). Se permiten duplicados; si se deja vac\xEDo, se usa el id de la mascota.',
      personaLabel: "Persona (opcional)",
      personaHint: 'Solo afecta a esta mascota. D\xE9jalo vac\xEDo para seguir la persona de la entrada: el texto gris del cuadro es exactamente ese contenido. El system que se env\xEDa al modelo = este texto + una l\xEDnea a\xF1adida con "tu nombre es <nombre>" + el contexto de la hora actual, as\xED que no repitas aqu\xED el nombre ni la fecha.',
      personaCount: "{n} caracteres",
      balanceEnabled: "Saldo",
      balanceEnabledHint: "Cuando est\xE1 activado, esta mascota reproduce animaciones de saldo y muestra el globo de saldo.",
      whisperEnabled: "Susurros",
      whisperEnabledHint: "Cuando est\xE1 activado, esta mascota genera peri\xF3dicamente una frase con IA y reproduce la animaci\xF3n de susurro (la persona est\xE1 en el campo de abajo; vac\xEDo sigue la entrada).",
      workStatusEnabled: "Estado de trabajo",
      workStatusEnabledHint: "Cuando est\xE1 activado, esta mascota sigue el estado de trabajo de DSH: pensando / trabajando / esperando confirmaci\xF3n / terminado / error cambian la animaci\xF3n y muestran globos (el pool est\xE1 en la configuraci\xF3n de nivel superior; solo escucha, no llama al modelo).",
      fixedEnabled: "Fijar en el sitio",
      fixedEnabledHint: "Cuando est\xE1 activado, la cadena aleatoria ya no gira ni aleja a esta mascota: solo se reproducen acciones de reposo y en el sitio. Las selecciones con clic derecho, los disparos por API y las animaciones de saldo / susurro / estado de trabajo no se ven afectados.",
      displayLabel: "Visualizaci\xF3n",
      displayHint: "web = solo navegador / desktop = solo escritorio / both = ambos / none = ninguno",
      "display.web": "Solo navegador",
      "display.desktop": "Solo escritorio",
      "display.both": "Ambos",
      "display.none": "Ninguno",
      cornerLabel: "Posici\xF3n",
      "corner.top-left": "Arriba a la izquierda",
      "corner.top-right": "Arriba a la derecha",
      "corner.bottom-left": "Abajo a la izquierda",
      "corner.bottom-right": "Abajo a la derecha",
      marginX: "Margen horizontal",
      marginY: "Margen vertical",
      save: "Guardar",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "Sincronizar",
      confirmSync: "\xBFSincronizar? Esto sobrescribe la configuraci\xF3n del usuario con la configuraci\xF3n predeterminada incluida (todos los campos + comentarios); las personalizaciones actuales se perder\xE1n.",
      corruptTitle: "La configuraci\xF3n del usuario est\xE1 da\xF1ada; no se guard\xF3",
      corruptConfirm: "Guardar de todos modos",
      corruptBody: "No se puede analizar el archivo de configuraci\xF3n del usuario (da\xF1ado, no es JSON/JSONC v\xE1lido): {path}. Si guardas ahora, se reconstruir\xE1 desde la lista blanca: todo lo que hay actualmente en ese archivo (animations / physics / memes\u2026) se perder\xE1. Cancelar = no tocar el archivo (corr\xEDgelo y vuelve a guardar); Confirmar = guardar de todos modos (descartar lo que hay en el archivo).",
      syncHint: '"Sincronizar" escribe la configuraci\xF3n predeterminada incluida (con comentarios y todos los campos avanzados) en el archivo de configuraci\xF3n del usuario, sobrescribiendo tus personalizaciones actuales; despu\xE9s el archivo se puede editar directamente. Dos advertencias: (1) una vez creado, ese archivo es una capa de sobrescritura expl\xEDcita: los cambios posteriores en los valores predeterminados incluidos no se aplicar\xE1n autom\xE1ticamente (hasta que vuelvas a sincronizar o borres el archivo); (2) al pulsar "Guardar" en esta p\xE1gina se reescribe el archivo desde una lista blanca: los valores de los campos se conservan, pero los comentarios se pierden.',
      configMeta: "Avanzado (archivos)",
      configMetaHint: 'La configuraci\xF3n del usuario puede sobrescribir las mascotas / los pools de animaci\xF3n / los pesos; recarga o reinicia para aplicarlo: recarga la p\xE1gina en el navegador, o haz clic derecho en una mascota de escritorio \u2192 "Recargar configuraci\xF3n" (reconstruye todas las ventanas de mascotas de escritorio). La configuraci\xF3n predeterminada es la referencia completa.',
      defaultConfig: "Configuraci\xF3n predeterminada (solo lectura, referencia completa)",
      userConfig: "Configuraci\xF3n del usuario (sobrescrituras personalizadas)",
      todosFile: "Datos de tareas (texto de la lista, hora de vencimiento y estado de completado; borrarlo vac\xEDa todas las tareas)",
      animationDir: "Directorio de recursos de animaci\xF3n (a\xF1ade o personaliza animaciones aqu\xED)",
      memesDir: "Directorio de im\xE1genes de memes (a\xF1ade o personaliza im\xE1genes aqu\xED)",
      logFile: "Archivo de registro (para diagn\xF3stico; se puede vaciar)",
      logFileNote: "La versi\xF3n de escritorio no tiene consola, as\xED que todos los registros de ejecuci\xF3n del plugin (inicio, fallos y reinicios de la mascota de escritorio, errores y advertencias) van a este \xFAnico archivo; adj\xFAntalo al reportar un problema. El l\xEDmite por archivo es de 1 MB; al llenarse solo se conservan los \xFAltimos 512 KB.",
      saved: "Guardado: las mascotas se actualizaron al instante.",
      loadError: "No se pudo cargar la configuraci\xF3n",
      saveError: "No se pudo guardar la configuraci\xF3n. Revisa la conexi\xF3n con el servidor, los permisos de escritura del directorio de configuraci\xF3n y el registro del servidor.",
      saveInvalid: "No se pudo guardar la configuraci\xF3n: el contenido no es v\xE1lido. Rev\xEDsalo e int\xE9ntalo de nuevo.",
      syncError: "No se pudo sincronizar la configuraci\xF3n. Revisa la conexi\xF3n con el servidor y los permisos de escritura del directorio de configuraci\xF3n.",
      loading: "Cargando configuraci\xF3n\u2026",
      retry: "Reintentar",
      invalid: "Revisa los datos: el tama\xF1o debe ser positivo; los m\xE1rgenes pueden ser cualquier n\xFAmero.",
      busy: "Guardando\u2026",
      extraPetsHint: "Otras {n} variantes provienen de archivos del directorio pet/ (<nombre>-config.json + <nombre>-animation/). Cambia a ellas en la fila Tipos de arriba; Guardar escribe en la configuraci\xF3n de cada pack, nunca en main-config.jsonc.",
      kindLabel: "Tipos",
      kindMain: "Integrado",
      lastOfKind: "\xAB{entry}\xBB solo tiene esta mascota; si la eliminas, desaparece todo el tipo. Para quitarlo por completo, borra los archivos del pack de la mascota.",
      savePartial: "Las mascotas principales se guardaron, pero {names} no se pudo escribir de vuelta: revisa que la configuraci\xF3n del pack sea v\xE1lida y que el directorio tenga permisos de escritura.",
      notifyToggle: "Notificaciones del sistema",
      notifyToggleHint: "Avisos del sistema operativo (abajo a la derecha del escritorio) al completarse una conversaci\xF3n, si falla la generaci\xF3n, cuando se solicita permiso o cuando hay que elegir; solo mientras esta ventana no tiene el foco.",
      clickSoundToggle: "Sonido al hacer clic",
      clickSoundToggleHint: "Reproduce el sonido de clic integrado (assets/sound/click-duck.wav, volumen 0.5) al hacer clic en una mascota; los clics repetidos en menos de 100 ms solo suenan una vez, as\xED que varias mascotas nunca se superponen. Desact\xEDvalo para silencio total. Se escribe en la configuraci\xF3n del usuario al Guardar.",
      whisperImageToggle: "Im\xE1genes en susurros",
      whisperImageToggleHint: "Adjunta un meme aleatorio del pool a cada susurro (el mapeo de im\xE1genes est\xE1 en el campo `memes` de la configuraci\xF3n de nivel superior). Tokens: un susurro ya llama al modelo en cada ciclo, as\xED que la imagen solo a\xF1ade el nombre + la descripci\xF3n de ese meme (~100 caracteres / ~60 tokens) a la misma solicitud: insignificante.",
      chatImageToggle: "Im\xE1genes en el chat",
      chatImageToggleHint: "Deja que la IA elija un meme del pool que encaje con el contexto actual (opcional; el mapeo est\xE1 en el campo `memes` de la configuraci\xF3n de nivel superior). Tokens: cada mensaje lleva el cat\xE1logo completo, unos 1.1k caracteres (~650 tokens, unas 11 veces el caso de los susurros) y crece con el n\xFAmero de im\xE1genes; si lo desactivas, no se adjunta ni un car\xE1cter.",
      chatAnimationToggle: "Acciones en el chat",
      chatAnimationToggleHint: "Cuando est\xE1 activado, la petici\xF3n de chat lleva la lista de animaciones que se pueden representar (todas las acciones de animations.categories): si el modelo considera que la frase realmente representa una, la mascota la ejecuta en el acto; si no, responde solo con texto. Tokens: cada mensaje lleva la lista completa; desactivado no se adjunta nada. Valor predeterminado global para todas las mascotas (un pet pack puede sobrescribirlo en su propio archivo de configuraci\xF3n).",
      confineToggle: "Limitar a la pantalla actual",
      confineToggleHint: "Varios monitores: cuando est\xE1 activado, la mascota solo se mueve dentro de la pantalla en la que est\xE1: una mascota lanzada rebota \xFAnicamente dentro de la pantalla donde se solt\xF3 (las uniones entre pantallas act\xFAan como muros, as\xED que nunca vuela al monitor vecino), y el vagabundeo aut\xF3nomo solo camina dentro de la pantalla actual (el paso que cruzar\xEDa la uni\xF3n se cancela). Desact\xEDvalo para permitir vuelos y caminatas entre pantallas. Solo afecta al modo escritorio: el overlay del navegador ya se queda dentro del viewport.",
      trayToggle: "Bandeja del sistema",
      trayToggleHint: "Muestra un icono en la bandeja (\xE1rea de notificaciones en Windows, barra de men\xFAs en macOS) cuando el modo escritorio est\xE1 activo. Lista todas las mascotas de la configuraci\xF3n y alterna cada una entre escritorio y web/ninguno, incluidas las que ahora no est\xE1n en el escritorio y no tienen ventana donde hacer clic derecho. Con esto desactivado, para devolver una mascota al escritorio hay que abrir el navegador (la p\xE1gina de configuraci\xF3n o el clic derecho sobre la mascota web). Windows ya oculta los iconos de terceros en \xABiconos ocultos\xBB. Solo afecta al modo escritorio.",
      voiceTitle: "Voz",
      voiceHint: 'Cuatro interruptores y una voz: cada tipo de locuci\xF3n tiene su propio interruptor y ninguno depende de otro. Todo desactivado por defecto; se escribe en la configuraci\xF3n del usuario al "Guardar" (nunca al instante).',
      voiceEnabled: "Locutar susurros manuales",
      voiceEnabledHint: "Locuta los susurros lanzados desde el men\xFA contextual o un comando de barra, y tambi\xE9n las respuestas del chat. El bot\xF3n de altavoz del panel de chat locuta una sola frase en cuanto lo pulsas. Solo afecta a si se produce sonido: los globos, la memoria del chat y las notificaciones emergentes del sistema no cambian; un fallo de s\xEDntesis se registra y nunca interrumpe la conversaci\xF3n.",
      voiceWhisperEnabled: "Locutar susurros",
      voiceWhisperEnabledHint: "Locuta el susurro generado peri\xF3dicamente. Desactivado por defecto: los susurros son narraci\xF3n de fondo y no deber\xEDan sonar sin pedirlo.",
      voiceTodoEnabled: "Locutar recordatorios de tareas",
      voiceTodoEnabledHint: "Locuta el recordatorio de una tarea cuando vence (el globo sigue apareciendo; esto solo decide si se locuta). Desactivado por defecto.",
      voiceNotifyEnabled: "Locutar estado de trabajo",
      voiceNotifyEnabledHint: "Locuta una frase configurada de estado de trabajo cuando una tarea termina, falla o espera tu confirmaci\xF3n. Igual que las notificaciones del sistema, solo locuta cuando no est\xE1s en esta p\xE1gina (otra aplicaci\xF3n, sin foco, minimizada): no interrumpe mientras miras la pantalla. Solo se locuta la frase configurada, nunca el detalle de la tarea. Desactivado por defecto.",
      voiceNameLabel: "Voz",
      voiceVolumeLabel: "Volumen",
      voiceVolumeHint: "Volumen de reproducci\xF3n como decimal 0\u20131: 1 es el volumen m\xE1ximo (100 %) y 0 silencia. Solo cambia la intensidad y no vuelve a sintetizar el audio, as\xED que ajustarlo no tiene coste extra. Los cuatro tipos de locuci\xF3n comparten este mismo volumen.",
      physicsTitle: "F\xEDsica (sensaci\xF3n al arrastrar y lanzar)",
      physicsHint: 'Valor predeterminado global, compartido por todas las mascotas (un pet pack puede sobrescribirlo en el archivo de su propio tipo); se escribe en la configuraci\xF3n del usuario al "Guardar" (nunca al instante). En el navegador se aplica al instante; en el escritorio se aplica cuando Guardar recarga las ventanas de mascotas.',
      mobileTitle: "Efectos m\xF3viles",
      mobileHint: "Solo tienen sentido en el navegador del m\xF3vil: la vibraci\xF3n necesita motor, los dos interruptores de movimiento necesitan sensores de inclinaci\xF3n/aceleraci\xF3n, y los sensores exigen HTTPS o localhost.",
      "physics.gravity": "Gravedad",
      "physics.gravityHint": "px/s\xB2: cuanto mayor, m\xE1s r\xE1pido cae; 0 = sin gravedad (vuela en l\xEDnea recta para siempre)",
      "physics.restitution": "Rebote",
      "physics.restitutionHint": "0\u20131, velocidad que se conserva al rebotar en una pared o el suelo (1 = completamente el\xE1stico, 0 = se detiene en seco)",
      "physics.groundFriction": "Fricci\xF3n de contacto",
      "physics.groundFrictionHint": "por segundo, amortiguaci\xF3n a lo largo de cualquier superficie (pared, suelo, techo); 0 = hielo en todas",
      "physics.throwPower": "Fuerza de lanzamiento",
      "physics.throwPowerHint": "> 0, multiplicador general del seguimiento con resorte y de la velocidad de salida (1 = predeterminado; m\xE1s alto = sigue m\xE1s pegado y lanza m\xE1s fuerte)",
      physicsCeilingBounce: "Rebote en el techo",
      physicsCeilingBounceHint: "Desact\xEDvalo para que un lanzamiento pueda salir por la parte superior de la pantalla (la gravedad sigue tirando de \xE9l hacia abajo)",
      physicsPetCollision: "Colisiones entre mascotas",
      physicsPetCollisionHint: "Una mascota en vuelo rebota contra las dem\xE1s conservando el momento (masa \u221D tama\xF1o\xB2)",
      physicsHaptic: "Vibraci\xF3n al chocar",
      physicsHapticHint: "Una vibraci\xF3n por impacto (paredes, suelo, techo, otras mascotas). Funciona en Chrome/Edge; no en iOS ni en navegadores WebView como Via. El modo No molestar la bloquea.",
      physicsTilt: "Gravedad por inclinaci\xF3n",
      physicsTiltHint: "Inclina el m\xF3vil y la gravedad lo sigue (magnitud = el valor de arriba); con gravedad en 0 la inclinaci\xF3n no hace nada. Requiere HTTPS/localhost.",
      physicsShake: "Agitar para lanzar",
      physicsShakeHint: "Agita para lanzar la mascota en la direcci\xF3n del gesto; la fuerza escala con throwPower. No depende de la gravedad, as\xED que funciona con gravedad 0. Requiere HTTPS/localhost.",
      invalidPhysics: "Revisa los par\xE1metros de f\xEDsica: gravedad / fricci\xF3n con el suelo \u2265 0, rebote 0\u20131, fuerza de lanzamiento > 0.",
      fontTitle: "Apariencia y fuente",
      fontHint: 'La familia se aplica a todos los textos que ahora usan la fuente candy: globo de la mascota, tooltip al pasar el cursor, ventana de chat y ventana de puntuaci\xF3n. El tama\xF1o solo se aplica al globo de la mascota y al tooltip (las ventanas de chat y de puntuaci\xF3n conservan su tama\xF1o). Valor predeterminado global, compartido por todas las mascotas (un pet pack puede sobrescribirlo en el archivo de su propio tipo); se escribe en la configuraci\xF3n del usuario al "Guardar": al instante en el navegador y, en el escritorio, cuando Guardar recarga las ventanas de mascotas.',
      fontFamilyLabel: "Fuente",
      fontFamilyHint: "\xABCandy (integrada)\xBB viene con el plugin; las dem\xE1s son fuentes del sistema. Si una fuente no est\xE1 instalada en esta m\xE1quina, se usa la siguiente de la pila (nunca queda en blanco ni da error).",
      fontSizeLabel: "Tama\xF1o de fuente (px)",
      fontSizeHint: "Tama\xF1o del texto del globo; el tooltip y las l\xEDneas peque\xF1as dentro del globo se escalan en proporci\xF3n. Rango 4\u2013200.",
      fontFollowToggle: "Escalar la fuente con el tama\xF1o de la mascota",
      fontFollowToggleHint: "Activado (predeterminado): la fuente crece con la mascota; con 462 px de ancho es exactamente el tama\xF1o de arriba. Desactivado: el tama\xF1o queda fijo sin importar el tama\xF1o de la mascota.",
      invalidFont: "Revisa la configuraci\xF3n de la fuente: la familia debe estar en la lista y el tama\xF1o debe ser un n\xFAmero entre 4 y 200.",
      "font.candy": "Candy (integrada)",
      "font.yahei": "Microsoft YaHei / PingFang",
      "font.youyuan": "YouYuan",
      "font.kaiti": "KaiTi",
      "font.simsun": "SimSun",
      "font.comic": "Comic Sans MS",
      "font.system": "Predeterminada del sistema",
      modelTitle: "Chat y modelos",
      modelHint: 'Qu\xE9 modelo usa cada uno de susurros y chat, y cu\xE1nto historial lleva cada solicitud de chat. "Seguir la conversaci\xF3n actual" usa el modelo de tu conversaci\xF3n actual (predeterminado). Valor predeterminado global: se aplica a todas las mascotas y un pet pack puede sobrescribirlo en el archivo de su propio tipo. Las opciones vienen de la misma fuente que el selector de modelos de DSH y el host las sirve en vivo.',
      modelFollow: "Seguir la conversaci\xF3n actual",
      modelSearch: "Buscar modelos\u2026",
      modelEmpty: "No hay modelos que coincidan.",
      modelNoModels: "No hay modelos disponibles.",
      modelLoading: "Actualizando la lista de modelos\u2026",
      modelTriggerAria: "Seleccionar modelo, actual {model}",
      modelUnknown: " (configuraci\xF3n actual, no est\xE1 en la lista)",
      modelNone: "Este proveedor no tiene modelos disponibles",
      whisperModelLabel: "Modelo de susurros",
      chatModelLabel: "Modelo de chat",
      modelFieldHint: '"Seguir la conversaci\xF3n actual" usa el modelo de la conversaci\xF3n; si el modelo elegido falla, se vuelve al modelo de la conversaci\xF3n y se reintenta una vez.',
      invalidModel: "Revisa la configuraci\xF3n del modelo: elige proveedor y modelo, o deja ambos vac\xEDos (seguir la conversaci\xF3n actual).",
      modelCatalogFailed: "No se pudo cargar la lista de modelos (recarga la p\xE1gina para reintentar); tus valores actuales se conservan tal cual.",
      chatMemory: "Rondas de historial del chat",
      chatMemoryHint: "Cu\xE1ntas rondas recientes lleva cada solicitud de chat (1 ronda = 1 pregunta + 1 respuesta; 0 = sin historial, cada mensaje empieza de cero). La memoria en s\xED lo guarda todo: esto solo decide cu\xE1nto entra en el contexto; m\xE1s rondas recuerdan m\xE1s y gastan m\xE1s tokens. Valor predeterminado global, compartido por todas las mascotas (un pet pack puede sobrescribirlo en el archivo de su propio tipo).",
      invalidChatMemory: "Revisa las rondas de historial del chat: debe ser un n\xFAmero \u2265 0.",
      chatImageLimit: "L\xEDmite de im\xE1genes en el chat",
      chatImageLimitHint: 'Cu\xE1ntos memes como m\xE1ximo se listan al modelo durante el chat ("los primeros N" = los N que escribiste primero en la configuraci\xF3n; mueve al frente los que quieras enviar). Esa lista completa se adjunta a cada mensaje y los tokens crecen de forma lineal con la cantidad, as\xED que una lista larga es puro gasto; limitarla a los primeros N hace que el modelo elija solo entre esos. 0 = sin l\xEDmite (enviar todo). Valor integrado predeterminado: 10. Valor predeterminado global, compartido por todas las mascotas (un pet pack puede sobrescribirlo en el archivo de su propio tipo). Solo afecta a la selecci\xF3n de im\xE1genes del chat: un susurro lleva solo el meme que sac\xF3.',
      invalidChatImageLimit: "Revisa el l\xEDmite de im\xE1genes del chat: debe ser un n\xFAmero \u2265 0 (0 = sin l\xEDmite).",
      notifyTest: "Probar notificaci\xF3n",
      notifyTestOk: "Notificaci\xF3n de prueba enviada; m\xEDrala abajo a la derecha del escritorio.",
      notifyDenyUnsupported: "Este entorno no admite notificaciones del sistema (no hay API Notification).",
      notifyDenyBlocked: "El navegador tiene bloqueado el permiso de notificaciones.",
      notifyDenyRejected: "Elegiste \xABBloquear\xBB en el aviso de permiso.",
      notifyDenyError: "Error al solicitar permiso",
      notifyGuide: "Gu\xEDa: haz clic en el icono \u{1F512}/\u24D8 junto a la barra de direcciones \u2192 Configuraci\xF3n del sitio \u2192 Notificaciones \u2192 c\xE1mbialo a \xABPermitir\xBB y luego recarga la p\xE1gina y reintenta.",
      storageTitle: "Desinstalaci\xF3n y almacenamiento",
      storageHint: "Todas las ubicaciones que escribe este plugin. Borrar las cach\xE9s no rompe nada (se vuelven a descargar/reconstruir); borrar los \xABdatos de usuario del plugin\xBB pierde la configuraci\xF3n y la memoria del chat.",
      "storage.userData": "Datos de usuario del plugin: configuraci\xF3n personalizada main-config.jsonc, memoria del chat memory.json, recursos de animaci\xF3n personalizados main-animation/, mascotas de archivo pet/",
      "storage.electron": "Runtime de Electron que usa la mascota de escritorio (grande; se vuelve a descargar autom\xE1ticamente la pr\xF3xima vez que se active el modo escritorio)",
      "storage.desktopCache": "Cach\xE9 de las ventanas de mascotas de escritorio y cach\xE9 de escala del monitor principal (se puede borrar, se reconstruye autom\xE1ticamente)",
      "storage.electronCache": "Cach\xE9 de descarga del instalador de Electron (se puede borrar, se vuelve a descargar cuando haga falta)",
      "storage.package": "El plugin en s\xED (lo gestiona DSH: qu\xEDtalo con el comando de abajo en vez de borrarlo a mano)",
      storageMissing: " (a\xFAn no se ha creado)",
      uninstallTitle: "C\xF3mo desinstalar",
      uninstallStep1: "1. Cierra DSH primero (la mascota de escritorio se cierra con \xE9l); no borres estos archivos mientras la mascota est\xE9 en ejecuci\xF3n.",
      uninstallStep2: "2. Quita el plugin en s\xED (ejec\xFAtalo en la terminal; tambi\xE9n lo elimina de la capa de bundles del perfil):",
      uninstallStep3: "3. Borra las ubicaciones de arriba seg\xFAn necesites: las cach\xE9s no hacen da\xF1o; borrar los \xABdatos de usuario del plugin\xBB pierde la configuraci\xF3n y la memoria del chat (haz una copia de main-config.jsonc si quieres conservarla).",
      motionTitle: "Frecuencia de acciones",
      motionHint: "Cuatro casillas: espera / giro / movimiento son editables; la acci\xF3n aleatoria se calcula (100 \u2212 las otras tres). Valor global para todas las mascotas; un pet pack puede sobrescribirlo en su archivo de tipo.",
      "motion.idle": "En espera",
      "motion.turn": "Giro",
      "motion.move": "Movimiento",
      "motion.action": "Acci\xF3n aleatoria",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/fr.ts
var fr;
var init_fr = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/fr.ts"() {
    fr = {
      nav: "Configuration des compagnons",
      intro: "G\xE9rez plusieurs compagnons : chacun a sa taille et sa position (appliqu\xE9es imm\xE9diatement apr\xE8s l'enregistrement).",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "Compagnon",
      avatarLabel: "Avatar",
      avatarHint: "La petite image affich\xE9e \xE0 c\xF4t\xE9 des messages de ce compagnon dans le panneau de discussion. Sans envoi, le logo par d\xE9faut du plugin est utilis\xE9 ; un envoi prend effet imm\xE9diatement et remplace le pr\xE9c\xE9dent, sans cliquer sur \xAB Enregistrer \xBB.",
      avatarUpload: "Envoyer un avatar",
      avatarChange: "Changer",
      avatarUploading: "Envoi\u2026",
      avatarUploaded: "Avatar mis \xE0 jour",
      petCardHint: "R\xE9glages par compagnon : nom / taille / affichage / coin / d\xE9calages / les quatre interrupteurs de fonctionnalit\xE9s. Cliquez sur \xAB Enregistrer \xBB en bas pour appliquer imm\xE9diatement.",
      globalTitle: "Interrupteurs globaux",
      globalHint: "Partag\xE9s par tous les compagnons (un pet pack peut les remplacer dans son propre fichier de type). Ces interrupteurs ne modifient que l'\xE9tat local et sont \xE9crits dans la configuration utilisateur lors de l'enregistrement (jamais imm\xE9diatement) ; les notifications syst\xE8me sont relues juste apr\xE8s l'enregistrement, sans rafra\xEEchir la page.",
      cornerHint: "Le coin de l'\xE9cran auquel le compagnon se colle (par zone de travail de chaque \xE9cran en mode bureau).",
      marginXHint: "Distance horizontale au coin choisi (px) ; n'importe quel nombre.",
      marginYHint: "Distance verticale au coin choisi (px) ; n'importe quel nombre.",
      // 「/」命令菜单的行标题（图标由 app.ts 经 command-faces.ts 补上）。
      "cmd.chat": "Discussion",
      "cmd.pet": "Compagnon",
      "cmd.balance": "Solde",
      "shortcut.open": "Ouvrir le chat du compagnon",
      "shortcut.chat": "Ouvrir la fen\xEAtre de chat",
      "shortcut.hear": "Saisie vocale",
      "shortcut.capture": "Capture d\u2019\xE9cran vers le chat",
      shortcutCardTitle: "Raccourcis",
      shortcutCardHint: "Deux groupes une fois d\xE9ploy\xE9 : raccourcis du compagnon et raccourcis globaux.",
      shortcutRowChat: "Ouvrir le chat",
      shortcutRowHold: "Maintenir pour parler",
      shortcutRowHear: "Saisie vocale",
      shortcutRowCapture: "Capture d\u2019\xE9cran",
      shortcutRowPaste: "Coller une image",
      shortcutRowTodo: "T\xE2ches",
      shortcutRowSleep: "Dormir / r\xE9veiller",
      shortcutRowDisplay: "Position d\u2019affichage",
      shortcutRowSidebar: "Ouvrir le chat lat\xE9ral",
      shortcutGroupPet: "Raccourcis du compagnon",
      shortcutGroupPetHint: "Sur le web, il suffit de survoler le compagnon. Dans la fen\xEAtre du bureau, cliquez d\u2019abord sur le compagnon pour qu\u2019il prenne le focus clavier.",
      shortcutGroupGlobal: "Raccourcis globaux",
      shortcutGroupGlobalHint: "Distribu\xE9s par DSH dans le web et la fen\xEAtre du bureau ; modifiables dans R\xE9glages \u2192 G\xE9n\xE9ral \u2192 Raccourcis.",
      petsLabel: "Compagnons",
      add: "Ajouter un compagnon",
      remove: "Supprimer",
      confirmRemove: "Supprimer le compagnon \xAB {id} \xBB ?",
      confirmTitle: "Confirmer l'action",
      cancel: "Annuler",
      ok: "Compris",
      atLeastOne: "Gardez au moins un compagnon.",
      emptyPets: "Aucun compagnon pour l'instant \u2014 cliquez sur \xAB Ajouter un compagnon \xBB pour en cr\xE9er un.",
      sizeLabel: "Taille (largeur px)",
      sizeHint: "La hauteur est automatique = largeur \xD7 9/16.",
      sizePercentLabel: "Largeur d\u2019\xE9cran max (%)",
      sizePercentHint: "Part de la largeur d\u2019\xE9cran que le pet peut occuper : 100 = jamais plus large qu\u2019un \xE9cran (identique au px sur une fen\xEAtre large) ; 30\u201340 le rend nettement plus petit sur t\xE9l\xE9phone sans changer le bureau. Calcul\xE9 une fois au chargement ; rechargez apr\xE8s redimensionnement.",
      nameLabel: "Nom",
      nameHint: "Affich\xE9 au survol du compagnon et ajout\xE9 aux personas de l'IA (\xAB votre nom est X \xBB). Les doublons sont permis ; laiss\xE9 vide, l'identifiant du compagnon est utilis\xE9.",
      personaLabel: "Persona (facultatif)",
      personaHint: "Ne concerne que ce compagnon. Laissez vide pour suivre le persona de l'entr\xE9e \u2014 le texte gris\xE9 dans le champ est exactement celui-ci. Le system r\xE9ellement envoy\xE9 au mod\xE8le = ce texte + la ligne \xAB votre nom est <nom> \xBB ajout\xE9e automatiquement + le contexte temporel courant ; ne r\xE9p\xE9tez donc ni le nom ni la date ici.",
      personaCount: "{n} caract\xE8res",
      balanceEnabled: "Fonction solde",
      balanceEnabledHint: "Une fois activ\xE9e, ce compagnon joue l'animation de solde et affiche la bulle de solde.",
      whisperEnabled: "Murmures",
      whisperEnabledHint: "Une fois activ\xE9, ce compagnon g\xE9n\xE8re p\xE9riodiquement une phrase via l'IA et joue l'animation de murmure (persona = le champ ci-dessous ; vide = celui de l'entr\xE9e).",
      workStatusEnabled: "Suivi de l'\xE9tat de travail",
      workStatusEnabledHint: "Une fois activ\xE9, ce compagnon suit l'\xE9tat de travail de DSH : r\xE9flexion / travail / attente de confirmation / termin\xE9 / erreur d\xE9clenchent l'animation correspondante et une bulle (le pool se trouve au niveau sup\xE9rieur de la configuration ; \xE9coute seule, aucun appel au mod\xE8le).",
      fixedEnabled: "Compagnon fixe",
      fixedEnabledHint: "Une fois activ\xE9, la cha\xEEne al\xE9atoire ne fait plus se retourner ni s'\xE9loigner le compagnon \u2014 seules les actions sur place sont jou\xE9es. Les d\xE9clenchements par menu contextuel et par API, ainsi que les animations solde / murmure / \xE9tat de travail, ne sont pas affect\xE9s.",
      displayLabel: "Affichage",
      displayHint: "web = navigateur seul / desktop = bureau seul / both = les deux / none = aucun",
      "display.web": "Navigateur seul",
      "display.desktop": "Bureau seul",
      "display.both": "Les deux",
      "display.none": "Aucun",
      cornerLabel: "Position",
      "corner.top-left": "En haut \xE0 gauche",
      "corner.top-right": "En haut \xE0 droite",
      "corner.bottom-left": "En bas \xE0 gauche",
      "corner.bottom-right": "En bas \xE0 droite",
      marginX: "D\xE9calage horizontal",
      marginY: "D\xE9calage vertical",
      save: "Enregistrer",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "Synchroniser",
      confirmSync: "Synchroniser ? La configuration par d\xE9faut int\xE9gr\xE9e (tous les champs + commentaires) remplacera la configuration utilisateur ; vos personnalisations actuelles seront perdues.",
      corruptTitle: "Configuration utilisateur corrompue \u2014 non enregistr\xE9e",
      corruptConfirm: "Enregistrer quand m\xEAme",
      corruptBody: "Le fichier de configuration utilisateur est illisible (corrompu, JSON/JSONC invalide) : {path}. Enregistrer maintenant le reconstruit \xE0 partir de la liste blanche \u2014 tout son contenu actuel (animations / physics / memes, etc.) sera perdu. Annuler = ne pas toucher au fichier (corrigez-le puis enregistrez) ; Confirmer = enregistrer quand m\xEAme (le contenu actuel du fichier est abandonn\xE9).",
      syncHint: "\xAB Synchroniser \xBB \xE9crit la configuration par d\xE9faut int\xE9gr\xE9e (commentaires et tous les champs avanc\xE9s compris) dans le fichier de configuration utilisateur, en \xE9crasant vos personnalisations ; le fichier est ensuite modifiable directement. Deux r\xE9serves : (1) une fois cr\xE9\xE9, ce fichier est une couche de remplacement explicite \u2014 les changements ult\xE9rieurs des valeurs par d\xE9faut int\xE9gr\xE9es ne s'appliquent pas automatiquement (sauf nouvelle synchronisation ou suppression du fichier) ; (2) cliquer sur \xAB Enregistrer \xBB sur cette page r\xE9\xE9crit le fichier \xE0 partir d'une liste blanche \u2014 les valeurs sont conserv\xE9es, les commentaires disparaissent.",
      configMeta: "Configuration avanc\xE9e (fichiers)",
      configMetaHint: "La configuration utilisateur peut remplacer la liste des compagnons / les pools d'animation / les poids ; rechargez la page ou red\xE9marrez pour appliquer : rafra\xEEchissez la page dans le navigateur, ou sur le bureau, clic droit sur un compagnon \u2192 \xAB Recharger la configuration \xBB (reconstruit toutes les fen\xEAtres de compagnons). La configuration par d\xE9faut est la r\xE9f\xE9rence compl\xE8te.",
      defaultConfig: "Configuration par d\xE9faut (lecture seule, r\xE9f\xE9rence compl\xE8te)",
      userConfig: "Configuration utilisateur (remplacements personnalis\xE9s)",
      todosFile: "Donn\xE9es de t\xE2ches (texte, \xE9ch\xE9ance et \xE9tat ; les supprimer vide toutes les t\xE2ches)",
      animationDir: "Dossier des animations (pour ajouter ou personnaliser des animations)",
      memesDir: "Dossier des m\xE8mes (pour ajouter ou personnaliser des images)",
      logFile: "Fichier journal (pour le d\xE9pannage ; peut \xEAtre vid\xE9)",
      logFileNote: "L'application de bureau n'a pas de console : tous les journaux d'ex\xE9cution du plugin (d\xE9marrage, plantages / red\xE9marrages des compagnons, erreurs et avertissements) sont \xE9crits dans ce seul fichier \u2014 joignez-le \xE0 vos rapports de probl\xE8me. Limit\xE9 \xE0 1 Mo ; une fois plein, seuls les 512 Ko les plus r\xE9cents sont conserv\xE9s.",
      saved: "Enregistr\xE9 \u2014 les compagnons sont \xE0 jour imm\xE9diatement.",
      loadError: "\xC9chec du chargement de la configuration",
      saveError: "\xC9chec de l'enregistrement de la configuration. V\xE9rifiez la connexion au serveur, les droits d'\xE9criture du dossier de configuration et le journal du serveur.",
      saveInvalid: "\xC9chec de l'enregistrement : configuration invalide. V\xE9rifiez les valeurs et r\xE9essayez.",
      syncError: "\xC9chec de la synchronisation. V\xE9rifiez la connexion au serveur et les droits d'\xE9criture du dossier de configuration.",
      loading: "Chargement de la configuration\u2026",
      retry: "R\xE9essayer",
      invalid: "V\xE9rifiez votre saisie : la taille doit \xEAtre positive ; les marges peuvent \xEAtre n'importe quel nombre.",
      busy: "Enregistrement\u2026",
      extraPetsHint: "{n} autre(s) type(s) proviennent de fichiers du dossier pet/ (<nom>-config.json + <nom>-animation/) ; basculez dessus dans la ligne \xAB Types \xBB ci-dessus. L'enregistrement \xE9crit dans la configuration propre \xE0 chaque pack, jamais dans main-config.jsonc.",
      kindLabel: "Types",
      kindMain: "Int\xE9gr\xE9",
      lastOfKind: "\xAB {entry} \xBB n'a plus que ce compagnon \u2014 le supprimer ferait dispara\xEEtre tout le type. Pour le retirer compl\xE8tement, supprimez les fichiers du pack.",
      savePartial: "Compagnons principaux enregistr\xE9s, mais {names} n'ont pas pu \xEAtre \xE9crits : v\xE9rifiez que la configuration du pack est valide et que le dossier est accessible en \xE9criture.",
      notifyToggle: "Notifications syst\xE8me",
      notifyToggleHint: "Notifications du syst\xE8me d'exploitation (en bas \xE0 droite du bureau) pour la fin d'une conversation, les \xE9checs, les demandes de permission et les questions \u2014 uniquement lorsque cette fen\xEAtre n'a pas le focus.",
      clickSoundToggle: "Son au clic",
      clickSoundToggleHint: "Joue le son int\xE9gr\xE9 (assets/sound/click-duck.wav, volume 0,5) quand on clique sur un compagnon ; les clics r\xE9p\xE9t\xE9s en moins de 100 ms ne sonnent qu'une fois, donc plusieurs compagnons ne se superposent jamais. D\xE9sactivez-le pour un silence total. \xC9crit dans la configuration utilisateur avec \xAB Enregistrer \xBB.",
      whisperImageToggle: "Images des murmures",
      whisperImageToggleHint: "Joindre un m\xE8me tir\xE9 au hasard dans le pool \xE0 chaque murmure (la correspondance des images se trouve dans le champ memes, au niveau sup\xE9rieur de la configuration). Tokens : un murmure appelle d\xE9j\xE0 le mod\xE8le \xE0 chaque cycle ; l'image ajoute seulement le nom + la description de ce m\xE8me (environ 100 caract\xE8res / ~60 tokens) \xE0 la m\xEAme requ\xEAte \u2014 n\xE9gligeable.",
      chatImageToggle: "Images de discussion",
      chatImageToggleHint: "L'IA choisit un m\xE8me du pool adapt\xE9 au contexte (facultatif ; la correspondance se trouve dans le champ memes, au niveau sup\xE9rieur de la configuration). Tokens : chaque message transporte tout le catalogue \u2014 actuellement environ 1,1 k caract\xE8res (~650 tokens, soit environ 11 fois le cas des murmures) et cela cro\xEEt avec le nombre d'images ; d\xE9sactiv\xE9, rien du tout n'est ajout\xE9.",
      chatAnimationToggle: "Actions en discussion",
      chatAnimationToggleHint: "Une fois activ\xE9, la requ\xEAte de discussion transporte la liste des animations jouables (toutes les actions de animations.categories) : si le mod\xE8le estime que la r\xE9plique joue r\xE9ellement l'une d'elles, le compagnon la joue imm\xE9diatement ; sinon il r\xE9pond seulement en texte. Tokens : chaque message transporte toute la liste ; d\xE9sactiv\xE9, rien n'est ajout\xE9. Valeur par d\xE9faut globale pour tous les compagnons (un pet pack peut la surcharger dans son propre fichier de configuration).",
      confineToggle: "Limiter \xE0 l'\xE9cran actuel",
      confineToggleHint: "Multi-\xE9crans : une fois activ\xE9, le compagnon reste sur l'\xE9cran o\xF9 il se trouve \u2014 un compagnon lanc\xE9 ne rebondit que sur l'\xE9cran du rel\xE2chement (les jointures d'\xE9crans font office de murs, il ne passe pas sur l'\xE9cran voisin) et l'errance autonome ne se fait que sur l'\xE9cran actuel (tout pas qui franchirait la jointure est annul\xE9). D\xE9sactiv\xE9, il traverse les \xE9crans comme d'habitude. Mode bureau uniquement \u2014 l'overlay du navigateur reste de toute fa\xE7on dans la zone visible.",
      trayToggle: "Zone de notification",
      trayToggleHint: "Affiche une ic\xF4ne dans la zone de notification (barre de menus sur macOS) d\xE8s que le mode bureau d\xE9marre. Elle liste tous les compagnons de la configuration et permet de basculer chacun entre bureau et web / aucun \u2014 y compris ceux qui ne sont pas sur le bureau et n'ont donc aucune fen\xEAtre \xE0 cliquer droit. Une fois d\xE9sactiv\xE9e, ramener un compagnon sur le bureau exige d'ouvrir le navigateur (la page de configuration, ou un clic droit sur le compagnon web). Windows range d\xE9j\xE0 ces ic\xF4nes dans le panneau \xAB ic\xF4nes masqu\xE9es \xBB. Mode bureau uniquement.",
      voiceTitle: "Synth\xE8se vocale",
      voiceHint: "Quatre interrupteurs et une voix : chaque type de parole a son propre interrupteur, aucun ne d\xE9pend d'un autre. Tout est d\xE9sactiv\xE9 par d\xE9faut et \xE9crit dans la configuration utilisateur lors de l'enregistrement (jamais imm\xE9diatement).",
      voiceEnabled: "Lire les murmures manuels",
      voiceEnabledHint: "Lit les murmures d\xE9clench\xE9s par le clic droit ou une commande slash, ainsi que les r\xE9ponses de discussion. Le bouton haut-parleur du panneau de discussion lit une seule r\xE9plique d\xE8s que vous appuyez. Cela ne d\xE9cide que du son \xE9mis : bulles, m\xE9moire de discussion et pop-ups de notification syst\xE8me restent intacts ; un \xE9chec de synth\xE8se est seulement journalis\xE9 et n'interrompt jamais la conversation.",
      voiceWhisperEnabled: "Lire les murmures",
      voiceWhisperEnabledHint: "Lit le murmure g\xE9n\xE9r\xE9 p\xE9riodiquement. D\xE9sactiv\xE9 par d\xE9faut \u2014 les murmures sont une narration de fond et ne doivent pas faire de bruit sans qu'on le demande.",
      voiceTodoEnabled: "Lire les rappels de t\xE2ches",
      voiceTodoEnabledHint: "Lit un rappel de t\xE2che \xE0 son \xE9ch\xE9ance (la bulle s'affiche toujours ; cet interrupteur d\xE9cide seulement s'il est lu). D\xE9sactiv\xE9 par d\xE9faut.",
      voiceNotifyEnabled: "Lire l'\xE9tat de travail",
      voiceNotifyEnabledHint: "Lit une r\xE9plique d'\xE9tat de travail configur\xE9e quand une t\xE2che se termine, \xE9choue ou attend votre confirmation. Comme les notifications syst\xE8me, elle n'est lue que lorsque vous n'\xEAtes pas sur cette page (autre application, sans focus, r\xE9duite) \u2014 aucune interruption pendant que vous regardez l'\xE9cran. Seule la r\xE9plique configur\xE9e est lue, jamais le d\xE9tail de la t\xE2che. D\xE9sactiv\xE9 par d\xE9faut.",
      voiceNameLabel: "Voix",
      voiceVolumeLabel: "Volume",
      voiceVolumeHint: "Volume de lecture en d\xE9cimal 0\u20131 : 1 correspond au volume maximal (100 %), 0 coupe le son. Seule l\u2019intensit\xE9 change et l\u2019audio n\u2019est pas resynth\xE9tis\xE9, donc le r\xE9gler ne co\xFBte rien de plus. Les quatre types de parole partagent ce m\xEAme volume.",
      physicsTitle: "Physique (ressenti du glisser-lancer)",
      physicsHint: "Valeurs par d\xE9faut globales, partag\xE9es par tous les compagnons (un pet pack peut les remplacer dans son propre fichier de type) ; \xE9crites dans la configuration utilisateur lors de l'enregistrement (jamais imm\xE9diatement). Appliqu\xE9es imm\xE9diatement dans le navigateur ; sur le bureau, apr\xE8s que l'enregistrement a recharg\xE9 les fen\xEAtres des compagnons.",
      mobileTitle: "Effets mobiles",
      mobileHint: "Ces r\xE9glages n'ont de sens que dans un navigateur mobile : la vibration exige un moteur, les deux interrupteurs de mouvement exigent des capteurs d'inclinaison / d'acc\xE9l\xE9ration, et ces capteurs ne fonctionnent qu'en HTTPS ou sur localhost.",
      "physics.gravity": "Gravit\xE9",
      "physics.gravityHint": "px/s\xB2, plus la valeur est \xE9lev\xE9e, plus la chute est rapide ; 0 = apesanteur (trajectoire rectiligne uniforme)",
      "physics.restitution": "Rebond",
      "physics.restitutionHint": "0 \xE0 1, proportion de vitesse conserv\xE9e lors du rebond contre un mur ou le sol (1 = parfaitement \xE9lastique, 0 = arr\xEAt net)",
      "physics.groundFriction": "Frottement de contact",
      "physics.groundFrictionHint": "par seconde, att\xE9nuation de la vitesse le long de toute surface touch\xE9e (mur, sol, plafond) ; 0 = verglas partout",
      "physics.throwPower": "Force de lancer",
      "physics.throwPowerHint": "> 0, multiplicateur global du suivi ressort et de la vitesse de lancer (1 = valeur par d\xE9faut ; plus haut = suivi plus ferme et lancers plus violents)",
      physicsCeilingBounce: "Rebond au plafond",
      physicsCeilingBounceHint: "D\xE9sactiv\xE9, un lancer peut sortir par le haut de l'\xE9cran (la gravit\xE9 le ram\xE8ne)",
      physicsPetCollision: "Collisions entre compagnons",
      physicsPetCollisionHint: "Un compagnon en vol rebondit sur les autres en conservant la quantit\xE9 de mouvement (masse \u221D taille\xB2)",
      physicsHaptic: "Vibration aux collisions",
      physicsHapticHint: "Une vibration par impact (murs, sol, plafond, autres compagnons). Fonctionne dans Chrome/Edge ; pas sur iOS ni dans les coques WebView comme Via. Le mode Ne pas d\xE9ranger la bloque.",
      physicsTilt: "Gravit\xE9 par inclinaison",
      physicsTiltHint: "Inclinez le t\xE9l\xE9phone : la gravit\xE9 suit (valeur = celle ci-dessus) ; avec une gravit\xE9 \xE0 0, l\u2019inclinaison n\u2019a aucun effet. N\xE9cessite HTTPS/localhost.",
      physicsShake: "Secouer pour lancer",
      physicsShakeHint: "Secouez pour lancer le compagnon dans le sens du geste ; la force suit throwPower. Ind\xE9pendant de la gravit\xE9, donc utilisable \xE0 gravit\xE9 0. N\xE9cessite HTTPS/localhost.",
      invalidPhysics: "V\xE9rifiez les param\xE8tres physiques : gravit\xE9 / frottement au sol \u2265 0, rebond entre 0 et 1, force de lancer > 0.",
      fontTitle: "Apparence et police",
      fontHint: "La famille s'applique partout o\xF9 la police bonbon est utilis\xE9e : bulle du compagnon, infobulle, fen\xEAtre de discussion, fen\xEAtre de score ; la taille ne concerne que la bulle et l'infobulle (les fen\xEAtres de discussion et de score gardent la leur). Valeurs globales par d\xE9faut, partag\xE9es par tous les compagnons (un pet pack peut les remplacer dans son propre fichier de type) ; \xE9crites dans la configuration utilisateur lors de l'enregistrement \u2014 imm\xE9diat dans le navigateur, et sur le bureau apr\xE8s rechargement des fen\xEAtres par l'enregistrement.",
      fontFamilyLabel: "Police",
      fontFamilyHint: "\xAB Bonbon (int\xE9gr\xE9e) \xBB est fournie avec le plugin ; les autres sont des polices syst\xE8me. Si une police manque sur la machine, la pile passe \xE0 la suivante (jamais de vide ni d'erreur).",
      fontSizeLabel: "Taille de police (px)",
      fontSizeHint: "Taille du texte des bulles ; l'infobulle et les petites lignes de la bulle suivent proportionnellement. Plage 4 \xE0 200.",
      fontFollowToggle: "Mettre la police \xE0 l'\xE9chelle du compagnon",
      fontFollowToggleHint: "Activ\xE9 (par d\xE9faut) : la police grandit avec le compagnon \u2014 \xE0 462 px de largeur, elle correspond exactement \xE0 la taille ci-dessus. D\xE9sactiv\xE9 : la taille reste fixe quelle que soit la taille du compagnon.",
      invalidFont: "V\xE9rifiez les r\xE9glages de police : la famille doit figurer dans la liste et la taille doit \xEAtre un nombre entre 4 et 200.",
      "font.candy": "Bonbon (int\xE9gr\xE9e)",
      "font.yahei": "Microsoft YaHei / PingFang",
      "font.youyuan": "YouYuan",
      "font.kaiti": "KaiTi",
      "font.simsun": "SimSun",
      "font.comic": "Comic Sans MS",
      "font.system": "Police syst\xE8me",
      modelTitle: "Discussion et mod\xE8les",
      modelHint: "Quel mod\xE8le utilisent les murmures et la discussion, et combien d'historique chaque requ\xEAte transporte. \xAB Suivre la conversation actuelle \xBB utilise le mod\xE8le de votre conversation en cours (par d\xE9faut). Valeur globale par d\xE9faut : s'applique \xE0 tous les compagnons, et un pet pack peut la remplacer dans son propre fichier de type. Les options viennent de la m\xEAme source que le s\xE9lecteur de mod\xE8les de DSH, fournies en direct par l'h\xF4te.",
      modelFollow: "Suivre la conversation actuelle",
      modelSearch: "Rechercher un mod\xE8le\u2026",
      modelEmpty: "Aucun mod\xE8le correspondant.",
      modelNoModels: "Aucun mod\xE8le disponible.",
      modelLoading: "Actualisation de la liste des mod\xE8les\u2026",
      modelTriggerAria: "Choisir un mod\xE8le, actuellement {model}",
      modelUnknown: " (configuration actuelle, absent de la liste)",
      modelNone: "Aucun mod\xE8le disponible pour ce fournisseur",
      whisperModelLabel: "Mod\xE8le des murmures",
      chatModelLabel: "Mod\xE8le de discussion",
      modelFieldHint: "\xAB Suivre la conversation actuelle \xBB utilise le mod\xE8le de la conversation ; si un mod\xE8le choisi \xE9choue, le plugin revient au mod\xE8le de la conversation et r\xE9essaie une fois.",
      invalidModel: "V\xE9rifiez les r\xE9glages de mod\xE8le : choisissez \xE0 la fois un fournisseur et un mod\xE8le, ou laissez les deux vides (suivre la conversation actuelle).",
      modelCatalogFailed: "\xC9chec du chargement de la liste des mod\xE8les (rafra\xEEchissez la page pour r\xE9essayer) ; vos valeurs actuelles sont conserv\xE9es telles quelles.",
      chatMemory: "Tours d'historique de discussion",
      chatMemoryHint: "Nombre de tours r\xE9cents transport\xE9s par chaque requ\xEAte de discussion (1 tour = 1 question + 1 r\xE9ponse ; 0 = aucun historique, chaque message repart de z\xE9ro). La m\xE9moire elle-m\xEAme conserve tout \u2014 cette valeur d\xE9cide seulement de ce qui entre dans le contexte : plus elle est \xE9lev\xE9e, plus le compagnon se souvient, et plus cela co\xFBte de tokens. Valeur globale par d\xE9faut, partag\xE9e par tous les compagnons (un pet pack peut la remplacer dans son propre fichier de type).",
      invalidChatMemory: "V\xE9rifiez les tours d'historique : il faut un nombre \u2265 0.",
      chatImageLimit: "Limite d'images de discussion",
      chatImageLimitHint: "Nombre maximal de m\xE8mes propos\xE9s au mod\xE8le pendant la discussion (\xAB N premiers \xBB = les N premi\xE8res entr\xE9es de la configuration ; d\xE9placez en t\xEAte celles que vous voulez voir partir en priorit\xE9). Toute la liste est jointe \xE0 chaque message et les tokens croissent lin\xE9airement avec le nombre, donc une longue liste co\xFBte cher ; la limiter aux N premi\xE8res restreint le choix du mod\xE8le \xE0 celles-l\xE0. 0 = aucune limite (tout envoyer). Valeur int\xE9gr\xE9e par d\xE9faut : 10. Valeur globale par d\xE9faut, partag\xE9e par tous les compagnons (un pet pack peut la remplacer dans son propre fichier de type). Discussion uniquement \u2014 un murmure ne porte que le m\xE8me tir\xE9.",
      invalidChatImageLimit: "V\xE9rifiez la limite d'images de discussion : il faut un nombre \u2265 0 (0 = aucune limite).",
      notifyTest: "Tester la notification",
      notifyTestOk: "Notification de test envoy\xE9e \u2014 regardez en bas \xE0 droite de votre bureau.",
      notifyDenyUnsupported: "Les notifications syst\xE8me ne sont pas prises en charge dans cet environnement (pas d'API Notification).",
      notifyDenyBlocked: "L'autorisation de notification est bloqu\xE9e par le navigateur.",
      notifyDenyRejected: "Vous avez choisi \xAB Bloquer \xBB dans la demande d'autorisation.",
      notifyDenyError: "\xC9chec de la demande d'autorisation",
      notifyGuide: "Marche \xE0 suivre : cliquez sur l'ic\xF4ne \u{1F512}/\u24D8 \xE0 gauche de la barre d'adresse \u2192 \xAB Param\xE8tres du site \xBB \u2192 \xAB Notifications \xBB \u2192 choisissez \xAB Autoriser \xBB, puis rafra\xEEchissez la page et r\xE9essayez.",
      storageTitle: "D\xE9sinstallation et stockage",
      storageHint: "Tous les emplacements o\xF9 ce plugin \xE9crit sur la machine. Supprimer les caches est sans risque (ils sont ret\xE9l\xE9charg\xE9s / reconstruits) ; supprimer les \xAB donn\xE9es utilisateur du plugin \xBB fait perdre la configuration et la m\xE9moire de discussion.",
      "storage.userData": "Donn\xE9es utilisateur du plugin : configuration personnalis\xE9e main-config.jsonc, m\xE9moire de discussion memory.json, animations personnalis\xE9es main-animation/, compagnons fichiers pet/",
      "storage.electron": "Runtime Electron du compagnon de bureau (volumineux ; ret\xE9l\xE9charg\xE9 automatiquement au prochain d\xE9marrage du mode bureau)",
      "storage.desktopCache": "Cache des fen\xEAtres de compagnons et cache d'\xE9chelle de l'\xE9cran principal (suppression sans risque, reconstruit automatiquement)",
      "storage.electronCache": "Cache de t\xE9l\xE9chargement de l'installateur Electron (suppression sans risque, ret\xE9l\xE9charg\xE9 si besoin)",
      "storage.package": "Le plugin lui-m\xEAme (g\xE9r\xE9 par DSH \u2014 retirez-le avec la commande ci-dessous plut\xF4t que de le supprimer \xE0 la main)",
      storageMissing: " (pas encore cr\xE9\xE9)",
      uninstallTitle: "Comment d\xE9sinstaller",
      uninstallStep1: "1. Quittez d'abord DSH (le compagnon de bureau s'arr\xEAte avec lui) ; ne supprimez pas ces fichiers pendant que le compagnon tourne.",
      uninstallStep2: "2. Retirez le plugin lui-m\xEAme (dans un terminal ; il est aussi retir\xE9 de la couche bundle du profil) :",
      uninstallStep3: "3. Supprimez les emplacements ci-dessus selon vos besoins : les caches sont sans risque ; supprimer les \xAB donn\xE9es utilisateur du plugin \xBB fait perdre la configuration et la m\xE9moire de discussion (sauvegardez main-config.jsonc si vous voulez le garder).",
      motionTitle: "Fr\xE9quence des actions",
      motionHint: "Quatre champs : repos / rotation / d\xE9placement sont modifiables ; l'action al\xE9atoire est calcul\xE9e (100 \u2212 les trois autres). Valeur globale pour tous les compagnons ; un pet pack peut la remplacer dans son fichier de type.",
      "motion.idle": "Repos",
      "motion.turn": "Rotation",
      "motion.move": "D\xE9placement",
      "motion.action": "Action al\xE9atoire",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/ja.ts
var ja;
var init_ja = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/ja.ts"() {
    ja = {
      nav: "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30DA\u30C3\u30C8\u8A2D\u5B9A",
      intro: "\u8907\u6570\u306E\u30DA\u30C3\u30C8\u3092\u7BA1\u7406\u3067\u304D\u307E\u3059\u3002\u30DA\u30C3\u30C8\u3054\u3068\u306B\u30B5\u30A4\u30BA\u3068\u4F4D\u7F6E\u3092\u500B\u5225\u306B\u8A2D\u5B9A\u3067\u304D\u307E\u3059\uFF08\u4FDD\u5B58\u3059\u308B\u3068\u3059\u3050\u306B\u53CD\u6620\u3055\u308C\u307E\u3059\uFF09\u3002",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "\u30DA\u30C3\u30C8\u306E\u8A2D\u5B9A",
      avatarLabel: "\u30A2\u30D0\u30BF\u30FC",
      avatarHint: "\u30C1\u30E3\u30C3\u30C8\u30D1\u30CD\u30EB\u3067\u3053\u306E\u30DA\u30C3\u30C8\u306E\u767A\u8A00\u306E\u6A2A\u306B\u8868\u793A\u3055\u308C\u308B\u5C0F\u3055\u306A\u753B\u50CF\u3067\u3059\u3002\u672A\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u306A\u3089\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u65E2\u5B9A\u753B\u50CF\u304C\u4F7F\u308F\u308C\u307E\u3059\u3002\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u306F\u3059\u3050\u53CD\u6620\u3055\u308C\u3001\u4EE5\u524D\u306E\u753B\u50CF\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\uFF08\u300C\u4FDD\u5B58\u300D\u3092\u62BC\u3059\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\uFF09\u3002",
      avatarUpload: "\u30A2\u30D0\u30BF\u30FC\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
      avatarChange: "\u5909\u66F4",
      avatarUploading: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D\u2026",
      avatarUploaded: "\u30A2\u30D0\u30BF\u30FC\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F",
      petCardHint: "\u30DA\u30C3\u30C8\u3054\u3068\u306B\u500B\u5225\u8A2D\u5B9A\u3057\u307E\u3059\uFF1A\u540D\u524D / \u30B5\u30A4\u30BA / \u8868\u793A\u4F4D\u7F6E / \u4F4D\u7F6E / \u30AA\u30D5\u30BB\u30C3\u30C8 / 4\u3064\u306E\u6A5F\u80FD\u30B9\u30A4\u30C3\u30C1\u3002\u8A2D\u5B9A\u5F8C\u3001\u6700\u4E0B\u90E8\u306E\u300C\u4FDD\u5B58\u300D\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u3059\u3050\u306B\u53CD\u6620\u3055\u308C\u307E\u3059\u3002",
      globalTitle: "\u30B0\u30ED\u30FC\u30D0\u30EB\u30B9\u30A4\u30C3\u30C1",
      globalHint: "\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u306B\u5171\u901A\u3067\u3059\uFF08pet pack \u306F\u81EA\u8EAB\u306E\u7A2E\u985E\u30D5\u30A1\u30A4\u30EB\u3067\u500B\u5225\u306B\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\uFF09\u3002\u3053\u308C\u3089\u306E\u30B9\u30A4\u30C3\u30C1\u306F\u30ED\u30FC\u30AB\u30EB\u72B6\u614B\u306E\u307F\u3092\u5909\u66F4\u3057\u3001\u300C\u4FDD\u5B58\u300D\u6642\u306B\u307E\u3068\u3081\u3066\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u3078\u66F8\u304D\u8FBC\u307F\u307E\u3059\uFF08\u5373\u6642\u66F8\u304D\u8FBC\u307F\u306F\u3057\u307E\u305B\u3093\uFF09\u3002\u30B7\u30B9\u30C6\u30E0\u901A\u77E5\u306E\u8A2D\u5B9A\u306F\u4FDD\u5B58\u5F8C\u3059\u3050\u306B\u518D\u8AAD\u307F\u8FBC\u307F\u3055\u308C\u3001\u30DA\u30FC\u30B8\u306E\u66F4\u65B0\u306F\u4E0D\u8981\u3067\u3059\u3002",
      cornerHint: "\u30DA\u30C3\u30C8\u304C\u753B\u9762\u306E\u3069\u306E\u9685\u306B\u8CBC\u308A\u4ED8\u304F\u304B\u3092\u6307\u5B9A\u3057\u307E\u3059\uFF08\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u3067\u306F\u5404\u30C7\u30A3\u30B9\u30D7\u30EC\u30A4\u306E\u30EF\u30FC\u30AF\u30A8\u30EA\u30A2\u57FA\u6E96\uFF09\u3002",
      marginXHint: "\u9078\u629E\u3057\u305F\u9685\u304B\u3089\u306E\u6C34\u5E73\u8DDD\u96E2\uFF08px\uFF09\u3002\u4EFB\u610F\u306E\u6570\u5024\u304C\u4F7F\u3048\u307E\u3059\u3002",
      marginYHint: "\u9078\u629E\u3057\u305F\u9685\u304B\u3089\u306E\u5782\u76F4\u8DDD\u96E2\uFF08px\uFF09\u3002\u4EFB\u610F\u306E\u6570\u5024\u304C\u4F7F\u3048\u307E\u3059\u3002",
      // 「/」命令菜单的行标题（图标由 app.ts 经 command-faces.ts 补上）。
      "cmd.chat": "\u30C1\u30E3\u30C3\u30C8",
      "cmd.pet": "\u30DA\u30C3\u30C8",
      "cmd.balance": "\u6B8B\u9AD8",
      "shortcut.open": "\u30DA\u30C3\u30C8\u4F1A\u8A71\u3092\u958B\u304F",
      "shortcut.chat": "\u4F1A\u8A71\u30A6\u30A3\u30F3\u30C9\u30A6\u3092\u958B\u304F",
      "shortcut.hear": "\u97F3\u58F0\u5165\u529B",
      "shortcut.capture": "\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8\u3092\u4F1A\u8A71\u3078",
      shortcutCardTitle: "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
      shortcutCardHint: "\u958B\u304F\u3068 2 \u30B0\u30EB\u30FC\u30D7\u306B\u5206\u304B\u308C\u307E\u3059\uFF1A\u30DA\u30C3\u30C8\u306E\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u3068\u30B0\u30ED\u30FC\u30D0\u30EB\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u3002",
      shortcutRowChat: "\u4F1A\u8A71\u3092\u958B\u304F",
      shortcutRowHold: "\u62BC\u3057\u3066\u8A71\u3059",
      shortcutRowHear: "\u97F3\u58F0\u5165\u529B",
      shortcutRowCapture: "\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8",
      shortcutRowPaste: "\u753B\u50CF\u3092\u8CBC\u308A\u4ED8\u3051",
      shortcutRowTodo: "ToDo",
      shortcutRowSleep: "\u5BDD\u308B / \u8D77\u304D\u308B",
      shortcutRowDisplay: "\u8868\u793A\u4F4D\u7F6E",
      shortcutRowSidebar: "\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u4F1A\u8A71\u3092\u958B\u304F",
      shortcutGroupPet: "\u30DA\u30C3\u30C8\u306E\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
      shortcutGroupPetHint: "Web \u306F\u30DD\u30A4\u30F3\u30BF\u3092\u30DA\u30C3\u30C8\u306B\u5408\u308F\u305B\u308B\u3060\u3051\u3002\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30DA\u30C3\u30C8\u306E\u30A6\u30A3\u30F3\u30C9\u30A6\u306F\u3001\u5148\u306B\u30DA\u30C3\u30C8\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30AD\u30FC\u30DC\u30FC\u30C9\u30D5\u30A9\u30FC\u30AB\u30B9\u3092\u79FB\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      shortcutGroupGlobal: "\u30B0\u30ED\u30FC\u30D0\u30EB\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
      shortcutGroupGlobalHint: "Web \u3068\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u7248\u306E\u30A6\u30A3\u30F3\u30C9\u30A6\u3067\u306F DSH \u304C\u632F\u308A\u5206\u3051\u307E\u3059\u3002\u8A2D\u5B9A \u2192 \u4E00\u822C \u2192 \u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u3067\u5909\u66F4\u3067\u304D\u307E\u3059\u3002",
      petsLabel: "\u30DA\u30C3\u30C8\u4E00\u89A7",
      add: "\u30DA\u30C3\u30C8\u3092\u8FFD\u52A0",
      remove: "\u524A\u9664",
      confirmRemove: "\u30DA\u30C3\u30C8\u300C{id}\u300D\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",
      confirmTitle: "\u64CD\u4F5C\u306E\u78BA\u8A8D",
      cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
      ok: "\u4E86\u89E3",
      atLeastOne: "\u30DA\u30C3\u30C8\u306F\u5C11\u306A\u304F\u3068\u30821\u5339\u5FC5\u8981\u3067\u3059\u3002",
      emptyPets: "\u30DA\u30C3\u30C8\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u300C\u30DA\u30C3\u30C8\u3092\u8FFD\u52A0\u300D\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u4F5C\u6210\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      sizeLabel: "\u30B5\u30A4\u30BA\uFF08\u5E45 px\uFF09",
      sizeHint: "\u9AD8\u3055\u306F\u81EA\u52D5 = \u5E45 \xD7 9/16\u3002",
      sizePercentLabel: "\u753B\u9762\u5E45\u306E\u4E0A\u9650\uFF08%\uFF09",
      sizePercentHint: "\u30DA\u30C3\u30C8\u304C\u753B\u9762\u5E45\u306E\u3069\u308C\u3060\u3051\u3092\u5360\u3081\u308B\u304B\u306E\u4E0A\u9650\u3067\u3059\u3002100 = \u753B\u9762\u5E45\u3092\u8D85\u3048\u306A\u3044\uFF08\u5E83\u3044\u30A6\u30A3\u30F3\u30C9\u30A6\u3067\u306F px \u3068\u5B8C\u5168\u306B\u540C\u3058\uFF09\uFF1B30\u201340 \u306B\u3059\u308B\u3068 PC \u306F\u305D\u306E\u307E\u307E\u306B\u30B9\u30DE\u30DB\u3067\u660E\u78BA\u306B\u5C0F\u3055\u304F\u306A\u308A\u307E\u3059\u3002\u8AAD\u307F\u8FBC\u307F\u6642\u306B\u4E00\u5EA6\u3060\u3051\u8A08\u7B97\u3055\u308C\u308B\u306E\u3067\u3001\u30A6\u30A3\u30F3\u30C9\u30A6\u30B5\u30A4\u30BA\u3092\u5909\u3048\u305F\u3089\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      nameLabel: "\u540D\u524D",
      nameHint: "\u8868\u793A\u540D\uFF1A\u30DA\u30C3\u30C8\u306B\u30DE\u30A6\u30B9\u3092\u91CD\u306D\u308B\u3068\u8868\u793A\u3055\u308C\u3001AI \u306E\u30DA\u30EB\u30BD\u30CA\u306B\u3082\u8FFD\u52A0\u3055\u308C\u307E\u3059\uFF08\u3042\u306A\u305F\u306E\u540D\u524D\u306F X\uFF09\u3002\u91CD\u8907\u3082\u53EF\u80FD\u3067\u3059\u3002\u7A7A\u6B04\u306E\u5834\u5408\u306F\u30DA\u30C3\u30C8 id \u304C\u4F7F\u308F\u308C\u307E\u3059\u3002",
      personaLabel: "\u30DA\u30EB\u30BD\u30CA\uFF08\u4EFB\u610F\uFF09",
      personaHint: "\u3053\u306E\u30DA\u30C3\u30C8\u3060\u3051\u306B\u9069\u7528\u3055\u308C\u307E\u3059\u3002\u7A7A\u6B04 = \u6240\u5C5E\u3059\u308B\u30A8\u30F3\u30C8\u30EA\u306E\u30DA\u30EB\u30BD\u30CA\u306B\u5F93\u3044\u307E\u3059\uFF08\u5165\u529B\u6B04\u306E\u30B0\u30EC\u30FC\u306E\u6587\u5B57\u304C\u305D\u306E\u5185\u5BB9\u3067\u3059\uFF09\u3002\u5B9F\u969B\u306B\u30E2\u30C7\u30EB\u3078\u9001\u308B system = \u3053\u306E\u30C6\u30AD\u30B9\u30C8 + \u81EA\u52D5\u8FFD\u52A0\u3055\u308C\u308B\u300C\u3042\u306A\u305F\u306E\u540D\u524D\u306F\u201C<\u540D\u524D>\u201D\u300D+ \u73FE\u5728\u6642\u523B\u306E\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u3002\u3053\u3053\u306B\u540D\u524D\u3084\u65E5\u4ED8\u3092\u518D\u5EA6\u66F8\u304B\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002",
      personaCount: "{n} \u6587\u5B57",
      balanceEnabled: "\u6B8B\u9AD8\u6A5F\u80FD",
      balanceEnabledHint: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u3053\u306E\u30DA\u30C3\u30C8\u304C\u6B8B\u9AD8\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3092\u518D\u751F\u3057\u3001\u6B8B\u9AD8\u30D0\u30D6\u30EB\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
      whisperEnabled: "\u3072\u3068\u308A\u3054\u3068",
      whisperEnabledHint: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u3053\u306E\u30DA\u30C3\u30C8\u304C\u5B9A\u671F\u7684\u306B AI \u3067\u4E00\u8A00\u3092\u751F\u6210\u3057\u3001\u3072\u3068\u308A\u3054\u3068\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3092\u518D\u751F\u3057\u307E\u3059\uFF08\u30DA\u30EB\u30BD\u30CA\u306F\u4E0B\u306E\u300C\u30DA\u30EB\u30BD\u30CA\u300D\u6B04\u3002\u7A7A\u6B04\u306A\u3089\u30A8\u30F3\u30C8\u30EA\u306B\u5F93\u3044\u307E\u3059\uFF09\u3002",
      workStatusEnabled: "\u4F5C\u696D\u72B6\u614B\u306E\u9023\u52D5",
      workStatusEnabledHint: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u3053\u306E\u30DA\u30C3\u30C8\u304C DSH \u306E\u4F5C\u696D\u72B6\u614B\u306B\u8FFD\u5F93\u3057\u307E\u3059\uFF1A\u601D\u8003\u4E2D / \u4F5C\u696D\u4E2D / \u78BA\u8A8D\u5F85\u3061 / \u5B8C\u4E86 / \u30A8\u30E9\u30FC\u6642\u306B\u3001\u5BFE\u5FDC\u3059\u308B\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3078\u5207\u308A\u66FF\u3048\u3066\u30D0\u30D6\u30EB\u3092\u8868\u793A\u3057\u307E\u3059\uFF08\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u30D7\u30FC\u30EB\u306F\u8A2D\u5B9A\u306E\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB\u3002\u76E3\u8996\u306E\u307F\u3067\u30E2\u30C7\u30EB\u306F\u547C\u3073\u51FA\u3057\u307E\u305B\u3093\uFF09\u3002",
      fixedEnabled: "\u30DA\u30C3\u30C8\u3092\u56FA\u5B9A",
      fixedEnabledHint: "\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u30E9\u30F3\u30C0\u30E0\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3067\u30DA\u30C3\u30C8\u304C\u65B9\u5411\u8EE2\u63DB\u3057\u305F\u308A\u6B69\u304D\u53BB\u3063\u305F\u308A\u3057\u306A\u304F\u306A\u308A\u3001\u305D\u306E\u5834\u306E\u5F85\u6A5F\u3068\u30E9\u30F3\u30C0\u30E0\u306A\u5C0F\u3055\u306A\u52D5\u4F5C\u3060\u3051\u3092\u518D\u751F\u3057\u307E\u3059\u3002\u53F3\u30AF\u30EA\u30C3\u30AF\u30E1\u30CB\u30E5\u30FC\u304B\u3089\u306E\u518D\u751F\u3001API \u30C8\u30EA\u30AC\u30FC\u3001\u6B8B\u9AD8 / \u3072\u3068\u308A\u3054\u3068 / \u4F5C\u696D\u72B6\u614B\u306E\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u306B\u306F\u5F71\u97FF\u3057\u307E\u305B\u3093\u3002",
      displayLabel: "\u8868\u793A\u4F4D\u7F6E",
      displayHint: "web=\u30D6\u30E9\u30A6\u30B6\u306E\u307F / desktop=\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u306E\u307F / both=\u4E21\u65B9 / none=\u3069\u3061\u3089\u3082\u975E\u8868\u793A",
      "display.web": "\u30D6\u30E9\u30A6\u30B6\u306E\u307F",
      "display.desktop": "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u306E\u307F",
      "display.both": "\u4E21\u65B9\u306B\u8868\u793A",
      "display.none": "\u3069\u3061\u3089\u3082\u975E\u8868\u793A",
      cornerLabel: "\u4F4D\u7F6E",
      "corner.top-left": "\u5DE6\u4E0A",
      "corner.top-right": "\u53F3\u4E0A",
      "corner.bottom-left": "\u5DE6\u4E0B",
      "corner.bottom-right": "\u53F3\u4E0B",
      marginX: "\u6C34\u5E73\u30AA\u30D5\u30BB\u30C3\u30C8",
      marginY: "\u5782\u76F4\u30AA\u30D5\u30BB\u30C3\u30C8",
      save: "\u4FDD\u5B58",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "\u540C\u671F",
      confirmSync: "\u540C\u671F\u3057\u307E\u3059\u304B\uFF1F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u5185\u8535\u306E\u30C7\u30D5\u30A9\u30EB\u30C8\u8A2D\u5B9A\uFF08\u5168\u30D5\u30A3\u30FC\u30EB\u30C9 + \u30B3\u30E1\u30F3\u30C8\uFF09\u3067\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u3092\u4E0A\u66F8\u304D\u3059\u308B\u305F\u3081\u3001\u73FE\u5728\u306E\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA\u5185\u5BB9\u306F\u5931\u308F\u308C\u307E\u3059\u3002",
      corruptTitle: "\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u304C\u7834\u640D\u3057\u3066\u3044\u308B\u305F\u3081\u4FDD\u5B58\u3055\u308C\u307E\u305B\u3093\u3067\u3057\u305F",
      corruptConfirm: "\u5F37\u5236\u4FDD\u5B58",
      corruptBody: "\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3092\u89E3\u6790\u3067\u304D\u307E\u305B\u3093\uFF08\u5185\u5BB9\u304C\u7834\u640D\u3057\u3066\u304A\u308A\u3001\u6B63\u3057\u3044 JSON/JSONC \u3067\u306F\u3042\u308A\u307E\u305B\u3093\uFF09\uFF1A{path}\u3002\u4FDD\u5B58\u3092\u7D9A\u3051\u308B\u3068\u30DB\u30EF\u30A4\u30C8\u30EA\u30B9\u30C8\u306B\u5F93\u3063\u3066\u3053\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u518D\u69CB\u7BC9\u3057\u307E\u3059\u2014\u2014\u73FE\u5728\u3053\u306E\u30D5\u30A1\u30A4\u30EB\u306B\u3042\u308B\u5185\u5BB9\uFF08animations / physics / memes \u306A\u3069\u306E\u30AB\u30B9\u30BF\u30E0\u30D5\u30A3\u30FC\u30EB\u30C9\uFF09\u306F\u3059\u3079\u3066\u5931\u308F\u308C\u307E\u3059\u3002\u30AD\u30E3\u30F3\u30BB\u30EB = \u30D5\u30A1\u30A4\u30EB\u3092\u5909\u66F4\u3057\u306A\u3044\uFF08\u8A2D\u5B9A\u3092\u6B63\u3057\u3044\u5F62\u5F0F\u306B\u623B\u3057\u3066\u304B\u3089\u4FDD\u5B58\uFF09\uFF1B\u78BA\u8A8D = \u5F37\u5236\u4FDD\u5B58\uFF08\u30D5\u30A1\u30A4\u30EB\u5185\u306E\u65E2\u5B58\u5185\u5BB9\u3092\u7834\u68C4\uFF09\u3002",
      syncHint: "\u300C\u540C\u671F\u300D\u306F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u5185\u8535\u306E\u30C7\u30D5\u30A9\u30EB\u30C8\u8A2D\u5B9A\uFF08\u30B3\u30E1\u30F3\u30C8\u3068\u3059\u3079\u3066\u306E\u9AD8\u5EA6\u306A\u30D5\u30A3\u30FC\u30EB\u30C9\u3092\u542B\u3080\uFF09\u3092\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3078\u66F8\u304D\u8FBC\u307F\u3001\u73FE\u5728\u306E\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA\u5185\u5BB9\u3092\u4E0A\u66F8\u304D\u3057\u307E\u3059\u3002\u305D\u306E\u5F8C\u306F\u3053\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u76F4\u63A5\u7DE8\u96C6\u3067\u304D\u307E\u3059\u3002\u6CE8\u610F\u70B9\u304C2\u3064\u3042\u308A\u307E\u3059\uFF1A\u2460 \u30D5\u30A1\u30A4\u30EB\u304C\u4E00\u5EA6\u751F\u6210\u3055\u308C\u308B\u3068\u660E\u793A\u7684\u306A\u4E0A\u66F8\u304D\u30EC\u30A4\u30E4\u30FC\u306B\u306A\u308B\u305F\u3081\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u66F4\u65B0\u5F8C\u306E\u5185\u8535\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u5909\u66F4\u306F\u81EA\u52D5\u3067\u306F\u53CD\u6620\u3055\u308C\u307E\u305B\u3093\uFF08\u518D\u5EA6\u540C\u671F\u3059\u308B\u304B\u3001\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3059\u308B\u307E\u3067\uFF09\u3002\u2461 \u3053\u306E\u30DA\u30FC\u30B8\u3067\u300C\u4FDD\u5B58\u300D\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u3001\u30DB\u30EF\u30A4\u30C8\u30EA\u30B9\u30C8\u306B\u5F93\u3063\u3066\u30D5\u30A1\u30A4\u30EB\u304C\u66F8\u304D\u63DB\u3048\u3089\u308C\u307E\u3059\uFF08\u30D5\u30A3\u30FC\u30EB\u30C9\u5024\u306F\u4FDD\u6301\u3055\u308C\u307E\u3059\u304C\u3001\u30B3\u30E1\u30F3\u30C8\u306F\u524A\u9664\u3055\u308C\u307E\u3059\uFF09\u3002",
      configMeta: "\u8A73\u7D30\u8A2D\u5B9A\uFF08\u30D5\u30A1\u30A4\u30EB\uFF09",
      configMetaHint: "\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u306F\u30DA\u30C3\u30C8\u4E00\u89A7 / \u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u30D7\u30FC\u30EB / \u518D\u751F\u30A6\u30A7\u30A4\u30C8\u3092\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\u3002\u5909\u66F4\u5F8C\u306F\u66F4\u65B0\u307E\u305F\u306F\u518D\u8D77\u52D5\u3067\u53CD\u6620\u3055\u308C\u307E\u3059\uFF1A\u30D6\u30E9\u30A6\u30B6\u3067\u306F\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3001\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u3067\u306F\u30DA\u30C3\u30C8\u3092\u53F3\u30AF\u30EA\u30C3\u30AF \u2192\u300C\u8A2D\u5B9A\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u300D\uFF08\u3059\u3079\u3066\u306E\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30DA\u30C3\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6\u3092\u518D\u8AAD\u307F\u8FBC\u307F\uFF09\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u8A2D\u5B9A\u304C\u5B8C\u5168\u306A\u30EA\u30D5\u30A1\u30EC\u30F3\u30B9\u3067\u3059\u3002",
      defaultConfig: "\u30C7\u30D5\u30A9\u30EB\u30C8\u8A2D\u5B9A\uFF08\u8AAD\u307F\u53D6\u308A\u5C02\u7528\u3001\u5B8C\u5168\u306A\u30EA\u30D5\u30A1\u30EC\u30F3\u30B9\uFF09",
      userConfig: "\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\uFF08\u30AB\u30B9\u30BF\u30E0\u4E0A\u66F8\u304D\uFF09",
      todosFile: "ToDo \u30C7\u30FC\u30BF\uFF08\u30EA\u30B9\u30C8\u306E\u5185\u5BB9\u3001\u671F\u9650\u3001\u5B8C\u4E86\u72B6\u614B\u3002\u524A\u9664\u3059\u308B\u3068 ToDo \u304C\u3059\u3079\u3066\u6D88\u3048\u307E\u3059\uFF09",
      animationDir: "\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u7D20\u6750\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\uFF08\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3092\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA / \u8FFD\u52A0\u3067\u304D\u307E\u3059\uFF09",
      memesDir: "\u30DF\u30FC\u30E0\u753B\u50CF\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\uFF08\u753B\u50CF\u3092\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA / \u8FFD\u52A0\u3067\u304D\u307E\u3059\uFF09",
      logFile: "\u30ED\u30B0\u30D5\u30A1\u30A4\u30EB\uFF08\u30C8\u30E9\u30D6\u30EB\u30B7\u30E5\u30FC\u30C6\u30A3\u30F3\u30B0\u7528\u3002\u6D88\u53BB\u3057\u3066\u3082\u554F\u984C\u3042\u308A\u307E\u305B\u3093\uFF09",
      logFileNote: "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u7248\u306B\u306F\u30B3\u30F3\u30BD\u30FC\u30EB\u304C\u306A\u3044\u305F\u3081\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u5B9F\u884C\u30ED\u30B0\uFF08\u8D77\u52D5\u3001\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30DA\u30C3\u30C8\u306E\u30AF\u30E9\u30C3\u30B7\u30E5 / \u518D\u8D77\u52D5\u3001\u30A8\u30E9\u30FC\u3068\u8B66\u544A\uFF09\u306F\u3059\u3079\u3066\u3053\u306E1\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u306B\u66F8\u304D\u8FBC\u307E\u308C\u307E\u3059\u3002\u554F\u984C\u3092\u5831\u544A\u3059\u308B\u969B\u306F\u3053\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u6DFB\u4ED8\u3057\u3066\u304F\u3060\u3055\u3044\u30021\u30D5\u30A1\u30A4\u30EB\u3042\u305F\u308A\u6700\u5927 1 MB \u3067\u3001\u3044\u3063\u3071\u3044\u306B\u306A\u308B\u3068\u6700\u65B0\u306E 512 KB \u3060\u3051\u304C\u6B8B\u308A\u307E\u3059\u3002",
      saved: "\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002\u30DA\u30C3\u30C8\u306B\u3059\u3050\u53CD\u6620\u3055\u308C\u307E\u3057\u305F\u3002",
      loadError: "\u8A2D\u5B9A\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
      saveError: "\u8A2D\u5B9A\u306E\u4FDD\u5B58\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30B5\u30FC\u30D0\u30FC\u63A5\u7D9A\u3001\u8A2D\u5B9A\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u66F8\u304D\u8FBC\u307F\u6A29\u9650\u3001\u30B5\u30FC\u30D0\u30FC\u30ED\u30B0\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      saveInvalid: "\u8A2D\u5B9A\u306E\u4FDD\u5B58\u306B\u5931\u6557\u3057\u307E\u3057\u305F\uFF1A\u8A2D\u5B9A\u5185\u5BB9\u304C\u7121\u52B9\u3067\u3059\u3002\u78BA\u8A8D\u3057\u3066\u304B\u3089\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      syncError: "\u8A2D\u5B9A\u306E\u540C\u671F\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30B5\u30FC\u30D0\u30FC\u63A5\u7D9A\u3068\u8A2D\u5B9A\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u66F8\u304D\u8FBC\u307F\u6A29\u9650\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      loading: "\u8A2D\u5B9A\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026",
      retry: "\u518D\u8A66\u884C",
      invalid: "\u5165\u529B\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF1A\u30B5\u30A4\u30BA\u306F\u6B63\u306E\u6570\u3001\u4F59\u767D\u306F\u4EFB\u610F\u306E\u6570\u5024\u3067\u3059\u3002",
      busy: "\u4FDD\u5B58\u4E2D\u2026",
      extraPetsHint: "\u307B\u304B\u306B {n} \u7A2E\u985E\u304C pet/ \u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u306E\u30D5\u30A1\u30A4\u30EB\uFF08<\u540D>-config.json + <\u540D>-animation/\uFF09\u304B\u3089\u8AAD\u307F\u8FBC\u307E\u308C\u307E\u3059\u3002\u4E0A\u306E\u300C\u7A2E\u985E\u300D\u30D0\u30FC\u3067\u5207\u308A\u66FF\u3048\u3066\u5909\u66F4\u3067\u304D\u307E\u3059\u3002\u4FDD\u5B58\u306F\u5404\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u30D1\u30C3\u30AF\u306E\u8A2D\u5B9A\u306B\u66F8\u304D\u623B\u3055\u308C\u3001main-config.jsonc \u306B\u306F\u6DF7\u3056\u308A\u307E\u305B\u3093\u3002",
      kindLabel: "\u7A2E\u985E",
      kindMain: "\u5185\u8535",
      lastOfKind: "\u300C{entry}\u300D\u306F\u3053\u306E1\u5339\u3060\u3051\u3067\u3059\u3002\u524A\u9664\u3059\u308B\u3068\u3053\u306E\u7A2E\u985E\u81EA\u4F53\u304C\u306A\u304F\u306A\u308A\u307E\u3059\u3002\u5B8C\u5168\u306B\u524A\u9664\u3059\u308B\u306B\u306F\u3001\u305D\u306E\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u30D1\u30C3\u30AF\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u76F4\u63A5\u524A\u9664\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      savePartial: "\u30E1\u30A4\u30F3\u30DA\u30C3\u30C8\u306F\u4FDD\u5B58\u3055\u308C\u307E\u3057\u305F\u304C\u3001{names} \u3092\u66F8\u304D\u623B\u305B\u307E\u305B\u3093\u3067\u3057\u305F\uFF1A\u305D\u306E\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u30D1\u30C3\u30AF\u306E\u8A2D\u5B9A\u304C\u6B63\u3057\u3044\u304B\u3001\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u304C\u66F8\u304D\u8FBC\u307F\u53EF\u80FD\u304B\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      notifyToggle: "\u30B7\u30B9\u30C6\u30E0\u901A\u77E5",
      notifyToggleHint: "\u4F1A\u8A71\u306E\u5B8C\u4E86 / \u751F\u6210\u5931\u6557 / \u6A29\u9650\u30EA\u30AF\u30A8\u30B9\u30C8 / \u30E6\u30FC\u30B6\u30FC\u3078\u306E\u78BA\u8A8D\u3092\u3001\u30A6\u30A3\u30F3\u30C9\u30A6\u304C\u975E\u30A2\u30AF\u30C6\u30A3\u30D6\u306E\u3068\u304D\u306B OS \u30EC\u30D9\u30EB\u306E\u901A\u77E5\uFF08\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u53F3\u4E0B\uFF09\u3067\u8868\u793A\u3057\u307E\u3059\u3002",
      clickSoundToggle: "\u30AF\u30EA\u30C3\u30AF\u97F3",
      clickSoundToggleHint: "\u30DA\u30C3\u30C8\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u5185\u8535\u306E\u52B9\u679C\u97F3\uFF08assets/sound/click-duck.wav\u3001\u97F3\u91CF 0.5\uFF09\u304C\u4E00\u5EA6\u9CF4\u308A\u307E\u3059\u3002100ms \u4EE5\u5185\u306E\u9023\u7D9A\u30AF\u30EA\u30C3\u30AF\u306F1\u56DE\u3060\u3051\u9CF4\u308A\u3001\u8907\u6570\u8D77\u52D5\u3057\u3066\u3082\u91CD\u306A\u308A\u307E\u305B\u3093\u3002\u30AA\u30D5\u306B\u3059\u308B\u3068\u5B8C\u5168\u306B\u7121\u97F3\u306B\u306A\u308A\u307E\u3059\u3002\u300C\u4FDD\u5B58\u300D\u3068\u4E00\u7DD2\u306B\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u3078\u66F8\u304D\u8FBC\u307E\u308C\u307E\u3059\u3002",
      whisperImageToggle: "\u3072\u3068\u308A\u3054\u3068\u306E\u753B\u50CF",
      whisperImageToggleHint: "\u3072\u3068\u308A\u3054\u3068\u306E\u3068\u304D\u3001\u30DF\u30FC\u30E0\u753B\u50CF\u30D7\u30FC\u30EB\u304B\u3089\u30E9\u30F3\u30C0\u30E0\u306B1\u679A\u3092\u9078\u3073\u3001\u305D\u306E\u4E00\u8A00\u3068\u4E00\u7DD2\u306B\u8868\u793A\u3057\u307E\u3059\uFF08\u753B\u50CF\u306E\u30DE\u30C3\u30D4\u30F3\u30B0\u306F\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB memes\uFF09\u3002\u30C8\u30FC\u30AF\u30F3\uFF1A\u3072\u3068\u308A\u3054\u3068\u306F\u5143\u3005\u6BCE\u56DE\u30E2\u30C7\u30EB\u3092\u547C\u3076\u306E\u3067\u3001\u9078\u3093\u3060\u753B\u50CF\u306E\u540D\u524D + \u8AAC\u660E\uFF08\u7D04100\u6587\u5B57 / \u224860\u30C8\u30FC\u30AF\u30F3\uFF09\u3092\u540C\u3058\u30EA\u30AF\u30A8\u30B9\u30C8\u306B\u52A0\u3048\u308B\u3060\u3051\u3067\u3001\u5897\u5206\u306F\u3054\u304F\u308F\u305A\u304B\u3067\u3059\u3002",
      chatImageToggle: "\u30C1\u30E3\u30C3\u30C8\u306E\u753B\u50CF",
      chatImageToggleHint: "\u30C1\u30E3\u30C3\u30C8\u6642\u3001AI \u304C\u73FE\u5728\u306E\u6587\u8108\u306B\u5408\u3046\u753B\u50CF\u3092\u30DF\u30FC\u30E0\u753B\u50CF\u30D7\u30FC\u30EB\u304B\u30891\u679A\u9078\u3073\u307E\u3059\uFF08\u9078\u3070\u306A\u3044\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002\u753B\u50CF\u306E\u30DE\u30C3\u30D4\u30F3\u30B0\u306F\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB memes\uFF09\u3002\u30C8\u30FC\u30AF\u30F3\uFF1A\u30E1\u30C3\u30BB\u30FC\u30B8\u3054\u3068\u306B\u4E00\u89A7\u5168\u4F53\u3092\u30EA\u30AF\u30A8\u30B9\u30C8\u306B\u6DFB\u4ED8\u3059\u308B\u305F\u3081\u3001\u73FE\u5728\u7D04 1.1k \u6587\u5B57\uFF08\u2248650\u30C8\u30FC\u30AF\u30F3\u3001\u3072\u3068\u308A\u3054\u3068\u753B\u50CF\u306E\u7D0411\u500D\uFF09\u3067\u3001\u753B\u50CF\u306E\u6570\u306B\u6BD4\u4F8B\u3057\u3066\u5897\u3048\u307E\u3059\u3002\u30AA\u30D5\u306B\u3059\u308B\u30681\u6587\u5B57\u3082\u6DFB\u4ED8\u3057\u307E\u305B\u3093\u3002",
      chatAnimationToggle: "\u30C1\u30E3\u30C3\u30C8\u306E\u30A2\u30AF\u30B7\u30E7\u30F3",
      chatAnimationToggleHint: "\u30AA\u30F3\u306B\u3059\u308B\u3068\u3001\u30C1\u30E3\u30C3\u30C8\u6642\u306B\u6F14\u3058\u3089\u308C\u308B\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u4E00\u89A7\uFF08animations.categories \u306E\u5168\u30A2\u30AF\u30B7\u30E7\u30F3\uFF09\u3092\u30E2\u30C7\u30EB\u306B\u6E21\u3057\u307E\u3059\u3002\u3053\u306E\u4E00\u8A00\u304C\u5B9F\u969B\u306B\u305D\u306E\u52D5\u4F5C\u3092\u6F14\u3058\u3066\u3044\u308B\u3068\u30E2\u30C7\u30EB\u304C\u5224\u65AD\u3057\u305F\u3068\u304D\u3060\u3051\u3001\u30DA\u30C3\u30C8\u304C\u305D\u306E\u5834\u3067\u6F14\u3058\u307E\u3059\u3002\u5408\u3046\u3082\u306E\u304C\u306A\u3051\u308C\u3070\u6587\u5B57\u3060\u3051\u306E\u8FD4\u7B54\u306B\u306A\u308A\u307E\u3059\u3002\u30C8\u30FC\u30AF\u30F3\uFF1A\u30E1\u30C3\u30BB\u30FC\u30B8\u3054\u3068\u306B\u4E00\u89A7\u5168\u4F53\u3092\u6DFB\u4ED8\u3057\u307E\u3059\u3002\u30AA\u30D5\u306A\u3089 1 \u3064\u3082\u6DFB\u4ED8\u3057\u307E\u305B\u3093\u3002\u30B0\u30ED\u30FC\u30D0\u30EB\u65E2\u5B9A\u3067\u5168\u30DA\u30C3\u30C8\u5171\u901A\uFF08pet pack \u306F\u81EA\u5206\u306E\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3067\u4E0A\u66F8\u304D\u53EF\uFF09\u3002",
      confineToggle: "\u73FE\u5728\u306E\u753B\u9762\u306B\u56FA\u5B9A",
      confineToggleHint: "\u30DE\u30EB\u30C1\u30C7\u30A3\u30B9\u30D7\u30EC\u30A4\u306E\u5834\u5408\uFF1A\u30AA\u30F3\u306B\u3059\u308B\u3068\u3001\u30DA\u30C3\u30C8\u306F\u73FE\u5728\u3044\u308B\u753B\u9762\u306E\u4E2D\u3060\u3051\u3067\u52D5\u304D\u307E\u3059\u3002\u6295\u3052\u305F\u30DA\u30C3\u30C8\u306F\u96E2\u3057\u305F\u3068\u304D\u306E\u753B\u9762\u5185\u3067\u3060\u3051\u8DF3\u306D\uFF08\u753B\u9762\u306E\u5883\u76EE\u306F\u58C1\u3068\u3057\u3066\u6271\u308F\u308C\u3001\u96A3\u306E\u753B\u9762\u3078\u306F\u98DB\u3073\u307E\u305B\u3093\uFF09\u3001\u81EA\u52D5\u3067\u306E\u5F98\u5F8A\u3082\u73FE\u5728\u3044\u308B\u753B\u9762\u5185\u3060\u3051\u3092\u6B69\u304D\u307E\u3059\uFF08\u5883\u76EE\u3092\u8D8A\u3048\u308B\u4E00\u6B69\u306F\u305D\u306E\u5834\u3067\u30AD\u30E3\u30F3\u30BB\u30EB\uFF09\u3002\u30AA\u30D5\u306B\u3059\u308B\u3068\u5F93\u6765\u3069\u304A\u308A\u753B\u9762\u3092\u307E\u305F\u3044\u3067\u98DB\u3093\u3060\u308A\u6B69\u3044\u305F\u308A\u3057\u307E\u3059\u3002\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30E2\u30FC\u30C9\u306E\u307F\u306B\u5F71\u97FF\u3057\u307E\u3059\u3002\u30D6\u30E9\u30A6\u30B6\u306E\u30AA\u30FC\u30D0\u30FC\u30EC\u30A4\u306F\u5143\u3005\u30D3\u30E5\u30FC\u30DD\u30FC\u30C8\u5185\u3060\u3051\u3067\u52D5\u304D\u307E\u3059\u3002",
      trayToggle: "\u30B7\u30B9\u30C6\u30E0\u30C8\u30EC\u30A4",
      trayToggleHint: "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30E2\u30FC\u30C9\u8D77\u52D5\u5F8C\u3001\u901A\u77E5\u9818\u57DF\uFF08macOS \u3067\u306F\u30E1\u30CB\u30E5\u30FC\u30D0\u30FC\uFF09\u306B\u30A2\u30A4\u30B3\u30F3\u3092\u5E38\u99D0\u3055\u305B\u3001\u8A2D\u5B9A\u306B\u542B\u307E\u308C\u308B\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u3092\u4E00\u89A7\u8868\u793A\u3057\u307E\u3059\u3002\u30C1\u30A7\u30C3\u30AF\u3092\u5165\u308C\u308B\u3068\u3001\u305D\u306E\u30DA\u30C3\u30C8\u306E\u8868\u793A\u4F4D\u7F6E\u3092\u5207\u308A\u66FF\u3048\u3089\u308C\u307E\u3059\u2014\u2014\u73FE\u5728\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u306B\u8868\u793A\u3055\u308C\u3066\u304A\u3089\u305A\u3001\u53F3\u30AF\u30EA\u30C3\u30AF\u3067\u304D\u308B\u30A6\u30A3\u30F3\u30C9\u30A6\u304C\u306A\u3044\u30DA\u30C3\u30C8\u3082\u542B\u307F\u307E\u3059\u3002\u30AA\u30D5\u306B\u3059\u308B\u3068\u3001\u30DA\u30C3\u30C8\u3092\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u306B\u623B\u3059\u306B\u306F\u30D6\u30E9\u30A6\u30B6\u3067\u8A2D\u5B9A\u30DA\u30FC\u30B8\u3092\u958B\u304F\u304B\u3001Web \u5074\u306E\u30DA\u30C3\u30C8\u3092\u53F3\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3057\u304B\u3042\u308A\u307E\u305B\u3093\u3002Windows \u3067\u306F\u5143\u3005\u300C\u96A0\u308C\u305F\u30A2\u30A4\u30B3\u30F3\u300D\u306B\u6298\u308A\u305F\u305F\u307E\u308C\u307E\u3059\u3002\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30E2\u30FC\u30C9\u306E\u307F\u306B\u5F71\u97FF\u3057\u307E\u3059\u3002",
      voiceTitle: "\u97F3\u58F0\u8AAD\u307F\u4E0A\u3052",
      voiceHint: "\u30DA\u30C3\u30C8\u304C\u97F3\u3092\u51FA\u3059\u305F\u3081\u306E4\u3064\u306E\u30B9\u30A4\u30C3\u30C1\u3068\u58F0\u8CEA\uFF1A\u97F3\u58F0\u306E\u7A2E\u985E\u3054\u3068\u306B\u72EC\u7ACB\u3057\u305F\u30B9\u30A4\u30C3\u30C1\u304C\u3042\u308A\u3001\u3069\u308C\u3082\u4ED6\u306E\u30B9\u30A4\u30C3\u30C1\u306B\u306F\u5F93\u3044\u307E\u305B\u3093\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u306F\u3059\u3079\u3066\u30AA\u30D5\u3067\u3001\u300C\u4FDD\u5B58\u300D\u6642\u306B\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u3078\u66F8\u304D\u8FBC\u307E\u308C\u307E\u3059\uFF08\u5373\u6642\u66F8\u304D\u8FBC\u307F\u306F\u3057\u307E\u305B\u3093\uFF09\u3002",
      voiceEnabled: "\u624B\u52D5\u3072\u3068\u308A\u3054\u3068\u306E\u8AAD\u307F\u4E0A\u3052",
      voiceEnabledHint: "\u53F3\u30AF\u30EA\u30C3\u30AF\u30E1\u30CB\u30E5\u30FC\u3084\u30B9\u30E9\u30C3\u30B7\u30E5\u30B3\u30DE\u30F3\u30C9\u3067\u767A\u751F\u3057\u305F\u3072\u3068\u308A\u3054\u3068\u3001\u304A\u3088\u3073\u30C1\u30E3\u30C3\u30C8\u306E\u8FD4\u4FE1\u3092\u8AAD\u307F\u4E0A\u3052\u307E\u3059\u3002\u30C1\u30E3\u30C3\u30C8\u30D1\u30CD\u30EB\u306E\u30B9\u30D4\u30FC\u30AB\u30FC\u30DC\u30BF\u30F3\u306F\u62BC\u3057\u305F1\u6587\u3060\u3051\u3092\u305D\u306E\u5834\u3067\u8AAD\u307F\u4E0A\u3052\u307E\u3059\u3002\u300C\u58F0\u3092\u51FA\u3059\u304B\u3069\u3046\u304B\u300D\u3060\u3051\u306B\u5F71\u97FF\u3057\u307E\u3059\uFF1A\u30D0\u30D6\u30EB\u3001\u4F1A\u8A71\u30E1\u30E2\u30EA\u3001\u30B7\u30B9\u30C6\u30E0\u901A\u77E5\u306E\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u306F\u5909\u308F\u308A\u307E\u305B\u3093\u3002\u97F3\u58F0\u5408\u6210\u306B\u5931\u6557\u3057\u305F\u5834\u5408\u306F\u30ED\u30B0\u306B\u6B8B\u3059\u3060\u3051\u3067\u3001\u4F1A\u8A71\u3092\u4E2D\u65AD\u3057\u307E\u305B\u3093\u3002",
      voiceWhisperEnabled: "\u3072\u3068\u308A\u3054\u3068\u306E\u8AAD\u307F\u4E0A\u3052",
      voiceWhisperEnabledHint: "\u5B9A\u671F\u7684\u306B\u751F\u6210\u3055\u308C\u308B\u3072\u3068\u308A\u3054\u3068\u3092\u8AAD\u307F\u4E0A\u3052\u307E\u3059\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u306F\u30AA\u30D5\u2014\u2014\u3072\u3068\u308A\u3054\u3068\u306F\u80CC\u666F\u30CA\u30EC\u30FC\u30B7\u30E7\u30F3\u306A\u306E\u3067\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u58F0\u3092\u51FA\u3059\u3079\u304D\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
      voiceTodoEnabled: "ToDo \u306E\u8AAD\u307F\u4E0A\u3052",
      voiceTodoEnabledHint: "\u671F\u9650\u304C\u6765\u305F ToDo \u30EA\u30DE\u30A4\u30F3\u30C0\u30FC\u3092\u8AAD\u307F\u4E0A\u3052\u307E\u3059\uFF08\u540C\u3058\u6587\u8A00\u3067\u30D0\u30D6\u30EB\u3082\u8868\u793A\u3055\u308C\u3001\u3053\u306E\u9805\u76EE\u306F\u8AAD\u307F\u4E0A\u3052\u308B\u304B\u3069\u3046\u304B\u3060\u3051\u3092\u6C7A\u3081\u307E\u3059\uFF09\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u306F\u30AA\u30D5\u3067\u3059\u3002",
      voiceNotifyEnabled: "\u4F5C\u696D\u72B6\u614B\u306E\u8AAD\u307F\u4E0A\u3052",
      voiceNotifyEnabledHint: "\u30BF\u30B9\u30AF\u306E\u5B8C\u4E86\u30FB\u5931\u6557\u30FB\u78BA\u8A8D\u5F85\u3061\u306E\u3068\u304D\u306B\u3001\u8A2D\u5B9A\u3055\u308C\u305F\u4F5C\u696D\u72B6\u614B\u306E\u30BB\u30EA\u30D5\u3092\u8AAD\u307F\u4E0A\u3052\u307E\u3059\u3002\u30B7\u30B9\u30C6\u30E0\u901A\u77E5\u3068\u540C\u3058\u8003\u3048\u65B9\u3067\u3001\u3053\u306E\u30DA\u30FC\u30B8\u3092\u898B\u3066\u3044\u306A\u3044\u3068\u304D\uFF08\u5225\u306E\u30A2\u30D7\u30EA\u306B\u5207\u308A\u66FF\u3048\u30FB\u30D5\u30A9\u30FC\u30AB\u30B9\u306A\u3057\u30FB\u6700\u5C0F\u5316\uFF09\u306B\u3060\u3051\u8AAD\u307F\u4E0A\u3052\u307E\u3059\u2014\u2014\u753B\u9762\u3092\u898B\u3066\u3044\u308B\u9593\u306F\u90AA\u9B54\u3057\u307E\u305B\u3093\u3002\u8AAD\u307F\u4E0A\u3052\u308B\u306E\u306F\u8A2D\u5B9A\u3055\u308C\u305F\u30BB\u30EA\u30D5\u3060\u3051\u3067\u3001\u30BF\u30B9\u30AF\u306E\u8A73\u7D30\u306F\u8AAD\u307F\u307E\u305B\u3093\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u306F\u30AA\u30D5\u3067\u3059\u3002",
      voiceNameLabel: "\u58F0\u8CEA",
      voiceVolumeLabel: "\u97F3\u91CF",
      voiceVolumeHint: "\u8AAD\u307F\u4E0A\u3052\u306E\u97F3\u91CF\uFF080\u301C1 \u306E\u5C0F\u6570\uFF09\u30021 \u304C\u6700\u5927\u97F3\u91CF\uFF08100%\uFF09\u30010 \u306F\u6D88\u97F3\u3067\u3059\u3002\u5909\u308F\u308B\u306E\u306F\u518D\u751F\u306E\u5927\u304D\u3055\u3060\u3051\u3067\u3001\u97F3\u58F0\u306E\u518D\u5408\u6210\u306F\u884C\u3044\u307E\u305B\u3093\u30024\u7A2E\u985E\u306E\u97F3\u58F0\u306F\u3053\u306E1\u3064\u306E\u97F3\u91CF\u3092\u5171\u6709\u3057\u307E\u3059\u3002",
      physicsTitle: "\u7269\u7406\uFF08\u30C9\u30E9\u30C3\u30B0\uFF06\u6295\u3052\u306E\u611F\u89E6\uFF09",
      physicsHint: "\u30B0\u30ED\u30FC\u30D0\u30EB\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u3001\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u306B\u5171\u901A\u3067\u3059\uFF08pet pack \u306F\u81EA\u8EAB\u306E\u7A2E\u985E\u30D5\u30A1\u30A4\u30EB\u3067\u500B\u5225\u306B\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\uFF09\u3002\u300C\u4FDD\u5B58\u300D\u6642\u306B\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u3078\u66F8\u304D\u8FBC\u307E\u308C\u307E\u3059\uFF08\u5373\u6642\u66F8\u304D\u8FBC\u307F\u306F\u3057\u307E\u305B\u3093\uFF09\u3002\u30D6\u30E9\u30A6\u30B6\u3067\u306F\u4FDD\u5B58\u5F8C\u3059\u3050\u306B\u53CD\u6620\u3055\u308C\u3001\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u3067\u306F\u4FDD\u5B58\u3067\u30DA\u30C3\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6\u304C\u518D\u8AAD\u307F\u8FBC\u307F\u3055\u308C\u3066\u304B\u3089\u53CD\u6620\u3055\u308C\u307E\u3059\u3002",
      mobileTitle: "\u30E2\u30D0\u30A4\u30EB\u5411\u3051\u52B9\u679C",
      mobileHint: "\u30B9\u30DE\u30DB\u306E\u30D6\u30E9\u30A6\u30B6\u3067\u306E\u307F\u610F\u5473\u304C\u3042\u308A\u307E\u3059\u3002\u632F\u52D5\u306B\u306F\u30E2\u30FC\u30BF\u30FC\u30012 \u3064\u306E\u4F53\u611F\u30B9\u30A4\u30C3\u30C1\u306B\u306F\u50BE\u304D\uFF0F\u52A0\u901F\u5EA6\u30BB\u30F3\u30B5\u30FC\u304C\u5FC5\u8981\u3067\u3001\u30BB\u30F3\u30B5\u30FC\u306F HTTPS \u307E\u305F\u306F localhost \u3067\u306E\u307F\u4F7F\u3048\u307E\u3059\u3002",
      "physics.gravity": "\u91CD\u529B",
      "physics.gravityHint": "px/s\xB2\u3002\u5927\u304D\u3044\u307B\u3069\u901F\u304F\u843D\u4E0B\u3057\u307E\u3059\u30020 = \u7121\u91CD\u529B\uFF08\u6295\u3052\u308B\u3068\u7B49\u901F\u76F4\u7DDA\u904B\u52D5\u3067\u98DB\u3073\u7D9A\u3051\u307E\u3059\uFF09",
      "physics.restitution": "\u5F3E\u6027",
      "physics.restitutionHint": "0\uFF5E1\u3002\u58C1\u3084\u5E8A\u306B\u5F53\u305F\u3063\u305F\u3068\u304D\u306B\u6B8B\u308B\u901F\u5EA6\u306E\u5272\u5408\uFF081 = \u5B8C\u5168\u5F3E\u6027\u30010 = \u5F53\u305F\u3063\u305F\u77AC\u9593\u306B\u505C\u6B62\uFF09",
      "physics.groundFriction": "\u63A5\u89E6\u6469\u64E6",
      "physics.groundFrictionHint": "/s\u3002\u58C1\u30FB\u5E8A\u30FB\u5929\u4E95\u306B\u5F53\u305F\u3063\u305F\u5F8C\u306E\u63A5\u7DDA\u65B9\u5411\u306E\u901F\u5EA6\u306E\u6E1B\u8870\u7387\u30020 = \u3069\u306E\u9762\u3082\u6C37\u306E\u3088\u3046",
      "physics.throwPower": "\u6295\u3052\u308B\u529B",
      "physics.throwPowerHint": "> 0\u3002\u30D0\u30CD\u306E\u8FFD\u5F93\u6027\u3068\u6295\u3052\u51FA\u3057\u306E\u521D\u901F\u306E\u5168\u4F53\u500D\u7387\uFF081 = \u30C7\u30D5\u30A9\u30EB\u30C8\u3002\u5927\u304D\u3044\u307B\u3069\u3088\u304F\u8FFD\u5F93\u3057\u3001\u52E2\u3044\u3088\u304F\u98DB\u3073\u307E\u3059\uFF09",
      physicsCeilingBounce: "\u5929\u4E95\u3067\u306E\u8DF3\u306D\u8FD4\u308A",
      physicsCeilingBounceHint: "\u30AA\u30D5\u306B\u3059\u308B\u3068\u3001\u6295\u3052\u305F\u30DA\u30C3\u30C8\u304C\u753B\u9762\u306E\u4E0A\u7AEF\u3092\u8D8A\u3048\u3066\u98DB\u3073\u51FA\u305B\u307E\u3059\uFF08\u91CD\u529B\u304C\u5F15\u304D\u623B\u3057\u307E\u3059\uFF09",
      physicsPetCollision: "\u30DA\u30C3\u30C8\u540C\u58EB\u306E\u885D\u7A81",
      physicsPetCollisionHint: "\u98DB\u884C\u4E2D\u306E\u30DA\u30C3\u30C8\u304C\u4ED6\u306E\u30DA\u30C3\u30C8\u306B\u5F53\u305F\u308B\u3068\u3001\u904B\u52D5\u91CF\u4FDD\u5B58\u306B\u5F93\u3063\u3066\u5F3E\u304D\u8FD4\u3055\u308C\u307E\u3059\uFF08\u8CEA\u91CF \u221D \u30B5\u30A4\u30BA\xB2\uFF09",
      physicsHaptic: "\u885D\u7A81\u6642\u306E\u632F\u52D5",
      physicsHapticHint: "\u58C1\u30FB\u5E8A\u30FB\u5929\u4E95\u30FB\u30DA\u30C3\u30C8\u540C\u58EB\u306E\u885D\u7A81\u3054\u3068\u306B 1 \u56DE\u632F\u52D5\u3057\u307E\u3059\u3002Chrome / Edge \u3067\u52D5\u4F5C\u3002iOS \u3068 Via \u306E\u3088\u3046\u306A WebView \u30D6\u30E9\u30A6\u30B6\u3067\u306F\u7121\u52B9\u3002\u30B5\u30A4\u30EC\u30F3\u30C8/\u96C6\u4E2D\u30E2\u30FC\u30C9\u306F\u632F\u52D5\u3092\u6B62\u3081\u307E\u3059\u3002",
      physicsTilt: "\u50BE\u304D\u3067\u91CD\u529B",
      physicsTiltHint: "\u7AEF\u672B\u3092\u50BE\u3051\u308B\u3068\u91CD\u529B\u304C\u305D\u3061\u3089\u3078\u5411\u304B\u3044\u307E\u3059\uFF08\u5927\u304D\u3055\u306F\u4E0A\u306E\u91CD\u529B\u5024\uFF09\u3002\u91CD\u529B\u304C 0 \u306E\u3068\u304D\u306F\u50BE\u3051\u3066\u3082\u52B9\u679C\u304C\u3042\u308A\u307E\u305B\u3093\u3002HTTPS/localhost \u304C\u5FC5\u8981\u3067\u3059\u3002",
      physicsShake: "\u632F\u3063\u3066\u6295\u3052\u308B",
      physicsShakeHint: "\u632F\u3063\u305F\u65B9\u5411\u3078\u30DA\u30C3\u30C8\u3092\u98DB\u3070\u3057\u307E\u3059\u3002\u5F37\u3055\u306F\u6295\u3052\u308B\u529B\uFF08throwPower\uFF09\u306B\u6BD4\u4F8B\u3057\u3001\u91CD\u529B\u3068\u306F\u7121\u95A2\u4FC2\u306A\u306E\u3067\u91CD\u529B 0 \u3067\u3082\u4F7F\u3048\u307E\u3059\u3002HTTPS/localhost \u304C\u5FC5\u8981\u3067\u3059\u3002",
      invalidPhysics: "\u7269\u7406\u30D1\u30E9\u30E1\u30FC\u30BF\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF1A\u91CD\u529B / \u5730\u9762\u6469\u64E6 \u2265 0\u3001\u5F3E\u6027 0\uFF5E1\u3001\u6295\u3052\u308B\u529B > 0\u3002",
      fontTitle: "\u5916\u89B3\u3068\u30D5\u30A9\u30F3\u30C8",
      fontHint: "\u30D5\u30A9\u30F3\u30C8\u306E\u7A2E\u985E\u306F\u3001\u73FE\u5728\u30AD\u30E3\u30F3\u30C7\u30A3\u30D5\u30A9\u30F3\u30C8\u3092\u4F7F\u7528\u3057\u3066\u3044\u308B\u3059\u3079\u3066\u306E\u30C6\u30AD\u30B9\u30C8\u306B\u9069\u7528\u3055\u308C\u307E\u3059\uFF1A\u30DA\u30C3\u30C8\u306E\u30D0\u30D6\u30EB\u3001\u30DB\u30D0\u30FC\u30C4\u30FC\u30EB\u30C1\u30C3\u30D7\u3001\u30C1\u30E3\u30C3\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6\u3001\u30B9\u30B3\u30A2\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u3002\u6587\u5B57\u30B5\u30A4\u30BA\u306F\u30DA\u30C3\u30C8\u306E\u30D0\u30D6\u30EB\u3068\u30DB\u30D0\u30FC\u30C4\u30FC\u30EB\u30C1\u30C3\u30D7\u3060\u3051\u306B\u9069\u7528\u3055\u308C\u307E\u3059\uFF08\u30C1\u30E3\u30C3\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6\u3068\u30B9\u30B3\u30A2\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u306E\u6587\u5B57\u30B5\u30A4\u30BA\u306F\u5909\u308F\u308A\u307E\u305B\u3093\uFF09\u3002\u30B0\u30ED\u30FC\u30D0\u30EB\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u3001\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u306B\u5171\u901A\u3067\u3059\uFF08pet pack \u306F\u81EA\u8EAB\u306E\u7A2E\u985E\u30D5\u30A1\u30A4\u30EB\u3067\u500B\u5225\u306B\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\uFF09\u3002\u300C\u4FDD\u5B58\u300D\u6642\u306B\u30E6\u30FC\u30B6\u30FC\u8A2D\u5B9A\u3078\u66F8\u304D\u8FBC\u307E\u308C\u3001\u30D6\u30E9\u30A6\u30B6\u3067\u306F\u4FDD\u5B58\u5F8C\u3059\u3050\u306B\u53CD\u6620\u3001\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u3067\u306F\u4FDD\u5B58\u3067\u30DA\u30C3\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6\u304C\u518D\u8AAD\u307F\u8FBC\u307F\u3055\u308C\u3066\u304B\u3089\u53CD\u6620\u3055\u308C\u307E\u3059\u3002",
      fontFamilyLabel: "\u30D5\u30A9\u30F3\u30C8",
      fontFamilyHint: "\u300C\u30AD\u30E3\u30F3\u30C7\u30A3\u30D5\u30A9\u30F3\u30C8\uFF08\u5185\u8535\uFF09\u300D\u306F\u30D7\u30E9\u30B0\u30A4\u30F3\u306B\u540C\u68B1\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u305D\u308C\u4EE5\u5916\u306F\u30B7\u30B9\u30C6\u30E0\u30D5\u30A9\u30F3\u30C8\u3067\u3001\u3053\u306E\u30DE\u30B7\u30F3\u306B\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3055\u308C\u3066\u3044\u306A\u3044\u5834\u5408\u306F\u30D5\u30A9\u30F3\u30C8\u30B9\u30BF\u30C3\u30AF\u306E\u6B21\u306E\u3082\u306E\u3078\u81EA\u52D5\u7684\u306B\u30D5\u30A9\u30FC\u30EB\u30D0\u30C3\u30AF\u3057\u307E\u3059\uFF08\u7A7A\u767D\u306B\u306A\u3063\u305F\u308A\u30A8\u30E9\u30FC\u306B\u306A\u3063\u305F\u308A\u306F\u3057\u307E\u305B\u3093\uFF09\u3002",
      fontSizeLabel: "\u6587\u5B57\u30B5\u30A4\u30BA\uFF08px\uFF09",
      fontSizeHint: "\u30D0\u30D6\u30EB\u672C\u6587\u306E\u6587\u5B57\u30B5\u30A4\u30BA\u3002\u30C4\u30FC\u30EB\u30C1\u30C3\u30D7\u3068\u30D0\u30D6\u30EB\u5185\u306E\u5C0F\u3055\u3044\u6587\u5B57\u306F\u65E2\u5B58\u306E\u6BD4\u7387\u3067\u7B97\u51FA\u3055\u308C\u307E\u3059\u3002\u7BC4\u56F2\u306F 4\uFF5E200\u3002",
      fontFollowToggle: "\u6587\u5B57\u30B5\u30A4\u30BA\u3092\u30DA\u30C3\u30C8\u306E\u5927\u304D\u3055\u306B\u5408\u308F\u305B\u3066\u62E1\u5927\u7E2E\u5C0F",
      fontFollowToggleHint: "\u30AA\u30F3\uFF08\u30C7\u30D5\u30A9\u30EB\u30C8\uFF09\uFF1A\u30DA\u30C3\u30C8\u3092\u5927\u304D\u304F\u3059\u308B\u3068\u6587\u5B57\u30B5\u30A4\u30BA\u3082\u6BD4\u4F8B\u3057\u3066\u5927\u304D\u304F\u306A\u308A\u3001\u5E45 462 \u306E\u3068\u304D\u306B\u4E0A\u306E\u8A2D\u5B9A\u5024\u3068\u4E00\u81F4\u3057\u307E\u3059\u3002\u30AA\u30D5\uFF1A\u6587\u5B57\u30B5\u30A4\u30BA\u306F\u4E00\u5B9A\u3067\u3001\u30DA\u30C3\u30C8\u306E\u5927\u304D\u3055\u306B\u5DE6\u53F3\u3055\u308C\u307E\u305B\u3093\u3002",
      invalidFont: "\u30D5\u30A9\u30F3\u30C8\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF1A\u30D5\u30A9\u30F3\u30C8\u306F\u30C9\u30ED\u30C3\u30D7\u30C0\u30A6\u30F3\u30EA\u30B9\u30C8\u5185\u3001\u6587\u5B57\u30B5\u30A4\u30BA\u306F 4\uFF5E200 \u306E\u6570\u5024\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002",
      "font.candy": "\u30AD\u30E3\u30F3\u30C7\u30A3\u30D5\u30A9\u30F3\u30C8\uFF08\u5185\u8535\uFF09",
      "font.yahei": "Microsoft YaHei / PingFang",
      "font.youyuan": "YouYuan",
      "font.kaiti": "KaiTi",
      "font.simsun": "SimSun",
      "font.comic": "Comic Sans MS",
      "font.system": "\u30B7\u30B9\u30C6\u30E0\u30C7\u30D5\u30A9\u30EB\u30C8",
      modelTitle: "\u4F1A\u8A71\u3068\u30E2\u30C7\u30EB",
      modelHint: "\u3072\u3068\u308A\u3054\u3068\u3068\u30C1\u30E3\u30C3\u30C8\u304C\u305D\u308C\u305E\u308C\u3069\u306E\u30E2\u30C7\u30EB\u3092\u4F7F\u3046\u304B\u3001\u307E\u305F\u30C1\u30E3\u30C3\u30C8\u304C\u6BCE\u56DE\u4F55\u30E9\u30A6\u30F3\u30C9\u306E\u5C65\u6B74\u3092\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u306B\u542B\u3081\u308B\u304B\u3002\u300C\u73FE\u5728\u306E\u4F1A\u8A71\u306B\u5F93\u3046\u300D= \u73FE\u5728\u306E\u4F1A\u8A71\u3067\u4F7F\u3063\u3066\u3044\u308B\u30E2\u30C7\u30EB\u3092\u4F7F\u7528\uFF08\u30C7\u30D5\u30A9\u30EB\u30C8\uFF09\u3002\u30B0\u30ED\u30FC\u30D0\u30EB\u30C7\u30D5\u30A9\u30EB\u30C8\uFF1A\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u306B\u9069\u7528\u3055\u308C\u3001pet pack \u306F\u81EA\u8EAB\u306E\u7A2E\u985E\u30D5\u30A1\u30A4\u30EB\u3067\u500B\u5225\u306B\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\u3002\u9078\u629E\u80A2\u306F DSH \u306E\u30E2\u30C7\u30EB\u30D4\u30C3\u30AB\u30FC\u3068\u540C\u3058\u30BD\u30FC\u30B9\u304B\u3089\u30DB\u30B9\u30C8\u304C\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u306B\u63D0\u4F9B\u3057\u307E\u3059\u3002",
      modelFollow: "\u73FE\u5728\u306E\u4F1A\u8A71\u306B\u5F93\u3046",
      modelSearch: "\u30E2\u30C7\u30EB\u3092\u691C\u7D22\u2026",
      modelEmpty: "\u4E00\u81F4\u3059\u308B\u30E2\u30C7\u30EB\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
      modelNoModels: "\u5229\u7528\u3067\u304D\u308B\u30E2\u30C7\u30EB\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
      modelLoading: "\u30E2\u30C7\u30EB\u4E00\u89A7\u3092\u66F4\u65B0\u4E2D\u2026",
      modelTriggerAria: "\u30E2\u30C7\u30EB\u3092\u9078\u629E\uFF08\u73FE\u5728 {model}\uFF09",
      modelUnknown: " \uFF08\u73FE\u5728\u306E\u8A2D\u5B9A\u3001\u4E00\u89A7\u306B\u3042\u308A\u307E\u305B\u3093\uFF09",
      modelNone: "\u3053\u306E\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC\u306B\u5229\u7528\u3067\u304D\u308B\u30E2\u30C7\u30EB\u306F\u3042\u308A\u307E\u305B\u3093",
      whisperModelLabel: "\u3072\u3068\u308A\u3054\u3068\u30E2\u30C7\u30EB",
      chatModelLabel: "\u30C1\u30E3\u30C3\u30C8\u30E2\u30C7\u30EB",
      modelFieldHint: "\u300C\u73FE\u5728\u306E\u4F1A\u8A71\u306B\u5F93\u3046\u300D= \u73FE\u5728\u306E\u4F1A\u8A71\u306E\u30E2\u30C7\u30EB\u3092\u4F7F\u7528\u3002\u6307\u5B9A\u3057\u3066\u3082\u547C\u3073\u51FA\u3057\u306B\u5931\u6557\u3057\u305F\u5834\u5408\u306F\u3001\u73FE\u5728\u306E\u4F1A\u8A71\u306E\u30E2\u30C7\u30EB\u3078\u81EA\u52D5\u7684\u306B\u30D5\u30A9\u30FC\u30EB\u30D0\u30C3\u30AF\u3057\u30661\u56DE\u518D\u8A66\u884C\u3057\u307E\u3059\u3002",
      invalidModel: "\u30E2\u30C7\u30EB\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF1A\u30D7\u30ED\u30D0\u30A4\u30C0\u30FC\u3068\u30E2\u30C7\u30EB\u306F\u4E21\u65B9\u9078\u629E\u3059\u308B\u304B\u3001\u4E21\u65B9\u7A7A\u6B04\uFF08\u73FE\u5728\u306E\u4F1A\u8A71\u306B\u5F93\u3046\uFF09\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      modelCatalogFailed: "\u30E2\u30C7\u30EB\u4E00\u89A7\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F\uFF08\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3059\u308B\u3068\u518D\u8A66\u884C\u3067\u304D\u307E\u3059\uFF09\u3002\u73FE\u5728\u306E\u8A2D\u5B9A\u5024\u306F\u305D\u306E\u307E\u307E\u4FDD\u6301\u3055\u308C\u307E\u3059\u3002",
      chatMemory: "\u4F1A\u8A71\u5C65\u6B74\u306E\u30E9\u30A6\u30F3\u30C9\u6570",
      chatMemoryHint: "\u5404\u30C1\u30E3\u30C3\u30C8\u30EA\u30AF\u30A8\u30B9\u30C8\u306B\u542B\u3081\u308B\u76F4\u8FD1\u306E\u5C65\u6B74\u30E9\u30A6\u30F3\u30C9\u6570\uFF081\u30E9\u30A6\u30F3\u30C9 = 1\u554F1\u7B54\u30020 = \u5C65\u6B74\u306A\u3057\u3067\u3001\u6BCE\u56DE\u307E\u3063\u305F\u304F\u65B0\u3057\u3044\u4F1A\u8A71\uFF09\u3002\u4F1A\u8A71\u30E1\u30E2\u30EA\u81EA\u4F53\u306F\u3059\u3079\u3066\u4FDD\u5B58\u3055\u308C\u3001\u524A\u9664\u3055\u308C\u307E\u305B\u3093\u3002\u3053\u306E\u5024\u306F\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u306B\u4F55\u30E9\u30A6\u30F3\u30C9\u5206\u3092\u542B\u3081\u308B\u304B\u3060\u3051\u3092\u6C7A\u3081\u307E\u3059\u2014\u2014\u5927\u304D\u3044\u307B\u3069\u3088\u304F\u899A\u3048\u3066\u3044\u307E\u3059\u304C\u3001\u30C8\u30FC\u30AF\u30F3\u3082\u591A\u304F\u6D88\u8CBB\u3057\u307E\u3059\u3002\u30B0\u30ED\u30FC\u30D0\u30EB\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u3001\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u306B\u5171\u901A\u3067\u3059\uFF08pet pack \u306F\u81EA\u8EAB\u306E\u7A2E\u985E\u30D5\u30A1\u30A4\u30EB\u3067\u500B\u5225\u306B\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\uFF09\u3002",
      invalidChatMemory: "\u4F1A\u8A71\u5C65\u6B74\u306E\u30E9\u30A6\u30F3\u30C9\u6570\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF1A0 \u4EE5\u4E0A\u306E\u6570\u5024\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002",
      chatImageLimit: "\u30C1\u30E3\u30C3\u30C8\u753B\u50CF\u306E\u4E0A\u9650\u679A\u6570",
      chatImageLimitHint: "\u30C1\u30E3\u30C3\u30C8\u6642\u306B\u30E2\u30C7\u30EB\u3078\u9001\u308B\u30DF\u30FC\u30E0\u753B\u50CF\u4E00\u89A7\u306E\u6700\u5927\u679A\u6570\uFF08\u300C\u5148\u982D N \u679A\u300D= \u8A2D\u5B9A\u306E\u5148\u982D\u306B\u66F8\u3044\u305F N \u4EF6\u3002\u512A\u5148\u3057\u3066\u9001\u308A\u305F\u3044\u753B\u50CF\u306F\u9806\u756A\u3092\u524D\u306B\u3057\u3066\u304F\u3060\u3055\u3044\uFF09\u3002\u4E00\u89A7\u5168\u4F53\u306F\u30E1\u30C3\u30BB\u30FC\u30B8\u3054\u3068\u306B\u6DFB\u4ED8\u3055\u308C\u3001\u30C8\u30FC\u30AF\u30F3\u306F\u679A\u6570\u306B\u6BD4\u4F8B\u3057\u3066\u5897\u3048\u308B\u305F\u3081\u3001\u591A\u3044\u3068\u305D\u306E\u307E\u307E\u30B3\u30B9\u30C8\u306B\u306A\u308A\u307E\u3059\u3002\u5148\u982D N \u679A\u306B\u5236\u9650\u3059\u308B\u3068\u3001\u30E2\u30C7\u30EB\u306F\u305D\u306E\u4E2D\u304B\u3089\u3060\u3051\u9078\u3073\u307E\u3059\u30020 = \u5236\u9650\u306A\u3057\uFF08\u3059\u3079\u3066\u9001\u4FE1\uFF09\u3002\u5185\u8535\u30C7\u30D5\u30A9\u30EB\u30C8\u306F 10\u3002\u30B0\u30ED\u30FC\u30D0\u30EB\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u3001\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u306B\u5171\u901A\u3067\u3059\uFF08pet pack \u306F\u81EA\u8EAB\u306E\u7A2E\u985E\u30D5\u30A1\u30A4\u30EB\u3067\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\uFF09\u3002\u5F71\u97FF\u3059\u308B\u306E\u306F\u30C1\u30E3\u30C3\u30C8\u306E\u753B\u50CF\u9078\u629E\u3060\u3051\u3067\u3059\uFF1A\u3072\u3068\u308A\u3054\u3068\u306F\u9078\u3093\u30601\u679A\u3060\u3051\u3092\u542B\u3081\u307E\u3059\u3002",
      invalidChatImageLimit: "\u30C1\u30E3\u30C3\u30C8\u753B\u50CF\u306E\u4E0A\u9650\u679A\u6570\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF1A0 \u4EE5\u4E0A\u306E\u6570\u5024\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF080 = \u5236\u9650\u306A\u3057\uFF09\u3002",
      notifyTest: "\u30C6\u30B9\u30C8\u901A\u77E5",
      notifyTestOk: "\u30C6\u30B9\u30C8\u901A\u77E5\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u306E\u53F3\u4E0B\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      notifyDenyUnsupported: "\u3053\u306E\u74B0\u5883\u3067\u306F\u30B7\u30B9\u30C6\u30E0\u901A\u77E5\u304C\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\uFF08\u30D6\u30E9\u30A6\u30B6\u306B Notification API \u304C\u3042\u308A\u307E\u305B\u3093\uFF09\u3002",
      notifyDenyBlocked: "\u901A\u77E5\u6A29\u9650\u304C\u30D6\u30E9\u30A6\u30B6\u306B\u3088\u3063\u3066\u300C\u30D6\u30ED\u30C3\u30AF\u300D\u306B\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
      notifyDenyRejected: "\u6A29\u9650\u78BA\u8A8D\u306E\u30C0\u30A4\u30A2\u30ED\u30B0\u3067\u300C\u30D6\u30ED\u30C3\u30AF\u300D\u3092\u9078\u629E\u3057\u307E\u3057\u305F\u3002",
      notifyDenyError: "\u6A29\u9650\u306E\u8981\u6C42\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F",
      notifyGuide: "\u30AC\u30A4\u30C9\uFF1A\u30A2\u30C9\u30EC\u30B9\u30D0\u30FC\u5DE6\u5074\u306E \u{1F512}/\u24D8 \u2192\u300C\u30B5\u30A4\u30C8\u306E\u8A2D\u5B9A\u300D\u2192\u300C\u901A\u77E5\u300D\u2192\u300C\u8A31\u53EF\u300D\u306B\u5909\u66F4\u3057\u3001\u30DA\u30FC\u30B8\u3092\u66F4\u65B0\u3057\u3066\u304B\u3089\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      storageTitle: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3068\u30B9\u30C8\u30EC\u30FC\u30B8",
      storageHint: "\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u3053\u306E PC \u4E0A\u306B\u4F5C\u6210\u3055\u308C\u308B\u3059\u3079\u3066\u306E\u5834\u6240\u3067\u3059\u3002\u30AD\u30E3\u30C3\u30B7\u30E5\u3092\u524A\u9664\u3057\u3066\u3082\u4F7F\u7528\u306B\u5F71\u97FF\u306F\u3042\u308A\u307E\u305B\u3093\uFF08\u81EA\u52D5\u7684\u306B\u518D\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9 / \u518D\u69CB\u7BC9\u3055\u308C\u307E\u3059\uFF09\u3002\u300C\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30E6\u30FC\u30B6\u30FC\u30C7\u30FC\u30BF\u300D\u3092\u524A\u9664\u3059\u308B\u3068\u3001\u8A2D\u5B9A\u3068\u4F1A\u8A71\u30E1\u30E2\u30EA\u304C\u5931\u308F\u308C\u307E\u3059\u3002",
      "storage.userData": "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30E6\u30FC\u30B6\u30FC\u30C7\u30FC\u30BF\uFF1A\u30AB\u30B9\u30BF\u30E0\u8A2D\u5B9A main-config.jsonc\u3001\u4F1A\u8A71\u30E1\u30E2\u30EA memory.json\u3001\u30AB\u30B9\u30BF\u30E0\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u7D20\u6750 main-animation/\u3001\u30D5\u30A1\u30A4\u30EB\u578B\u30DA\u30C3\u30C8 pet/",
      "storage.electron": "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30DA\u30C3\u30C8\u304C\u4F7F\u3046 Electron \u30E9\u30F3\u30BF\u30A4\u30E0\uFF08\u30B5\u30A4\u30BA\u304C\u5927\u304D\u3044\u3002\u524A\u9664\u3059\u308B\u3068\u6B21\u56DE\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30E2\u30FC\u30C9\u8D77\u52D5\u6642\u306B\u81EA\u52D5\u3067\u518D\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3055\u308C\u307E\u3059\uFF09",
      "storage.desktopCache": "\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30DA\u30C3\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6\u306E\u30AD\u30E3\u30C3\u30B7\u30E5\u3068\u30E1\u30A4\u30F3\u30C7\u30A3\u30B9\u30D7\u30EC\u30A4\u306E\u30B9\u30B1\u30FC\u30EB\u30AD\u30E3\u30C3\u30B7\u30E5\uFF08\u524A\u9664\u3057\u3066\u3082\u554F\u984C\u3042\u308A\u307E\u305B\u3093\u3002\u81EA\u52D5\u3067\u518D\u69CB\u7BC9\u3055\u308C\u307E\u3059\uFF09",
      "storage.electronCache": "Electron \u30A4\u30F3\u30B9\u30C8\u30FC\u30E9\u30FC\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u30AD\u30E3\u30C3\u30B7\u30E5\uFF08\u524A\u9664\u3057\u3066\u3082\u554F\u984C\u3042\u308A\u307E\u305B\u3093\u3002\u5FC5\u8981\u6642\u306B\u518D\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3055\u308C\u307E\u3059\uFF09",
      "storage.package": "\u30D7\u30E9\u30B0\u30A4\u30F3\u672C\u4F53\uFF08DSH \u304C\u7BA1\u7406\u3057\u307E\u3059\u3002\u624B\u52D5\u3067\u524A\u9664\u305B\u305A\u3001\u4E0B\u306E\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u30B3\u30DE\u30F3\u30C9\u3067\u524A\u9664\u3057\u3066\u304F\u3060\u3055\u3044\uFF09",
      storageMissing: " \uFF08\u672A\u4F5C\u6210\uFF09",
      uninstallTitle: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u65B9\u6CD5",
      uninstallStep1: "1. \u307E\u305A DSH \u3092\u7D42\u4E86\u3057\u307E\u3059\uFF08\u30C7\u30B9\u30AF\u30C8\u30C3\u30D7\u30DA\u30C3\u30C8\u3082\u4E00\u7DD2\u306B\u7D42\u4E86\u3057\u307E\u3059\uFF09\u3002\u30DA\u30C3\u30C8\u306E\u5B9F\u884C\u4E2D\u306B\u4E0A\u8A18\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u524A\u9664\u3057\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002",
      uninstallStep2: "2. \u30D7\u30E9\u30B0\u30A4\u30F3\u672C\u4F53\u3092\u524A\u9664\u3057\u307E\u3059\uFF08\u30BF\u30FC\u30DF\u30CA\u30EB\u3067\u5B9F\u884C\u3057\u307E\u3059\u3002profile \u306E bundle \u30EC\u30A4\u30E4\u30FC\u304B\u3089\u3082\u540C\u6642\u306B\u524A\u9664\u3055\u308C\u307E\u3059\uFF09\uFF1A",
      uninstallStep3: "3. \u4E0A\u8A18\u306E\u5834\u6240\u3092\u5FC5\u8981\u306B\u5FDC\u3058\u3066\u524A\u9664\u3057\u307E\u3059\uFF1A\u30AD\u30E3\u30C3\u30B7\u30E5\u306F\u524A\u9664\u3057\u3066\u3082\u5F71\u97FF\u3042\u308A\u307E\u305B\u3093\u3002\u300C\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30E6\u30FC\u30B6\u30FC\u30C7\u30FC\u30BF\u300D\u3092\u524A\u9664\u3059\u308B\u3068\u8A2D\u5B9A\u3068\u4F1A\u8A71\u30E1\u30E2\u30EA\u304C\u5931\u308F\u308C\u307E\u3059\uFF08\u6B8B\u3057\u305F\u3044\u5834\u5408\u306F\u4E2D\u306E main-config.jsonc \u3092\u5148\u306B\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3057\u3066\u304F\u3060\u3055\u3044\uFF09\u3002",
      motionTitle: "\u30A2\u30AF\u30B7\u30E7\u30F3\u983B\u5EA6",
      motionHint: "4\u3064\u306E\u6B04\uFF1A\u5F85\u6A5F / \u65B9\u5411\u8EE2\u63DB / \u79FB\u52D5\u306F\u7DE8\u96C6\u3067\u304D\u3001\u30E9\u30F3\u30C0\u30E0\u30A2\u30AF\u30B7\u30E7\u30F3\u306F\u81EA\u52D5\u8A08\u7B97\uFF08100 \u2212 \u6B8B\u308A3\u3064\uFF09\u3002\u30B0\u30ED\u30FC\u30D0\u30EB\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u3001\u3059\u3079\u3066\u306E\u30DA\u30C3\u30C8\u306B\u5171\u901A\u3067\u3059\u3002pet pack \u306F\u81EA\u8EAB\u306E\u7A2E\u985E\u30D5\u30A1\u30A4\u30EB\u3067\u4E0A\u66F8\u304D\u3067\u304D\u307E\u3059\u3002",
      "motion.idle": "\u5F85\u6A5F",
      "motion.turn": "\u65B9\u5411\u8EE2\u63DB",
      "motion.move": "\u79FB\u52D5",
      "motion.action": "\u30E9\u30F3\u30C0\u30E0\u30A2\u30AF\u30B7\u30E7\u30F3",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/pt.ts
var pt;
var init_pt = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/pt.ts"() {
    pt = {
      nav: "Configura\xE7\xE3o do pet",
      intro: "Gerencie v\xE1rios pets: cada um tem tamanho e posi\xE7\xE3o pr\xF3prios (aplicado na hora ap\xF3s salvar).",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "Pet",
      avatarLabel: "Avatar",
      avatarHint: 'A imagem pequena exibida ao lado das mensagens deste pet no painel de conversa. Sem envio, usa-se o logotipo padr\xE3o do plugin; o envio vale na hora e substitui o anterior, sem clicar em "Salvar".',
      avatarUpload: "Enviar avatar",
      avatarChange: "Trocar",
      avatarUploading: "Enviando\u2026",
      avatarUploaded: "Avatar atualizado",
      petCardHint: 'Ajustes por pet: nome / tamanho / exibi\xE7\xE3o / posi\xE7\xE3o / deslocamentos / os quatro interruptores. Clique em "Salvar" no fim para aplicar na hora.',
      globalTitle: "Interruptores globais",
      globalHint: 'Compartilhados por todos os pets (um pet pack pode sobrescrev\xEA-los no arquivo do pr\xF3prio tipo). Estes interruptores s\xF3 mudam o estado local e s\xE3o gravados na configura\xE7\xE3o do usu\xE1rio ao "Salvar" (nunca na hora); as notifica\xE7\xF5es do sistema s\xE3o relidas logo ap\xF3s salvar, sem recarregar a p\xE1gina.',
      cornerHint: "Em qual canto da tela o pet fica (no desktop, conforme a \xE1rea de trabalho de cada monitor).",
      marginXHint: "Dist\xE2ncia horizontal at\xE9 o canto escolhido (px); qualquer n\xFAmero.",
      marginYHint: "Dist\xE2ncia vertical at\xE9 o canto escolhido (px); qualquer n\xFAmero.",
      // 「/」命令菜单的行标题（图标由 app.ts 经 command-faces.ts 补上）。
      "cmd.chat": "Conversa",
      "cmd.pet": "Pet",
      "cmd.balance": "Saldo",
      "shortcut.open": "Abrir o chat do pet",
      "shortcut.chat": "Abrir a janela de chat",
      "shortcut.hear": "Entrada de voz",
      "shortcut.capture": "Captura de tela para o chat",
      shortcutCardTitle: "Atalhos",
      shortcutCardHint: "Ao expandir h\xE1 dois grupos: atalhos do pet e atalhos globais.",
      shortcutRowChat: "Abrir chat",
      shortcutRowHold: "Segurar para falar",
      shortcutRowHear: "Entrada de voz",
      shortcutRowCapture: "Captura de tela",
      shortcutRowPaste: "Colar imagem",
      shortcutRowTodo: "Tarefas",
      shortcutRowSleep: "Dormir / acordar",
      shortcutRowDisplay: "Posi\xE7\xE3o de exibi\xE7\xE3o",
      shortcutRowSidebar: "Abrir chat lateral",
      shortcutGroupPet: "Atalhos do pet",
      shortcutGroupPetHint: "Na web basta passar o ponteiro sobre o pet. Na janela do desktop, clique no pet primeiro para ele receber o foco do teclado.",
      shortcutGroupGlobal: "Atalhos globais",
      shortcutGroupGlobalHint: "S\xE3o distribu\xEDdos pelo DSH na web e na janela do desktop; mudam em Configura\xE7\xF5es \u2192 Geral \u2192 Atalhos.",
      petsLabel: "Pets",
      add: "Adicionar pet",
      remove: "Remover",
      confirmRemove: 'Excluir o pet "{id}"?',
      confirmTitle: "Confirmar a\xE7\xE3o",
      cancel: "Cancelar",
      ok: "Entendi",
      atLeastOne: "Mantenha pelo menos um pet.",
      emptyPets: 'Nenhum pet ainda \u2014 clique em "Adicionar pet" para criar.',
      sizeLabel: "Tamanho (largura px)",
      sizeHint: "A altura \xE9 autom\xE1tica = largura \xD7 9/16.",
      sizePercentLabel: "Largura m\xE1x. da tela (%)",
      sizePercentHint: "Quanto da largura da tela o pet pode ocupar: 100 = nunca mais largo que uma tela (igual ao px em janelas largas); 30\u201340 deixa bem menor no celular sem mudar o desktop. Calculado uma vez ao carregar; recarregue ap\xF3s redimensionar.",
      nameLabel: "Nome",
      nameHint: 'Nome exibido ao passar o mouse e inclu\xEDdo na persona da IA ("seu nome \xE9 X"). Pode repetir; vazio usa o id do pet.',
      personaLabel: "Persona (opcional)",
      personaHint: 'Vale s\xF3 para este pet. Vazio = segue a persona da entrada \u2014 o texto cinza na caixa \xE9 exatamente isso. O system enviado ao modelo = este texto + uma linha "seu nome \xE9 <nome>" anexada automaticamente + o contexto de hora atual, ent\xE3o n\xE3o repita o nome nem a data aqui.',
      personaCount: "{n} caracteres",
      balanceEnabled: "Saldo",
      balanceEnabledHint: "Quando ativado, este pet toca as anima\xE7\xF5es de saldo e mostra o bal\xE3o de saldo.",
      whisperEnabled: "Sussurro",
      whisperEnabledHint: "Quando ativado, este pet gera uma frase com IA periodicamente e toca a anima\xE7\xE3o de sussurro (persona = o campo abaixo; vazio segue a entrada).",
      workStatusEnabled: "Status de trabalho",
      workStatusEnabledHint: "Quando ativado, este pet segue o estado de trabalho do DSH: pensando / trabalhando / aguardando confirma\xE7\xE3o / conclu\xEDdo / erro trocam a anima\xE7\xE3o e mostram bal\xF5es (o pool fica na configura\xE7\xE3o de topo; apenas escuta, sem chamar o modelo).",
      fixedEnabled: "Fixar no lugar",
      fixedEnabledHint: "Quando ativado, a cadeia aleat\xF3ria n\xE3o gira nem afasta mais este pet \u2014 s\xF3 tocam as a\xE7\xF5es de espera no lugar. Escolhas pelo menu de contexto, gatilhos da API e anima\xE7\xF5es de saldo / sussurro / status de trabalho n\xE3o s\xE3o afetadas.",
      displayLabel: "Exibi\xE7\xE3o",
      displayHint: "web = s\xF3 no navegador / desktop = s\xF3 no desktop / both = nos dois / none = em nenhum",
      "display.web": "S\xF3 no navegador",
      "display.desktop": "S\xF3 no desktop",
      "display.both": "Nos dois",
      "display.none": "Em nenhum",
      cornerLabel: "Posi\xE7\xE3o",
      "corner.top-left": "Canto superior esquerdo",
      "corner.top-right": "Canto superior direito",
      "corner.bottom-left": "Canto inferior esquerdo",
      "corner.bottom-right": "Canto inferior direito",
      marginX: "Deslocamento horizontal",
      marginY: "Deslocamento vertical",
      save: "Salvar",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "Sincronizar",
      confirmSync: "Sincronizar? Isso sobrescreve a configura\xE7\xE3o do usu\xE1rio com a configura\xE7\xE3o padr\xE3o inclu\xEDda no projeto (todos os campos + coment\xE1rios); as personaliza\xE7\xF5es atuais ser\xE3o perdidas.",
      corruptTitle: "A configura\xE7\xE3o do usu\xE1rio est\xE1 corrompida \u2014 n\xE3o salva",
      corruptConfirm: "Salvar mesmo assim",
      corruptBody: "N\xE3o foi poss\xEDvel ler a configura\xE7\xE3o do usu\xE1rio (conte\xFAdo corrompido, n\xE3o \xE9 JSON/JSONC v\xE1lido): {path}. Salvar agora recria o arquivo a partir da lista branca \u2014 tudo o que est\xE1 nele hoje (anima\xE7\xF5es / f\xEDsica / memes etc.) ser\xE1 perdido. Cancelar = n\xE3o mexe no arquivo (corrija e salve de novo); Confirmar = salva mesmo assim (descarta o conte\xFAdo atual do arquivo).",
      syncHint: '"Sincronizar" grava a configura\xE7\xE3o padr\xE3o inclu\xEDda no projeto (com coment\xE1rios e todos os campos avan\xE7ados) no arquivo do usu\xE1rio, sobrescrevendo suas personaliza\xE7\xF5es; depois disso o arquivo j\xE1 pode ser editado direto. Dois avisos: (1) uma vez criado, o arquivo \xE9 uma camada de sobrescrita expl\xEDcita \u2014 mudan\xE7as nos padr\xF5es do projeto n\xE3o passam a valer sozinhas (s\xF3 sincronizando de novo ou apagando o arquivo); (2) clicar em "Salvar" nesta p\xE1gina reescreve o arquivo pela lista branca \u2014 os valores s\xE3o mantidos, os coment\xE1rios s\xE3o removidos.',
      configMeta: "Configura\xE7\xE3o avan\xE7ada (arquivos)",
      configMetaHint: 'A configura\xE7\xE3o do usu\xE1rio pode sobrescrever a lista de pets / pools de anima\xE7\xE3o / pesos \u2014 recarregue ou reinicie para aplicar: no navegador atualize a p\xE1gina, no desktop clique com o bot\xE3o direito no pet \u2192 "Recarregar configura\xE7\xE3o" (recria todas as janelas de pet do desktop); a configura\xE7\xE3o padr\xE3o \xE9 a refer\xEAncia completa.',
      defaultConfig: "Configura\xE7\xE3o padr\xE3o (somente leitura, refer\xEAncia completa)",
      userConfig: "Configura\xE7\xE3o do usu\xE1rio (sobrescritas personalizadas)",
      todosFile: "Dados de tarefas (texto, prazo e estado de conclus\xE3o; apagar equivale a limpar tudo)",
      animationDir: "Pasta de anima\xE7\xF5es (adicione ou personalize anima\xE7\xF5es aqui)",
      memesDir: "Pasta de memes (adicione ou personalize imagens aqui)",
      logFile: "Arquivo de log (para diagn\xF3stico; pode ser limpo)",
      logFileNote: "O app desktop do DSH n\xE3o tem console, ent\xE3o todo log de execu\xE7\xE3o do plugin (inicializa\xE7\xE3o, travamentos e rein\xEDcios do pet, erros e avisos) vai para este \xFAnico arquivo \u2014 anexe-o ao relatar um problema. Limite de 1 MB por arquivo; ao encher, s\xF3 os 512 KB mais recentes s\xE3o mantidos.",
      saved: "Salvo \u2014 os pets atualizaram na hora.",
      loadError: "Falha ao carregar a configura\xE7\xE3o",
      saveError: "Falha ao salvar a configura\xE7\xE3o. Verifique a conex\xE3o com o servidor, a permiss\xE3o de escrita na pasta de configura\xE7\xE3o e o log do servidor.",
      saveInvalid: "Falha ao salvar a configura\xE7\xE3o: conte\xFAdo inv\xE1lido. Revise os valores e tente de novo.",
      syncError: "Falha ao sincronizar a configura\xE7\xE3o. Verifique a conex\xE3o com o servidor e a permiss\xE3o de escrita na pasta de configura\xE7\xE3o.",
      loading: "Carregando configura\xE7\xE3o\u2026",
      retry: "Tentar de novo",
      invalid: "Revise os valores: o tamanho precisa ser positivo; as margens podem ser qualquer n\xFAmero.",
      busy: "Salvando\u2026",
      extraPetsHint: 'Mais {n} tipo(s) v\xEAm de arquivos na pasta pet/ (<nome>-config.json + <nome>-animation/). Troque para eles na linha "Tipos" acima; salvar grava no config de cada pacote, nunca no main-config.jsonc.',
      kindLabel: "Tipos",
      kindMain: "Embutido",
      lastOfKind: '"{entry}" tem s\xF3 este pet \u2014 exclu\xED-lo remove o tipo inteiro. Para remover de vez, apague os arquivos do pet pack.',
      savePartial: "Os pets principais foram salvos, mas {names} n\xE3o p\xF4de ser gravado: verifique se o config do pacote \xE9 v\xE1lido e se a pasta permite escrita.",
      notifyToggle: "Notifica\xE7\xF5es do sistema",
      notifyToggleHint: "Avisos do sistema (canto inferior direito do desktop) para fim de conversa, falhas, pedidos de permiss\xE3o e perguntas \u2014 s\xF3 enquanto esta janela est\xE1 sem foco.",
      clickSoundToggle: "Som de clique",
      clickSoundToggleHint: 'Toca o som de clique embutido (assets/sound/click-duck.wav, volume 0.5) quando o pet \xE9 clicado; cliques repetidos em at\xE9 100ms tocam uma vez s\xF3, ent\xE3o v\xE1rios pets n\xE3o empilham som. Desligue para sil\xEAncio total. Gravado na configura\xE7\xE3o do usu\xE1rio junto com o "Salvar".',
      whisperImageToggle: "Imagens no sussurro",
      whisperImageToggleHint: "Anexa um meme aleat\xF3rio do pool a cada sussurro (o mapeamento de imagens fica no campo de topo memes). Tokens: o sussurro j\xE1 chama o modelo a cada ciclo, ent\xE3o a imagem s\xF3 acrescenta o nome + a descri\xE7\xE3o daquele meme (~100 caracteres / ~60 tokens) ao mesmo pedido \u2014 desprez\xEDvel.",
      chatImageToggle: "Imagens na conversa",
      chatImageToggleHint: "Deixa a IA escolher um meme do pool conforme o contexto atual (opcional; o mapeamento fica no campo de topo memes). Tokens: cada mensagem leva o cat\xE1logo inteiro \u2014 hoje ~1,1 mil caracteres (~650 tokens, cerca de 11x o caso do sussurro) e cresce com o n\xFAmero de imagens; desligado, n\xE3o acrescenta nada.",
      chatAnimationToggle: "A\xE7\xF5es na conversa",
      chatAnimationToggleHint: "Quando ligado, o pedido de conversa leva a lista de anima\xE7\xF5es que podem ser encenadas (todas as a\xE7\xF5es de animations.categories): se o modelo considerar que a frase realmente encena uma delas, o pet a executa na hora; caso contr\xE1rio responde s\xF3 com texto. Tokens: cada mensagem leva a lista inteira; desligado n\xE3o acrescenta nada. Valor padr\xE3o global para todos os pets (um pet pack pode substitu\xED-lo no pr\xF3prio arquivo de configura\xE7\xE3o).",
      confineToggle: "Fixar na tela atual",
      confineToggleHint: "V\xE1rios monitores: quando ligado, o pet fica dentro da tela em que est\xE1 \u2014 um pet arremessado quica s\xF3 na tela onde foi solto (as emendas entre telas viram paredes, ele n\xE3o voa para a tela vizinha), e o passeio aut\xF4nomo s\xF3 anda dentro da tela atual (o passo que cruzaria a emenda \xE9 cancelado). Desligado, ele cruza telas normalmente. S\xF3 afeta o modo desktop \u2014 o overlay do navegador j\xE1 fica dentro da viewport.",
      trayToggle: "Bandeja do sistema",
      trayToggleHint: 'Mostra um \xEDcone na \xE1rea de notifica\xE7\xE3o (barra de menus no macOS) quando o modo desktop inicia. Ele lista todos os pets da configura\xE7\xE3o e alterna a exibi\xE7\xE3o de cada um \u2014 inclusive os que est\xE3o fora do desktop agora e n\xE3o t\xEAm janela para clicar com o bot\xE3o direito. Sem ele, para trazer um pet de volta ao desktop \xE9 preciso abrir o navegador (a p\xE1gina de configura\xE7\xE3o, ou clicar com o bot\xE3o direito no pet na web). O Windows j\xE1 esconde \xEDcones de terceiros na gaveta "\xEDcones ocultos". S\xF3 afeta o modo desktop.',
      voiceTitle: "Voz",
      voiceHint: 'Quatro interruptores e uma voz: cada tipo de fala tem o pr\xF3prio interruptor e nenhum depende de outro. Tudo desligado por padr\xE3o; gravado na configura\xE7\xE3o do usu\xE1rio ao "Salvar" (nunca na hora).',
      voiceEnabled: "Falar sussurros manuais",
      voiceEnabledHint: "Fala os sussurros disparados pelo menu de contexto ou por um comando de barra, e tamb\xE9m as respostas da conversa. O bot\xE3o de alto-falante do painel de conversa fala uma \xFAnica frase assim que voc\xEA o aperta. S\xF3 decide se sai som: bal\xF5es, mem\xF3ria da conversa e pop-ups de notifica\xE7\xE3o do sistema n\xE3o mudam; falha na s\xEDntese s\xF3 gera log e nunca interrompe a conversa.",
      voiceWhisperEnabled: "Falar sussurros",
      voiceWhisperEnabledHint: "Fala o sussurro gerado periodicamente. Desligado por padr\xE3o \u2014 sussurros s\xE3o narra\xE7\xE3o de fundo e n\xE3o devem fazer barulho sem pedir.",
      voiceTodoEnabled: "Falar lembretes de tarefas",
      voiceTodoEnabledHint: "Fala o lembrete quando uma tarefa vence (o bal\xE3o continua aparecendo; isto s\xF3 decide se fala). Desligado por padr\xE3o.",
      voiceNotifyEnabled: "Falar estado de trabalho",
      voiceNotifyEnabledHint: "Fala uma frase configurada de estado de trabalho quando uma tarefa termina, falha ou aguarda sua confirma\xE7\xE3o. Como as notifica\xE7\xF5es do sistema, s\xF3 fala enquanto voc\xEA n\xE3o est\xE1 nesta p\xE1gina (outro aplicativo, sem foco, minimizado) \u2014 sem interromper enquanto voc\xEA olha para a tela. S\xF3 a frase configurada \xE9 falada, nunca o detalhe da tarefa. Desligado por padr\xE3o.",
      voiceNameLabel: "Voz",
      voiceVolumeLabel: "Volume",
      voiceVolumeHint: "Volume de reprodu\xE7\xE3o em decimal 0\u20131: 1 \xE9 o volume m\xE1ximo (100%) e 0 silencia. Altera apenas a intensidade e n\xE3o sintetiza o \xE1udio de novo, ent\xE3o ajust\xE1-lo n\xE3o custa nada extra. Os quatro tipos de fala compartilham este mesmo volume.",
      physicsTitle: "F\xEDsica (sensa\xE7\xE3o de arrastar e arremessar)",
      physicsHint: 'Padr\xE3o global, compartilhado por todos os pets (um pet pack pode sobrescrever no arquivo do pr\xF3prio tipo); gravado na configura\xE7\xE3o do usu\xE1rio ao "Salvar" (nunca na hora). No navegador vale na hora; no desktop vale quando o "Salvar" recarrega as janelas do pet.',
      mobileTitle: "Efeitos no celular",
      mobileHint: "S\xF3 fazem sentido no navegador do celular: a vibra\xE7\xE3o precisa de motor, os dois interruptores de movimento precisam de sensores de inclina\xE7\xE3o/acelera\xE7\xE3o, e os sensores exigem HTTPS ou localhost.",
      "physics.gravity": "Gravidade",
      "physics.gravityHint": "px/s\xB2 \u2014 quanto maior, mais r\xE1pido cai; 0 = sem gravidade (voa em linha reta para sempre)",
      "physics.restitution": "Restitui\xE7\xE3o",
      "physics.restitutionHint": "0\u20131, velocidade mantida ao quicar na parede ou no ch\xE3o (1 = totalmente el\xE1stico, 0 = para na hora)",
      "physics.groundFriction": "Atrito de contato",
      "physics.groundFrictionHint": "por segundo, perda de velocidade ao longo de qualquer superf\xEDcie (parede, ch\xE3o, teto); 0 = gelo em todas",
      "physics.throwPower": "For\xE7a de arremesso",
      "physics.throwPowerHint": "> 0, multiplicador geral da mola que segue o cursor e da velocidade de sa\xEDda (1 = padr\xE3o; maior = mais colado ao cursor e arremessos mais fortes)",
      physicsCeilingBounce: "Quicar no teto",
      physicsCeilingBounceHint: "Desligado, o arremesso pode sair pelo topo da tela (a gravidade ainda traz o pet de volta)",
      physicsPetCollision: "Colis\xE3o entre pets",
      physicsPetCollisionHint: "Um pet em voo quica nos outros com conserva\xE7\xE3o de momento (massa \u221D tamanho\xB2)",
      physicsHaptic: "Vibra\xE7\xE3o ao colidir",
      physicsHapticHint: "Uma vibra\xE7\xE3o por impacto (paredes, ch\xE3o, teto, outros pets). Funciona no Chrome/Edge; n\xE3o no iOS nem em navegadores WebView como o Via. O modo N\xE3o perturbe bloqueia o vibrador.",
      physicsTilt: "Gravidade por inclina\xE7\xE3o",
      physicsTiltHint: "Incline o celular e a gravidade acompanha (magnitude = o valor acima); com gravidade em 0 a inclina\xE7\xE3o n\xE3o faz nada. Requer HTTPS/localhost.",
      physicsShake: "Sacudir para arremessar",
      physicsShakeHint: "Sacuda para arremessar o pet na dire\xE7\xE3o do gesto; a for\xE7a acompanha o throwPower. Independe da gravidade, ent\xE3o funciona com gravidade 0. Requer HTTPS/localhost.",
      invalidPhysics: "Revise os valores de f\xEDsica: gravidade / atrito com o ch\xE3o \u2265 0, restitui\xE7\xE3o 0\u20131, for\xE7a de arremesso > 0.",
      fontTitle: "Apar\xEAncia e fonte",
      fontHint: 'A fam\xEDlia vale para todo texto que hoje usa a fonte candy: bal\xE3o do pet, dica ao passar o mouse, janela de conversa, popup de pontua\xE7\xE3o. O tamanho vale s\xF3 para o bal\xE3o do pet e a dica (as janelas de conversa e de pontua\xE7\xE3o mant\xEAm o pr\xF3prio tamanho). Padr\xE3o global, compartilhado por todos os pets (um pet pack pode sobrescrever no arquivo do pr\xF3prio tipo); gravado na configura\xE7\xE3o do usu\xE1rio ao "Salvar" \u2014 na hora no navegador, e no desktop quando o "Salvar" recarrega as janelas do pet.',
      fontFamilyLabel: "Fonte",
      fontFamilyHint: '"Candy (embutida)" vem com o plugin; as demais s\xE3o fontes do sistema. Se faltar na m\xE1quina, cai para a pr\xF3xima da pilha (nunca fica em branco nem d\xE1 erro).',
      fontSizeLabel: "Tamanho da fonte (px)",
      fontSizeHint: "Tamanho do texto do bal\xE3o; a dica e as linhas menores dentro do bal\xE3o escalam na propor\xE7\xE3o. Faixa 4\u2013200.",
      fontFollowToggle: "Escalar a fonte com o tamanho do pet",
      fontFollowToggleHint: "Ligado (padr\xE3o): a fonte cresce com o pet \u2014 com 462 px de largura fica exatamente no tamanho definido acima. Desligado: o tamanho fica fixo, independente do pet.",
      invalidFont: "Revise as configura\xE7\xF5es de fonte: a fam\xEDlia precisa estar na lista e o tamanho precisa ser um n\xFAmero entre 4 e 200.",
      "font.candy": "Candy (embutida)",
      "font.yahei": "Microsoft YaHei / PingFang",
      "font.youyuan": "YouYuan",
      "font.kaiti": "KaiTi",
      "font.simsun": "SimSun",
      "font.comic": "Comic Sans MS",
      "font.system": "Padr\xE3o do sistema",
      modelTitle: "Conversa e modelos",
      modelHint: 'Qual modelo o sussurro e a conversa usam, e quanta hist\xF3ria cada pedido de conversa carrega. "Seguir a conversa atual" usa o modelo da conversa em que voc\xEA est\xE1 (padr\xE3o). Padr\xE3o global: vale para todos os pets, e um pet pack pode sobrescrever no arquivo do pr\xF3prio tipo. As op\xE7\xF5es v\xEAm da mesma fonte do seletor de modelos do DSH, servidas pelo host em tempo real.',
      modelFollow: "Seguir a conversa atual",
      modelSearch: "Buscar modelos\u2026",
      modelEmpty: "Nenhum modelo corresponde.",
      modelNoModels: "Nenhum modelo dispon\xEDvel.",
      modelLoading: "Atualizando a lista de modelos\u2026",
      modelTriggerAria: "Escolher modelo, atual {model}",
      modelUnknown: " (configura\xE7\xE3o atual, fora da lista)",
      modelNone: "Este provedor n\xE3o tem modelos dispon\xEDveis",
      whisperModelLabel: "Modelo do sussurro",
      chatModelLabel: "Modelo da conversa",
      modelFieldHint: '"Seguir a conversa atual" usa o modelo da conversa; se um modelo escolhido falhar, o plugin volta ao modelo da conversa e tenta mais uma vez.',
      invalidModel: "Revise as configura\xE7\xF5es de modelo: escolha provedor e modelo, ou deixe os dois vazios (seguir a conversa atual).",
      modelCatalogFailed: "Falha ao carregar a lista de modelos (atualize a p\xE1gina para tentar de novo); os valores atuais s\xE3o mantidos como est\xE3o.",
      chatMemory: "Rodadas de hist\xF3rico",
      chatMemoryHint: "Quantas rodadas recentes cada pedido de conversa carrega (1 rodada = 1 pergunta + 1 resposta; 0 = sem hist\xF3rico, cada mensagem come\xE7a do zero). A mem\xF3ria em si guarda tudo \u2014 isto s\xF3 decide quanto entra no contexto: mais mem\xF3ria, mais tokens. Padr\xE3o global, compartilhado por todos os pets (um pet pack pode sobrescrever no arquivo do pr\xF3prio tipo).",
      invalidChatMemory: "Revise as rodadas de hist\xF3rico: precisa ser um n\xFAmero \u2265 0.",
      chatImageLimit: "Limite de imagens na conversa",
      chatImageLimitHint: 'Quantos memes no m\xE1ximo s\xE3o listados ao modelo na conversa ("primeiros N" = os N primeiros da configura\xE7\xE3o, ent\xE3o mova para o come\xE7o os que quer enviar). A lista inteira vai em cada mensagem e os tokens crescem linearmente com a quantidade, ent\xE3o lista longa \xE9 gasto puro; limitar aos N primeiros faz o modelo escolher s\xF3 entre eles. 0 = sem limite (envia tudo). Padr\xE3o embutido 10. Padr\xE3o global, compartilhado por todos os pets (um pet pack pode sobrescrever no arquivo do pr\xF3prio tipo). S\xF3 afeta a conversa \u2014 o sussurro leva s\xF3 o meme sorteado.',
      invalidChatImageLimit: "Revise o limite de imagens na conversa: precisa ser um n\xFAmero \u2265 0 (0 = sem limite).",
      notifyTest: "Testar notifica\xE7\xE3o",
      notifyTestOk: "Notifica\xE7\xE3o de teste enviada \u2014 veja o canto inferior direito do desktop.",
      notifyDenyUnsupported: "Este ambiente n\xE3o suporta notifica\xE7\xF5es do sistema (sem API Notification no navegador).",
      notifyDenyBlocked: "A permiss\xE3o de notifica\xE7\xE3o est\xE1 marcada como bloqueada pelo navegador.",
      notifyDenyRejected: 'Voc\xEA escolheu "Bloquear" na janela de permiss\xE3o.',
      notifyDenyError: "Erro ao pedir permiss\xE3o",
      notifyGuide: 'Como liberar: clique no \u{1F512}/\u24D8 ao lado da barra de endere\xE7os \u2192 "Configura\xE7\xF5es do site" \u2192 "Notifica\xE7\xF5es" \u2192 mude para "Permitir", atualize a p\xE1gina e tente de novo.',
      storageTitle: "Desinstala\xE7\xE3o e armazenamento",
      storageHint: 'Todos os lugares em que o plugin grava arquivos. Apagar caches n\xE3o atrapalha (s\xE3o baixados ou recriados sozinhos); apagar "dados do usu\xE1rio do plugin" perde a configura\xE7\xE3o e a mem\xF3ria da conversa.',
      "storage.userData": "Dados do usu\xE1rio do plugin: configura\xE7\xE3o personalizada main-config.jsonc, mem\xF3ria da conversa memory.json, anima\xE7\xF5es personalizadas main-animation/, pets de arquivo pet/",
      "storage.electron": "Runtime Electron usado pelo pet do desktop (grande; \xE9 baixado de novo automaticamente na pr\xF3xima vez que o modo desktop iniciar)",
      "storage.desktopCache": "Cache das janelas do pet e cache de escala do monitor principal (pode apagar; \xE9 recriado sozinho)",
      "storage.electronCache": "Cache de download do instalador do Electron (pode apagar; \xE9 baixado de novo quando preciso)",
      "storage.package": "O plugin em si (gerenciado pelo DSH \u2014 remova com o comando abaixo em vez de apagar na m\xE3o)",
      storageMissing: " (ainda n\xE3o criado)",
      uninstallTitle: "Como desinstalar",
      uninstallStep1: "1. Feche o DSH primeiro (o pet do desktop fecha junto); n\xE3o apague os arquivos acima com o pet em execu\xE7\xE3o.",
      uninstallStep2: "2. Remova o plugin em si (no terminal; isto tamb\xE9m o tira da camada de bundle do profile):",
      uninstallStep3: '3. Apague os locais acima conforme a necessidade: caches n\xE3o fazem falta; apagar "dados do usu\xE1rio do plugin" perde a configura\xE7\xE3o e a mem\xF3ria da conversa (fa\xE7a backup do main-config.jsonc antes, se quiser manter).',
      motionTitle: "Frequ\xEAncia de a\xE7\xF5es",
      motionHint: "Quatro campos: espera / giro / movimento s\xE3o edit\xE1veis; a a\xE7\xE3o aleat\xF3ria \xE9 calculada (100 \u2212 as outras tr\xEAs). Padr\xE3o global para todos os pets; um pet pack pode sobrescrev\xEA-lo no arquivo do tipo.",
      "motion.idle": "Em espera",
      "motion.turn": "Giro",
      "motion.move": "Movimento",
      "motion.action": "A\xE7\xE3o aleat\xF3ria",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/ru.ts
var ru;
var init_ru = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/ru.ts"() {
    ru = {
      nav: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0438\u0442\u043E\u043C\u0446\u0430",
      intro: "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C\u0438 \u043F\u0438\u0442\u043E\u043C\u0446\u0430\u043C\u0438: \u0443 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0441\u0432\u043E\u0438 \u0440\u0430\u0437\u043C\u0435\u0440 \u0438 \u043F\u043E\u0437\u0438\u0446\u0438\u044F (\u043F\u0440\u0438\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u0441\u0440\u0430\u0437\u0443 \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F).",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "\u041F\u0438\u0442\u043E\u043C\u0435\u0446",
      avatarLabel: "\u0410\u0432\u0430\u0442\u0430\u0440",
      avatarHint: "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0440\u044F\u0434\u043E\u043C \u0441 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F\u043C\u0438 \u044D\u0442\u043E\u0433\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u0432 \u043F\u0430\u043D\u0435\u043B\u0438 \u0447\u0430\u0442\u0430. \u0411\u0435\u0437 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u043B\u043E\u0433\u043E\u0442\u0438\u043F \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E; \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0441\u0440\u0430\u0437\u0443 \u0438 \u0437\u0430\u043C\u0435\u043D\u044F\u0435\u0442 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u2014 \u043D\u0430\u0436\u0438\u043C\u0430\u0442\u044C \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB \u043D\u0435 \u043D\u0443\u0436\u043D\u043E.",
      avatarUpload: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440",
      avatarChange: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C",
      avatarUploading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026",
      avatarUploaded: "\u0410\u0432\u0430\u0442\u0430\u0440 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D",
      petCardHint: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0430: \u0438\u043C\u044F / \u0440\u0430\u0437\u043C\u0435\u0440 / \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 / \u043F\u043E\u0437\u0438\u0446\u0438\u044F / \u043E\u0442\u0441\u0442\u0443\u043F\u044B / \u0447\u0435\u0442\u044B\u0440\u0435 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u0439. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB \u0432\u043D\u0438\u0437\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0440\u0430\u0437\u0443.",
      globalTitle: "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u0438",
      globalHint: "\u041E\u0431\u0449\u0438\u0435 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 (\u043F\u0430\u043A\u0435\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0438\u0445 \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u0432\u0438\u0434\u0430). \u042D\u0442\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u0438 \u043C\u0435\u043D\u044F\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0438 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB (\u0431\u0435\u0437 \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438); \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0435\u0447\u0438\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0441\u0440\u0430\u0437\u0443 \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F, \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043D\u0435 \u043D\u0443\u0436\u043D\u043E.",
      cornerHint: "\u041A \u043A\u0430\u043A\u043E\u043C\u0443 \u0443\u0433\u043B\u0443 \u044D\u043A\u0440\u0430\u043D\u0430 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0451\u043D \u043F\u0438\u0442\u043E\u043C\u0435\u0446 (\u0432 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 \u2014 \u0440\u0430\u0431\u043E\u0447\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0433\u043E \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0430).",
      marginXHint: "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043E\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0443\u0433\u043B\u0430 (px); \u043B\u044E\u0431\u043E\u0435 \u0447\u0438\u0441\u043B\u043E.",
      marginYHint: "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043E\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0443\u0433\u043B\u0430 (px); \u043B\u044E\u0431\u043E\u0435 \u0447\u0438\u0441\u043B\u043E.",
      // 「/」命令菜单的行标题（图标由 app.ts 经 command-faces.ts 补上）。
      "cmd.chat": "\u0427\u0430\u0442",
      "cmd.pet": "\u041F\u0438\u0442\u043E\u043C\u0435\u0446",
      "cmd.balance": "\u0411\u0430\u043B\u0430\u043D\u0441",
      "shortcut.open": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430",
      "shortcut.chat": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043E\u043A\u043D\u043E \u0447\u0430\u0442\u0430",
      "shortcut.hear": "\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0439 \u0432\u0432\u043E\u0434",
      "shortcut.capture": "\u0421\u043D\u0438\u043C\u043E\u043A \u044D\u043A\u0440\u0430\u043D\u0430 \u0432 \u0447\u0430\u0442",
      shortcutCardTitle: "\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438",
      shortcutCardHint: "\u0412 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u043E\u043C \u0432\u0438\u0434\u0435 \u0434\u0432\u0435 \u0433\u0440\u0443\u043F\u043F\u044B: \u043A\u043B\u0430\u0432\u0438\u0448\u0438 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u0438 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438.",
      shortcutRowChat: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442",
      shortcutRowHold: "\u0423\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u0434\u043B\u044F \u0440\u0435\u0447\u0438",
      shortcutRowHear: "\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0439 \u0432\u0432\u043E\u0434",
      shortcutRowCapture: "\u0421\u043D\u0438\u043C\u043E\u043A \u044D\u043A\u0440\u0430\u043D\u0430",
      shortcutRowPaste: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      shortcutRowTodo: "\u0417\u0430\u0434\u0430\u0447\u0438",
      shortcutRowSleep: "\u0421\u043F\u0430\u0442\u044C / \u043F\u0440\u043E\u0441\u043D\u0443\u0442\u044C\u0441\u044F",
      shortcutRowDisplay: "\u041F\u043E\u0437\u0438\u0446\u0438\u044F \u043F\u043E\u043A\u0430\u0437\u0430",
      shortcutRowSidebar: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442 \u0432 \u043F\u0430\u043D\u0435\u043B\u0438",
      shortcutGroupPet: "\u041A\u043B\u0430\u0432\u0438\u0448\u0438 \u043F\u0438\u0442\u043E\u043C\u0446\u0430",
      shortcutGroupPetHint: "\u0412 \u0432\u0435\u0431-\u0432\u0435\u0440\u0441\u0438\u0438 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043D\u0430\u0432\u0435\u0441\u0442\u0438 \u043A\u0443\u0440\u0441\u043E\u0440 \u043D\u0430 \u043F\u0438\u0442\u043E\u043C\u0446\u0430. \u0412 \u043E\u043A\u043D\u0435 \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u0441\u0442\u043E\u043B\u0435 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0449\u0451\u043B\u043A\u043D\u0438\u0442\u0435 \u043F\u0438\u0442\u043E\u043C\u0446\u0430, \u0447\u0442\u043E\u0431\u044B \u043E\u043D \u043F\u043E\u043B\u0443\u0447\u0438\u043B \u0444\u043E\u043A\u0443\u0441 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044B.",
      shortcutGroupGlobal: "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438",
      shortcutGroupGlobalHint: "\u0418\u0445 \u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 DSH \u0432 \u0432\u0435\u0431-\u0432\u0435\u0440\u0441\u0438\u0438 \u0438 \u0432 \u043E\u043A\u043D\u0435 \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u0441\u0442\u043E\u043B\u0435; \u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u0432 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u2192 \u041E\u0431\u0449\u0438\u0435 \u2192 \u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438.",
      petsLabel: "\u041F\u0438\u0442\u043E\u043C\u0446\u044B",
      add: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430",
      remove: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
      confirmRemove: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \xAB{id}\xBB?",
      confirmTitle: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
      cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
      ok: "\u041F\u043E\u043D\u044F\u0442\u043D\u043E",
      atLeastOne: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u043E\u0433\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0430.",
      emptyPets: "\u041F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430\xBB, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C.",
      sizeLabel: "\u0420\u0430\u0437\u043C\u0435\u0440 (\u0448\u0438\u0440\u0438\u043D\u0430, px)",
      sizeHint: "\u0412\u044B\u0441\u043E\u0442\u0430 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 = \u0448\u0438\u0440\u0438\u043D\u0430 \xD7 9/16.",
      sizePercentLabel: "\u041C\u0430\u043A\u0441. \u0448\u0438\u0440\u0438\u043D\u0430 \u044D\u043A\u0440\u0430\u043D\u0430 (%)",
      sizePercentHint: "\u041A\u0430\u043A\u0443\u044E \u0434\u043E\u043B\u044E \u0448\u0438\u0440\u0438\u043D\u044B \u044D\u043A\u0440\u0430\u043D\u0430 \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043D\u0438\u043C\u0430\u0442\u044C \u043F\u0438\u0442\u043E\u043C\u0435\u0446: 100 = \u043D\u0435 \u0448\u0438\u0440\u0435 \u043E\u0434\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430 (\u043D\u0430 \u0448\u0438\u0440\u043E\u043A\u0438\u0445 \u043E\u043A\u043D\u0430\u0445 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441 px); 30\u201340 \u0437\u0430\u043C\u0435\u0442\u043D\u043E \u0443\u043C\u0435\u043D\u044C\u0448\u0438\u0442 \u0435\u0433\u043E \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435, \u043D\u0435 \u043C\u0435\u043D\u044F\u044F \u0434\u0435\u0441\u043A\u0442\u043E\u043F. \u0412\u044B\u0447\u0438\u0441\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435; \u043F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0440\u0430\u0437\u043C\u0435\u0440\u0430 \u043E\u043A\u043D\u0430 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443.",
      nameLabel: "\u0418\u043C\u044F",
      nameHint: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0435 \u0438\u043C\u044F: \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u0435\u0442 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u043E\u0431\u0440\u0430\u0437 \u0418\u0418 (\xAB\u0442\u0435\u0431\u044F \u0437\u043E\u0432\u0443\u0442 X\xBB). \u041C\u043E\u0436\u0435\u0442 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C\u0441\u044F; \u0435\u0441\u043B\u0438 \u043F\u0443\u0441\u0442\u043E \u2014 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F id \u043F\u0438\u0442\u043E\u043C\u0446\u0430.",
      personaLabel: "\u041E\u0431\u0440\u0430\u0437 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)",
      personaHint: '\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0430. \u041F\u0443\u0441\u0442\u043E = \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043E\u0431\u0440\u0430\u0437 \u0437\u0430\u043F\u0438\u0441\u0438 \u2014 \u0441\u0435\u0440\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0432 \u043F\u043E\u043B\u0435 \u0438 \u0435\u0441\u0442\u044C \u043E\u043D. \u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 system \u0434\u043B\u044F \u043C\u043E\u0434\u0435\u043B\u0438 = \u044D\u0442\u043E\u0442 \u0442\u0435\u043A\u0441\u0442 + \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430 \xAB\u0442\u0435\u0431\u044F \u0437\u043E\u0432\u0443\u0442 "<\u0438\u043C\u044F>"\xBB + \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043D\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0439\u0442\u0435 \u0437\u0434\u0435\u0441\u044C \u0438\u043C\u044F \u0438 \u0434\u0430\u0442\u0443.',
      personaCount: "{n} \u0441\u0438\u043C\u0432.",
      balanceEnabled: "\u0424\u0443\u043D\u043A\u0446\u0438\u044F \u0431\u0430\u043B\u0430\u043D\u0441\u0430",
      balanceEnabledHint: "\u0415\u0441\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u0435\u0442 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044E \u0431\u0430\u043B\u0430\u043D\u0441\u0430 \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043F\u0443\u0437\u044B\u0440\u044C \u0441 \u0431\u0430\u043B\u0430\u043D\u0441\u043E\u043C.",
      whisperEnabled: "\u0428\u0451\u043F\u043E\u0442",
      whisperEnabledHint: "\u0415\u0441\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u043F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438 \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u0442 \u0444\u0440\u0430\u0437\u0443 \u0447\u0435\u0440\u0435\u0437 \u0418\u0418 \u0438 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u0435\u0442 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044E \u0448\u0451\u043F\u043E\u0442\u0430 (\u043E\u0431\u0440\u0430\u0437 \u2014 \u043F\u043E\u043B\u0435 \u043D\u0438\u0436\u0435; \u043F\u0443\u0441\u0442\u043E = \u043E\u0431\u0440\u0430\u0437 \u0437\u0430\u043F\u0438\u0441\u0438).",
      workStatusEnabled: "\u0421\u0442\u0430\u0442\u0443\u0441 \u0440\u0430\u0431\u043E\u0442\u044B",
      workStatusEnabledHint: "\u0415\u0441\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u0441\u043B\u0435\u0434\u0438\u0442 \u0437\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u043C \u0440\u0430\u0431\u043E\u0442\u044B DSH: \u0440\u0430\u0437\u043C\u044B\u0448\u043B\u0435\u043D\u0438\u0435 / \u0440\u0430\u0431\u043E\u0442\u0430 / \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F / \u0433\u043E\u0442\u043E\u0432\u043E / \u043E\u0448\u0438\u0431\u043A\u0430 \u2014 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0435\u0442 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438 \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043F\u0443\u0437\u044B\u0440\u0438 (\u043F\u0443\u043B \u0432 \u043A\u043E\u043D\u0444\u0438\u0433\u0435 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F; \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0441\u043B\u0443\u0448\u0438\u0432\u0430\u043D\u0438\u0435, \u0431\u0435\u0437 \u0432\u044B\u0437\u043E\u0432\u043E\u0432 \u043C\u043E\u0434\u0435\u043B\u0438).",
      fixedEnabled: "\u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430",
      fixedEnabledHint: "\u0415\u0441\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u0430\u044F \u0446\u0435\u043F\u043E\u0447\u043A\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043F\u043E\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442 \u0438 \u043D\u0435 \u0443\u0432\u043E\u0434\u0438\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u2014 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043D\u0430 \u043C\u0435\u0441\u0442\u0435 \u0438 \u043C\u0435\u043B\u043A\u0438\u0435 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F. \u0412\u044B\u0431\u043E\u0440 \u043F\u043E \u043F\u0440\u0430\u0432\u043E\u043C\u0443 \u043A\u043B\u0438\u043A\u0443, \u0437\u0430\u043F\u0443\u0441\u043A\u0438 \u0447\u0435\u0440\u0435\u0437 API \u0438 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438 \u0431\u0430\u043B\u0430\u043D\u0441\u0430 / \u0448\u0451\u043F\u043E\u0442\u0430 / \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u043D\u0435 \u0437\u0430\u0442\u0440\u0430\u0433\u0438\u0432\u0430\u044E\u0442\u0441\u044F.",
      displayLabel: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
      displayHint: "web = \u0442\u043E\u043B\u044C\u043A\u043E \u0431\u0440\u0430\u0443\u0437\u0435\u0440 / desktop = \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u0441\u0442\u043E\u043B / both = \u0432\u0435\u0437\u0434\u0435 / none = \u043D\u0438\u0433\u0434\u0435",
      "display.web": "\u0422\u043E\u043B\u044C\u043A\u043E \u0431\u0440\u0430\u0443\u0437\u0435\u0440",
      "display.desktop": "\u0422\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u0441\u0442\u043E\u043B",
      "display.both": "\u0412\u0435\u0437\u0434\u0435",
      "display.none": "\u041D\u0438\u0433\u0434\u0435",
      cornerLabel: "\u041F\u043E\u0437\u0438\u0446\u0438\u044F",
      "corner.top-left": "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439",
      "corner.top-right": "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439",
      "corner.bottom-left": "\u041D\u0438\u0436\u043D\u0438\u0439 \u043B\u0435\u0432\u044B\u0439",
      "corner.bottom-right": "\u041D\u0438\u0436\u043D\u0438\u0439 \u043F\u0440\u0430\u0432\u044B\u0439",
      marginX: "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0441\u0442\u0443\u043F",
      marginY: "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0441\u0442\u0443\u043F",
      save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
      confirmSync: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C? \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u0431\u0443\u0434\u0435\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0438\u0441\u0430\u043D \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u043C \u043A\u043E\u043D\u0444\u0438\u0433\u043E\u043C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E (\u0432\u0441\u0435 \u043F\u043E\u043B\u044F + \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438); \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B.",
      corruptTitle: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D \u2014 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D",
      corruptConfirm: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u0438\u043D\u0443\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E",
      corruptBody: "\u041D\u0435 \u0443\u0434\u0430\u0451\u0442\u0441\u044F \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043A\u043E\u043D\u0444\u0438\u0433\u0430 (\u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D, \u043D\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u044B\u0439 JSON/JSONC): {path}. \u041F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u0444\u0430\u0439\u043B \u0431\u0443\u0434\u0435\u0442 \u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0440\u0430\u043D \u043F\u043E \u0431\u0435\u043B\u043E\u043C\u0443 \u0441\u043F\u0438\u0441\u043A\u0443 \u2014 \u0432\u0441\u0451 \u0442\u0435\u043A\u0443\u0449\u0435\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 (animations / physics / memes \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u043F\u043E\u043B\u044F) \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u043E. \u041E\u0442\u043C\u0435\u043D\u0430 = \u043D\u0435 \u0442\u0440\u043E\u0433\u0430\u0442\u044C \u0444\u0430\u0439\u043B (\u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0438\u0441\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0444\u0438\u0433 \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0441\u043D\u043E\u0432\u0430); \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C = \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u0438\u043D\u0443\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E (\u043E\u0442\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0444\u0430\u0439\u043B\u0430).",
      syncHint: "\xAB\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C\xBB \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E (\u0441 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F\u043C\u0438 \u0438 \u0432\u0441\u0435\u043C\u0438 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u043C\u0438 \u043F\u043E\u043B\u044F\u043C\u0438) \u0432 \u0444\u0430\u0439\u043B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043A\u043E\u043D\u0444\u0438\u0433\u0430, \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044F \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438; \u043F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u0444\u0430\u0439\u043B \u043C\u043E\u0436\u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E. \u0414\u0432\u0430 \u0437\u0430\u043C\u0435\u0447\u0430\u043D\u0438\u044F: \u2460 \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0444\u0430\u0439\u043B \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u044F\u0432\u043D\u044B\u043C \u0441\u043B\u043E\u0435\u043C \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u2014 \u043F\u043E\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 (\u043F\u043E\u043A\u0430 \u043D\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u0443\u0435\u0442\u0435 \u0441\u043D\u043E\u0432\u0430 \u0438\u043B\u0438 \u043D\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u0435 \u0444\u0430\u0439\u043B); \u2461 \u043D\u0430\u0436\u0430\u0442\u0438\u0435 \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB \u043D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0444\u0430\u0439\u043B \u043F\u043E \u0431\u0435\u043B\u043E\u043C\u0443 \u0441\u043F\u0438\u0441\u043A\u0443 (\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u0435\u0439 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F, \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0443\u0434\u0430\u043B\u044F\u044E\u0442\u0441\u044F).",
      configMeta: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u0430\u044F \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F (\u0444\u0430\u0439\u043B\u044B)",
      configMetaHint: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 / \u043F\u0443\u043B\u044B \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0439 / \u0432\u0435\u0441\u0430 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u2014 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430: \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443, \u0432 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 \u0449\u0451\u043B\u043A\u043D\u0438\u0442\u0435 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043F\u0440\u0430\u0432\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 \u2192 \xAB\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433\xBB (\u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u043A\u043D\u0430 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432); \u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u2014 \u043F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A.",
      defaultConfig: "\u041A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E (\u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435, \u043F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A)",
      userConfig: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 (\u0441\u0432\u043E\u0438 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F)",
      todosFile: "\u0414\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447 (\u0442\u0435\u043A\u0441\u0442 \u0441\u043F\u0438\u0441\u043A\u0430, \u0441\u0440\u043E\u043A \u0438 \u0441\u0442\u0430\u0442\u0443\u0441 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F; \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043E\u0447\u0438\u0449\u0430\u0435\u0442 \u0432\u0441\u0435 \u0437\u0430\u0434\u0430\u0447\u0438)",
      animationDir: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0439 (\u043C\u043E\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0438 \u0437\u0430\u043C\u0435\u043D\u044F\u0442\u044C \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438)",
      memesDir: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043C\u0435\u043C\u043E\u0432 (\u043C\u043E\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0438 \u0437\u0430\u043C\u0435\u043D\u044F\u0442\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438)",
      logFile: "\u0424\u0430\u0439\u043B \u0436\u0443\u0440\u043D\u0430\u043B\u0430 (\u0434\u043B\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438; \u043C\u043E\u0436\u043D\u043E \u043E\u0447\u0438\u0449\u0430\u0442\u044C)",
      logFileNote: "\u0412 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043D\u0435\u0442 \u043A\u043E\u043D\u0441\u043E\u043B\u0438, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0432\u0441\u0435 \u0436\u0443\u0440\u043D\u0430\u043B\u044B \u0440\u0430\u0431\u043E\u0442\u044B \u043F\u043B\u0430\u0433\u0438\u043D\u0430 (\u0437\u0430\u043F\u0443\u0441\u043A, \u043F\u0430\u0434\u0435\u043D\u0438\u044F \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0438 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432, \u043E\u0448\u0438\u0431\u043A\u0438 \u0438 \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u044F) \u043F\u0438\u0448\u0443\u0442\u0441\u044F \u0432 \u044D\u0442\u043E\u0442 \u0435\u0434\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0444\u0430\u0439\u043B; \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0440\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u043E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0435. \u041B\u0438\u043C\u0438\u0442 \u0444\u0430\u0439\u043B\u0430 \u2014 1 \u041C\u0411, \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 512 \u041A\u0411.",
      saved: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E \u2014 \u043F\u0438\u0442\u043E\u043C\u0446\u044B \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u0438\u0441\u044C \u0441\u0440\u0430\u0437\u0443.",
      loadError: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433",
      saveError: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443, \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u0438 \u0436\u0443\u0440\u043D\u0430\u043B \u0441\u0435\u0440\u0432\u0435\u0440\u0430.",
      saveInvalid: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433: \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
      syncError: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0438 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438.",
      loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0433\u0430\u2026",
      retry: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C",
      invalid: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0432\u043E\u0434: \u0440\u0430\u0437\u043C\u0435\u0440 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C, \u043E\u0442\u0441\u0442\u0443\u043F\u044B \u2014 \u043B\u044E\u0431\u044B\u043C \u0447\u0438\u0441\u043B\u043E\u043C.",
      busy: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435\u2026",
      extraPetsHint: "\u0415\u0449\u0451 {n} \u0432\u0438\u0434\u0430 \u0431\u0435\u0440\u0443\u0442\u0441\u044F \u0438\u0437 \u0444\u0430\u0439\u043B\u043E\u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 pet/ (<\u0438\u043C\u044F>-config.json + <\u0438\u043C\u044F>-animation/); \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u043D\u0438\u0445 \u0432 \u0441\u0442\u0440\u043E\u043A\u0435 \xAB\u0412\u0438\u0434\u044B\xBB \u0432\u044B\u0448\u0435 \u2014 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0448\u0435\u0442 \u0432 \u043A\u043E\u043D\u0444\u0438\u0433 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0433\u043E \u043F\u0430\u043A\u0435\u0442\u0430, \u043D\u0435 \u0432 main-config.jsonc.",
      kindLabel: "\u0412\u0438\u0434\u044B",
      kindMain: "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439",
      lastOfKind: "\u0423 \xAB{entry}\xBB \u043E\u0441\u0442\u0430\u043B\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u044D\u0442\u043E\u0442 \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u2014 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0443\u0431\u0435\u0440\u0451\u0442 \u0432\u0435\u0441\u044C \u0432\u0438\u0434. \u0427\u0442\u043E\u0431\u044B \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E, \u0443\u0434\u0430\u043B\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u043F\u0430\u043A\u0435\u0442\u0430.",
      savePartial: "\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043F\u0438\u0442\u043E\u043C\u0446\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B, \u043D\u043E {names} \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C: \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0430\u043B\u0438\u0434\u043D\u043E\u0441\u0442\u044C \u043A\u043E\u043D\u0444\u0438\u0433\u0430 \u043F\u0430\u043A\u0435\u0442\u0430 \u0438 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433.",
      notifyToggle: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F",
      notifyToggleHint: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u041E\u0421 (\u0432 \u043F\u0440\u0430\u0432\u043E\u043C \u043D\u0438\u0436\u043D\u0435\u043C \u0443\u0433\u043B\u0443 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u0441\u0442\u043E\u043B\u0430) \u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0438 \u0434\u0438\u0430\u043B\u043E\u0433\u0430, \u043E\u0448\u0438\u0431\u043A\u0430\u0445 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438, \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u0445 \u043F\u0440\u0430\u0432 \u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u0445 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u043E\u043A\u043D\u043E \u043D\u0435 \u0432 \u0444\u043E\u043A\u0443\u0441\u0435.",
      clickSoundToggle: "\u0417\u0432\u0443\u043A \u043A\u043B\u0438\u043A\u0430",
      clickSoundToggleHint: "\u041F\u0440\u0438 \u043A\u043B\u0438\u043A\u0435 \u043F\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0443 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0437\u0432\u0443\u043A (assets/sound/click-duck.wav, \u0433\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C 0.5); \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043A\u043B\u0438\u043A\u0438 \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 100 \u043C\u0441 \u0437\u0432\u0443\u0447\u0430\u0442 \u043E\u0434\u0438\u043D \u0440\u0430\u0437, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 \u043D\u0435 \u043D\u0430\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u044E\u0442\u0441\u044F. \u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0434\u043B\u044F \u043F\u043E\u043B\u043D\u043E\u0439 \u0442\u0438\u0448\u0438\u043D\u044B. \u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB.",
      whisperImageToggle: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 \u043A \u0448\u0451\u043F\u043E\u0442\u0443",
      whisperImageToggleHint: "\u041A \u043A\u0430\u0436\u0434\u043E\u0439 \u0444\u0440\u0430\u0437\u0435 \u0448\u0451\u043F\u043E\u0442\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u043C\u0435\u043C \u0438\u0437 \u043F\u0443\u043B\u0430 (\u0441\u043E\u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u0438\u043D\u043E\u043A \u2014 \u0432 \u043F\u043E\u043B\u0435 memes \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F \u043A\u043E\u043D\u0444\u0438\u0433\u0430). \u0422\u043E\u043A\u0435\u043D\u044B: \u0448\u0451\u043F\u043E\u0442 \u0438 \u0442\u0430\u043A \u0432\u044B\u0437\u044B\u0432\u0430\u0435\u0442 \u043C\u043E\u0434\u0435\u043B\u044C \u043A\u0430\u0436\u0434\u044B\u0439 \u0446\u0438\u043A\u043B, \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u043B\u0438\u0448\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442 \u0438\u043C\u044F + \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u043C\u0435\u043C\u0430 (~100 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 / \u224860 \u0442\u043E\u043A\u0435\u043D\u043E\u0432) \u0432 \u0442\u043E\u0442 \u0436\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u2014 \u043F\u0440\u0438\u0440\u043E\u0441\u0442 \u043D\u0435\u0437\u043D\u0430\u0447\u0438\u0442\u0435\u043B\u0435\u043D.",
      chatImageToggle: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 \u043A \u0447\u0430\u0442\u0443",
      chatImageToggleHint: "\u0418\u0418 \u0441\u0430\u043C \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043C\u0435\u043C \u0438\u0437 \u043F\u0443\u043B\u0430 \u043F\u043E\u0434 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 (\u043C\u043E\u0436\u0435\u0442 \u043D\u0435 \u0432\u044B\u0431\u0438\u0440\u0430\u0442\u044C; \u0441\u043E\u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u2014 \u0432 \u043F\u043E\u043B\u0435 memes \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F). \u0422\u043E\u043A\u0435\u043D\u044B: \u043A\u0430\u0436\u0434\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435\u0441\u0451\u0442 \u0432\u0435\u0441\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u2014 \u0441\u0435\u0439\u0447\u0430\u0441 ~1.1k \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 (\u2248650 \u0442\u043E\u043A\u0435\u043D\u043E\u0432, \u043F\u0440\u0438\u043C\u0435\u0440\u043D\u043E \u0432 11 \u0440\u0430\u0437 \u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0443 \u0448\u0451\u043F\u043E\u0442\u0430) \u0438 \u0440\u0430\u0441\u0442\u0451\u0442 \u043B\u0438\u043D\u0435\u0439\u043D\u043E \u0441 \u0447\u0438\u0441\u043B\u043E\u043C \u043A\u0430\u0440\u0442\u0438\u043D\u043E\u043A; \u043F\u0440\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u0430.",
      chatAnimationToggle: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0432 \u0447\u0430\u0442\u0435",
      chatAnimationToggleHint: "\u0415\u0441\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u0437\u0430\u043F\u0440\u043E\u0441 \u0447\u0430\u0442\u0430 \u043D\u0435\u0441\u0451\u0442 \u0441\u043F\u0438\u0441\u043E\u043A \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u043E\u0436\u043D\u043E \u0441\u044B\u0433\u0440\u0430\u0442\u044C (\u0432\u0441\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0438\u0437 animations.categories): \u0435\u0441\u043B\u0438 \u043C\u043E\u0434\u0435\u043B\u044C \u0441\u0447\u0438\u0442\u0430\u0435\u0442, \u0447\u0442\u043E \u0440\u0435\u043F\u043B\u0438\u043A\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442 \u043E\u0434\u043D\u043E \u0438\u0437 \u043D\u0438\u0445, \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u0441\u0440\u0430\u0437\u0443 \u0435\u0433\u043E \u0438\u0433\u0440\u0430\u0435\u0442; \u0438\u043D\u0430\u0447\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0435\u043A\u0441\u0442\u043E\u043C. \u0422\u043E\u043A\u0435\u043D\u044B: \u043A\u0430\u0436\u0434\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435\u0441\u0451\u0442 \u0432\u0435\u0441\u044C \u0441\u043F\u0438\u0441\u043E\u043A; \u043F\u0440\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0438\u0447\u0435\u0433\u043E. \u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 (pet pack \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0435\u0433\u043E \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438).",
      confineToggle: "\u041D\u0435 \u0432\u044B\u0445\u043E\u0434\u0438\u0442\u044C \u0437\u0430 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u044D\u043A\u0440\u0430\u043D",
      confineToggleHint: "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u043E\u0432: \u0435\u0441\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u044D\u043A\u0440\u0430\u043D\u0430, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u2014 \u0431\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0439 \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u043E\u0442\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \u044D\u043A\u0440\u0430\u043D\u0430, \u0433\u0434\u0435 \u0435\u0433\u043E \u043E\u0442\u043F\u0443\u0441\u0442\u0438\u043B\u0438 (\u0441\u0442\u044B\u043A\u0438 \u044D\u043A\u0440\u0430\u043D\u043E\u0432 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043A\u0430\u043A \u0441\u0442\u0435\u043D\u044B, \u043E\u043D \u043D\u0435 \u0443\u043B\u0435\u0442\u0430\u0435\u0442 \u043D\u0430 \u0441\u043E\u0441\u0435\u0434\u043D\u0438\u0439 \u043C\u043E\u043D\u0438\u0442\u043E\u0440), \u0430 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0443\u043B\u043A\u0438 \u0442\u043E\u0436\u0435 \u0438\u0434\u0443\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430 (\u0448\u0430\u0433, \u043F\u0435\u0440\u0435\u0441\u0435\u043A\u0430\u044E\u0449\u0438\u0439 \u0441\u0442\u044B\u043A, \u043F\u0440\u043E\u0441\u0442\u043E \u043E\u0442\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F). \u0415\u0441\u043B\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u043E\u043D \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u043B\u0435\u0442\u0430\u0435\u0442 \u0438 \u0445\u043E\u0434\u0438\u0442 \u043C\u0435\u0436\u0434\u0443 \u044D\u043A\u0440\u0430\u043D\u0430\u043C\u0438. \u0422\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u2014 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043D\u044B\u0439 \u043E\u0432\u0435\u0440\u043B\u0435\u0439 \u0438 \u0442\u0430\u043A \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 \u043E\u043A\u043D\u0430.",
      trayToggle: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0442\u0440\u0435\u0439",
      trayToggleHint: "\u0412 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 \u0432 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439 (\u043D\u0430 macOS \u2014 \u0432 \u0441\u0442\u0440\u043E\u043A\u0435 \u043C\u0435\u043D\u044E) \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0437\u043D\u0430\u0447\u043E\u043A \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u043F\u0438\u0442\u043E\u043C\u0446\u0430\u043C\u0438 \u0438\u0437 \u043A\u043E\u043D\u0444\u0438\u0433\u0430: \u0433\u0430\u043B\u043E\u0447\u043A\u0430 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0435\u0442 \u043C\u0435\u0441\u0442\u043E \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432, \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0442 \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u0441\u0442\u043E\u043B\u0435 \u0438 \u0443 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u043D\u0435\u0442 \u043E\u043A\u043D\u0430 \u0434\u043B\u044F \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u043A\u043B\u0438\u043A\u0430. \u0415\u0441\u043B\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C, \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u0441\u0442\u043E\u043B \u043C\u043E\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0435\u0440\u0435\u0437 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 (\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u0438\u043B\u0438 \u043F\u0440\u0430\u0432\u044B\u0439 \u043A\u043B\u0438\u043A \u043F\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0443 \u043D\u0430 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435). Windows \u0438 \u0442\u0430\u043A \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442 \u0442\u0430\u043A\u0438\u0435 \u0437\u043D\u0430\u0447\u043A\u0438 \u0432 \xAB\u0441\u043A\u0440\u044B\u0442\u044B\u0435\xBB. \u0422\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C.",
      voiceTitle: "\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u043E\u0435 \u043E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u043D\u0438\u0435",
      voiceHint: "\u0427\u0435\u0442\u044B\u0440\u0435 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044F \u0438 \u0433\u043E\u043B\u043E\u0441: \u0443 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0442\u0438\u043F\u0430 \u043E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u043D\u0438\u044F \u0441\u0432\u043E\u0439 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044C, \u043D\u0438 \u043E\u0434\u0438\u043D \u043D\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0434\u0440\u0443\u0433\u043E\u0433\u043E. \u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0432\u0441\u0451 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E; \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB (\u0431\u0435\u0437 \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438).",
      voiceEnabled: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0442\u044C \u0440\u0443\u0447\u043D\u043E\u0439 \u0448\u0451\u043F\u043E\u0442",
      voiceEnabledHint: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u0448\u0451\u043F\u043E\u0442, \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0439 \u0438\u0437 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u043E\u0433\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0441\u043B\u044D\u0448-\u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u0432 \u0447\u0430\u0442\u0435. \u041A\u043D\u043E\u043F\u043A\u0430 \u0434\u0438\u043D\u0430\u043C\u0438\u043A\u0430 \u0432 \u043F\u0430\u043D\u0435\u043B\u0438 \u0447\u0430\u0442\u0430 \u043E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u043E\u0434\u043D\u0443 \u0444\u0440\u0430\u0437\u0443 \u0441\u0440\u0430\u0437\u0443 \u043F\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u044E. \u0412\u043B\u0438\u044F\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \xAB\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u0438\u043B\u0438 \u043D\u0435\u0442\xBB: \u043F\u0443\u0437\u044B\u0440\u0438, \u0438\u0441\u0442\u043E\u0440\u0438\u044F \u0447\u0430\u0442\u0430 \u0438 \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0438\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043D\u0435 \u0437\u0430\u0442\u0440\u0430\u0433\u0438\u0432\u0430\u044E\u0442\u0441\u044F; \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u043D\u0442\u0435\u0437\u0430 \u043F\u0438\u0448\u0435\u0442\u0441\u044F \u0432 \u0436\u0443\u0440\u043D\u0430\u043B \u0438 \u043D\u0435 \u043F\u0440\u0435\u0440\u044B\u0432\u0430\u0435\u0442 \u0434\u0438\u0430\u043B\u043E\u0433.",
      voiceWhisperEnabled: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0442\u044C \u0448\u0451\u043F\u043E\u0442",
      voiceWhisperEnabledHint: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u043F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438 \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u043C\u0443\u044E \u0444\u0440\u0430\u0437\u0443 \u0448\u0451\u043F\u043E\u0442\u0430. \u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u2014 \u0448\u0451\u043F\u043E\u0442 \u044D\u0442\u043E \u0444\u043E\u043D\u043E\u0432\u043E\u0435 \u043F\u043E\u0432\u0435\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u0435, \u043E\u043D \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u0437\u0432\u0443\u0447\u0430\u0442\u044C \u0431\u0435\u0437 \u0437\u0430\u043F\u0440\u043E\u0441\u0430.",
      voiceTodoEnabled: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438",
      voiceTodoEnabledHint: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435 \u043E \u0437\u0430\u0434\u0430\u0447\u0435, \u043A\u043E\u0433\u0434\u0430 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0441\u0440\u043E\u043A (\u043F\u0443\u0437\u044B\u0440\u044C \u043F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u043B\u044E\u0431\u043E\u043C \u0441\u043B\u0443\u0447\u0430\u0435; \u044D\u0442\u043E\u0442 \u043F\u0443\u043D\u043A\u0442 \u0440\u0435\u0448\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E, \u043F\u0440\u043E\u0438\u0437\u043D\u043E\u0441\u0438\u0442\u044C \u043B\u0438). \u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E.",
      voiceNotifyEnabled: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0442\u044C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u044B",
      voiceNotifyEnabledHint: "\u041E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u0437\u0430\u0434\u0430\u043D\u043D\u0443\u044E \u0444\u0440\u0430\u0437\u0443 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B, \u043A\u043E\u0433\u0434\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u0442\u0441\u044F, \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u0442\u0441\u044F \u043E\u0448\u0438\u0431\u043A\u043E\u0439 \u0438\u043B\u0438 \u0436\u0434\u0451\u0442 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F. \u041A\u0430\u043A \u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F, \u043E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 \u0432\u044B \u043D\u0435 \u043D\u0430 \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 (\u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u043B\u0438\u0441\u044C, \u0431\u0435\u0437 \u0444\u043E\u043A\u0443\u0441\u0430, \u0441\u0432\u0451\u0440\u043D\u0443\u0442\u043E) \u2014 \u043D\u0435 \u043C\u0435\u0448\u0430\u0435\u0442, \u043F\u043E\u043A\u0430 \u0432\u044B \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043D\u0430 \u044D\u043A\u0440\u0430\u043D. \u041F\u0440\u043E\u0438\u0437\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u0434\u0430\u043D\u043D\u0430\u044F \u0444\u0440\u0430\u0437\u0430, \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u0437\u0430\u0434\u0430\u0447\u0438. \u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E.",
      voiceNameLabel: "\u0413\u043E\u043B\u043E\u0441",
      voiceVolumeLabel: "\u0413\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C",
      voiceVolumeHint: "\u0413\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0432 \u0432\u0438\u0434\u0435 \u0434\u0435\u0441\u044F\u0442\u0438\u0447\u043D\u043E\u0439 \u0434\u0440\u043E\u0431\u0438 0\u20131: 1 \u2014 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0433\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C (100 %), 0 \u2014 \u0431\u0435\u0437 \u0437\u0432\u0443\u043A\u0430. \u041C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0443\u0440\u043E\u0432\u0435\u043D\u044C, \u0437\u0432\u0443\u043A \u0437\u0430\u043D\u043E\u0432\u043E \u043D\u0435 \u0441\u0438\u043D\u0442\u0435\u0437\u0438\u0440\u0443\u0435\u0442\u0441\u044F, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0441\u0442\u043E\u0438\u0442 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E. \u0412\u0441\u0435 \u0447\u0435\u0442\u044B\u0440\u0435 \u0442\u0438\u043F\u0430 \u043E\u0437\u0432\u0443\u0447\u0438\u0432\u0430\u043D\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u044D\u0442\u0443 \u0433\u0440\u043E\u043C\u043A\u043E\u0441\u0442\u044C.",
      physicsTitle: "\u0424\u0438\u0437\u0438\u043A\u0430 (\u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F \u0438 \u0431\u0440\u043E\u0441\u043A\u0430)",
      physicsHint: "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 (\u043F\u0430\u043A\u0435\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u0432\u0438\u0434\u0430); \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB (\u0431\u0435\u0437 \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438). \u0412 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0441\u0440\u0430\u0437\u0443, \u0432 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 \u2014 \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043E\u043A\u043E\u043D \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 \u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438.",
      mobileTitle: "\u042D\u0444\u0444\u0435\u043A\u0442\u044B \u0434\u043B\u044F \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
      mobileHint: "\u0418\u043C\u0435\u044E\u0442 \u0441\u043C\u044B\u0441\u043B \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435: \u0432\u0438\u0431\u0440\u0430\u0446\u0438\u0438 \u043D\u0443\u0436\u0435\u043D \u043C\u043E\u0442\u043E\u0440, \u0434\u0432\u0443\u043C \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044F\u043C \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u2014 \u0434\u0430\u0442\u0447\u0438\u043A\u0438 \u043D\u0430\u043A\u043B\u043E\u043D\u0430 \u0438 \u0443\u0441\u043A\u043E\u0440\u0435\u043D\u0438\u044F, \u0430 \u0434\u0430\u0442\u0447\u0438\u043A\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E HTTPS \u0438\u043B\u0438 \u043D\u0430 localhost.",
      "physics.gravity": "\u0413\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u044F",
      "physics.gravityHint": "px/s\xB2, \u0447\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435, \u0442\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u043F\u0430\u0434\u0430\u0435\u0442; 0 = \u0431\u0435\u0437 \u0433\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u0438 (\u043B\u0435\u0442\u0438\u0442 \u043F\u043E \u043F\u0440\u044F\u043C\u043E\u0439 \u0441 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C\u044E)",
      "physics.restitution": "\u0423\u043F\u0440\u0443\u0433\u043E\u0441\u0442\u044C",
      "physics.restitutionHint": "0~1, \u0434\u043E\u043B\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u043F\u0440\u0438 \u043E\u0442\u0441\u043A\u043E\u043A\u0435 \u043E\u0442 \u0441\u0442\u0435\u043D\u044B / \u043F\u043E\u043B\u0430 (1 = \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0443\u043F\u0440\u0443\u0433\u0438\u0439, 0 = \u043E\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u0443\u0434\u0430\u0440\u0435)",
      "physics.groundFriction": "\u0422\u0440\u0435\u043D\u0438\u0435 \u043E \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438",
      "physics.groundFrictionHint": "/\u0441, \u0437\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u0432\u0434\u043E\u043B\u044C \u043B\u044E\u0431\u043E\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0439 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 (\u0441\u0442\u0435\u043D\u0430, \u043F\u043E\u043B, \u043F\u043E\u0442\u043E\u043B\u043E\u043A); 0 = \u0432\u0435\u0437\u0434\u0435 \u043B\u0451\u0434",
      "physics.throwPower": "\u041E\u0431\u0449\u0430\u044F \u0441\u0438\u043B\u0430 \u0431\u0440\u043E\u0441\u043A\u0430",
      "physics.throwPowerHint": "> 0, \u043E\u0431\u0449\u0438\u0439 \u043C\u043D\u043E\u0436\u0438\u0442\u0435\u043B\u044C \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u0437\u0430 \u043A\u0443\u0440\u0441\u043E\u0440\u043E\u043C \u0438 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u0431\u0440\u043E\u0441\u043A\u0430 (1 = \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E; \u0431\u043E\u043B\u044C\u0448\u0435 = \u0442\u043E\u0447\u043D\u0435\u0435 \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0438 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u0431\u0440\u043E\u0441\u043E\u043A)",
      physicsCeilingBounce: "\u041E\u0442\u0441\u043A\u043E\u043A \u043E\u0442 \u043F\u043E\u0442\u043E\u043B\u043A\u0430",
      physicsCeilingBounceHint: "\u0415\u0441\u043B\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E, \u0431\u0440\u043E\u0441\u043E\u043A \u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u043B\u0435\u0442\u0435\u0442\u044C \u0437\u0430 \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043A\u0440\u0430\u0439 \u044D\u043A\u0440\u0430\u043D\u0430 (\u0433\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u044F \u0432\u0441\u0451 \u0440\u0430\u0432\u043D\u043E \u0432\u0435\u0440\u043D\u0451\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430)",
      physicsPetCollision: "\u0421\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432",
      physicsPetCollisionHint: "\u041B\u0435\u0442\u044F\u0449\u0438\u0439 \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u043E\u0442\u0442\u0430\u043B\u043A\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0442 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u043E \u0437\u0430\u043A\u043E\u043D\u0443 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0438\u043C\u043F\u0443\u043B\u044C\u0441\u0430 (\u043C\u0430\u0441\u0441\u0430 \u221D \u0440\u0430\u0437\u043C\u0435\u0440\u0443\xB2)",
      physicsHaptic: "\u0412\u0438\u0431\u0440\u0430\u0446\u0438\u044F \u043F\u0440\u0438 \u0441\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u0438",
      physicsHapticHint: "\u041E\u0434\u043D\u0430 \u0432\u0438\u0431\u0440\u0430\u0446\u0438\u044F \u043D\u0430 \u0443\u0434\u0430\u0440 (\u0441\u0442\u0435\u043D\u044B, \u043F\u043E\u043B, \u043F\u043E\u0442\u043E\u043B\u043E\u043A, \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u0438\u0442\u043E\u043C\u0446\u044B). \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0432 Chrome/Edge; \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 iOS \u0438 \u0432 WebView-\u043E\u0431\u043E\u043B\u043E\u0447\u043A\u0430\u0445 \u0432\u0440\u043E\u0434\u0435 Via. \u0420\u0435\u0436\u0438\u043C \xAB\u041D\u0435 \u0431\u0435\u0441\u043F\u043E\u043A\u043E\u0438\u0442\u044C\xBB \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 \u0432\u0438\u0431\u0440\u0430\u0446\u0438\u044E.",
      physicsTilt: "\u0413\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u044F \u043F\u043E \u043D\u0430\u043A\u043B\u043E\u043D\u0443",
      physicsTiltHint: "\u041D\u0430\u043A\u043B\u043E\u043D\u044F\u0439\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u2014 \u0433\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u044F \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u0437\u0430 \u043D\u0438\u043C (\u0432\u0435\u043B\u0438\u0447\u0438\u043D\u0430 = \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432\u044B\u0448\u0435); \u043F\u0440\u0438 \u0433\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u0438 0 \u043D\u0430\u043A\u043B\u043E\u043D \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043C\u0435\u043D\u044F\u0435\u0442. \u041D\u0443\u0436\u0435\u043D HTTPS/localhost.",
      physicsShake: "\u0412\u0441\u0442\u0440\u044F\u0445\u043D\u0443\u0442\u044C, \u0447\u0442\u043E\u0431\u044B \u0431\u0440\u043E\u0441\u0438\u0442\u044C",
      physicsShakeHint: "\u0412\u0441\u0442\u0440\u044F\u0445\u043D\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u0432 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0436\u0435\u0441\u0442\u0430; \u0441\u0438\u043B\u0430 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 throwPower. \u041D\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0433\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u0438, \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438 \u043F\u0440\u0438 0. \u041D\u0443\u0436\u0435\u043D HTTPS/localhost.",
      invalidPhysics: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B: \u0433\u0440\u0430\u0432\u0438\u0442\u0430\u0446\u0438\u044F / \u0442\u0440\u0435\u043D\u0438\u0435 \u043E \u0437\u0435\u043C\u043B\u044E \u2265 0, \u0443\u043F\u0440\u0443\u0433\u043E\u0441\u0442\u044C 0~1, \u043E\u0431\u0449\u0430\u044F \u0441\u0438\u043B\u0430 \u0431\u0440\u043E\u0441\u043A\u0430 > 0.",
      fontTitle: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434 \u0438 \u0448\u0440\u0438\u0444\u0442",
      fontHint: "\u0421\u0435\u043C\u0435\u0439\u0441\u0442\u0432\u043E \u0448\u0440\u0438\u0444\u0442\u0430 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043A\u043E \u0432\u0441\u0435\u043C \u043C\u0435\u0441\u0442\u0430\u043C, \u0433\u0434\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \xAB\u043C\u0430\u0440\u043C\u0435\u043B\u0430\u0434\u043D\u044B\u0439\xBB \u0448\u0440\u0438\u0444\u0442: \u043F\u0443\u0437\u044B\u0440\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430, \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438, \u043E\u043A\u043D\u043E \u0447\u0430\u0442\u0430, \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E \u0441\u0447\u0451\u0442\u0430. \u0420\u0430\u0437\u043C\u0435\u0440 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u043F\u0443\u0437\u044B\u0440\u044C \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u0438 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0443 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 (\u0432 \u0447\u0430\u0442\u0435 \u0438 \u043E\u043A\u043D\u0435 \u0441\u0447\u0451\u0442\u0430 \u0440\u0430\u0437\u043C\u0435\u0440 \u043D\u0435 \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F). \u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 (\u043F\u0430\u043A\u0435\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u0432\u0438\u0434\u0430); \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 \u043F\u043E \xAB\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\xBB \u2014 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u0441\u0440\u0430\u0437\u0443, \u0432 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043E\u043A\u043E\u043D \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432.",
      fontFamilyLabel: "\u0428\u0440\u0438\u0444\u0442",
      fontFamilyHint: "\xAB\u041C\u0430\u0440\u043C\u0435\u043B\u0430\u0434\u043D\u044B\u0439 (\u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439)\xBB \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u043C; \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u2014 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0448\u0440\u0438\u0444\u0442\u044B. \u0415\u0441\u043B\u0438 \u0448\u0440\u0438\u0444\u0442\u0430 \u043D\u0435\u0442 \u043D\u0430 \u043C\u0430\u0448\u0438\u043D\u0435, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0432 \u0441\u0442\u0435\u043A\u0435 (\u0431\u0435\u0437 \u043F\u0443\u0441\u0442\u044B\u0445 \u043C\u0435\u0441\u0442 \u0438 \u043E\u0448\u0438\u0431\u043E\u043A).",
      fontSizeLabel: "\u0420\u0430\u0437\u043C\u0435\u0440 \u0448\u0440\u0438\u0444\u0442\u0430 (px)",
      fontSizeHint: "\u0420\u0430\u0437\u043C\u0435\u0440 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430 \u043F\u0443\u0437\u044B\u0440\u044F; \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u0438 \u043C\u0435\u043B\u043A\u0438\u0439 \u0442\u0435\u043A\u0441\u0442 \u0432\u043D\u0443\u0442\u0440\u0438 \u043F\u0443\u0437\u044B\u0440\u044F \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u043F\u0440\u043E\u043F\u043E\u0440\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E. \u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D 4~200.",
      fontFollowToggle: "\u041C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0448\u0440\u0438\u0444\u0442 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u043C",
      fontFollowToggleHint: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u043E (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E): \u043F\u0440\u0438 \u0443\u0432\u0435\u043B\u0438\u0447\u0435\u043D\u0438\u0438 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u0448\u0440\u0438\u0444\u0442 \u0440\u0430\u0441\u0442\u0451\u0442 \u043F\u0440\u043E\u043F\u043E\u0440\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E, \u043F\u0440\u0438 \u0448\u0438\u0440\u0438\u043D\u0435 462 \u044D\u0442\u043E \u0440\u043E\u0432\u043D\u043E \u0437\u0430\u0434\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0448\u0435 \u0440\u0430\u0437\u043C\u0435\u0440; \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E: \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D \u0438 \u043D\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 \u043F\u0438\u0442\u043E\u043C\u0446\u0430.",
      invalidFont: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0448\u0440\u0438\u0444\u0442\u0430: \u0441\u0435\u043C\u0435\u0439\u0441\u0442\u0432\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0432 \u0441\u043F\u0438\u0441\u043A\u0435, \u0440\u0430\u0437\u043C\u0435\u0440 \u2014 \u0447\u0438\u0441\u043B\u043E\u043C \u043E\u0442 4 \u0434\u043E 200.",
      "font.candy": "\u041C\u0430\u0440\u043C\u0435\u043B\u0430\u0434\u043D\u044B\u0439 (\u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439)",
      "font.yahei": "Microsoft YaHei / PingFang",
      "font.youyuan": "YouYuan",
      "font.kaiti": "KaiTi",
      "font.simsun": "SimSun",
      "font.comic": "Comic Sans MS",
      "font.system": "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
      modelTitle: "\u0427\u0430\u0442 \u0438 \u043C\u043E\u0434\u0435\u043B\u0438",
      modelHint: "\u041A\u0430\u043A\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u0448\u0451\u043F\u043E\u0442\u0430 \u0438 \u0434\u043B\u044F \u0447\u0430\u0442\u0430, \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043A\u0430\u0436\u0434\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u0447\u0430\u0442\u0430 \u043D\u0435\u0441\u0451\u0442 \u0432 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0435. \xAB\u0421\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443 \u0434\u0438\u0430\u043B\u043E\u0433\u0443\xBB = \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0434\u0438\u0430\u043B\u043E\u0433\u0430 (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E). \u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E: \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432, \u043F\u0430\u043A\u0435\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u0432\u0438\u0434\u0430. \u0421\u043F\u0438\u0441\u043E\u043A \u0442\u043E\u0442 \u0436\u0435, \u0447\u0442\u043E \u0432 \u0432\u044B\u0431\u043E\u0440\u0435 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 DSH, \u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0445\u043E\u0441\u0442\u043E\u043C \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438.",
      modelFollow: "\u0421\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443 \u0434\u0438\u0430\u043B\u043E\u0433\u0443",
      modelSearch: "\u041F\u043E\u0438\u0441\u043A \u043C\u043E\u0434\u0435\u043B\u0435\u0439\u2026",
      modelEmpty: "\u041F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043D\u0435\u0442.",
      modelNoModels: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043D\u0435\u0442.",
      modelLoading: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430 \u043C\u043E\u0434\u0435\u043B\u0435\u0439\u2026",
      modelTriggerAria: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C, \u0442\u0435\u043A\u0443\u0449\u0430\u044F {model}",
      modelUnknown: " (\u0442\u0435\u043A\u0443\u0449\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430, \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435)",
      modelNone: "\u0423 \u044D\u0442\u043E\u0433\u043E \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430 \u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439",
      whisperModelLabel: "\u041C\u043E\u0434\u0435\u043B\u044C \u0434\u043B\u044F \u0448\u0451\u043F\u043E\u0442\u0430",
      chatModelLabel: "\u041C\u043E\u0434\u0435\u043B\u044C \u0434\u043B\u044F \u0447\u0430\u0442\u0430",
      modelFieldHint: "\xAB\u0421\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443 \u0434\u0438\u0430\u043B\u043E\u0433\u0443\xBB = \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0434\u0438\u0430\u043B\u043E\u0433\u0430; \u0435\u0441\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u043D\u0435 \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442, \u043F\u043B\u0430\u0433\u0438\u043D \u043E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0441 \u043C\u043E\u0434\u0435\u043B\u044C\u044E \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0434\u0438\u0430\u043B\u043E\u0433\u0430.",
      invalidModel: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043C\u043E\u0434\u0435\u043B\u0438: \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430, \u0438 \u043C\u043E\u0434\u0435\u043B\u044C \u2014 \u043B\u0438\u0431\u043E \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0431\u0430 \u043F\u043E\u043B\u044F \u043F\u0443\u0441\u0442\u044B\u043C\u0438 (\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443 \u0434\u0438\u0430\u043B\u043E\u0433\u0443).",
      modelCatalogFailed: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043C\u043E\u0434\u0435\u043B\u0435\u0439 (\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C); \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u043A\u0430\u043A \u0435\u0441\u0442\u044C.",
      chatMemory: "\u0420\u0435\u043F\u043B\u0438\u043A \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0447\u0430\u0442\u0430",
      chatMemoryHint: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 \u0440\u0435\u043F\u043B\u0438\u043A \u043D\u0435\u0441\u0451\u0442 \u043A\u0430\u0436\u0434\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u0447\u0430\u0442\u0430 (1 \u0440\u0435\u043F\u043B\u0438\u043A\u0430 = 1 \u0432\u043E\u043F\u0440\u043E\u0441 + 1 \u043E\u0442\u0432\u0435\u0442; 0 = \u0431\u0435\u0437 \u0438\u0441\u0442\u043E\u0440\u0438\u0438, \u043A\u0430\u0436\u0434\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u0447\u0438\u0441\u0442\u043E\u0433\u043E \u043B\u0438\u0441\u0442\u0430). \u0421\u0430\u043C\u0430 \u043F\u0430\u043C\u044F\u0442\u044C \u0445\u0440\u0430\u043D\u0438\u0442 \u0432\u0441\u0451 \u2014 \u044D\u0442\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0440\u0435\u0448\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442: \u0431\u043E\u043B\u044C\u0448\u0435 = \u043B\u0443\u0447\u0448\u0435 \u043F\u043E\u043C\u043D\u0438\u0442, \u043D\u043E \u0434\u043E\u0440\u043E\u0436\u0435 \u043F\u043E \u0442\u043E\u043A\u0435\u043D\u0430\u043C. \u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 (\u043F\u0430\u043A\u0435\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u0432\u0438\u0434\u0430).",
      invalidChatMemory: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0447\u0438\u0441\u043B\u043E \u0440\u0435\u043F\u043B\u0438\u043A \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u0447\u0430\u0442\u0430: \u043D\u0443\u0436\u043D\u043E \u0447\u0438\u0441\u043B\u043E \u2265 0.",
      chatImageLimit: "\u041B\u0438\u043C\u0438\u0442 \u043A\u0430\u0440\u0442\u0438\u043D\u043E\u043A \u0432 \u0447\u0430\u0442\u0435",
      chatImageLimitHint: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u043C\u043E\u0432 \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u0442\u0441\u044F \u043C\u043E\u0434\u0435\u043B\u0438 \u0432 \u0447\u0430\u0442\u0435 (\xAB\u043F\u0435\u0440\u0432\u044B\u0435 N\xBB = \u043F\u0435\u0440\u0432\u044B\u0435 N \u0432 \u043A\u043E\u043D\u0444\u0438\u0433\u0435, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043D\u0443\u0436\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0438\u0442\u0435 \u0432 \u043D\u0430\u0447\u0430\u043B\u043E). \u0412\u0435\u0441\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u0438\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043A \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044E, \u0438 \u0442\u043E\u043A\u0435\u043D\u044B \u0440\u0430\u0441\u0442\u0443\u0442 \u043B\u0438\u043D\u0435\u0439\u043D\u043E \u0441 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E\u043C \u2014 \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u044D\u0442\u043E \u0447\u0438\u0441\u0442\u044B\u0439 \u043F\u0435\u0440\u0435\u0440\u0430\u0441\u0445\u043E\u0434; \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0432\u044B\u043C\u0438 N \u0437\u0430\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043C\u043E\u0434\u0435\u043B\u044C \u0432\u044B\u0431\u0438\u0440\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0438\u0437 \u043D\u0438\u0445. 0 = \u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F (\u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0432\u0441\u0435). \u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u2014 10. \u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 (\u043F\u0430\u043A\u0435\u0442 \u043F\u0438\u0442\u043E\u043C\u0446\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u0432\u0438\u0434\u0430). \u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043E\u043A \u0432 \u0447\u0430\u0442\u0435: \u0448\u0451\u043F\u043E\u0442 \u043D\u0435\u0441\u0451\u0442 \u043B\u0438\u0448\u044C \u043E\u0434\u043D\u0443 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443.",
      invalidChatImageLimit: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043B\u0438\u043C\u0438\u0442 \u043A\u0430\u0440\u0442\u0438\u043D\u043E\u043A \u0432 \u0447\u0430\u0442\u0435: \u043D\u0443\u0436\u043D\u043E \u0447\u0438\u0441\u043B\u043E \u2265 0 (0 = \u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F).",
      notifyTest: "\u0422\u0435\u0441\u0442\u043E\u0432\u043E\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435",
      notifyTestOk: "\u0422\u0435\u0441\u0442\u043E\u0432\u043E\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u044B\u0439 \u043D\u0438\u0436\u043D\u0438\u0439 \u0443\u0433\u043E\u043B \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u0441\u0442\u043E\u043B\u0430.",
      notifyDenyUnsupported: "\u0412 \u044D\u0442\u043E\u0439 \u0441\u0440\u0435\u0434\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F (\u043D\u0435\u0442 Notification API).",
      notifyDenyBlocked: "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043D\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043E\u043C.",
      notifyDenyRejected: "\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \xAB\u0411\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C\xBB \u0432 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F.",
      notifyDenyError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F",
      notifyGuide: "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430: \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u{1F512}/\u24D8 \u0441\u043B\u0435\u0432\u0430 \u043E\u0442 \u0430\u0434\u0440\u0435\u0441\u043D\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u0438 \u2192 \xAB\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0430\u0439\u0442\u0430\xBB \u2192 \xAB\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F\xBB \u2192 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \xAB\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C\xBB, \u0437\u0430\u0442\u0435\u043C \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435.",
      storageTitle: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0438 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435",
      storageHint: "\u0412\u0441\u0435 \u043C\u0435\u0441\u0442\u0430, \u043A\u0443\u0434\u0430 \u043F\u043B\u0430\u0433\u0438\u043D \u043F\u0438\u0448\u0435\u0442 \u043D\u0430 \u044D\u0442\u043E\u043C \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0435. \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043A\u0435\u0448\u0430 \u043D\u0435 \u043C\u0435\u0448\u0430\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0435 (\u043E\u043D \u0441\u043A\u0430\u0447\u0430\u0435\u0442\u0441\u044F/\u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0435\u0440\u0451\u0442\u0441\u044F); \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \xAB\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\xBB \u0441\u0442\u0438\u0440\u0430\u0435\u0442 \u043A\u043E\u043D\u0444\u0438\u0433 \u0438 \u043F\u0430\u043C\u044F\u0442\u044C \u0447\u0430\u0442\u0430.",
      "storage.userData": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u0430: \u0441\u0432\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0433 main-config.jsonc, \u043F\u0430\u043C\u044F\u0442\u044C \u0447\u0430\u0442\u0430 memory.json, \u0441\u0432\u043E\u0438 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438 main-animation/, \u0444\u0430\u0439\u043B\u043E\u0432\u044B\u0435 \u043F\u0438\u0442\u043E\u043C\u0446\u044B pet/",
      "storage.electron": "\u0421\u0440\u0435\u0434\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F Electron \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0438\u0442\u043E\u043C\u0446\u0430 (\u0431\u043E\u043B\u044C\u0448\u0430\u044F; \u043F\u0440\u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430 \u0441\u043A\u0430\u0447\u0430\u0435\u0442\u0441\u044F \u0437\u0430\u043D\u043E\u0432\u043E)",
      "storage.desktopCache": "\u041A\u0435\u0448 \u043E\u043A\u043E\u043D \u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432 \u0438 \u043A\u0435\u0448 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0430 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u044D\u043A\u0440\u0430\u043D\u0430 (\u043C\u043E\u0436\u043D\u043E \u0443\u0434\u0430\u043B\u044F\u0442\u044C, \u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438)",
      "storage.electronCache": "\u041A\u0435\u0448 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0449\u0438\u043A\u0430 Electron (\u043C\u043E\u0436\u043D\u043E \u0443\u0434\u0430\u043B\u044F\u0442\u044C, \u043F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0441\u043A\u0430\u0447\u0430\u0435\u0442\u0441\u044F \u0437\u0430\u043D\u043E\u0432\u043E)",
      "storage.package": "\u0421\u0430\u043C \u043F\u043B\u0430\u0433\u0438\u043D (\u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F DSH \u2014 \u0443\u0434\u0430\u043B\u044F\u0439\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439 \u043D\u0438\u0436\u0435, \u043D\u0435 \u0432\u0440\u0443\u0447\u043D\u0443\u044E)",
      storageMissing: " (\u0435\u0449\u0451 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u043E)",
      uninstallTitle: "\u041A\u0430\u043A \u0443\u0434\u0430\u043B\u0438\u0442\u044C",
      uninstallStep1: "1. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u043A\u0440\u043E\u0439\u0442\u0435 DSH (\u043D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0439 \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u0437\u0430\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0438\u043C); \u043D\u0435 \u0443\u0434\u0430\u043B\u044F\u0439\u0442\u0435 \u044D\u0442\u0438 \u0444\u0430\u0439\u043B\u044B, \u043F\u043E\u043A\u0430 \u043F\u0438\u0442\u043E\u043C\u0435\u0446 \u0437\u0430\u043F\u0443\u0449\u0435\u043D.",
      uninstallStep2: "2. \u0423\u0434\u0430\u043B\u0438\u0442\u0435 \u0441\u0430\u043C \u043F\u043B\u0430\u0433\u0438\u043D (\u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432 \u0442\u0435\u0440\u043C\u0438\u043D\u0430\u043B\u0435; \u043E\u043D \u0442\u0430\u043A\u0436\u0435 \u0443\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0438\u0437 \u0441\u043B\u043E\u044F bundle \u043F\u0440\u043E\u0444\u0438\u043B\u044F):",
      uninstallStep3: "3. \u0423\u0434\u0430\u043B\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u0435 \u043C\u0435\u0441\u0442\u0430 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u0432\u044B\u0448\u0435: \u043A\u0435\u0448 \u0443\u0434\u0430\u043B\u044F\u0442\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E; \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \xAB\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\xBB \u0441\u0442\u0438\u0440\u0430\u0435\u0442 \u043A\u043E\u043D\u0444\u0438\u0433 \u0438 \u043F\u0430\u043C\u044F\u0442\u044C \u0447\u0430\u0442\u0430 (\u0435\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u2014 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u0443\u044E \u043A\u043E\u043F\u0438\u044E main-config.jsonc).",
      motionTitle: "\u0427\u0430\u0441\u0442\u043E\u0442\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439",
      motionHint: "\u0427\u0435\u0442\u044B\u0440\u0435 \u043F\u043E\u043B\u044F: \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 / \u043F\u043E\u0432\u043E\u0440\u043E\u0442 / \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u043C\u043E\u0436\u043D\u043E \u043C\u0435\u043D\u044F\u0442\u044C, \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0432\u044B\u0447\u0438\u0441\u043B\u044F\u0435\u0442\u0441\u044F (100 \u2212 \u0442\u0440\u0438 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0445). \u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0438\u0442\u043E\u043C\u0446\u0435\u0432; pet pack \u043C\u043E\u0436\u0435\u0442 \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0435\u0433\u043E \u0432 \u0441\u0432\u043E\u0451\u043C \u0444\u0430\u0439\u043B\u0435 \u0442\u0438\u043F\u0430.",
      "motion.idle": "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435",
      "motion.turn": "\u041F\u043E\u0432\u043E\u0440\u043E\u0442",
      "motion.move": "\u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0435",
      "motion.action": "\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/zh.ts
var zh;
var init_zh = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/zh.ts"() {
    zh = {
      nav: "\u684C\u5BA0\u914D\u7F6E",
      intro: "\u7BA1\u7406\u591A\u4E2A\u684C\u5BA0\uFF1A\u6BCF\u4E2A\u5BA0\u7269\u53EF\u72EC\u7ACB\u8BBE\u7F6E\u5927\u5C0F\u4E0E\u4F4D\u7F6E\uFF08\u4FDD\u5B58\u540E\u5373\u65F6\u751F\u6548\uFF09\u3002",
      // 卡片标题与卡片级说明；说明统一进问号气泡。
      petCardTitle: "\u5BA0\u7269\u914D\u7F6E",
      avatarLabel: "\u5934\u50CF",
      avatarHint: "\u5BF9\u8BDD\u9762\u677F\u91CC\u8FD9\u6761\u5BA0\u7269\u6D88\u606F\u65C1\u8FB9\u663E\u793A\u7684\u5C0F\u56FE\u3002\u6CA1\u4E0A\u4F20\u8FC7\u5C31\u662F\u63D2\u4EF6\u9ED8\u8BA4\u56FE\uFF1B\u4E0A\u4F20\u540E\u7ACB\u5373\u751F\u6548\u5E76\u8986\u76D6\u65E7\u56FE\uFF0C\u4E0D\u9700\u8981\u70B9\u300C\u4FDD\u5B58\u300D\u3002",
      avatarUpload: "\u4E0A\u4F20\u5934\u50CF",
      avatarChange: "\u66F4\u6362",
      avatarUploading: "\u4E0A\u4F20\u4E2D\u2026",
      avatarUploaded: "\u5934\u50CF\u5DF2\u66F4\u65B0",
      petCardHint: "\u6BCF\u53EA\u5BA0\u7269\u72EC\u7ACB\u914D\u7F6E\uFF1A\u540D\u5B57 / \u5927\u5C0F / \u663E\u793A\u4F4D\u7F6E / \u4F4D\u7F6E / \u504F\u79FB / \u56DB\u4E2A\u529F\u80FD\u5F00\u5173\u3002\u6539\u5B8C\u70B9\u6700\u4E0B\u9762\u7684\u300C\u4FDD\u5B58\u300D\u5373\u65F6\u751F\u6548\u3002",
      globalTitle: "\u5168\u5C40\u5F00\u5173",
      globalHint: "\u6240\u6709\u5BA0\u7269\u5171\u7528\uFF08pet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u5355\u72EC\u8986\u76D6\uFF09\u3002\u8FD9\u51E0\u4E2A\u5F00\u5173\u53EA\u6539\u672C\u5730\u72B6\u6001\uFF0C\u968F\u300C\u4FDD\u5B58\u300D\u6574\u5305\u5199\u5165\u7528\u6237\u914D\u7F6E\uFF08\u4E0D\u505A\u5373\u65F6\u5199\u5165\uFF09\uFF1B\u7CFB\u7EDF\u901A\u77E5\u5728\u4FDD\u5B58\u540E\u5373\u65F6\u91CD\u8BFB\uFF0C\u65E0\u9700\u5237\u65B0\u9875\u9762\u3002",
      cornerHint: "\u5BA0\u7269\u8D34\u7740\u5C4F\u5E55\u7684\u54EA\u4E2A\u89D2\uFF08\u684C\u9762\u7AEF\u6309\u5404\u81EA\u663E\u793A\u5668\u7684\u5DE5\u4F5C\u533A\u7B97\uFF09\u3002",
      marginXHint: "\u8DDD\u6240\u9009\u89D2\u843D\u7684\u6C34\u5E73\u8DDD\u79BB\uFF08px\uFF09\uFF0C\u53EF\u4E3A\u4EFB\u610F\u6570\u5B57\u3002",
      marginYHint: "\u8DDD\u6240\u9009\u89D2\u843D\u7684\u5782\u76F4\u8DDD\u79BB\uFF08px\uFF09\uFF0C\u53EF\u4E3A\u4EFB\u610F\u6570\u5B57\u3002",
      // 「/」命令菜单的行标题（图标由 app.ts 经 command-faces.ts 补上）。
      "cmd.chat": "\u5BF9\u8BDD",
      "cmd.pet": "\u684C\u5BA0",
      "cmd.balance": "\u4F59\u989D",
      // 设置 → 通用 → 快捷键里的命令标题。
      "shortcut.open": "\u6253\u5F00\u684C\u5BA0\u5BF9\u8BDD",
      "shortcut.chat": "\u6253\u5F00\u5BF9\u8BDD\u5F39\u7A97",
      "shortcut.hear": "\u8BED\u97F3\u8F93\u5165",
      "shortcut.capture": "\u622A\u56FE\u5230\u5BF9\u8BDD",
      shortcutCardTitle: "\u5FEB\u6377\u952E",
      shortcutCardHint: "\u5C55\u5F00\u540E\u5206\u4E24\u7EC4\uFF1A\u684C\u5BA0\u5FEB\u6377\u952E\u4E0E\u5168\u5C40\u5FEB\u6377\u952E\u3002",
      shortcutRowChat: "\u6253\u5F00\u5BF9\u8BDD",
      shortcutRowHold: "\u6309\u4F4F\u8BF4\u8BDD",
      shortcutRowHear: "\u8BED\u97F3\u8F93\u5165",
      shortcutRowCapture: "\u622A\u56FE",
      shortcutRowPaste: "\u7C98\u8D34\u56FE\u7247",
      shortcutRowTodo: "\u5F85\u529E\u4E8B\u9879",
      shortcutRowSleep: "\u7761\u89C9 / \u8D77\u6765",
      shortcutRowDisplay: "\u663E\u793A\u4F4D\u7F6E",
      shortcutRowSidebar: "\u6253\u5F00\u4FA7\u680F\u5BF9\u8BDD",
      shortcutGroupPet: "\u684C\u5BA0\u5FEB\u6377\u952E",
      shortcutGroupPetHint: "\u7F51\u9875\u7AEF\u9F20\u6807\u505C\u5728\u5BA0\u7269\u4E0A\u5373\u53EF\uFF1B\u684C\u9762\u5BA0\u7269\u7A97\u53E3\u8981\u5148\u70B9\u4E00\u4E0B\u5BA0\u7269\uFF0C\u62FF\u5230\u952E\u76D8\u7126\u70B9\u540E\u624D\u751F\u6548\u3002",
      shortcutGroupGlobal: "\u5168\u5C40\u5FEB\u6377\u952E",
      shortcutGroupGlobalHint: "\u7F51\u9875\u7AEF\u4E0E\u684C\u9762\u7248\u7A97\u53E3\u91CC\u7531 DSH \u5206\u53D1\uFF1B\u53EF\u5728\u300C\u8BBE\u7F6E \u2192 \u901A\u7528 \u2192 \u5FEB\u6377\u952E\u300D\u6539\u7ED1\u3002",
      petsLabel: "\u5BA0\u7269\u5217\u8868",
      add: "\u6DFB\u52A0\u5BA0\u7269",
      remove: "\u5220\u9664",
      confirmRemove: "\u786E\u5B9A\u5220\u9664\u5BA0\u7269\u300C{id}\u300D\u5417\uFF1F",
      confirmTitle: "\u786E\u8BA4\u64CD\u4F5C",
      cancel: "\u53D6\u6D88",
      ok: "\u77E5\u9053\u4E86",
      atLeastOne: "\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u5BA0\u7269\u3002",
      emptyPets: "\u6682\u65E0\u5BA0\u7269\uFF0C\u70B9\u51FB\u300C\u6DFB\u52A0\u5BA0\u7269\u300D\u521B\u5EFA\u3002",
      sizeLabel: "\u5927\u5C0F\uFF08\u5BBD\u5EA6 px\uFF09",
      sizeHint: "\u9AD8\u5EA6\u81EA\u52A8 = \u5BBD\u5EA6 \xD7 9/16\u3002",
      sizePercentLabel: "\u5C4F\u5E55\u5BBD\u5EA6\u4E0A\u9650\uFF08%\uFF09",
      sizePercentHint: "\u684C\u5BA0\u6700\u591A\u5360\u5C4F\u5E55\u591A\u5BBD\uFF1A100 = \u4E0D\u8D85\u8FC7\u4E00\u5C4F\u5BBD\uFF0C\u7A97\u53E3\u6BD4\u5BA0\u7269\u5BBD\u65F6\u4E0E\u6309 px \u663E\u793A\u5B8C\u5168\u4E00\u81F4\uFF1B\u586B 30\u201340 \u53EF\u8BA9\u624B\u673A\u7AD6\u5C4F\u660E\u663E\u53D8\u5C0F\uFF0C\u684C\u9762\u89C2\u611F\u4E0D\u53D8\u3002\u53EA\u5728\u9875\u9762\u52A0\u8F7D\u65F6\u8BA1\u7B97\u4E00\u6B21\uFF0C\u6539\u7A97\u53E3\u5927\u5C0F\u540E\u5237\u65B0\u751F\u6548\u3002",
      nameLabel: "\u540D\u5B57",
      nameHint: "\u663E\u793A\u540D\uFF1A\u9F20\u6807\u60AC\u6D6E\u5BA0\u7269\u65F6\u5F39\u51FA\uFF0C\u4E5F\u4F1A\u52A0\u8FDB AI \u4EBA\u8BBE\uFF08\u4F60\u7684\u540D\u5B57\u662F X\uFF09\u3002\u53EF\u91CD\u590D\uFF0C\u7559\u7A7A\u6309\u5BA0\u7269 id \u5904\u7406\u3002",
      personaLabel: "\u4EBA\u8BBE\uFF08\u53EF\u9009\uFF09",
      personaHint: "\u53EA\u5F71\u54CD\u8FD9\u53EA\u5BA0\u7269\u3002\u7559\u7A7A = \u8DDF\u968F\u6240\u5C5E\u6761\u76EE\u7684\u4EBA\u8BBE\u2014\u2014\u8F93\u5165\u6846\u91CC\u7684\u7070\u8272\u6587\u5B57\u5C31\u662F\u90A3\u4EFD\u5185\u5BB9\u3002\u5B9E\u9645\u53D1\u7ED9\u6A21\u578B\u7684 system = \u8FD9\u6BB5 + \u81EA\u52A8\u8FFD\u52A0\u7684\u300C\u4F60\u7684\u540D\u5B57\u662F\u201C<\u540D\u5B57>\u201D\u300D+ \u5F53\u524D\u65F6\u95F4\u80CC\u666F\uFF0C\u6240\u4EE5\u522B\u5728\u8FD9\u91CC\u518D\u5199\u540D\u5B57\u548C\u65E5\u671F\u3002",
      personaCount: "{n} \u5B57",
      balanceEnabled: "\u4F59\u989D\u529F\u80FD",
      balanceEnabledHint: "\u542F\u7528\u540E\u8BE5\u5BA0\u7269\u89E6\u53D1\u4F59\u989D\u52A8\u753B\u5E76\u663E\u793A\u4F59\u989D\u6C14\u6CE1\u3002",
      whisperEnabled: "\u788E\u788E\u5FF5",
      whisperEnabledHint: "\u542F\u7528\u540E\u8BE5\u5BA0\u7269\u6309\u5468\u671F\u7528 AI \u751F\u6210\u4E00\u53E5\u8BDD\u5E76\u64AD\u788E\u788E\u5FF5\u52A8\u753B\uFF08\u4EBA\u8BBE\u89C1\u4E0B\u65B9\u300C\u4EBA\u8BBE\u300D\u6846\uFF0C\u7559\u7A7A\u8DDF\u968F\u6761\u76EE\uFF09\u3002",
      workStatusEnabled: "\u5DE5\u4F5C\u72B6\u6001\u8054\u52A8",
      workStatusEnabledHint: "\u542F\u7528\u540E\u8BE5\u5BA0\u7269\u8DDF\u968F DSH \u5DE5\u4F5C\u72B6\u6001\uFF1A\u601D\u8003/\u5DE5\u4F5C\u4E2D/\u7B49\u5F85\u786E\u8BA4/\u5B8C\u6210/\u51FA\u9519\u65F6\u81EA\u52A8\u5207\u5BF9\u5E94\u52A8\u753B\u5E76\u5F39\u6C14\u6CE1\uFF08\u52A8\u753B\u6C60\u5728\u914D\u7F6E\u9876\u5C42\uFF0C\u4EC5\u76D1\u542C\u4E0D\u8C03\u7528\u6A21\u578B\uFF09\u3002",
      fixedEnabled: "\u5BA0\u7269\u56FA\u5B9A",
      fixedEnabledHint: "\u542F\u7528\u540E\u968F\u673A\u52A8\u753B\u4E0D\u518D\u8BA9\u5BA0\u7269\u81EA\u5DF1\u8F6C\u5411\u6216\u8D70\u5F00\uFF0C\u53EA\u64AD\u539F\u5730\u5F85\u673A\u4E0E\u968F\u673A\u5C0F\u52A8\u4F5C\uFF1B\u53F3\u952E\u83DC\u5355\u70B9\u64AD\u3001\u63A5\u53E3\u89E6\u53D1\u3001\u4F59\u989D/\u788E\u788E\u5FF5/\u5DE5\u4F5C\u72B6\u6001\u52A8\u753B\u4E0D\u53D7\u5F71\u54CD\u3002",
      displayLabel: "\u663E\u793A\u4F4D\u7F6E",
      displayHint: "web=\u4EC5\u6D4F\u89C8\u5668 / desktop=\u4EC5\u684C\u9762 / both=\u4E24\u8005\u90FD\u663E\u793A / none=\u90FD\u4E0D\u663E\u793A",
      "display.web": "\u4EC5\u6D4F\u89C8\u5668",
      "display.desktop": "\u4EC5\u684C\u9762",
      "display.both": "\u4E24\u8005\u90FD\u663E\u793A",
      "display.none": "\u90FD\u4E0D\u663E\u793A",
      cornerLabel: "\u4F4D\u7F6E",
      "corner.top-left": "\u5DE6\u4E0A\u89D2",
      "corner.top-right": "\u53F3\u4E0A\u89D2",
      "corner.bottom-left": "\u5DE6\u4E0B\u89D2",
      "corner.bottom-right": "\u53F3\u4E0B\u89D2",
      marginX: "\u6C34\u5E73\u504F\u79FB",
      marginY: "\u5782\u76F4\u504F\u79FB",
      save: "\u4FDD\u5B58",
      saveHotkey: "Ctrl+S / Cmd+S",
      sync: "\u540C\u6B65",
      confirmSync: "\u786E\u5B9A\u540C\u6B65\u5417\uFF1F\u5C06\u7528\u9879\u76EE\u5185\u7F6E\u7684\u9ED8\u8BA4\u914D\u7F6E\uFF08\u5B8C\u6574\u5B57\u6BB5 + \u6CE8\u91CA\uFF09\u8986\u76D6\u7528\u6237\u914D\u7F6E\uFF0C\u5F53\u524D\u7684\u81EA\u5B9A\u4E49\u5185\u5BB9\u4F1A\u4E22\u5931\u3002",
      corruptTitle: "\u7528\u6237\u914D\u7F6E\u5DF2\u635F\u574F\uFF0C\u672A\u4FDD\u5B58",
      corruptConfirm: "\u5F3A\u884C\u4FDD\u5B58",
      corruptBody: "\u7528\u6237\u914D\u7F6E\u6587\u4EF6\u89E3\u6790\u4E0D\u4E86\uFF08\u5185\u5BB9\u5DF2\u635F\u574F\uFF0C\u4E0D\u662F\u5408\u6CD5 JSON/JSONC\uFF09\uFF1A{path}\u3002\u7EE7\u7EED\u4FDD\u5B58\u4F1A\u6309\u767D\u540D\u5355\u91CD\u5EFA\u8FD9\u4E2A\u6587\u4EF6\u2014\u2014\u5B83\u91CC\u9762\u73B0\u6709\u7684\u5185\u5BB9\uFF08animations / physics / memes \u7B49\u81EA\u5B9A\u4E49\u5B57\u6BB5\uFF09\u4F1A\u5168\u90E8\u4E22\u5931\u3002\u53D6\u6D88 = \u4E0D\u52A8\u6587\u4EF6\uFF08\u5148\u53BB\u628A\u914D\u7F6E\u6539\u56DE\u5408\u6CD5\u518D\u4FDD\u5B58\uFF09\uFF1B\u786E\u8BA4 = \u5F3A\u884C\u4FDD\u5B58\uFF08\u4E22\u5F03\u6587\u4EF6\u91CC\u73B0\u6709\u7684\u5185\u5BB9\uFF09\u3002",
      syncHint: "\u300C\u540C\u6B65\u300D\u4F1A\u628A\u9879\u76EE\u5185\u7F6E\u7684\u9ED8\u8BA4\u914D\u7F6E\uFF08\u542B\u6CE8\u91CA\u4E0E\u5168\u90E8\u9AD8\u7EA7\u5B57\u6BB5\uFF09\u5199\u5165\u7528\u6237\u914D\u7F6E\u6587\u4EF6\uFF0C\u8986\u76D6\u5F53\u524D\u81EA\u5B9A\u4E49\u5185\u5BB9\uFF1B\u4E4B\u540E\u53EF\u76F4\u63A5\u7F16\u8F91\u8BE5\u6587\u4EF6\u3002\u6CE8\u610F\u4E24\u70B9\uFF1A\u2460 \u6587\u4EF6\u4E00\u65E6\u751F\u6210\u5373\u4E3A\u663E\u5F0F\u8986\u76D6\u5C42\u2014\u2014\u63D2\u4EF6\u5347\u7EA7\u540E\u5185\u7F6E\u9ED8\u8BA4\u7684\u53D8\u5316\u4E0D\u4F1A\u81EA\u52A8\u751F\u6548\uFF08\u9664\u975E\u518D\u6B21\u540C\u6B65\u6216\u5220\u9664\u8BE5\u6587\u4EF6\uFF09\uFF1B\u2461 \u5728\u672C\u9875\u70B9\u300C\u4FDD\u5B58\u300D\u4F1A\u6309\u767D\u540D\u5355\u91CD\u5199\u8BE5\u6587\u4EF6\uFF08\u5B57\u6BB5\u503C\u4FDD\u7559\uFF0C\u4F46\u6CE8\u91CA\u4F1A\u88AB\u53BB\u6389\uFF09\u3002",
      configMeta: "\u9AD8\u7EA7\u914D\u7F6E\uFF08\u6587\u4EF6\uFF09",
      configMetaHint: "\u7528\u6237\u914D\u7F6E\u53EF\u8986\u76D6\u5BA0\u7269\u5217\u8868 / \u52A8\u753B\u6C60 / \u64AD\u653E\u6743\u91CD\uFF0C\u4FEE\u6539\u540E\u5237\u65B0\u6216\u91CD\u542F\u751F\u6548\uFF1A\u6D4F\u89C8\u5668\u7AEF\u5237\u65B0\u9875\u9762\uFF0C\u684C\u9762\u7AEF\u53F3\u952E\u5BA0\u7269 \u2192\u300C\u91CD\u8F7D\u914D\u7F6E\u300D\uFF08\u91CD\u8F7D\u5168\u90E8\u684C\u9762\u5BA0\u7269\u7A97\u53E3\uFF09\uFF1B\u9ED8\u8BA4\u914D\u7F6E\u4E3A\u5B8C\u6574\u53C2\u8003\u3002",
      defaultConfig: "\u9ED8\u8BA4\u914D\u7F6E\uFF08\u53EA\u8BFB\uFF0C\u5B8C\u6574\u53C2\u8003\uFF09",
      userConfig: "\u7528\u6237\u914D\u7F6E\uFF08\u81EA\u5B9A\u4E49\u8986\u76D6\uFF09",
      todosFile: "\u5F85\u529E\u6570\u636E\uFF08\u6E05\u5355\u6B63\u6587\u3001\u5230\u671F\u65F6\u95F4\u4E0E\u5B8C\u6210\u72B6\u6001\uFF1B\u5220\u6389\u7B49\u4E8E\u6E05\u7A7A\u5F85\u529E\uFF09",
      animationDir: "\u52A8\u753B\u7D20\u6750\u76EE\u5F55\uFF08\u53EF\u81EA\u5B9A\u4E49/\u6269\u5145\u52A8\u753B\uFF09",
      memesDir: "\u8868\u60C5\u5305\u76EE\u5F55\uFF08\u53EF\u81EA\u5B9A\u4E49/\u6269\u5145\u914D\u56FE\uFF09",
      logFile: "\u65E5\u5FD7\u6587\u4EF6\uFF08\u6392\u969C\u7528\uFF0C\u53EF\u6E05\u7A7A\uFF09",
      logFileNote: "\u684C\u9762\u7248\u6CA1\u6709\u63A7\u5236\u53F0\uFF0C\u63D2\u4EF6\u7684\u8FD0\u884C\u65E5\u5FD7\uFF08\u542F\u52A8\u3001\u684C\u9762\u5BA0\u7269\u5D29\u6E83/\u91CD\u542F\u3001\u9519\u8BEF\u4E0E\u544A\u8B66\uFF09\u5168\u90E8\u5199\u8FDB\u8FD9\u4E00\u4E2A\u6587\u4EF6\uFF1B\u53CD\u9988\u95EE\u9898\u8BF7\u9644\u4E0A\u5B83\u3002\u5355\u6587\u4EF6\u4E0A\u9650 1 MB\uFF0C\u5199\u6EE1\u53EA\u7559\u6700\u65B0\u7684 512 KB\u3002",
      saved: "\u5DF2\u4FDD\u5B58\uFF0C\u684C\u5BA0\u5373\u65F6\u751F\u6548\u3002",
      loadError: "\u52A0\u8F7D\u914D\u7F6E\u5931\u8D25",
      saveError: "\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u670D\u52A1\u8FDE\u63A5\u3001\u914D\u7F6E\u76EE\u5F55\u7684\u5199\u5165\u6743\u9650\u6216\u670D\u52A1\u65E5\u5FD7\u3002",
      saveInvalid: "\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25\uFF1A\u914D\u7F6E\u5185\u5BB9\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5\u3002",
      syncError: "\u540C\u6B65\u914D\u7F6E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u670D\u52A1\u8FDE\u63A5\u548C\u914D\u7F6E\u76EE\u5F55\u7684\u5199\u5165\u6743\u9650\u3002",
      loading: "\u6B63\u5728\u52A0\u8F7D\u914D\u7F6E\u2026",
      retry: "\u91CD\u8BD5",
      invalid: "\u8BF7\u68C0\u67E5\u8F93\u5165\uFF1A\u5927\u5C0F\u9700\u4E3A\u6B63\u6570\uFF0C\u8FB9\u8DDD\u53EF\u4E3A\u4EFB\u610F\u6570\u5B57\u3002",
      busy: "\u4FDD\u5B58\u4E2D\u2026",
      extraPetsHint: "\u53E6 {n} \u4E2A\u79CD\u7C7B\u6765\u81EA pet/ \u76EE\u5F55\u6587\u4EF6\uFF08<\u540D>-config.json + <\u540D>-animation/\uFF09\uFF0C\u5728\u4E0A\u65B9\u300C\u79CD\u7C7B\u300D\u6761\u91CC\u5207\u6362\u5373\u53EF\u4FEE\u6539\uFF1B\u4FDD\u5B58\u4F1A\u5199\u56DE\u5404\u81EA\u7684\u89D2\u8272\u5305\u914D\u7F6E\uFF0C\u4E0D\u6DF7\u8FDB main-config.jsonc\u3002",
      kindLabel: "\u79CD\u7C7B",
      kindMain: "\u5185\u7F6E",
      lastOfKind: "\u300C{entry}\u300D\u53EA\u5269\u8FD9\u4E00\u53EA\uFF0C\u5220\u6389\u5C31\u6CA1\u6709\u8FD9\u4E2A\u79CD\u7C7B\u4E86\u3002\u8981\u5F7B\u5E95\u79FB\u9664\u8BF7\u76F4\u63A5\u5220\u9664\u8BE5\u89D2\u8272\u5305\u6587\u4EF6\u3002",
      savePartial: "\u4E3B\u5BA0\u7269\u5DF2\u4FDD\u5B58\uFF0C\u4F46 {names} \u6CA1\u80FD\u5199\u56DE\uFF1A\u68C0\u67E5\u8BE5\u89D2\u8272\u5305\u914D\u7F6E\u662F\u5426\u5408\u6CD5\u3001\u76EE\u5F55\u662F\u5426\u53EF\u5199\u3002",
      notifyToggle: "\u7CFB\u7EDF\u901A\u77E5",
      notifyToggleHint: "\u5BF9\u8BDD\u5B8C\u6210 / \u751F\u6210\u5931\u8D25 / \u6743\u9650\u7533\u8BF7 / \u7528\u6237\u9009\u62E9\uFF0C\u5728\u7A97\u53E3\u5931\u7126\u65F6\u5F39\u51FA\u7CFB\u7EDF\u7EA7\u901A\u77E5\uFF08\u684C\u9762\u53F3\u4E0B\u89D2\uFF09\u3002",
      clickSoundToggle: "\u70B9\u51FB\u97F3\u6548",
      clickSoundToggleHint: "\u70B9\u4E00\u4E0B\u5BA0\u7269\u64AD\u4E00\u58F0\u5185\u7F6E\u97F3\u6548\uFF08assets/sound/click-duck.wav\uFF0C\u97F3\u91CF 0.5\uFF1B100ms \u5185\u7684\u8FDE\u7EED\u70B9\u51FB\u53EA\u54CD\u4E00\u6B21\uFF0C\u591A\u5F00\u4E5F\u4E0D\u4F1A\u53E0\u97F3\uFF09\u3002\u5173\u6389\u5373\u5B8C\u5168\u9759\u97F3\u3002\u968F\u300C\u4FDD\u5B58\u300D\u5199\u5165\u7528\u6237\u914D\u7F6E\u3002",
      whisperImageToggle: "\u788E\u788E\u5FF5\u914D\u56FE",
      whisperImageToggleHint: "\u788E\u788E\u5FF5\u65F6\u4ECE\u8868\u60C5\u5305\u6C60\u968F\u673A\u62BD\u4E00\u5F20\uFF0C\u8FDE\u540C\u90A3\u53E5\u8BDD\u4E00\u8D77\u663E\u793A\uFF08\u56FE\u7247\u6620\u5C04\u5728\u914D\u7F6E\u6587\u4EF6\u9876\u5C42 memes\uFF09\u3002token\uFF1A\u788E\u788E\u5FF5\u672C\u6765\u5C31\u6BCF\u6B21\u751F\u6210\u90FD\u8981\u8C03\u4E00\u6B21\u6A21\u578B\uFF0C\u914D\u56FE\u53EA\u662F\u628A\u62BD\u4E2D\u90A3\u5F20\u7684\u540D\u79F0+\u63CF\u8FF0\uFF08\u7EA6 100 \u5B57\u7B26 / \u224860 token\uFF09\u52A0\u8FDB\u540C\u4E00\u6B21\u8BF7\u6C42\uFF0C\u589E\u91CF\u53EF\u5FFD\u7565\u3002",
      chatImageToggle: "\u5BF9\u8BDD\u914D\u56FE",
      chatImageToggleHint: "\u5BF9\u8BDD\u65F6\u7531 AI \u6309\u5F53\u524D\u8BED\u5883\u4ECE\u8868\u60C5\u5305\u6C60\u6311\u4E00\u5F20\u914D\u56FE\uFF08\u53EF\u4E0D\u6311\uFF1B\u56FE\u7247\u6620\u5C04\u5728\u914D\u7F6E\u6587\u4EF6\u9876\u5C42 memes\uFF09\u3002token\uFF1A\u6BCF\u6761\u6D88\u606F\u90FD\u8981\u628A\u6574\u5F20\u6E05\u5355\u9644\u8FDB\u8BF7\u6C42\uFF0C\u5F53\u524D\u7EA6 1.1k \u5B57\u7B26\uFF08\u2248650 token\uFF0C\u7EA6\u788E\u788E\u5FF5\u914D\u56FE\u7684 11 \u500D\uFF09\uFF0C\u5E76\u968F\u56FE\u7247\u6570\u91CF\u7EBF\u6027\u589E\u957F\uFF1B\u5173\u6389\u5219\u4E00\u4E2A\u5B57\u7B26\u90FD\u4E0D\u9644\u3002",
      chatAnimationToggle: "\u5BF9\u8BDD\u52A8\u4F5C\u8054\u52A8",
      chatAnimationToggleHint: "\u5F00\u542F\u540E\uFF0C\u5BF9\u8BDD\u65F6\u4F1A\u628A\u53EF\u8868\u6F14\u7684\u52A8\u4F5C\u6E05\u5355\uFF08animations.categories \u4E0B\u7684\u5168\u90E8\u52A8\u4F5C\uFF09\u4EA4\u7ED9\u6A21\u578B\uFF1A\u6A21\u578B\u8BA4\u4E3A\u8FD9\u53E5\u8BDD\u786E\u5B9E\u5728\u6F14\u67D0\u4E2A\u52A8\u4F5C\u65F6\uFF0C\u5BA0\u7269\u5F53\u573A\u6F14\u51FA\u6765\uFF1B\u6CA1\u6709\u5408\u9002\u7684\u5C31\u53EA\u56DE\u6587\u5B57\u3002token\uFF1A\u6BCF\u6761\u6D88\u606F\u90FD\u8981\u9644\u6574\u5F20\u52A8\u4F5C\u6E05\u5355\uFF0C\u5173\u6389\u5219\u4E00\u4E2A\u540D\u5B57\u90FD\u4E0D\u9644\u3002\u5168\u5C40\u9ED8\u8BA4\uFF0C\u6240\u6709\u5BA0\u7269\u5171\u7528\uFF08pet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u8986\u76D6\uFF09\u3002",
      confineToggle: "\u9501\u5B9A\u5728\u5F53\u524D\u5C4F\u5E55",
      confineToggleHint: "\u591A\u5C4F\u7528\u6237\uFF1A\u5F00\u4E86\u4E4B\u540E\u5BA0\u7269\u53EA\u5728\u5F53\u524D\u6240\u5728\u90A3\u5757\u5C4F\u5E55\u5185\u6D3B\u52A8\u2014\u2014\u7529\u51FA\u53BB\u7684\u5BA0\u7269\u53EA\u5728\u677E\u624B\u65F6\u6240\u5728\u90A3\u5757\u5C4F\u5185\u5F39\uFF08\u5C4F\u7F1D\u5F53\u5899\uFF0C\u4E0D\u98DE\u5230\u9694\u58C1\u5C4F\uFF09\uFF0C\u81EA\u4E3B\u6F2B\u6E38\u4E5F\u53EA\u5728\u5F53\u524D\u6240\u5728\u90A3\u5757\u5C4F\u5185\u8D70\uFF08\u8D8A\u51FA\u5C4F\u7F1D\u7684\u90A3\u4E00\u6B65\u76F4\u63A5\u53D6\u6D88\uFF09\u3002\u5173\u6389\u5219\u7167\u5E38\u8DE8\u5C4F\u98DE\u884C / \u8DE8\u5C4F\u884C\u8D70\u3002\u53EA\u5F71\u54CD\u684C\u9762\u6A21\u5F0F\u2014\u2014\u6D4F\u89C8\u5668 overlay \u672C\u6765\u5C31\u53EA\u5728\u89C6\u53E3\u5185\u6D3B\u52A8\u3002",
      trayToggle: "\u7CFB\u7EDF\u6258\u76D8",
      trayToggleHint: "\u684C\u9762\u6A21\u5F0F\u542F\u52A8\u540E\u5728\u901A\u77E5\u533A\u57DF\uFF08macOS \u4E3A\u83DC\u5355\u680F\uFF09\u5E38\u9A7B\u4E00\u4E2A\u56FE\u6807\uFF0C\u5217\u51FA\u914D\u7F6E\u91CC\u7684\u5168\u90E8\u5BA0\u7269\uFF0C\u52FE\u9009\u5C31\u80FD\u5207\u6362\u663E\u793A\u4F4D\u7F6E\u2014\u2014\u5305\u62EC\u5F53\u524D\u4E0D\u5728\u684C\u9762\u3001\u6CA1\u6709\u7A97\u53E3\u53EF\u53F3\u952E\u7684\u90A3\u4E9B\u3002\u5173\u6389\u4E4B\u540E\u8981\u628A\u5BA0\u7269\u53EB\u56DE\u684C\u9762\uFF0C\u53EA\u80FD\u5F00\u6D4F\u89C8\u5668\u7528\u8BBE\u7F6E\u9875\uFF0C\u6216\u5728\u7F51\u9875\u7AEF\u90A3\u53EA\u5BA0\u7269\u8EAB\u4E0A\u53F3\u952E\u3002Windows \u672C\u6765\u5C31\u4F1A\u628A\u5B83\u6298\u53E0\u8FDB\u300C\u9690\u85CF\u7684\u56FE\u6807\u300D\u9762\u677F\u3002\u4EC5\u5F71\u54CD\u684C\u9762\u6A21\u5F0F\u3002",
      voiceTitle: "\u8BED\u97F3\u64AD\u62A5",
      voiceHint: "\u684C\u5BA0\u51FA\u58F0\u7684\u56DB\u4E2A\u5F00\u5173\u4E0E\u97F3\u8272\uFF1A\u6BCF\u7C7B\u8BED\u97F3\u5404\u4E00\u4E2A\u5F00\u5173\uFF0C\u4E92\u4E0D\u4ECE\u5C5E\u3002\u9ED8\u8BA4\u5168\u5173\uFF0C\u968F\u300C\u4FDD\u5B58\u300D\u5199\u5165\u7528\u6237\u914D\u7F6E\uFF08\u4E0D\u505A\u5373\u65F6\u5199\u5165\uFF09\u3002",
      voiceEnabled: "\u624B\u52A8\u64AD\u62A5",
      voiceEnabledHint: "\u53F3\u952E\u83DC\u5355\u3001\u659C\u6760\u547D\u4EE4\u89E6\u53D1\u7684\u788E\u788E\u5FF5\uFF0C\u4EE5\u53CA\u5BF9\u8BDD\u56DE\u590D\u5FF5\u51FA\u6765\u3002\u5BF9\u8BDD\u9762\u677F\u7684\u5587\u53ED\u6309\u94AE\u662F\u5355\u53E5\u70B9\u64AD\uFF0C\u968F\u65F6\u53EF\u70B9\u3002\u53EA\u5F71\u54CD\u300C\u8BF4\u4E0D\u8BF4\u300D\uFF1A\u6C14\u6CE1\u3001\u5BF9\u8BDD\u8BB0\u5FC6\u4E0E\u7CFB\u7EDF\u901A\u77E5\u5F39\u7A97\u90FD\u4E0D\u53D7\u5F71\u54CD\uFF1B\u5408\u6210\u5931\u8D25\u53EA\u7559\u65E5\u5FD7\uFF0C\u4E0D\u6253\u65AD\u5BF9\u8BDD\u3002",
      voiceWhisperEnabled: "\u788E\u788E\u5FF5\u64AD\u62A5",
      voiceWhisperEnabledHint: "\u5468\u671F\u751F\u6210\u7684\u90A3\u53E5\u788E\u788E\u5FF5\u5FF5\u51FA\u6765\u3002\u9ED8\u8BA4\u5173\u95ED\u2014\u2014\u788E\u788E\u5FF5\u662F\u80CC\u666F\u65C1\u767D\uFF0C\u4E0D\u8BE5\u9ED8\u8BA4\u51FA\u58F0\u3002",
      voiceTodoEnabled: "\u5F85\u529E\u64AD\u62A5",
      voiceTodoEnabledHint: "\u5230\u70B9\u7684\u5F85\u529E\u63D0\u9192\u5FF5\u51FA\u6765\uFF08\u540C\u4E00\u53E5\u7167\u6837\u5F39\u6C14\u6CE1\uFF0C\u672C\u9879\u53EA\u51B3\u5B9A\u5FF5\u4E0D\u5FF5\uFF09\u3002\u9ED8\u8BA4\u5173\u95ED\u3002",
      voiceNotifyEnabled: "\u901A\u77E5\u64AD\u62A5",
      voiceNotifyEnabledHint: "\u4EFB\u52A1\u5B8C\u6210\u3001\u51FA\u9519\u3001\u7B49\u4F60\u786E\u8BA4\u65F6\u5FF5\u4E00\u53E5\u8BE5\u6863\u4F4D\u914D\u7F6E\u7684\u5DE5\u4F5C\u72B6\u6001\u6587\u6848\u3002\u548C\u7CFB\u7EDF\u901A\u77E5\u540C\u4E00\u53D6\u5411\uFF1A\u7528\u6237\u4E0D\u5728\u672C\u9875\uFF08\u5207\u8D70\u3001\u5931\u7126\u3001\u6700\u5C0F\u5316\uFF09\u65F6\u624D\u5FF5\uFF0C\u6B63\u770B\u7740\u5C4F\u5E55\u65F6\u4E0D\u6253\u6270\u3002\u53EA\u5FF5\u914D\u7F6E\u91CC\u7684\u53F0\u8BCD\uFF0C\u4E0D\u5FF5\u4EFB\u52A1\u8BE6\u60C5\u3002\u9ED8\u8BA4\u5173\u95ED\u3002",
      voiceNameLabel: "\u97F3\u8272",
      voiceVolumeLabel: "\u97F3\u91CF",
      voiceVolumeHint: "\u64AD\u62A5\u97F3\u91CF\uFF0C0\u20131 \u7684\u5C0F\u6570\uFF1A1 \u662F\u6700\u5927\u97F3\u91CF\uFF08100%\uFF09\uFF0C0 \u662F\u9759\u97F3\u3002\u53EA\u6539\u64AD\u653E\u54CD\u5EA6\uFF0C\u4E0D\u4F1A\u91CD\u65B0\u5408\u6210\u97F3\u9891\uFF0C\u8C03\u5B83\u4E0D\u989D\u5916\u82B1\u94B1\u3002\u56DB\u7C7B\u8BED\u97F3\u5171\u7528\u8FD9\u4E00\u4E2A\u97F3\u91CF\u3002",
      physicsTitle: "\u7269\u7406\uFF08\u62D6\u62FD\u629B\u63B7\u624B\u611F\uFF09",
      physicsHint: "\u5168\u5C40\u9ED8\u8BA4\uFF0C\u6240\u6709\u5BA0\u7269\u5171\u7528\uFF08pet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u5355\u72EC\u8986\u76D6\uFF09\uFF1B\u968F\u300C\u4FDD\u5B58\u300D\u5199\u5165\u7528\u6237\u914D\u7F6E\uFF08\u4E0D\u505A\u5373\u65F6\u5199\u5165\uFF09\u3002\u6D4F\u89C8\u5668\u4FDD\u5B58\u540E\u5373\u65F6\u751F\u6548\uFF0C\u684C\u9762\u7AEF\u7531\u4FDD\u5B58\u91CD\u8F7D\u5BA0\u7269\u7A97\u53E3\u540E\u751F\u6548\u3002",
      mobileTitle: "\u79FB\u52A8\u7AEF\u6548\u679C",
      mobileHint: "\u8FD9\u51E0\u9879\u53EA\u5728\u624B\u673A\u6D4F\u89C8\u5668\u4E0A\u6709\u610F\u4E49\uFF1A\u632F\u52A8\u8981\u6709\u9A6C\u8FBE\uFF0C\u4E24\u4E2A\u4F53\u611F\u5F00\u5173\u8981\u6709\u59FF\u6001 / \u52A0\u901F\u5EA6\u4F20\u611F\u5668\uFF1B\u4F20\u611F\u5668\u8FD8\u8981\u6C42 HTTPS \u6216 localhost\u3002",
      "physics.gravity": "\u91CD\u529B",
      "physics.gravityHint": "px/s\xB2\uFF0C\u8D8A\u5927\u843D\u5F97\u8D8A\u5FEB\uFF1B0 = \u65E0\u91CD\u529B\uFF08\u629B\u51FA\u53BB\u5300\u901F\u76F4\u7EBF\u98DE\uFF09",
      "physics.restitution": "\u5F39\u6027",
      "physics.restitutionHint": "0~1\uFF0C\u78B0\u58C1 / \u843D\u5730\u53CD\u5F39\u4FDD\u7559\u7684\u901F\u5EA6\u6BD4\u4F8B\uFF081 = \u5B8C\u5168\u5F39\u6027\uFF0C0 = \u649E\u4E0A\u5373\u505C\uFF09",
      "physics.groundFriction": "\u63A5\u89E6\u6469\u64E6",
      "physics.groundFrictionHint": "/s\uFF0C\u649E\u5899 / \u843D\u5730 / \u649E\u9876\u540E\u6CBF\u63A5\u89E6\u9762\u65B9\u5411\u7684\u901F\u5EA6\u8870\u51CF\u7387\uFF1B0 = \u56DB\u9762\u90FD\u50CF\u51B0\u9762",
      "physics.throwPower": "\u603B\u529B\u5EA6",
      "physics.throwPowerHint": "> 0\uFF0C\u5F39\u7C27\u8DDF\u624B\u4E0E\u7529\u51FA\u521D\u901F\u7684\u6574\u4F53\u500D\u7387\uFF081 = \u9ED8\u8BA4\uFF1B\u8D8A\u5927\u8D8A\u8DDF\u624B\u3001\u7529\u5F97\u8D8A\u731B\uFF09",
      physicsCeilingBounce: "\u9876\u90E8\u53CD\u5F39",
      physicsCeilingBounceHint: "\u5173\u6389\u540E\u629B\u63B7\u53EF\u98DE\u51FA\u5C4F\u5E55\u9876\u90E8\uFF08\u91CD\u529B\u4ECD\u4F1A\u628A\u5B83\u62C9\u56DE\u6765\uFF09",
      physicsPetCollision: "\u5BA0\u7269\u4E92\u649E",
      physicsPetCollisionHint: "\u98DE\u884C\u4E2D\u7684\u5BA0\u7269\u649E\u5230\u522B\u7684\u5BA0\u7269\u6309\u52A8\u91CF\u5B88\u6052\u5F39\u5F00\uFF08\u8D28\u91CF \u221D \u5C3A\u5BF8\xB2\uFF09",
      physicsHaptic: "\u78B0\u649E\u9707\u52A8",
      physicsHapticHint: "\u649E\u5899\u3001\u843D\u5730\u3001\u649E\u9876\u3001\u4E92\u649E\u5404\u9707\u4E00\u4E0B\u3002Chrome / Edge \u53EF\u7528\uFF1BiOS \u4E0E Via \u7B49 WebView \u58F3\u4E0D\u751F\u6548\uFF1B\u52FF\u6270\u6A21\u5F0F\u4F1A\u6321\u4F4F\u632F\u52A8\u3002",
      physicsTilt: "\u503E\u659C\u63A7\u5236\u91CD\u529B",
      physicsTiltHint: "\u503E\u659C\u624B\u673A = \u91CD\u529B\u671D\u90A3\u8FB9\uFF0C\u5927\u5C0F\u5C31\u662F\u4E0A\u9762\u7684\u91CD\u529B\u503C\uFF1B\u91CD\u529B\u4E3A 0 \u65F6\u503E\u659C\u6CA1\u6709\u6548\u679C\u3002\u9700\u8981 HTTPS \u6216 localhost\u3002",
      physicsShake: "\u6447\u4E00\u6447\u629B\u51FA",
      physicsShakeHint: "\u6447\u4E00\u6447\u6CBF\u7529\u52A8\u65B9\u5411\u628A\u5BA0\u7269\u7529\u51FA\u53BB\uFF0C\u529B\u5EA6 = \u57FA\u51C6 \xD7 \u603B\u529B\u5EA6\uFF1B\u4E0E\u91CD\u529B\u65E0\u5173\uFF0C\u91CD\u529B\u8BBE 0 \u4E5F\u80FD\u7529\u3002\u9700\u8981 HTTPS \u6216 localhost\u3002",
      invalidPhysics: "\u8BF7\u68C0\u67E5\u7269\u7406\u53C2\u6570\uFF1A\u91CD\u529B / \u5730\u9762\u6469\u64E6 \u2265 0\uFF0C\u5F39\u6027 0~1\uFF0C\u603B\u529B\u5EA6 > 0\u3002",
      fontTitle: "\u5916\u89C2\u4E0E\u5B57\u4F53",
      fontHint: "\u5B57\u4F53\u79CD\u7C7B\u4F5C\u7528\u4E8E\u73B0\u5728\u7528\u8F6F\u7CD6\u4F53\u7684\u5168\u90E8\u6587\u5B57\uFF1A\u5BA0\u7269\u6C14\u6CE1\u3001\u60AC\u6D6E\u63D0\u793A\u3001\u5BF9\u8BDD\u7A97\u3001\u5F97\u5206\u5F39\u7A97\uFF1B\u5B57\u53F7\u53EA\u4F5C\u7528\u4E8E\u5BA0\u7269\u6C14\u6CE1\u4E0E\u60AC\u6D6E\u63D0\u793A\uFF08\u5BF9\u8BDD\u7A97\u4E0E\u5F97\u5206\u5F39\u7A97\u7684\u5B57\u53F7\u4E0D\u53D8\uFF09\u3002\u5168\u5C40\u9ED8\u8BA4\uFF0C\u6240\u6709\u5BA0\u7269\u5171\u7528\uFF08pet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u5355\u72EC\u8986\u76D6\uFF09\uFF1B\u968F\u300C\u4FDD\u5B58\u300D\u5199\u5165\u7528\u6237\u914D\u7F6E\uFF0C\u6D4F\u89C8\u5668\u4FDD\u5B58\u540E\u5373\u65F6\u751F\u6548\uFF0C\u684C\u9762\u7AEF\u7531\u4FDD\u5B58\u91CD\u8F7D\u5BA0\u7269\u7A97\u53E3\u540E\u751F\u6548\u3002",
      fontFamilyLabel: "\u5B57\u4F53",
      fontFamilyHint: "\u300C\u8F6F\u7CD6\u4F53\uFF08\u5185\u7F6E\uFF09\u300D\u968F\u63D2\u4EF6\u63D0\u4F9B\uFF1B\u5176\u4F59\u4E3A\u7CFB\u7EDF\u5B57\u4F53\uFF0C\u673A\u5668\u4E0A\u6CA1\u88C5\u65F6\u81EA\u52A8\u56DE\u9000\u5230\u5B57\u4F53\u6808\u91CC\u7684\u4E0B\u4E00\u4E2A\uFF08\u4E0D\u4F1A\u7A7A\u767D\u6216\u62A5\u9519\uFF09\u3002",
      fontSizeLabel: "\u5B57\u53F7\uFF08px\uFF09",
      fontSizeHint: "\u6C14\u6CE1\u6B63\u6587\u5B57\u53F7\uFF1B\u60AC\u6D6E\u63D0\u793A\u4E0E\u6C14\u6CE1\u5185\u7684\u5C0F\u5B57\u6309\u65E2\u6709\u6BD4\u4F8B\u6D3E\u751F\u3002\u8303\u56F4 4~200\u3002",
      fontFollowToggle: "\u5B57\u53F7\u968F\u5BA0\u7269\u5927\u5C0F\u7F29\u653E",
      fontFollowToggleHint: "\u5F00\u542F\uFF08\u9ED8\u8BA4\uFF09\uFF1A\u5BA0\u7269\u8C03\u5927\u65F6\u5B57\u53F7\u7B49\u6BD4\u653E\u5927\uFF0C462 \u5BBD\u65F6\u6B63\u597D\u662F\u4E0A\u9762\u8BBE\u5B9A\u7684\u5B57\u53F7\uFF1B\u5173\u95ED\uFF1A\u5B57\u53F7\u6052\u5B9A\uFF0C\u4E0D\u968F\u5BA0\u7269\u5927\u5C0F\u53D8\u5316\u3002",
      invalidFont: "\u8BF7\u68C0\u67E5\u5B57\u4F53\u8BBE\u7F6E\uFF1A\u5B57\u4F53\u9700\u5728\u4E0B\u62C9\u5217\u8868\u5185\uFF0C\u5B57\u53F7\u9700\u4E3A 4~200 \u7684\u6570\u5B57\u3002",
      "font.candy": "\u8F6F\u7CD6\u4F53\uFF08\u5185\u7F6E\uFF09",
      "font.yahei": "\u5FAE\u8F6F\u96C5\u9ED1 / \u82F9\u65B9",
      "font.youyuan": "\u5E7C\u5706",
      "font.kaiti": "\u6977\u4F53",
      "font.simsun": "\u5B8B\u4F53",
      "font.comic": "\u6F2B\u753B\u4F53",
      "font.system": "\u7CFB\u7EDF\u9ED8\u8BA4",
      modelTitle: "\u5BF9\u8BDD\u4E0E\u6A21\u578B",
      modelHint: "\u788E\u788E\u5FF5\u4E0E\u5BF9\u8BDD\u5404\u81EA\u7528\u54EA\u4E2A\u6A21\u578B\uFF0C\u4EE5\u53CA\u5BF9\u8BDD\u6BCF\u6B21\u5E26\u591A\u5C11\u5386\u53F2\u8FDB\u4E0A\u4E0B\u6587\u3002\u9009\u300C\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u300D= \u7528\u4F60\u5F53\u524D\u5BF9\u8BDD\u6B63\u5728\u7528\u7684\u90A3\u4E2A\u6A21\u578B\uFF08\u9ED8\u8BA4\uFF09\u3002\u5168\u5C40\u9ED8\u8BA4\uFF1A\u5BF9\u6240\u6709\u5BA0\u7269\u751F\u6548\uFF0Cpet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u5355\u72EC\u8986\u76D6\u3002\u9009\u9879\u4E0E DSH \u7684\u6A21\u578B\u9009\u62E9\u5668\u540C\u6E90\uFF0C\u7531\u5BBF\u4E3B\u5B9E\u65F6\u63D0\u4F9B\u3002",
      modelFollow: "\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD",
      modelSearch: "\u641C\u7D22\u6A21\u578B\u2026",
      modelEmpty: "\u6CA1\u6709\u5339\u914D\u7684\u6A21\u578B\u3002",
      modelNoModels: "\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u578B\u3002",
      modelLoading: "\u6B63\u5728\u5237\u65B0\u6A21\u578B\u5217\u8868\u2026",
      modelTriggerAria: "\u9009\u62E9\u6A21\u578B\uFF0C\u5F53\u524D {model}",
      modelUnknown: "\uFF08\u5F53\u524D\u914D\u7F6E\uFF0C\u4E0D\u5728\u5217\u8868\u4E2D\uFF09",
      modelNone: "\u8BE5\u670D\u52A1\u5546\u6CA1\u6709\u53EF\u7528\u6A21\u578B",
      whisperModelLabel: "\u788E\u788E\u5FF5\u6A21\u578B",
      chatModelLabel: "\u5BF9\u8BDD\u6A21\u578B",
      modelFieldHint: "\u9009\u300C\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\u300D= \u7528\u5F53\u524D\u5BF9\u8BDD\u7684\u6A21\u578B\uFF1B\u6307\u5B9A\u4E86\u4F46\u8C03\u7528\u5931\u8D25\u4F1A\u81EA\u52A8\u56DE\u843D\u5230\u5F53\u524D\u5BF9\u8BDD\u7684\u6A21\u578B\u91CD\u8BD5\u4E00\u6B21\u3002",
      invalidModel: "\u8BF7\u68C0\u67E5\u6A21\u578B\u8BBE\u7F6E\uFF1A\u670D\u52A1\u5546\u4E0E\u6A21\u578B\u8981\u4E48\u90FD\u9009\uFF0C\u8981\u4E48\u90FD\u7559\u7A7A\uFF08\u8DDF\u968F\u5F53\u524D\u5BF9\u8BDD\uFF09\u3002",
      modelCatalogFailed: "\u6A21\u578B\u5217\u8868\u52A0\u8F7D\u5931\u8D25\uFF08\u5237\u65B0\u9875\u9762\u53EF\u91CD\u8BD5\uFF09\uFF1B\u5F53\u524D\u914D\u7F6E\u503C\u4ECD\u4F1A\u539F\u6837\u4FDD\u7559\u3002",
      chatMemory: "\u5BF9\u8BDD\u5386\u53F2\u6761\u6570",
      chatMemoryHint: "\u6BCF\u6B21\u5BF9\u8BDD\u8BF7\u6C42\u643A\u5E26\u7684\u6700\u8FD1\u5386\u53F2\u8F6E\u6570\uFF081 \u8F6E = 1 \u95EE 1 \u7B54\uFF1B0 = \u4E0D\u5E26\u5386\u53F2\uFF0C\u6BCF\u53E5\u90FD\u662F\u5168\u65B0\u5BF9\u8BDD\uFF09\u3002\u5BF9\u8BDD\u8BB0\u5FC6\u672C\u8EAB\u5168\u5B58\u4E0D\u5220\uFF0C\u6B64\u503C\u53EA\u51B3\u5B9A\u622A\u591A\u5C11\u8FDB\u4E0A\u4E0B\u6587\u2014\u2014\u8D8A\u5927\u8D8A\u8BB0\u5F97\u4F4F\uFF0C\u4E5F\u8D8A\u8D39 token\u3002\u5168\u5C40\u9ED8\u8BA4\uFF0C\u6240\u6709\u5BA0\u7269\u5171\u7528\uFF08pet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u5355\u72EC\u8986\u76D6\uFF09\u3002",
      invalidChatMemory: "\u8BF7\u68C0\u67E5\u5BF9\u8BDD\u5386\u53F2\u6761\u6570\uFF1A\u9700\u4E3A \u2265 0 \u7684\u6570\u5B57\u3002",
      chatImageLimit: "\u5BF9\u8BDD\u914D\u56FE\u5F20\u6570\u4E0A\u9650",
      chatImageLimitHint: "\u5BF9\u8BDD\u65F6\u53D1\u7ED9\u6A21\u578B\u7684\u8868\u60C5\u5305\u6E05\u5355\u6700\u591A\u51E0\u5F20\uFF08\u300C\u524D N \u5F20\u300D= \u914D\u7F6E\u91CC\u5199\u5728\u524D\u9762\u7684\u90A3 N \u6761\uFF0C\u60F3\u8BA9\u54EA\u51E0\u5F20\u4F18\u5148\u88AB\u53D1\u51FA\u53BB\u5C31\u628A\u987A\u5E8F\u5F80\u524D\u632A\uFF09\u3002\u6574\u5F20\u6E05\u5355\u662F\u6BCF\u6761\u6D88\u606F\u90FD\u8981\u9644\u7684\uFF0Ctoken \u968F\u5F20\u6570\u7EBF\u6027\u589E\u957F\u2014\u2014\u5F20\u6570\u4E00\u591A\u5C31\u662F\u7EAF\u70E7\u94B1\uFF0C\u9650\u5236\u6210\u524D N \u5F20\uFF0C\u6A21\u578B\u53EA\u4ECE\u8FD9\u51E0\u5F20\u91CC\u6311\u30020 = \u4E0D\u9650\u5236\uFF08\u5168\u90E8\u53D1\uFF09\u3002\u5185\u7F6E\u9ED8\u8BA4 10\u3002\u5168\u5C40\u9ED8\u8BA4\uFF0C\u6240\u6709\u5BA0\u7269\u5171\u7528\uFF08pet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u8986\u76D6\uFF09\u3002\u53EA\u5F71\u54CD\u5BF9\u8BDD\u9009\u56FE\uFF1A\u788E\u788E\u5FF5\u53EA\u5E26\u62BD\u4E2D\u7684\u90A3\u4E00\u5F20\u3002",
      invalidChatImageLimit: "\u8BF7\u68C0\u67E5\u5BF9\u8BDD\u914D\u56FE\u5F20\u6570\u4E0A\u9650\uFF1A\u9700\u4E3A \u2265 0 \u7684\u6570\u5B57\uFF080 = \u4E0D\u9650\u5236\uFF09\u3002",
      notifyTest: "\u6D4B\u8BD5\u5F39\u7A97",
      notifyTestOk: "\u6D4B\u8BD5\u901A\u77E5\u5DF2\u53D1\u9001\uFF0C\u8BF7\u67E5\u770B\u684C\u9762\u53F3\u4E0B\u89D2\u3002",
      notifyDenyUnsupported: "\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u7CFB\u7EDF\u901A\u77E5\uFF08\u6D4F\u89C8\u5668\u65E0 Notification API\uFF09\u3002",
      notifyDenyBlocked: "\u901A\u77E5\u6743\u9650\u5DF2\u88AB\u6D4F\u89C8\u5668\u6807\u8BB0\u4E3A\u300C\u963B\u6B62\u300D\u3002",
      notifyDenyRejected: "\u4F60\u5728\u6743\u9650\u8BE2\u95EE\u5F39\u7A97\u4E2D\u9009\u62E9\u4E86\u300C\u963B\u6B62\u300D\u3002",
      notifyDenyError: "\u7533\u8BF7\u6743\u9650\u65F6\u51FA\u9519",
      notifyGuide: "\u5F15\u5BFC\uFF1A\u70B9\u51FB\u5730\u5740\u680F\u5DE6\u4FA7 \u{1F512}/\u24D8 \u2192\u300C\u7F51\u7AD9\u8BBE\u7F6E\u300D\u2192\u300C\u901A\u77E5\u300D\u2192 \u6539\u4E3A\u300C\u5141\u8BB8\u300D\uFF0C\u5237\u65B0\u9875\u9762\u540E\u91CD\u8BD5\u3002",
      storageTitle: "\u5378\u8F7D\u4E0E\u5B58\u50A8",
      storageHint: "\u63D2\u4EF6\u5728\u672C\u673A\u843D\u4E0B\u7684\u5168\u90E8\u4F4D\u7F6E\u3002\u5220\u7F13\u5B58\u4E0D\u5F71\u54CD\u4F7F\u7528\uFF08\u4F1A\u81EA\u52A8\u91CD\u4E0B/\u91CD\u5EFA\uFF09\uFF1B\u5220\u300C\u63D2\u4EF6\u7528\u6237\u6570\u636E\u300D\u4F1A\u4E22\u914D\u7F6E\u4E0E\u5BF9\u8BDD\u8BB0\u5FC6\u3002",
      "storage.userData": "\u63D2\u4EF6\u7528\u6237\u6570\u636E\uFF1A\u81EA\u5B9A\u4E49\u914D\u7F6E main-config.jsonc\u3001\u5BF9\u8BDD\u8BB0\u5FC6 memory.json\u3001\u81EA\u5B9A\u4E49\u52A8\u753B\u7D20\u6750 main-animation/\u3001\u6587\u4EF6\u5BA0\u7269 pet/",
      "storage.electron": "\u684C\u9762\u5BA0\u7269\u7528\u7684 Electron \u8FD0\u884C\u65F6\uFF08\u4F53\u79EF\u8F83\u5927\uFF1B\u5220\u9664\u540E\u4E0B\u6B21\u542F\u7528\u684C\u9762\u6A21\u5F0F\u4F1A\u81EA\u52A8\u91CD\u65B0\u4E0B\u8F7D\uFF09",
      "storage.desktopCache": "\u684C\u9762\u5BA0\u7269\u7A97\u53E3\u7684\u7F13\u5B58\u4E0E\u4E3B\u5C4F\u7F29\u653E\u7F13\u5B58\uFF08\u53EF\u5220\uFF0C\u4F1A\u81EA\u52A8\u91CD\u5EFA\uFF09",
      "storage.electronCache": "Electron \u5B89\u88C5\u5305\u4E0B\u8F7D\u7F13\u5B58\uFF08\u53EF\u5220\uFF0C\u9700\u8981\u65F6\u4F1A\u91CD\u65B0\u4E0B\u8F7D\uFF09",
      "storage.package": "\u63D2\u4EF6\u672C\u4F53\uFF08\u7531 DSH \u7BA1\u7406\uFF0C\u7528\u4E0B\u9762\u7684\u5378\u8F7D\u547D\u4EE4\u79FB\u9664\uFF0C\u4E0D\u8981\u624B\u5220\uFF09",
      storageMissing: "\uFF08\u5C1A\u672A\u521B\u5EFA\uFF09",
      uninstallTitle: "\u5378\u8F7D\u65B9\u6CD5",
      uninstallStep1: "1. \u5148\u9000\u51FA DSH\uFF08\u684C\u9762\u5BA0\u7269\u968F\u4E4B\u9000\u51FA\uFF09\uFF1B\u4E0D\u8981\u5728\u684C\u5BA0\u8FD0\u884C\u65F6\u5220\u9664\u4E0A\u9762\u7684\u6587\u4EF6\u3002",
      uninstallStep2: "2. \u5378\u8F7D\u63D2\u4EF6\u672C\u4F53\uFF08\u7EC8\u7AEF\u6267\u884C\uFF0C\u4F1A\u540C\u65F6\u4ECE profile \u7684 bundle \u5C42\u79FB\u9664\uFF09\uFF1A",
      uninstallStep3: "3. \u6309\u9700\u5220\u9664\u4E0A\u9762\u7684\u4F4D\u7F6E\uFF1A\u7F13\u5B58\u7C7B\u5220\u4E86\u65E0\u5F71\u54CD\uFF1B\u300C\u63D2\u4EF6\u7528\u6237\u6570\u636E\u300D\u5220\u4E86\u4F1A\u4E22\u914D\u7F6E\u4E0E\u5BF9\u8BDD\u8BB0\u5FC6\uFF08\u60F3\u4FDD\u7559\u5C31\u5148\u5907\u4EFD\u5176\u4E2D\u7684 main-config.jsonc\uFF09\u3002",
      motionTitle: "\u52A8\u4F5C\u9891\u7387",
      motionHint: "\u56DB\u4E2A\u6846\uFF1A\u5F85\u673A / \u8F6C\u5411 / \u79FB\u52A8\u53EF\u6539\uFF0C\u968F\u673A\u52A8\u4F5C\u81EA\u52A8\u7B97\uFF08= 100 \u2212 \u5176\u4F59\u4E09\u9879\uFF09\u3002\u5168\u5C40\u9ED8\u8BA4\uFF0C\u6240\u6709\u5BA0\u7269\u5171\u7528\uFF1Bpet pack \u53EF\u5728\u81EA\u5DF1\u79CD\u7C7B\u6587\u4EF6\u91CC\u8986\u76D6\u3002",
      "motion.idle": "\u5F85\u673A",
      "motion.turn": "\u8F6C\u5411",
      "motion.move": "\u79FB\u52A8",
      "motion.action": "\u968F\u673A\u52A8\u4F5C",
      uninstallCmd: "dsh plugin --profile {profile} remove dsh-pet"
    };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/index.ts
var NS, dicts;
var init_locales = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings/locales/index.ts"() {
    init_de();
    init_en();
    init_es();
    init_fr();
    init_ja();
    init_pt();
    init_ru();
    init_zh();
    init_zh();
    NS = "pet.config";
    dicts = { zh, en, ja, es, fr, de, ru, pt };
  }
});

// plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings.ts
var settings_exports = {};
__export(settings_exports, {
  NS: () => NS,
  dicts: () => dicts,
  makePetConfigSection: () => makePetConfigSection,
  petBridge: () => petBridge
});
function makePetConfigSection(rt, ctx) {
  const { h: h2, useState, useEffect, useRef, useCallback, t: t2 } = rt;
  injectSettingsCss();
  const { q } = makeUiKit({ h: h2, t: t2 });
  const ModelPicker = makeModelPicker({ h: h2, useState, useEffect, useRef, t: t2 });
  const VoicePicker = makeVoicePicker({ h: h2, useState, useEffect, useRef });
  const PetTabs = makePetTabs({ h: h2, t: t2 });
  const KindTabs = makeKindTabs({ h: h2, t: t2 });
  const PetCard = makePetCard(rt);
  const GlobalCard = makeGlobalCard(rt);
  const VoiceCard = makeVoiceCard(rt, VoicePicker);
  const FontCard = makeFontCard(rt);
  const ModelCard = makeModelCard(rt, ModelPicker);
  const PhysicsCard = makePhysicsCard(rt);
  const MotionCard = makeMotionCard(rt);
  const ShortcutsCard = makeShortcutsCard(rt, ctx);
  const MobileCard = makeMobileCard(rt);
  const Actions = makeActions(rt);
  const { ConfigMetaCard, StorageCard } = makePathsCards(rt);
  const SettingsDialog = makeDialog(rt);
  const LoadStatus = makeLoadStatus({ h: h2, t: t2 });
  return function PetConfigSection() {
    const [saving, setBusy] = useState(false);
    const [msg, setMsg] = useState({ kind: "", text: "" });
    const [permMsg, setPermMsg] = useState({ kind: "", text: "" });
    const rootRef = useRef(null);
    const [dialog, setDialog] = useState(null);
    const {
      pets,
      mainPets,
      kinds,
      kind,
      visiblePets,
      selId,
      entryPrompt,
      select,
      selectKind,
      update,
      add,
      requestRemove,
      remove,
      replace,
      packWrites
    } = usePetList(rt, setDialog);
    const { paths, catalog, catalogFailed } = useRemoteData(rt);
    useEffect(() => attachTipLayer(), []);
    useEffect(() => {
      let alive = true;
      void fetch(ROUTE_PATH + "/voice/voices").then((response) => response.ok ? response.json() : null).then((body) => {
        if (alive && body && Array.isArray(body.voices)) setVoiceOptions(body.voices);
      }).catch(() => void 0);
      return () => {
        alive = false;
      };
    }, []);
    const [notifyEnabled2, setNotifyEnabled] = useState(true);
    const [clickSound, setClickSound] = useState(true);
    const [whisperImage, setWhisperImage] = useState(false);
    const [chatImage, setChatImage] = useState(false);
    const [chatAnimation, setChatAnimation] = useState(true);
    const [confineScreen, setConfineScreen] = useState(false);
    const [trayEnabled, setTrayEnabled] = useState(true);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [voiceName, setVoiceName] = useState("zh-CN-XiaoyiNeural");
    const [voiceVolume, setVoiceVolume] = useState(1);
    const [voiceWhisperEnabled, setVoiceWhisperEnabled] = useState(false);
    const [voiceTodoEnabled, setVoiceTodoEnabled] = useState(false);
    const [voiceNotifyEnabled, setVoiceNotifyEnabled] = useState(false);
    const [voiceOptions, setVoiceOptions] = useState([]);
    const [physics, setPhysics] = useState({ ...DEFAULT_PHYSICS });
    const [font, setFont] = useState({ ...DEFAULT_FONT });
    const [weights, setWeights] = useState({ ...DEFAULT_WEIGHTS });
    const [whisperModel, setWhisperModel] = useState({ provider: "", model: "" });
    const [chatModel, setChatModel] = useState({ provider: "", model: "" });
    const [chatMemory, setChatMemory] = useState(10);
    const [chatImageLimit, setChatImageLimit] = useState(20);
    const [avatarVersion, setAvatarVersion] = useState(Date.now());
    const [avatarBusy, setAvatarBusy] = useState(false);
    const applyConfig = useCallback(
      (merged) => {
        const entries = readConfigEntries(merged);
        const patch = readMainConfig(merged);
        if (entries === null || patch === null) throw new Error("Invalid config response");
        replace(entries);
        if (patch.notificationsEnabled !== void 0) setNotifyEnabled(patch.notificationsEnabled);
        if (patch.clickSoundEnabled !== void 0) setClickSound(patch.clickSoundEnabled);
        if (patch.whisperImageEnabled !== void 0) setWhisperImage(patch.whisperImageEnabled);
        if (patch.chatImageEnabled !== void 0) setChatImage(patch.chatImageEnabled);
        if (patch.chatAnimationEnabled !== void 0) setChatAnimation(patch.chatAnimationEnabled);
        if (patch.confineToScreen !== void 0) setConfineScreen(patch.confineToScreen);
        if (patch.trayEnabled !== void 0) setTrayEnabled(patch.trayEnabled);
        if (patch.voiceEnabled !== void 0) setVoiceEnabled(patch.voiceEnabled);
        if (patch.voiceName !== void 0) setVoiceName(patch.voiceName);
        if (patch.voiceVolume !== void 0) setVoiceVolume(patch.voiceVolume);
        if (patch.voiceWhisperEnabled !== void 0) setVoiceWhisperEnabled(patch.voiceWhisperEnabled);
        if (patch.voiceTodoEnabled !== void 0) setVoiceTodoEnabled(patch.voiceTodoEnabled);
        if (patch.voiceNotifyEnabled !== void 0) setVoiceNotifyEnabled(patch.voiceNotifyEnabled);
        if (patch.physics !== void 0) setPhysics(patch.physics);
        if (patch.font !== void 0) setFont(patch.font);
        if (patch.animationWeights !== void 0) setWeights(patch.animationWeights);
        if (patch.whisperModel !== void 0) setWhisperModel(patch.whisperModel);
        if (patch.chatModel !== void 0) setChatModel(patch.chatModel);
        if (patch.chatMemoryRounds !== void 0) setChatMemory(patch.chatMemoryRounds);
        if (patch.chatImageLimit !== void 0) setChatImageLimit(patch.chatImageLimit);
      },
      [replace]
    );
    const { loadState, retry } = useConfigLoad(rt, applyConfig);
    const busy = saving || loadState !== "ready";
    const toggleNotify = async (v) => {
      setNotifyEnabled(v);
      if (v) await requestNotificationPermission();
    };
    const testNotification = () => void runNotificationTest({ t: t2, report: setPermMsg });
    const cur = pets.find((p) => p.id === selId) ?? null;
    const avatarEditable = cur !== null && cur.assetRoot !== void 0 && cur.assetRoot !== "main";
    const uploadAvatar = (file) => {
      if (cur === null) return;
      const assetRoot = cur.assetRoot ?? "";
      setAvatarBusy(true);
      void (async () => {
        try {
          const result = await uploadPetAvatar(assetRoot, file);
          if (!result.ok) {
            setMsg({ kind: "err", text: result.message });
            return;
          }
          setAvatarVersion(Date.now());
          setMsg({ kind: "ok", text: t2("avatarUploaded") });
        } catch (error) {
          setMsg({ kind: "err", text: error instanceof Error ? error.message : String(error) });
        } finally {
          setAvatarBusy(false);
        }
      })();
    };
    const packCount = kinds.filter((item) => item.kind === "pack").length;
    const globalFlags = {
      notificationsEnabled: notifyEnabled2,
      clickSoundEnabled: clickSound,
      confineToScreen: confineScreen,
      trayEnabled
    };
    const chatFlags = {
      whisperImageEnabled: whisperImage,
      chatImageEnabled: chatImage,
      chatAnimationEnabled: chatAnimation
    };
    const flagSetters = {
      notificationsEnabled: (value) => void toggleNotify(value),
      clickSoundEnabled: setClickSound,
      confineToScreen: setConfineScreen,
      trayEnabled: setTrayEnabled,
      whisperImageEnabled: setWhisperImage,
      chatImageEnabled: setChatImage,
      chatAnimationEnabled: setChatAnimation
    };
    const setGlobalFlag = (key, value) => flagSetters[key](value);
    const setChatFlag = (key, value) => flagSetters[key](value);
    const patchFont = (patch) => setFont((current2) => ({ ...current2, ...patch }));
    const patchPhysics = (patch) => setPhysics((current2) => ({ ...current2, ...patch }));
    const setModel = (key, value) => {
      if (key === "whisperModel") setWhisperModel(value);
      else setChatModel(value);
    };
    const write = createWriteFlow({
      fields: () => ({
        // PUT /config 只写用户主配置：只能提交 main 层实例，pack 实例走 POST /pet-config。
        pets: mainPets,
        notificationsEnabled: notifyEnabled2,
        clickSoundEnabled: clickSound,
        whisperImageEnabled: whisperImage,
        chatImageEnabled: chatImage,
        chatAnimationEnabled: chatAnimation,
        confineToScreen: confineScreen,
        trayEnabled,
        voiceEnabled,
        voiceName,
        voiceVolume,
        voiceWhisperEnabled,
        voiceTodoEnabled,
        voiceNotifyEnabled,
        physics,
        whisperModel,
        chatModel,
        chatMemoryRounds: chatMemory,
        chatImageLimit,
        font,
        animationWeights: weights
      }),
      busy: () => busy,
      setBusy,
      setMsg,
      setDialog,
      dialog: () => dialog,
      applyConfig,
      packWrites,
      userFile: () => paths?.user ?? "",
      t: t2,
      onRemove: remove
    });
    const saveRef = useRef(() => {
    });
    useEffect(() => {
      saveRef.current = () => void write.save();
    });
    useEffect(() => {
      const onKey = (e) => {
        if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
        if (e.key.toLowerCase() !== "s") return;
        const root = rootRef.current;
        if (!root || !root.isConnected || root.getClientRects().length === 0) return;
        e.preventDefault();
        saveRef.current();
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, []);
    return h2("section", {
      ref: rootRef,
      className: "dsh-pet-cfg",
      style: { maxWidth: "720px" },
      children: [
        // 标题：intro 与「额外宠物」说明都收进问号。
        h2("h2", {
          className: "dsh-pet-cfg__title",
          children: [
            t2("nav"),
            q(packCount > 0 ? t2("intro") + "\n" + t2("extraPetsHint").replace("{n}", String(packCount)) : t2("intro"))
          ]
        }),
        h2(LoadStatus, { loadState, onRetry: retry }),
        h2(KindTabs, { kinds, kind, busy, onSelect: selectKind }),
        h2(PetTabs, { pets: visiblePets, selId, busy, onSelect: select, onAdd: add }),
        h2(PetCard, {
          pet: cur,
          busy,
          msg,
          entryPrompt,
          // 预览与聊天面板同一个地址：内置回默认 logo，所以无需区分「有没有头像」。
          avatarSrc: avatarUrl(cur?.assetRoot ?? "", avatarVersion),
          avatarBusy,
          // 内置条目没有这个能力：不传 onAvatar，卡片就只渲染预览。
          ...avatarEditable ? { onAvatar: uploadAvatar } : {},
          onChange: update,
          onSave: () => void write.save(),
          onRemove: requestRemove
        }),
        h2(GlobalCard, { busy, values: globalFlags, onChange: setGlobalFlag }),
        h2(VoiceCard, {
          busy,
          enabled: voiceEnabled,
          voiceName,
          volume: voiceVolume,
          voices: voiceOptions,
          whisperEnabled: voiceWhisperEnabled,
          todoEnabled: voiceTodoEnabled,
          notifyEnabled: voiceNotifyEnabled,
          onToggle: setVoiceEnabled,
          onVoiceChange: setVoiceName,
          onVolumeChange: setVoiceVolume,
          onWhisperToggle: setVoiceWhisperEnabled,
          onTodoToggle: setVoiceTodoEnabled,
          onNotifyToggle: setVoiceNotifyEnabled
        }),
        h2(FontCard, { busy, font, onChange: patchFont }),
        h2(ModelCard, {
          busy,
          catalog,
          failed: catalogFailed,
          whisperModel,
          chatModel,
          onModelChange: setModel,
          chatMemory,
          chatImageLimit,
          onChatMemoryChange: setChatMemory,
          onChatImageLimitChange: setChatImageLimit,
          values: chatFlags,
          onFlagChange: setChatFlag
        }),
        h2(PhysicsCard, { busy, physics, onChange: patchPhysics }),
        h2(MotionCard, { busy, weights, onChange: setWeights }),
        h2(MobileCard, { busy, physics, onChange: patchPhysics }),
        h2(Actions, {
          busy,
          msg,
          permMsg,
          onSave: () => void write.save(),
          onSync: write.requestSync,
          onTestNotification: testNotification
        }),
        // 保存按钮以下是参考类卡片：只读说明，改不改都不用点保存。
        h2(ShortcutsCard, {}),
        // 落盘位置两张卡都靠 meta，读不到就整块不出现。
        paths ? h2(ConfigMetaCard, { paths }) : null,
        paths ? h2(StorageCard, { paths }) : null,
        dialog ? h2(SettingsDialog, { dialog, selId, onDismiss: () => setDialog(null), onConfirm: write.confirmDialog }) : null
      ]
    });
  };
}
var init_settings = __esm({
  "plugins/dsh-pamper/client-src/vendor/dsh-pet/src/client/settings.ts"() {
    init_constants();
    init_avatar();
    init_fonts();
    init_physics();
    init_notify2();
    init_css();
    init_actions();
    init_bridge();
    init_config();
    init_dialog();
    init_font_card();
    init_global_card();
    init_load_status();
    init_model_card();
    init_mobile_card();
    init_motion_card();
    init_picker();
    init_voice_picker();
    init_notify_test();
    init_kind_tabs();
    init_paths_cards();
    init_pet_card();
    init_avatar_upload();
    init_pet_tabs();
    init_config();
    init_physics_card();
    init_shortcuts_card();
    init_tip_layer();
    init_config();
    init_use_pet_list();
    init_use_remote_data();
    init_ui();
    init_voice_card();
    init_weights();
    init_locales();
  }
});

// plugins/dsh-pamper/client-src/love/love-entry.js
var love_entry_exports = {};
__export(love_entry_exports, {
  createLoveEntry: () => createLoveEntry
});
function createLoveEntry({ h: h2, useEffect, useRef, PetConfigSection, ROUTE_PATH: ROUTE_PATH2 }) {
  const PET_GROUP_OF = {
    main: "deepseek",
    "aboutme-dragon": "GPT",
    "xiaoxiao-bailong": "GPT",
    "aboutme-claude": "Claude",
    "xiaoxiao-ojousama": "Claude",
    "aboutme-gemini": "Gemini",
    "xiaoxiao-huangmao": "kimi",
    "xiaoxiao-heihu": "\u5176\u4ED6",
    "xiaoxiao-naicha": "\u5176\u4ED6"
  };
  const petGroupOf = (root) => PET_GROUP_OF[root] || "\u5176\u4ED6";
  const LoveIcon = ({ size = 18 }) => h2("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: h2("path", { d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" })
  });
  const LOVE_GROUP_ORDER = ["deepseek", "GPT", "Claude", "Gemini", "kimi", "\u8C46\u5305", "\u5176\u4ED6"];
  const LOVE_GROUP_COLOR = {
    deepseek: "#e8f0ff",
    GPT: "#eef2ff",
    Claude: "#fff1e6",
    Gemini: "#f3e8ff",
    kimi: "#fdf2d8",
    "\u8C46\u5305": "#f5f5f5",
    "\u5176\u4ED6": "#e9f7f1"
  };
  const loveAnimationsCount = (animations) => {
    const names = [];
    const add = (value) => {
      if (typeof value === "string" && value && names.indexOf(value) < 0) names.push(value);
      else if (Array.isArray(value)) value.forEach(add);
    };
    if (!animations || typeof animations !== "object") return 0;
    for (const key of ["idle", "turn", "drag", "clicks"]) add(animations[key]);
    for (const action of animations.moves && Array.isArray(animations.moves.actions) ? animations.moves.actions : []) add(action && action.name);
    for (const category of Array.isArray(animations.categories) ? animations.categories : []) add(category && category.actions);
    if (animations.events && typeof animations.events === "object") for (const pool of Object.values(animations.events)) add(pool);
    for (const set of Array.isArray(animations.sleep) ? animations.sleep : []) {
      add(set && set.start);
      add(set && set.loop);
      add(set && set.end);
    }
    add(animations.baifan);
    return names.length;
  };
  const LovePanel = () => {
    const hostRef = useRef(null);
    const rootRef = useRef(null);
    useEffect(() => {
      const host = hostRef.current;
      if (!host) return;
      host.innerHTML = "";
      host.style.cssText = "height:100%;overflow-y:auto;overflow-x:hidden;box-sizing:border-box;padding:20px 24px 48px;";
      const content = document.createElement("div");
      content.style.cssText = "max-width:1280px;margin:0 auto;";
      const title = document.createElement("div");
      title.textContent = "\u5BA0\u7231";
      title.style.cssText = "font-size:22px;font-weight:700;color:#16233d;display:flex;align-items:center;gap:6px;";
      const info = document.createElement("span");
      info.textContent = "\u24D8";
      info.title = "\u5B89\u88C5\u3001\u542F\u7528\u548C\u914D\u7F6E\u684C\u5BA0";
      info.style.cssText = "font-size:13px;color:#9aa6bd;font-weight:400;";
      title.appendChild(info);
      const subtitle = document.createElement("div");
      subtitle.textContent = "\u4E00\u7897\u7897\u5927\u7C73\u996D\u5C31\u662F\u5BF9\u4F60\u7684\u5BA0\u7231\u2026";
      subtitle.style.cssText = "margin-top:2px;font-size:13px;color:#5b6b8a;";
      const headText = document.createElement("div");
      headText.style.cssText = "flex:1 1 auto;";
      headText.appendChild(title);
      headText.appendChild(subtitle);
      const headActions = document.createElement("div");
      headActions.style.cssText = "display:flex;align-items:center;gap:10px;flex:0 0 auto;position:relative;";
      const refresh = document.createElement("button");
      refresh.type = "button";
      refresh.title = "\u5237\u65B0";
      refresh.setAttribute("aria-label", "\u5237\u65B0");
      refresh.style.cssText = "width:36px;height:36px;border-radius:50%;border:1px solid rgba(15,35,80,.14);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#3b4a66;padding:0;";
      refresh.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>';
      const addChar = document.createElement("button");
      addChar.type = "button";
      addChar.title = "\u5230\u300C\u684C\u5BA0\u914D\u7F6E\u300D\u91CC\u6DFB\u52A0\u65B0\u7684\u5BA0\u7269\u5B9E\u4F8B";
      addChar.style.cssText = "display:inline-flex;align-items:center;gap:6px;border:none;border-radius:10px;background:#1f2329;color:#fff;padding:8px 14px;font-size:13px;cursor:pointer;font-weight:500;";
      const addPlus = document.createElement("span");
      addPlus.textContent = "+";
      addPlus.style.cssText = "font-size:16px;line-height:1;font-weight:400;";
      const addText = document.createElement("span");
      addText.textContent = "\u6DFB\u52A0\u89D2\u8272";
      const addArrow = document.createElement("span");
      addArrow.textContent = "\u25BE";
      addArrow.style.cssText = "font-size:10px;opacity:.8;";
      addChar.appendChild(addPlus);
      addChar.appendChild(addText);
      addChar.appendChild(addArrow);
      const filterBtn = document.createElement("button");
      filterBtn.type = "button";
      filterBtn.title = "\u6309\u79CD\u7C7B\u7B5B\u9009";
      filterBtn.setAttribute("aria-label", "\u6309\u79CD\u7C7B\u7B5B\u9009");
      filterBtn.style.cssText = "width:36px;height:36px;border-radius:50%;border:1px solid rgba(15,35,80,.14);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#3b4a66;padding:0;";
      filterBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>';
      const filterPanel = document.createElement("div");
      filterPanel.style.cssText = "display:none;position:absolute;left:0;top:40px;z-index:60;width:230px;background:#fff;border:1px solid rgba(15,35,80,.12);border-radius:12px;box-shadow:0 18px 44px rgba(15,23,42,.18);padding:10px;";
      const filterTitle = document.createElement("div");
      filterTitle.textContent = "\u6309\u79CD\u7C7B\u7B5B\u9009\uFF08\u53EF\u591A\u9009\uFF09";
      filterTitle.style.cssText = "font-size:12px;color:#5b6b8a;margin:2px 6px 8px;";
      filterPanel.appendChild(filterTitle);
      const filterList = document.createElement("div");
      filterList.style.cssText = "display:flex;flex-direction:column;gap:2px;";
      filterPanel.appendChild(filterList);
      headActions.appendChild(refresh);
      headActions.appendChild(addChar);
      const head = document.createElement("div");
      head.style.cssText = "display:flex;align-items:flex-start;gap:16px;position:relative;";
      head.appendChild(headText);
      head.appendChild(headActions);
      const tabBar = document.createElement("div");
      tabBar.style.cssText = "display:inline-flex;align-items:center;background:#f2f4f7;border-radius:11px;padding:3px;margin:18px 0 16px;";
      const tabChars = document.createElement("button");
      tabChars.type = "button";
      tabChars.textContent = "\u89D2\u8272";
      const tabConfig = document.createElement("button");
      tabConfig.type = "button";
      tabConfig.textContent = "\u684C\u5BA0\u914D\u7F6E";
      const tabDiscover = document.createElement("button");
      tabDiscover.type = "button";
      tabDiscover.textContent = "\u53D1\u73B0";
      for (const tab of [tabChars, tabConfig, tabDiscover]) {
        tab.style.cssText = "border:none;background:transparent;padding:8px 18px;border-radius:9px;cursor:pointer;font-size:14px;color:#5b6b8a;font-weight:500;transition:background .15s ease,box-shadow .15s ease;";
        tabBar.appendChild(tab);
      }
      const statsBar = document.createElement("div");
      statsBar.style.cssText = "display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:16px;border:1px solid rgba(15,35,80,.10);background:#fafbfd;border-radius:12px;padding:10px 14px;margin-bottom:18px;min-width:0;overflow:visible;";
      const statsText = document.createElement("div");
      statsText.style.cssText = "font-size:13px;color:#3b4a66;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;";
      const statsActions = document.createElement("div");
      statsActions.style.cssText = "display:flex;align-items:center;gap:8px;flex:0 0 auto;position:relative;";
      const btnRefreshList = document.createElement("button");
      btnRefreshList.type = "button";
      btnRefreshList.textContent = "\u5237\u65B0\u5217\u8868";
      const btnAllOn = document.createElement("button");
      btnAllOn.type = "button";
      btnAllOn.textContent = "\u5168\u90E8\u5F00\u542F";
      const btnAllOff = document.createElement("button");
      btnAllOff.type = "button";
      btnAllOff.textContent = "\u5168\u90E8\u9690\u85CF";
      statsActions.appendChild(filterBtn);
      statsActions.appendChild(filterPanel);
      for (const b of [btnRefreshList, btnAllOn, btnAllOff]) {
        b.style.cssText = "border:1px solid rgba(15,35,80,.14);background:#fff;color:#3b4a66;font-size:12px;cursor:pointer;padding:7px 12px;border-radius:8px;white-space:nowrap;transition:background .15s ease,color .15s ease,border-color .15s ease;";
        b.addEventListener("mouseenter", () => {
          b.style.background = "#1f2329";
          b.style.color = "#fff";
          b.style.borderColor = "#1f2329";
        });
        b.addEventListener("mouseleave", () => {
          b.style.background = "#fff";
          b.style.color = "#3b4a66";
          b.style.borderColor = "rgba(15,35,80,.14)";
        });
        statsActions.appendChild(b);
      }
      statsBar.appendChild(statsText);
      statsBar.appendChild(statsActions);
      const charBody = document.createElement("div");
      const configBody = document.createElement("div");
      configBody.style.cssText = "display:none;width:100%;";
      const discoveryBody = document.createElement("div");
      discoveryBody.style.cssText = "display:none;width:100%;";
      const errorLine = document.createElement("div");
      errorLine.style.cssText = "color:#a33;font-size:13px;margin-top:10px;white-space:pre-wrap;";
      content.appendChild(head);
      content.appendChild(tabBar);
      content.appendChild(statsBar);
      content.appendChild(charBody);
      content.appendChild(configBody);
      content.appendChild(discoveryBody);
      content.appendChild(errorLine);
      host.appendChild(content);
      let activeTab = "characters";
      let currentPacks = [];
      let currentVisible = 0;
      const selectedGroups = /* @__PURE__ */ new Set();
      const paintTabs = () => {
        for (const pair of [["characters", tabChars], ["config", tabConfig], ["discover", tabDiscover]]) {
          const active = activeTab === pair[0];
          pair[1].style.background = active ? "#ffffff" : "transparent";
          pair[1].style.color = active ? "#16233d" : "#5b6b8a";
          pair[1].style.fontWeight = active ? "700" : "500";
          pair[1].style.boxShadow = active ? "0 1px 3px rgba(20,40,90,.14)" : "none";
        }
      };
      const paintStats = (shownCount) => {
        const total = selectedGroups.size > 0 && typeof shownCount === "number" ? shownCount + " \u4F4D\u89D2\u8272\uFF08\u5DF2\u7B5B\u9009\uFF09" : currentPacks.length + " \u4F4D\u89D2\u8272";
        statsText.textContent = total + " \xB7 " + currentVisible + " \u4E2A\u6B63\u5728\u684C\u9762\u966A\u4F34";
      };
      const groupOrder = () => typeof PET_GROUP_ORDER !== "undefined" ? PET_GROUP_ORDER : ["deepseek", "GPT", "Claude", "Gemini", "kimi", "\u8C46\u5305", "\u5176\u4ED6"];
      const paintFilterPanel = () => {
        filterList.innerHTML = "";
        for (const group of groupOrder()) {
          const items = currentPacks.filter((pack) => pack.group === group);
          if (items.length === 0 && group !== "\u8C46\u5305") continue;
          const row = document.createElement("label");
          row.style.cssText = "display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;cursor:pointer;font-size:13px;color:#3b4a66;";
          row.addEventListener("mouseenter", () => {
            row.style.background = "#f4f6f9";
          });
          row.addEventListener("mouseleave", () => {
            row.style.background = "transparent";
          });
          const box = document.createElement("input");
          box.type = "checkbox";
          box.checked = selectedGroups.has(group);
          box.style.cssText = "width:15px;height:15px;cursor:pointer;accent-color:#1f2329;";
          box.onchange = () => {
            if (box.checked) selectedGroups.add(group);
            else selectedGroups.delete(group);
            void loadGallery();
          };
          const text = document.createElement("span");
          text.style.cssText = "flex:1 1 auto;";
          text.textContent = group;
          const count = document.createElement("span");
          count.style.cssText = "font-size:12px;color:#8a94a8;";
          count.textContent = String(items.length);
          row.appendChild(box);
          row.appendChild(text);
          row.appendChild(count);
          filterList.appendChild(row);
        }
      };
      filterBtn.onclick = () => {
        filterPanel.style.display = filterPanel.style.display === "none" ? "block" : "none";
      };
      document.addEventListener("click", (event) => {
        if (!statsActions.contains(event.target)) filterPanel.style.display = "none";
      });
      const configHideStyle = document.createElement("style");
      configHideStyle.textContent = ".pet-love-config .dsh-pet-cfg__kinds{display:none !important;}";
      document.head.appendChild(configHideStyle);
      const mountConfig = () => {
        if (rootRef.current) return;
        const holder = document.createElement("div");
        holder.style.cssText = "width:100%;";
        configBody.appendChild(holder);
        configBody.classList.add("pet-love-config");
        try {
          const { createRoot } = require("react-dom/client");
          rootRef.current = createRoot(holder);
          rootRef.current.render(h2(PetConfigSection, {}));
        } catch (e) {
          errorLine.textContent = String(e && e.message ? e.message : e);
        }
      };
      const selectTab = (id) => {
        activeTab = id;
        charBody.style.display = id === "characters" ? "" : "none";
        statsBar.style.display = id === "characters" ? "" : "none";
        configBody.style.display = id === "config" ? "" : "none";
        discoveryBody.style.display = id === "discover" ? "" : "none";
        filterBtn.style.display = id === "characters" ? "" : "none";
        if (id !== "characters") filterPanel.style.display = "none";
        if (id === "config") mountConfig();
        if (id === "discover") void initDiscovery();
        paintTabs();
        host.scrollTop = 0;
      };
      const openPackConfig = (pack) => {
        selectTab("config");
        const findButton = (prefix) => Array.from(configBody.querySelectorAll("button")).find((b) => (b.textContent || "").trim().startsWith(prefix));
        let tries = 0;
        const step = () => {
          tries += 1;
          const groupButton = findButton(pack.group + " (");
          if (!groupButton) {
            if (tries < 12) setTimeout(step, 200);
            return;
          }
          groupButton.click();
          let petTries = 0;
          const pickPet = () => {
            petTries += 1;
            const petButton = findButton(pack.name + " (");
            if (petButton) {
              petButton.click();
              host.scrollTop = 0;
              return;
            }
            if (petTries < 12) setTimeout(pickPet, 150);
          };
          setTimeout(pickPet, 200);
        };
        setTimeout(step, 200);
      };
      const STORE_ROUTE = "/dsh-pamper-7470";
      const KIND_OF = { maid: "main", gpt: "aboutme-dragon", claude: "aboutme-claude", gemini: "aboutme-gemini" };
      const discovery = { catalog: null, config: null, selected: "gpt", category: "\u5168\u90E8", busy: false, message: "", loaded: {} };
      const collectNames = (animations, out) => {
        const add = (value) => {
          if (typeof value === "string" && value) out.add(value);
          else if (Array.isArray(value)) value.forEach(add);
        };
        if (!animations || typeof animations !== "object") return out;
        for (const key of ["idle", "turn", "drag", "clicks", "baifan"]) add(animations[key]);
        for (const action of animations.moves && Array.isArray(animations.moves.actions) ? animations.moves.actions : []) add(action && action.name);
        for (const category of Array.isArray(animations.categories) ? animations.categories : []) add(category && category.actions);
        if (animations.events && typeof animations.events === "object") for (const pool of Object.values(animations.events)) add(pool);
        for (const set of Array.isArray(animations.sleep) ? animations.sleep : []) {
          add(set && set.start);
          add(set && set.loop);
          add(set && set.end);
        }
        return out;
      };
      const refreshDiscoveryData = async () => {
        const [catalogRes, configRes] = await Promise.all([
          fetch(STORE_ROUTE + "/catalog", { cache: "no-store" }),
          fetch(ROUTE_PATH2 + "/config", { cache: "no-store" })
        ]);
        if (!catalogRes.ok) throw new Error("\u52A8\u4F5C\u5E93 HTTP " + catalogRes.status);
        discovery.catalog = await catalogRes.json();
        discovery.config = configRes.ok ? await configRes.json() : {};
        discovery.loaded = {};
        for (const character of discovery.catalog.characters) {
          const kind = KIND_OF[character.key];
          const conf = discovery.config[kind];
          discovery.loaded[character.key] = collectNames(conf && conf.animations, /* @__PURE__ */ new Set());
        }
      };
      const discoveryDisplayName = (character) => {
        const kind = KIND_OF[character.key];
        const conf = discovery.config && discovery.config[kind];
        const first = conf && Array.isArray(conf.pets) ? conf.pets[0] : null;
        const name = first && typeof first.name === "string" ? first.name.trim() : "";
        return name || (character.key === "maid" ? "\u5927\u80A5\u9C7C" : character.name);
      };
      const discoveryCharacter = () => discovery.catalog.characters.find((item) => item.key === discovery.selected) || discovery.catalog.characters[0];
      const discoveryActions = () => {
        const character = discoveryCharacter();
        if (!character) return [];
        return discovery.category === "\u5168\u90E8" ? character.actions : character.actions.filter((action) => action.category === discovery.category);
      };
      const discoveryCards = document.createElement("div");
      const discoveryTop = document.createElement("div");
      const discoveryMessage = document.createElement("div");
      discoveryMessage.style.cssText = "font-size:12px;color:#8a6d3b;margin:0 0 12px;white-space:pre-wrap;min-height:18px;";
      const discoveryHead = document.createElement("div");
      discoveryHead.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;flex-wrap:wrap;";
      discoveryTop.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px;";
      discoveryCards.style.cssText = "display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;";
      let discoveryInit = false;
      const initDiscovery = async () => {
        if (discoveryInit) return;
        discoveryInit = true;
        discoveryBody.innerHTML = "";
        discoveryBody.textContent = "\u6B63\u5728\u8BFB\u53D6\u52A8\u4F5C\u5E93\u2026";
        setTimeout(() => {
          if (discoveryBody.textContent === "\u6B63\u5728\u8BFB\u53D6\u52A8\u4F5C\u5E93\u2026") discoveryBody.textContent = "\u52A8\u4F5C\u5E93\u8BFB\u53D6\u8D85\u65F6\uFF1A/dsh-action-store-7462/catalog \u6CA1\u6709\u8FD4\u56DE\u3002";
        }, 15e3);
        try {
          await refreshDiscoveryData();
          renderDiscovery();
        } catch (e) {
          discoveryInit = false;
          discoveryBody.innerHTML = "";
          discoveryBody.textContent = "\u52A8\u4F5C\u5E93\u52A0\u8F7D\u5931\u8D25\uFF1A" + (e && e.message ? e.message : e);
        }
      };
      const loadStoreActions = async (actions) => {
        const loadedSet = discovery.loaded[discovery.selected] || /* @__PURE__ */ new Set();
        const pending = actions.filter((action) => !loadedSet.has(action.name));
        if (pending.length === 0) {
          discoveryMessage.textContent = "\u9009\u4E2D\u7684\u52A8\u4F5C\u90FD\u5DF2\u7ECF\u52A0\u8F7D\u4E86\u3002";
          return;
        }
        if (discovery.busy) return;
        discovery.busy = true;
        discoveryMessage.textContent = "\u6B63\u5728\u8F6C\u6362 " + pending.length + " \u4E2A\u52A8\u4F5C\uFF08VP9 \u900F\u660E\u89C6\u9891\uFF0C\u5355\u4E2A\u7EA6\u9700 10\u201360 \u79D2\uFF09\u2026";
        try {
          const resp = await fetch(STORE_ROUTE + "/load", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ character: discovery.selected, actionIds: pending.map((action) => action.name) })
          });
          const body = await resp.json();
          if (!resp.ok || !body.ok) throw new Error(body && body.error ? body.error : "HTTP " + resp.status);
          const failed = Array.isArray(body.failed) ? body.failed : [];
          discoveryMessage.textContent = "\u5DF2\u52A0\u8F7D " + body.converted + " \u4E2A\u52A8\u4F5C" + (failed.length ? "\uFF1B\u5931\u8D25 " + failed.length + " \u4E2A\uFF1A" + failed.slice(0, 3).join("\uFF1B") : "") + (body.reloaded ? "\uFF0C\u684C\u5BA0\u5DF2\u91CD\u8F7D\u3002" : "\u3002\u8BF7\u5728\u684C\u5BA0\u53F3\u952E\u83DC\u5355\u70B9\u300C\u91CD\u8F7D\u914D\u7F6E\u300D\u540E\u751F\u6548\u3002");
          await refreshDiscoveryData();
          renderDiscovery();
        } catch (e) {
          discoveryMessage.textContent = "\u52A0\u8F7D\u5931\u8D25\uFF1A" + (e && e.message ? e.message : e);
        } finally {
          discovery.busy = false;
        }
      };
      const openActionPreview = (action) => {
        const overlay = document.createElement("div");
        overlay.style.cssText = "position:fixed;inset:0;background:rgba(15,23,42,.42);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;";
        const panel = document.createElement("div");
        panel.style.cssText = "background:#fff;border-radius:18px;box-shadow:0 30px 80px rgba(15,23,42,.35);width:min(560px,92vw);overflow:hidden;";
        const head2 = document.createElement("div");
        head2.style.cssText = "display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid rgba(15,35,80,.10);";
        const title2 = document.createElement("div");
        title2.style.cssText = "flex:1 1 auto;font-size:15px;font-weight:700;color:#16233d;";
        title2.textContent = action.name + " \xB7 " + action.category;
        const close = document.createElement("button");
        close.type = "button";
        close.textContent = "\u5173\u95ED";
        close.style.cssText = "border:1px solid rgba(15,35,80,.16);background:#fff;border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer;color:#3b4a66;";
        head2.appendChild(title2);
        head2.appendChild(close);
        const stage = document.createElement("div");
        stage.style.cssText = "position:relative;width:100%;aspect-ratio:16/9;background:#F2F5FA;display:flex;align-items:center;justify-content:center;";
        const hint = document.createElement("div");
        hint.textContent = "\u6B63\u5728\u8F7D\u5165\u7CBE\u7075\u56FE\u2026";
        hint.style.cssText = "font-size:13px;color:#8a94a8;";
        const frame = document.createElement("div");
        frame.style.cssText = "display:none;width:100%;height:100%;background-repeat:no-repeat;background-position:0 0;";
        stage.appendChild(hint);
        stage.appendChild(frame);
        panel.appendChild(head2);
        panel.appendChild(stage);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        let raf = 0;
        let img = null;
        const cleanup = () => {
          cancelAnimationFrame(raf);
          overlay.remove();
        };
        close.onclick = cleanup;
        overlay.addEventListener("click", (event) => {
          if (event.target === overlay) cleanup();
        });
        img = new Image();
        img.onload = () => {
          hint.remove();
          frame.style.display = "block";
          const width = stage.clientWidth || 480;
          const height = stage.clientHeight || 270;
          const cols = Math.max(1, Number(action.columns) || 1);
          const rows = Math.max(1, Number(action.rows) || 1);
          const total = Math.max(1, Number(action.frameCount) || 1);
          const fps = Math.max(1, Number(action.fps) || 12);
          frame.style.backgroundImage = "url(" + img.src + ")";
          frame.style.backgroundSize = width * cols + "px " + height * rows + "px";
          const started = performance.now();
          const tick = (now) => {
            const index = Math.floor((now - started) / 1e3 * fps) % total;
            const col = index % cols;
            const row = Math.floor(index / cols);
            frame.style.backgroundPosition = -col * width + "px " + -row * height + "px";
            raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        };
        img.onerror = () => {
          hint.textContent = "\u9884\u89C8\u8F7D\u5165\u5931\u8D25";
        };
        img.src = STORE_ROUTE + "/thumb?pack=" + encodeURIComponent(action.pack) + "&name=" + encodeURIComponent(action.name);
      };
      const renderDiscovery = () => {
        try {
          if (!discovery.catalog) return;
          discoveryBody.innerHTML = "";
          const character = discoveryCharacter();
          const loadedSet = discovery.loaded[discovery.selected] || /* @__PURE__ */ new Set();
          const pills = document.createElement("div");
          pills.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;align-items:center;";
          for (const item of discovery.catalog.characters) {
            const loaded = (discovery.loaded[item.key] || /* @__PURE__ */ new Set()).size;
            const pill = document.createElement("button");
            pill.type = "button";
            const active = discovery.selected === item.key;
            pill.textContent = discoveryDisplayName(item) + " " + loaded + "/" + item.actionCount;
            if (discoveryDisplayName(item) !== item.name) pill.title = "\u52A8\u4F5C\u5E93\u540D\u79F0\uFF1A" + item.name;
            pill.style.cssText = "border:1px solid " + (active ? "#1f2329" : "rgba(15,35,80,.14)") + ";background:" + (active ? "#1f2329" : "#fff") + ";color:" + (active ? "#fff" : "#3b4a66") + ";border-radius:999px;padding:7px 12px;font-size:13px;cursor:pointer;";
            pill.onclick = () => {
              discovery.selected = item.key;
              discovery.category = "\u5168\u90E8";
              discovery.message = "";
              discoveryMessage.textContent = "";
              renderDiscovery();
            };
            pills.appendChild(pill);
          }
          const actions = discoveryActions();
          const loadedInView = actions.filter((action) => loadedSet.has(action.name)).length;
          const info2 = document.createElement("div");
          info2.style.cssText = "font-size:13px;color:#3b4a66;white-space:nowrap;";
          info2.textContent = discoveryDisplayName(character) + " \xB7 " + loadedSet.size + "/" + character.actionCount + " \u5DF2\u52A0\u8F7D\uFF08\u5F53\u524D\u7B5B\u9009 " + loadedInView + "/" + actions.length + "\uFF1B\u52A0\u8F7D\u540E\u8BE5\u5F62\u8C61\u7684\u6240\u6709\u5B9E\u4F8B\u5171\u4EAB\uFF09";
          const buttonStyle = "border:1px solid rgba(15,35,80,.14);background:#fff;color:#3b4a66;font-size:12px;cursor:pointer;padding:7px 12px;border-radius:8px;white-space:nowrap;";
          const btnRefresh = document.createElement("button");
          btnRefresh.type = "button";
          btnRefresh.textContent = "\u5237\u65B0";
          btnRefresh.style.cssText = buttonStyle;
          btnRefresh.onclick = async () => {
            try {
              await refreshDiscoveryData();
              renderDiscovery();
            } catch (e) {
              discoveryMessage.textContent = "\u5237\u65B0\u5931\u8D25\uFF1A" + (e && e.message ? e.message : e);
            }
          };
          const btnLoadCategory = document.createElement("button");
          btnLoadCategory.type = "button";
          btnLoadCategory.textContent = "\u52A0\u8F7D\u672C\u5206\u7C7B";
          btnLoadCategory.style.cssText = buttonStyle;
          btnLoadCategory.onclick = () => {
            void loadStoreActions(discoveryActions());
          };
          const btnLoadCharacter = document.createElement("button");
          btnLoadCharacter.type = "button";
          btnLoadCharacter.textContent = "\u52A0\u8F7D\u8BE5\u89D2\u8272\u5168\u90E8";
          btnLoadCharacter.style.cssText = buttonStyle;
          btnLoadCharacter.onclick = () => {
            void loadStoreActions(character.actions);
          };
          const buttonRow = document.createElement("div");
          buttonRow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;align-items:center;";
          buttonRow.appendChild(btnRefresh);
          buttonRow.appendChild(btnLoadCategory);
          buttonRow.appendChild(btnLoadCharacter);
          discoveryHead.innerHTML = "";
          discoveryHead.appendChild(pills);
          discoveryHead.appendChild(buttonRow);
          discoveryBody.appendChild(discoveryHead);
          discoveryBody.appendChild(discoveryMessage);
          const chips = document.createElement("div");
          chips.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;";
          const categories = ["\u5168\u90E8", ...new Set(character.actions.map((action) => action.category))];
          for (const category of categories) {
            const chip = document.createElement("button");
            chip.type = "button";
            const active = discovery.category === category;
            const count = category === "\u5168\u90E8" ? character.actions.length : character.actions.filter((action) => action.category === category).length;
            chip.textContent = category + " " + count;
            chip.style.cssText = "border:1px solid " + (active ? "#1f2329" : "rgba(15,35,80,.12)") + ";background:" + (active ? "#1f2329" : "#fafbfd") + ";color:" + (active ? "#fff" : "#3b4a66") + ";border-radius:999px;padding:5px 10px;font-size:12px;cursor:pointer;";
            chip.onclick = () => {
              discovery.category = category;
              renderDiscovery();
            };
            chips.appendChild(chip);
          }
          discoveryBody.appendChild(chips);
          const grid = document.createElement("div");
          grid.style.cssText = "display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;";
          for (const action of actions) {
            const loaded = loadedSet.has(action.name);
            const card = document.createElement("div");
            card.style.cssText = "box-sizing:border-box;width:calc(25% - 11px);min-width:200px;background:#fff;border:1px solid rgba(15,35,80,.10);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;";
            const thumb = document.createElement("div");
            thumb.style.cssText = "position:relative;aspect-ratio:16/9;background:#eef2f8;overflow:hidden;cursor:pointer;";
            thumb.title = "\u70B9\u51FB\u9884\u89C8";
            const playHint = document.createElement("span");
            playHint.textContent = "\u25B6 \u9884\u89C8";
            playHint.style.cssText = "position:absolute;right:8px;bottom:8px;z-index:2;background:rgba(15,23,42,.62);color:#fff;border-radius:8px;padding:3px 8px;font-size:11px;pointer-events:none;";
            thumb.appendChild(playHint);
            const img = document.createElement("img");
            img.alt = "";
            img.src = action.thumb || STORE_ROUTE + "/thumb?pack=" + encodeURIComponent(action.pack) + "&name=" + encodeURIComponent(action.name);
            img.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;";
            img.onerror = () => {
              img.style.visibility = "hidden";
            };
            thumb.appendChild(img);
            thumb.onclick = () => openActionPreview(action);
            const meta = document.createElement("div");
            meta.style.cssText = "position:relative;padding:8px 12px 10px;display:flex;flex-direction:column;gap:2px;flex:1 1 auto;";
            const titleRow = document.createElement("div");
            titleRow.style.cssText = "display:flex;align-items:flex-start;gap:8px;";
            const nameWrap = document.createElement("div");
            nameWrap.style.cssText = "flex:1 1 auto;min-width:0;padding-right:78px;";
            const nameEl = document.createElement("div");
            nameEl.textContent = action.name;
            nameEl.style.cssText = "font-size:14px;font-weight:600;color:#16233d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
            nameWrap.appendChild(nameEl);
            const catEl = document.createElement("div");
            catEl.textContent = action.category;
            catEl.style.cssText = "font-size:11px;color:#8a94a8;";
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = loaded ? "\u5DF2\u52A0\u8F7D" : "\u52A0\u8F7D";
            btn.disabled = loaded;
            btn.style.cssText = "position:absolute;right:12px;top:8px;border:none;border-radius:7px;padding:5px 14px;font-size:12px;font-weight:500;white-space:nowrap;cursor:" + (loaded ? "default" : "pointer") + ";background:" + (loaded ? "#f1f3f6" : "#1f2329") + ";color:" + (loaded ? "#9aa6bd" : "#fff") + ";";
            btn.style.setProperty("background-color", loaded ? "#f1f3f6" : "#1f2329", "important");
            btn.style.setProperty("color", loaded ? "#9aa6bd" : "#ffffff", "important");
            btn.style.setProperty("border", "none", "important");
            btn.onclick = () => {
              void loadStoreActions([action]);
            };
            titleRow.appendChild(nameWrap);
            meta.appendChild(titleRow);
            meta.appendChild(catEl);
            meta.appendChild(btn);
            card.appendChild(thumb);
            card.appendChild(meta);
            grid.appendChild(card);
          }
          discoveryBody.appendChild(grid);
        } catch (e) {
          discoveryBody.innerHTML = "";
          discoveryBody.textContent = "\u53D1\u73B0\u9875\u6E32\u67D3\u5931\u8D25\uFF1A" + (e && e.message ? e.message : e);
        }
      };
      tabDiscover.onclick = () => selectTab("discover");
      tabChars.onclick = () => selectTab("characters");
      tabConfig.onclick = () => selectTab("config");
      const setDisplay = async (id, display) => {
        await fetch(ROUTE_PATH2 + "/pet-display", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, display })
        });
      };
      const loadGallery = async () => {
        try {
          const res = await fetch(ROUTE_PATH2 + "/config", { cache: "no-store" });
          if (!res.ok) throw new Error("HTTP " + res.status);
          const body = await res.json();
          const packs = [];
          for (const [root, conf] of Object.entries(body)) {
            if (!conf || typeof conf !== "object" || !Array.isArray(conf.pets) || conf.pets.length === 0) continue;
            const first = conf.pets[0];
            packs.push({
              root,
              name: first.name || root,
              count: loveAnimationsCount(conf.animations),
              visible: conf.pets.some((pet) => pet.display && pet.display !== "none"),
              ids: conf.pets.map((pet) => pet.id),
              group: petGroupOf(root)
            });
          }
          packs.sort((a, b) => LOVE_GROUP_ORDER.indexOf(a.group) - LOVE_GROUP_ORDER.indexOf(b.group) || String(a.name).localeCompare(String(b.name), "zh"));
          currentPacks = packs;
          currentVisible = packs.filter((pack) => pack.visible).length;
          paintFilterPanel();
          const shownPacks = selectedGroups.size > 0 ? packs.filter((pack) => selectedGroups.has(pack.group)) : packs;
          charBody.innerHTML = "";
          const grid = document.createElement("div");
          grid.style.cssText = "display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start;";
          for (const pack of shownPacks) {
            const card = document.createElement("div");
            card.style.cssText = "background:#fff;border:1px solid rgba(15,35,80,.10);border-radius:18px;overflow:hidden;box-shadow:0 10px 28px rgba(20,40,90,.08);display:flex;flex-direction:column;box-sizing:border-box;width:calc(33.333% - 14px);min-width:0;flex:0 0 calc(33.333% - 14px);";
            const art = document.createElement("div");
            art.style.cssText = "position:relative;height:210px;display:flex;align-items:center;justify-content:center;background:" + (LOVE_GROUP_COLOR[pack.group] || "#eef2f8") + ";";
            if (!pack.visible) {
              const badge = document.createElement("span");
              badge.textContent = "\u5DF2\u9690\u85CF";
              badge.style.cssText = "position:absolute;top:12px;left:12px;background:rgba(255,255,255,.92);border-radius:10px;padding:5px 10px;font-size:12px;color:#3b4a66;font-weight:500;";
              art.appendChild(badge);
            }
            const img = document.createElement("img");
            img.alt = "";
            img.src = ROUTE_PATH2 + "/logo?root=" + encodeURIComponent(pack.root);
            img.style.cssText = "width:190px;height:190px;object-fit:contain;";
            img.onerror = () => {
              img.style.visibility = "hidden";
            };
            art.appendChild(img);
            const detail = document.createElement("span");
            detail.textContent = "\u8BE6\u60C5";
            detail.style.cssText = "position:absolute;top:12px;right:14px;font-size:13px;color:#3b4a66;cursor:pointer;";
            detail.onmouseenter = () => {
              detail.style.color = "#111";
              detail.style.textDecoration = "underline";
            };
            detail.onmouseleave = () => {
              detail.style.color = "#3b4a66";
              detail.style.textDecoration = "none";
            };
            detail.onclick = () => openPackConfig(pack);
            art.appendChild(detail);
            const foot = document.createElement("div");
            foot.style.cssText = "padding:14px 16px 16px;display:flex;align-items:center;gap:12px;";
            const meta = document.createElement("div");
            meta.style.cssText = "flex:1 1 auto;min-width:0;";
            const nameEl = document.createElement("div");
            nameEl.textContent = pack.name;
            nameEl.style.cssText = "font-size:17px;font-weight:700;color:#16233d;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
            const countEl = document.createElement("div");
            countEl.textContent = pack.count + " \u4E2A\u52A8\u4F5C \xB7 \u72EC\u7ACB\u89D2\u8272\u9879\u76EE";
            countEl.style.cssText = "margin-top:6px;font-size:12px;color:#5b6b8a;";
            meta.appendChild(nameEl);
            meta.appendChild(countEl);
            const toggle = document.createElement("button");
            toggle.type = "button";
            toggle.setAttribute("role", "switch");
            toggle.setAttribute("aria-checked", pack.visible ? "true" : "false");
            toggle.setAttribute("aria-label", pack.visible ? "\u9690\u85CF\u89D2\u8272" : "\u663E\u793A\u89D2\u8272");
            toggle.style.cssText = "box-sizing:border-box;position:relative;flex:0 0 auto;width:36px;height:20px;padding:2px;border:0;border-radius:999px;corner-shape:round;cursor:pointer;background:" + (pack.visible ? "var(--dsw-alias-brand-primary, #1f2125)" : "var(--dsw-alias-border-l3, #e5e7eb)") + ";";
            const knob = document.createElement("span");
            knob.style.cssText = "display:block;width:16px;height:16px;border-radius:50%;corner-shape:round;background:" + (pack.visible ? "var(--dsw-alias-label-primary-foreground, #ffffff)" : "var(--dsw-alias-switch-thumb, #ffffff)") + ";transition:transform 120ms ease;transform:translateX(" + (pack.visible ? "16px" : "0px") + ");";
            toggle.appendChild(knob);
            toggle.onclick = async () => {
              toggle.disabled = true;
              try {
                if (pack.visible) {
                  for (const id of pack.ids) await setDisplay(id, "none");
                } else {
                  await setDisplay(pack.ids[0], "desktop");
                  for (const id of pack.ids.slice(1)) await setDisplay(id, "none");
                }
                await loadGallery();
              } catch (e) {
                errorLine.textContent = String(e && e.message ? e.message : e);
              }
            };
            foot.appendChild(meta);
            foot.appendChild(toggle);
            card.appendChild(art);
            card.appendChild(foot);
            grid.appendChild(card);
          }
          charBody.appendChild(grid);
          paintStats(shownPacks.length);
          errorLine.textContent = "";
        } catch (e) {
          errorLine.textContent = String(e && e.message ? e.message : e);
        }
      };
      const bulk = async (on) => {
        try {
          for (const pack of currentPacks) {
            if (on) {
              await setDisplay(pack.ids[0], "desktop");
              for (const id of pack.ids.slice(1)) await setDisplay(id, "none");
            } else {
              for (const id of pack.ids) await setDisplay(id, "none");
            }
          }
          await loadGallery();
        } catch (e) {
          errorLine.textContent = String(e && e.message ? e.message : e);
        }
      };
      refresh.onclick = () => {
        void loadGallery();
      };
      addChar.onclick = () => {
        selectTab("config");
        host.scrollTop = 0;
      };
      btnRefreshList.onclick = () => {
        void loadGallery();
      };
      btnAllOn.onclick = () => {
        void bulk(true);
      };
      btnAllOff.onclick = () => {
        void bulk(false);
      };
      paintTabs();
      paintStats();
      void loadGallery();
      return () => {
        if (rootRef.current) {
          try {
            rootRef.current.unmount();
          } catch (e) {
            void e;
          }
          rootRef.current = null;
        }
      };
    }, []);
    return h2("div", { ref: hostRef, style: { height: "100%", overflowY: "auto", overflowX: "hidden", boxSizing: "border-box" } });
  };
  return { LovePanel, LoveIcon };
}
var init_love_entry = __esm({
  "plugins/dsh-pamper/client-src/love/love-entry.js"() {
  }
});

// plugins/dsh-pamper/client-src/index.cjs
var React = require("react");
var { dicts: dicts2, makePetConfigSection: makePetConfigSection2 } = (init_settings(), __toCommonJS(settings_exports));
var { createLoveEntry: createLoveEntry2 } = (init_love_entry(), __toCommonJS(love_entry_exports));
var t = (key) => dicts2.zh && dicts2.zh[key] || key;
var h = React.createElement;
function apply(ctx) {
  const PetConfigHost = () => {
    const [Section] = React.useState(() => makePetConfigSection2({
      h,
      useState: React.useState,
      useEffect: React.useEffect,
      useRef: React.useRef,
      useCallback: React.useCallback,
      t
    }, ctx));
    return Section ? h(Section, {}) : null;
  };
  const { LovePanel, LoveIcon } = createLoveEntry2({
    h,
    useEffect: React.useEffect,
    useRef: React.useRef,
    PetConfigSection: PetConfigHost,
    ROUTE_PATH: "/dsh-pamper-7470"
  });
  ctx.slots.inject("sidebar.panellist", function* () {
    yield ctx.slots.register({ name: "sidebar.panellist", id: "pamper", order: 4, label: () => "\u5BA0\u7231" }, LoveIcon);
  });
  ctx.slots.inject("main", function* () {
    yield ctx.slots.register({ name: "main", key: "pamper" }, LovePanel);
  });
}
module.exports = { inject: ["slots"], apply };

      })(require, module, module.exports);
      const exported = module.exports;
      if (exported && typeof exported.apply === 'function') {
        const original = exported.apply;
        exported.apply = function (ctx) {
          try { return original.call(this, ctx); }
          catch (error) { return __pamperErrorPlugin(error).apply(ctx); }
        };
      }
      return exported;
    } catch (error) {
      return __pamperErrorPlugin(error);
    }
  }
});
