/**
 * pamper 对已安装 dsh-pet 插件的运行期补丁（幂等，首次修改前生成 *.dshpet-backup）。
 *
 * 包含四组改动：
 *  1) 「退出回家」右键菜单项（桌面透明窗 + 网页 overlay）：点击 = 该宠物 display 置 none，只退这一只。
 *  2) 主菜单「宠爱」入口：注册 sidebar.panellist id=pet-love，并注册 main 面板 key=pet-love，
 *     直接复用 dsh-pet 的「桌宠配置」组件 —— 点主菜单「宠爱」就能打开桌宠配置，不必进设置。
 *  3) 设置页「种类」条按型号分组：deepseek / GPT / Claude / Gemini / kimi / 豆包 / 其他；
 *     同一型号下可放多只不同形象（GPT=白龙娘+白毛小龙娘，Claude=橙发书娘+橙毛大小姐…）。
 *  4) 内置宠物显示名：蓝毛小女仆 → 大肥鱼（用户配置 + 包内默认各改一次），并把 main 设为 desktop
 *     显示，保证开机有一只（8 个新 pack 默认 display=none）。
 *
 * 用法：
 *   node scripts/patch-dsh-pet.mjs            # 应用全部补丁
 *   node scripts/patch-dsh-pet.mjs --check    # 只检查
 *   node scripts/patch-dsh-pet.mjs --revert   # 从备份还原（含 main-config / config.jsonc）
 *   node scripts/patch-dsh-pet.mjs --package="C:\...\node_modules\dsh-pet"
 */
import { copyFile, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DSH_HOME, isMain } from './lib/paths.mjs';

/* ============================ 1. 菜单：退出回家 ============================ */

const MENU_ITEM_DESKTOP = `      // 退出回家（pamper 补丁）：把这一只的 display 写成 none，宿主重载后本窗口关闭；
      // 之后可在设置页「显示位置」重新开启。复用 set-display 通道，不改 dsh-pet 原有逻辑。
      { label: '退出回家', action: 'set-display', display: 'none' },
`;

const MENU_ITEM_WEB = `, {
				label: "退出回家",
				action: "set-display",
				display: "none"
			}`;

/* ====================== 2. 主菜单「宠爱」入口 + 主面板 ====================== */

﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿const LOVE_ENTRY = `			// —— pamper 补丁：主菜单「宠爱」入口 + 角色/配置双页（原生 DOM 渲染）——
			const LoveIcon = ({ size = 18 }) => h("svg", {
				width: size,
				height: size,
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.8,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				children: h("path", { d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" })
			});
			const LOVE_GROUP_ORDER = ["deepseek", "GPT", "Claude", "Gemini", "kimi", "豆包", "其他"];
			const LOVE_GROUP_COLOR = {
				deepseek: "#e8f0ff",
				GPT: "#eef2ff",
				Claude: "#fff1e6",
				Gemini: "#f3e8ff",
				kimi: "#fdf2d8",
				"豆包": "#f5f5f5",
				"其他": "#e9f7f1"
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
					title.textContent = "宠爱";
					title.style.cssText = "font-size:22px;font-weight:700;color:#16233d;display:flex;align-items:center;gap:6px;";
					const info = document.createElement("span");
					info.textContent = "ⓘ";
					info.title = "安装、启用和配置桌宠";
					info.style.cssText = "font-size:13px;color:#9aa6bd;font-weight:400;";
					title.appendChild(info);
					const subtitle = document.createElement("div");
					subtitle.textContent = "一碗碗大米饭就是对你的宠爱…";
					subtitle.style.cssText = "margin-top:2px;font-size:13px;color:#5b6b8a;";
					const headText = document.createElement("div");
					headText.style.cssText = "flex:1 1 auto;";
					headText.appendChild(title);
					headText.appendChild(subtitle);
					const headActions = document.createElement("div");
					headActions.style.cssText = "display:flex;align-items:center;gap:10px;flex:0 0 auto;position:relative;";
					const refresh = document.createElement("button");
					refresh.type = "button";
					refresh.title = "刷新";
					refresh.setAttribute("aria-label", "刷新");
					refresh.style.cssText = "width:36px;height:36px;border-radius:50%;border:1px solid rgba(15,35,80,.14);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#3b4a66;padding:0;";
					refresh.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>';
					const addChar = document.createElement("button");
					addChar.type = "button";
					addChar.title = "到「桌宠配置」里添加新的宠物实例";
					addChar.style.cssText = "display:inline-flex;align-items:center;gap:6px;border:none;border-radius:10px;background:#1f2329;color:#fff;padding:8px 14px;font-size:13px;cursor:pointer;font-weight:500;";
					const addPlus = document.createElement("span");
					addPlus.textContent = "+";
					addPlus.style.cssText = "font-size:16px;line-height:1;font-weight:400;";
					const addText = document.createElement("span");
					addText.textContent = "添加角色";
					const addArrow = document.createElement("span");
					addArrow.textContent = "▾";
					addArrow.style.cssText = "font-size:10px;opacity:.8;";
					addChar.appendChild(addPlus);
					addChar.appendChild(addText);
					addChar.appendChild(addArrow);
					const filterBtn = document.createElement("button");
					filterBtn.type = "button";
					filterBtn.title = "按种类筛选";
					filterBtn.setAttribute("aria-label", "按种类筛选");
					filterBtn.style.cssText = "width:36px;height:36px;border-radius:50%;border:1px solid rgba(15,35,80,.14);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#3b4a66;padding:0;";
					filterBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>';
					const filterPanel = document.createElement("div");
					filterPanel.style.cssText = "display:none;position:absolute;left:0;top:40px;z-index:60;width:230px;background:#fff;border:1px solid rgba(15,35,80,.12);border-radius:12px;box-shadow:0 18px 44px rgba(15,23,42,.18);padding:10px;";
					const filterTitle = document.createElement("div");
					filterTitle.textContent = "按种类筛选（可多选）";
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
					tabChars.textContent = "角色";
					const tabConfig = document.createElement("button");
					tabConfig.type = "button";
					tabConfig.textContent = "桌宠配置";
					const tabDiscover = document.createElement("button");
					tabDiscover.type = "button";
					tabDiscover.textContent = "发现";
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
					btnRefreshList.textContent = "刷新列表";
					const btnAllOn = document.createElement("button");
					btnAllOn.type = "button";
					btnAllOn.textContent = "全部开启";
					const btnAllOff = document.createElement("button");
					btnAllOff.type = "button";
					btnAllOff.textContent = "全部隐藏";
					statsActions.appendChild(filterBtn);
					statsActions.appendChild(filterPanel);
					for (const b of [btnRefreshList, btnAllOn, btnAllOff]) {
						b.style.cssText = "border:1px solid rgba(15,35,80,.14);background:#fff;color:#3b4a66;font-size:12px;cursor:pointer;padding:7px 12px;border-radius:8px;white-space:nowrap;transition:background .15s ease,color .15s ease,border-color .15s ease;";
						b.addEventListener("mouseenter", () => { b.style.background = "#1f2329"; b.style.color = "#fff"; b.style.borderColor = "#1f2329"; });
						b.addEventListener("mouseleave", () => { b.style.background = "#fff"; b.style.color = "#3b4a66"; b.style.borderColor = "rgba(15,35,80,.14)"; });
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
					const selectedGroups = new Set();
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
						const total = selectedGroups.size > 0 && typeof shownCount === "number" ? shownCount + " 位角色（已筛选）" : currentPacks.length + " 位角色";
						statsText.textContent = total + " · " + currentVisible + " 个正在桌面陪伴";
					};
					const groupOrder = () => (typeof PET_GROUP_ORDER !== "undefined" ? PET_GROUP_ORDER : ["deepseek", "GPT", "Claude", "Gemini", "kimi", "豆包", "其他"]);
					const paintFilterPanel = () => {
						filterList.innerHTML = "";
						for (const group of groupOrder()) {
							const items = currentPacks.filter((pack) => pack.group === group);
							if (items.length === 0 && group !== "豆包") continue;
							const row = document.createElement("label");
							row.style.cssText = "display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;cursor:pointer;font-size:13px;color:#3b4a66;";
							row.addEventListener("mouseenter", () => { row.style.background = "#f4f6f9"; });
							row.addEventListener("mouseleave", () => { row.style.background = "transparent"; });
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
					filterBtn.onclick = () => { filterPanel.style.display = filterPanel.style.display === "none" ? "block" : "none"; };
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
							rootRef.current.render(h(PetConfigSection, {}));
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
							if (!groupButton) { if (tries < 12) setTimeout(step, 200); return; }
							groupButton.click();
							let petTries = 0;
							const pickPet = () => {
								petTries += 1;
								const petButton = findButton(pack.name + " (");
								if (petButton) { petButton.click(); host.scrollTop = 0; return; }
								if (petTries < 12) setTimeout(pickPet, 150);
							};
							setTimeout(pickPet, 200);
						};
						setTimeout(step, 200);
					};

					// ===== 发现：动作库按需加载 =====
					const STORE_ROUTE = "/dsh-action-store-7462";
					const KIND_OF = { maid: "main", gpt: "aboutme-dragon", claude: "aboutme-claude", gemini: "aboutme-gemini" };
					const discovery = { catalog: null, config: null, selected: "gpt", category: "全部", busy: false, message: "", loaded: {} };
					const collectNames = (animations, out) => {
						const add = (value) => {
							if (typeof value === "string" && value) out.add(value);
							else if (Array.isArray(value)) value.forEach(add);
						};
						if (!animations || typeof animations !== "object") return out;
						for (const key of ["idle", "turn", "drag", "clicks", "baifan"]) add(animations[key]);
						for (const action of (animations.moves && Array.isArray(animations.moves.actions)) ? animations.moves.actions : []) add(action && action.name);
						for (const category of Array.isArray(animations.categories) ? animations.categories : []) add(category && category.actions);
						if (animations.events && typeof animations.events === "object") for (const pool of Object.values(animations.events)) add(pool);
						for (const set of Array.isArray(animations.sleep) ? animations.sleep : []) { add(set && set.start); add(set && set.loop); add(set && set.end); }
						return out;
					};
					const refreshDiscoveryData = async () => {
						const [catalogRes, configRes] = await Promise.all([
							fetch(STORE_ROUTE + "/catalog", { cache: "no-store" }),
							fetch(ROUTE_PATH + "/config", { cache: "no-store" })
						]);
						if (!catalogRes.ok) throw new Error("动作库 HTTP " + catalogRes.status);
						discovery.catalog = await catalogRes.json();
						discovery.config = configRes.ok ? await configRes.json() : {};
						discovery.loaded = {};
						for (const character of discovery.catalog.characters) {
							const kind = KIND_OF[character.key];
							const conf = discovery.config[kind];
							discovery.loaded[character.key] = collectNames(conf && conf.animations, new Set());
						}
					};
					const discoveryDisplayName = (character) => {
						const kind = KIND_OF[character.key];
						const conf = discovery.config && discovery.config[kind];
						const first = conf && Array.isArray(conf.pets) ? conf.pets[0] : null;
						const name = first && typeof first.name === "string" ? first.name.trim() : "";
						return name || (character.key === "maid" ? "大肥鱼" : character.name);
					};
					const discoveryCharacter = () => discovery.catalog.characters.find((item) => item.key === discovery.selected) || discovery.catalog.characters[0];
					const discoveryActions = () => {
						const character = discoveryCharacter();
						if (!character) return [];
						return discovery.category === "全部" ? character.actions : character.actions.filter((action) => action.category === discovery.category);
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
						discoveryBody.textContent = "正在读取动作库…";
						setTimeout(() => { if (discoveryBody.textContent === "正在读取动作库…") discoveryBody.textContent = "动作库读取超时：/dsh-action-store-7462/catalog 没有返回。"; }, 15000);
						try {
							await refreshDiscoveryData();
							renderDiscovery();
						} catch (e) {
							discoveryInit = false;
							discoveryBody.innerHTML = "";
							discoveryBody.textContent = "动作库加载失败：" + (e && e.message ? e.message : e);
						}
					};
					const loadStoreActions = async (actions) => {
						const loadedSet = discovery.loaded[discovery.selected] || new Set();
						const pending = actions.filter((action) => !loadedSet.has(action.name));
						if (pending.length === 0) { discoveryMessage.textContent = "选中的动作都已经加载了。"; return; }
						if (discovery.busy) return;
						discovery.busy = true;
						discoveryMessage.textContent = "正在转换 " + pending.length + " 个动作（VP9 透明视频，单个约需 10–60 秒）…";
						try {
							const resp = await fetch(STORE_ROUTE + "/load", {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({ character: discovery.selected, actionIds: pending.map((action) => action.name) })
							});
							const body = await resp.json();
							if (!resp.ok || !body.ok) throw new Error(body && body.error ? body.error : "HTTP " + resp.status);
							const failed = Array.isArray(body.failed) ? body.failed : [];
							discoveryMessage.textContent = "已加载 " + body.converted + " 个动作" + (failed.length ? "；失败 " + failed.length + " 个：" + failed.slice(0, 3).join("；") : "") + (body.reloaded ? "，桌宠已重载。" : "。请在桌宠右键菜单点「重载配置」后生效。");
							await refreshDiscoveryData();
							renderDiscovery();
						} catch (e) {
							discoveryMessage.textContent = "加载失败：" + (e && e.message ? e.message : e);
						} finally {
							discovery.busy = false;
						}
					};
					const openActionPreview = (action) => {
						const overlay = document.createElement("div");
						overlay.style.cssText = "position:fixed;inset:0;background:rgba(15,23,42,.42);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;";
						const panel = document.createElement("div");
						panel.style.cssText = "background:#fff;border-radius:18px;box-shadow:0 30px 80px rgba(15,23,42,.35);width:min(560px,92vw);overflow:hidden;";
						const head = document.createElement("div");
						head.style.cssText = "display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid rgba(15,35,80,.10);";
						const title = document.createElement("div");
						title.style.cssText = "flex:1 1 auto;font-size:15px;font-weight:700;color:#16233d;";
						title.textContent = action.name + " · " + action.category;
						const close = document.createElement("button");
						close.type = "button";
						close.textContent = "关闭";
						close.style.cssText = "border:1px solid rgba(15,35,80,.16);background:#fff;border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer;color:#3b4a66;";
						head.appendChild(title);
						head.appendChild(close);
						const stage = document.createElement("div");
						stage.style.cssText = "position:relative;width:100%;aspect-ratio:16/9;background:#F2F5FA;display:flex;align-items:center;justify-content:center;";
						const hint = document.createElement("div");
						hint.textContent = "正在载入精灵图…";
						hint.style.cssText = "font-size:13px;color:#8a94a8;";
						const frame = document.createElement("div");
						frame.style.cssText = "display:none;width:100%;height:100%;background-repeat:no-repeat;background-position:0 0;";
						stage.appendChild(hint);
						stage.appendChild(frame);
						panel.appendChild(head);
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
						overlay.addEventListener("click", (event) => { if (event.target === overlay) cleanup(); });
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
							frame.style.backgroundSize = (width * cols) + "px " + (height * rows) + "px";
							const started = performance.now();
							const tick = (now) => {
								const index = Math.floor(((now - started) / 1000) * fps) % total;
								const col = index % cols;
								const row = Math.floor(index / cols);
								frame.style.backgroundPosition = (-col * width) + "px " + (-row * height) + "px";
								raf = requestAnimationFrame(tick);
							};
							raf = requestAnimationFrame(tick);
						};
						img.onerror = () => { hint.textContent = "预览载入失败"; };
						img.src = STORE_ROUTE + "/thumb?pack=" + encodeURIComponent(action.pack) + "&name=" + encodeURIComponent(action.name);
					};
					const renderDiscovery = () => {
						try {
						if (!discovery.catalog) return;
						discoveryBody.innerHTML = "";
						const character = discoveryCharacter();
						const loadedSet = discovery.loaded[discovery.selected] || new Set();
						const pills = document.createElement("div");
						pills.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;align-items:center;";
						for (const item of discovery.catalog.characters) {
							const loaded = (discovery.loaded[item.key] || new Set()).size;
							const pill = document.createElement("button");
							pill.type = "button";
							const active = discovery.selected === item.key;
							pill.textContent = discoveryDisplayName(item) + " " + loaded + "/" + item.actionCount;
							if (discoveryDisplayName(item) !== item.name) pill.title = "动作库名称：" + item.name;
							pill.style.cssText = "border:1px solid " + (active ? "#1f2329" : "rgba(15,35,80,.14)") + ";background:" + (active ? "#1f2329" : "#fff") + ";color:" + (active ? "#fff" : "#3b4a66") + ";border-radius:999px;padding:7px 12px;font-size:13px;cursor:pointer;";
							pill.onclick = () => { discovery.selected = item.key; discovery.category = "全部"; discovery.message = ""; discoveryMessage.textContent = ""; renderDiscovery(); };
							pills.appendChild(pill);
						}
						const actions = discoveryActions();
						const loadedInView = actions.filter((action) => loadedSet.has(action.name)).length;
						const info = document.createElement("div");
						info.style.cssText = "font-size:13px;color:#3b4a66;white-space:nowrap;";
						info.textContent = discoveryDisplayName(character) + " · " + loadedSet.size + "/" + character.actionCount + " 已加载（当前筛选 " + loadedInView + "/" + actions.length + "；加载后该形象的所有实例共享）";
						const buttonStyle = "border:1px solid rgba(15,35,80,.14);background:#fff;color:#3b4a66;font-size:12px;cursor:pointer;padding:7px 12px;border-radius:8px;white-space:nowrap;";
						const btnRefresh = document.createElement("button");
						btnRefresh.type = "button";
						btnRefresh.textContent = "刷新";
						btnRefresh.style.cssText = buttonStyle;
						btnRefresh.onclick = async () => { try { await refreshDiscoveryData(); renderDiscovery(); } catch (e) { discoveryMessage.textContent = "刷新失败：" + (e && e.message ? e.message : e); } };
						const btnLoadCategory = document.createElement("button");
						btnLoadCategory.type = "button";
						btnLoadCategory.textContent = "加载本分类";
						btnLoadCategory.style.cssText = buttonStyle;
						btnLoadCategory.onclick = () => { void loadStoreActions(discoveryActions()); };
						const btnLoadCharacter = document.createElement("button");
						btnLoadCharacter.type = "button";
						btnLoadCharacter.textContent = "加载该角色全部";
						btnLoadCharacter.style.cssText = buttonStyle;
						btnLoadCharacter.onclick = () => { void loadStoreActions(character.actions); };
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
						const categories = ["全部", ...new Set(character.actions.map((action) => action.category))];
						for (const category of categories) {
							const chip = document.createElement("button");
							chip.type = "button";
							const active = discovery.category === category;
							const count = category === "全部" ? character.actions.length : character.actions.filter((action) => action.category === category).length;
							chip.textContent = category + " " + count;
							chip.style.cssText = "border:1px solid " + (active ? "#1f2329" : "rgba(15,35,80,.12)") + ";background:" + (active ? "#1f2329" : "#fafbfd") + ";color:" + (active ? "#fff" : "#3b4a66") + ";border-radius:999px;padding:5px 10px;font-size:12px;cursor:pointer;";
							chip.onclick = () => { discovery.category = category; renderDiscovery(); };
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
							thumb.title = "点击预览";
							const playHint = document.createElement("span");
							playHint.textContent = "▶ 预览";
							playHint.style.cssText = "position:absolute;right:8px;bottom:8px;z-index:2;background:rgba(15,23,42,.62);color:#fff;border-radius:8px;padding:3px 8px;font-size:11px;pointer-events:none;";
							thumb.appendChild(playHint);
							const img = document.createElement("img");
							img.alt = "";
							img.src = action.thumb || (STORE_ROUTE + "/thumb?pack=" + encodeURIComponent(action.pack) + "&name=" + encodeURIComponent(action.name));
							img.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;";
							img.onerror = () => { img.style.visibility = "hidden"; };
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
							btn.textContent = loaded ? "已加载" : "加载";
							btn.disabled = loaded;
							btn.style.cssText = "position:absolute;right:12px;top:8px;border:none;border-radius:7px;padding:5px 14px;font-size:12px;font-weight:500;white-space:nowrap;cursor:" + (loaded ? "default" : "pointer") + ";background:" + (loaded ? "#f1f3f6" : "#1f2329") + ";color:" + (loaded ? "#9aa6bd" : "#fff") + ";";
							btn.style.setProperty("background-color", loaded ? "#f1f3f6" : "#1f2329", "important");
							btn.style.setProperty("color", loaded ? "#9aa6bd" : "#ffffff", "important");
							btn.style.setProperty("border", "none", "important");
							btn.onclick = () => { void loadStoreActions([action]); };
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
							discoveryBody.textContent = "发现页渲染失败：" + (e && e.message ? e.message : e);
						}
					};
					tabDiscover.onclick = () => selectTab("discover");
					tabChars.onclick = () => selectTab("characters");
					tabConfig.onclick = () => selectTab("config");
					const setDisplay = async (id, display) => {
						await fetch(ROUTE_PATH + "/pet-display", {
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ id, display })
						});
					};
					const loadGallery = async () => {
						try {
							const res = await fetch(ROUTE_PATH + "/config", { cache: "no-store" });
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
							packs.sort((a, b) => (LOVE_GROUP_ORDER.indexOf(a.group) - LOVE_GROUP_ORDER.indexOf(b.group)) || String(a.name).localeCompare(String(b.name), "zh"));
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
									badge.textContent = "已隐藏";
									badge.style.cssText = "position:absolute;top:12px;left:12px;background:rgba(255,255,255,.92);border-radius:10px;padding:5px 10px;font-size:12px;color:#3b4a66;font-weight:500;";
									art.appendChild(badge);
								}
								const img = document.createElement("img");
								img.alt = "";
								img.src = ROUTE_PATH + "/logo?root=" + encodeURIComponent(pack.root);
								img.style.cssText = "width:190px;height:190px;object-fit:contain;";
								img.onerror = () => { img.style.visibility = "hidden"; };
								art.appendChild(img);
								const detail = document.createElement("span");
								detail.textContent = "详情";
								detail.style.cssText = "position:absolute;top:12px;right:14px;font-size:13px;color:#3b4a66;cursor:pointer;";
								detail.onmouseenter = () => { detail.style.color = "#111"; detail.style.textDecoration = "underline"; };
								detail.onmouseleave = () => { detail.style.color = "#3b4a66"; detail.style.textDecoration = "none"; };
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
								countEl.textContent = pack.count + " 个动作 · 独立角色项目";
								countEl.style.cssText = "margin-top:6px;font-size:12px;color:#5b6b8a;";
								meta.appendChild(nameEl);
								meta.appendChild(countEl);
								const toggle = document.createElement("button");
								toggle.type = "button";
								toggle.setAttribute("role", "switch");
								toggle.setAttribute("aria-checked", pack.visible ? "true" : "false");
								toggle.setAttribute("aria-label", pack.visible ? "隐藏角色" : "显示角色");
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
					refresh.onclick = () => { void loadGallery(); };
					addChar.onclick = () => { selectTab("config"); host.scrollTop = 0; };
					btnRefreshList.onclick = () => { void loadGallery(); };
					btnAllOn.onclick = () => { void bulk(true); };
					btnAllOff.onclick = () => { void bulk(false); };
					paintTabs();
					paintStats();
					void loadGallery();
					return () => {
						if (rootRef.current) {
							try { rootRef.current.unmount(); } catch (e) { void e; }
							rootRef.current = null;
						}
					};
				}, []);
				return h("div", { ref: hostRef, style: { height: "100%", overflowY: "auto", overflowX: "hidden", boxSizing: "border-box" } });
			};
			ctx.slots.inject("sidebar.panellist", function* () {
				yield ctx.slots.register({
					name: "sidebar.panellist",
					id: "pet-love",
					order: 5,
					label: () => "宠爱"
				}, LoveIcon);
			});
			ctx.slots.inject("main", function* () {
				yield ctx.slots.register({
					name: "main",
					key: "pet-love"
				}, LovePanel);
			});
`;

/* ===================== 3. 设置页种类分组（型号分类） ===================== */

const GROUP_DEFS = `/** —— pamper 补丁：把 pet pack 归入型号分组（设置页「种类」条）—— */
const PET_GROUP_ORDER = ["deepseek", "GPT", "Claude", "Gemini", "kimi", "豆包", "其他"];
const PET_GROUP_OF = {
	main: "deepseek",
	"aboutme-dragon": "GPT",
	"xiaoxiao-bailong": "GPT",
	"aboutme-claude": "Claude",
	"xiaoxiao-ojousama": "Claude",
	"aboutme-gemini": "Gemini",
	"xiaoxiao-huangmao": "kimi",
	"xiaoxiao-heihu": "其他",
	"xiaoxiao-naicha": "其他"
};
const petGroupOf = (root) => PET_GROUP_OF[root] ?? "其他";
`;

const OLD_PET_KINDS = `function petKinds(pets) {
	const order = [];
	const counts = new Map();
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
}`;

const NEW_PET_KINDS = `function petKinds(pets) {
	const counts = new Map();
	for (const pet of pets) {
		const group = petGroupOf(pet.assetRoot ?? "main");
		counts.set(group, (counts.get(group) ?? 0) + 1);
	}
	const order = [...PET_GROUP_ORDER];
	const known = new Set(order);
	for (const group of counts.keys()) if (!known.has(group)) order.push(group);
	return order.map((group) => ({
		entry: group,
		kind: "pack",
		count: counts.get(group) ?? 0
	}));
}`;

/* ============================== 工具 ============================== */

function findDshPetPackage(explicit) {
  if (explicit) return explicit;
  return [
    process.env.DSH_PROFILE_DIR ? join(process.env.DSH_PROFILE_DIR, 'node_modules', 'dsh-pet') : undefined,
    process.env.DSH_PROFILE ? join(DSH_HOME, 'profiles', process.env.DSH_PROFILE, 'node_modules', 'dsh-pet') : undefined
  ].filter(Boolean)[0];
}

async function isFile(path) {
  try {
    const info = await stat(path);
    return info.isFile() && info.size > 0;
  } catch {
    return false;
  }
}

async function ensureBackup(file) {
  const backup = `${file}.dshpet-backup`;
  if (!(await isFile(backup))) await copyFile(file, backup);
  return backup;
}

/** 一条替换：marker 存在 = 已打过；anchor 缺失 = dsh-pet 版本结构变了 */
function applyPatch(source, { marker, anchor, replacement, label }) {
  if (source.includes(marker)) return { source, status: 'already', label };
  if (!source.includes(anchor)) return { source, status: 'anchor-missing', label };
  return { source: source.replace(anchor, replacement), status: 'patched', label };
}

/* ============================ 文件补丁 ============================ */

/** 桌面 Helper 右键菜单：退出回家 */
async function patchDesktopMenu(packageDir, { check, revert }) {
  const file = join(packageDir, 'runtime', 'electron-helper', 'sprite', 'menu.js');
  if (!(await isFile(file))) return { file, status: 'missing', label: '桌面右键菜单' };
  const backup = `${file}.dshpet-backup`;
  if (revert) return { file, status: (await isFile(backup)) ? (await copyFile(backup, file), 'reverted') : 'no-backup', label: '桌面右键菜单' };
  let source = await readFile(file, 'utf8');
  if (source.includes("label: '退出回家'")) return { file, status: 'already', label: '桌面右键菜单' };
  if (check) return { file, status: 'not-patched', label: '桌面右键菜单' };
  const anchor = "      { label: '回到初始位置', action: 'home' },\n";
  if (!source.includes(anchor)) return { file, status: 'anchor-missing', label: '桌面右键菜单' };
  await ensureBackup(file);
  source = source.replace(anchor, `${anchor}${MENU_ITEM_DESKTOP}`);
  await writeFile(file, source, 'utf8');
  return { file, status: 'patched', label: '桌面右键菜单' };
}

/** 网页端 bundle：退出回家 + 宠爱入口 + 种类分组（同一文件合并处理） */
async function patchClientBundle(packageDir, { check, revert }) {
  const file = join(packageDir, 'lib', 'client.js');
  if (!(await isFile(file))) return { file, status: 'missing', label: '网页端 bundle', notes: [] };
  const backup = `${file}.dshpet-backup`;
  if (revert) return { file, status: (await isFile(backup)) ? (await copyFile(backup, file), 'reverted') : 'no-backup', label: '网页端 bundle', notes: [] };
  let source = await readFile(file, 'utf8');
  const notes = [];
  const patches = [
    {
      label: '退出回家',
      marker: 'label: "退出回家"',
      anchor: `\t\t\tconst tail = [displayMenuBranch(), {
\t\t\t\tlabel: "回到初始位置",
\t\t\t\taction: "home"
\t\t\t}];`,
      replacement: `\t\t\tconst tail = [displayMenuBranch(), {
\t\t\t\tlabel: "回到初始位置",
\t\t\t\taction: "home"
\t\t\t}${MENU_ITEM_WEB}];`
    },
    {
      label: '宠爱入口',
      marker: 'LoveGallery',
      anchor: `\t\t\t}, ctx);
\t\t\tctx.slots.inject("settings.section", function* () {`,
      replacement: `\t\t\t}, ctx);
${LOVE_ENTRY}\t\t\tctx.slots.inject("settings.section", function* () {`
    },
    {
      label: '种类分组',
      marker: 'const PET_GROUP_ORDER = ',
      markerOld: 'PET_GROUP_ORDER',
      anchor: OLD_PET_KINDS,
      replacement: `${GROUP_DEFS}${NEW_PET_KINDS}`
    },
    {
      label: '初始种类',
      marker: 'useState(petGroupOf(initial[0]?.assetRoot ?? "main"))',
      anchor: 'const [kind, setKind] = useState(initial[0]?.assetRoot ?? "main");',
      replacement: 'const [kind, setKind] = useState(petGroupOf(initial[0]?.assetRoot ?? "main"));'
    },
    {
      label: '添加宠物（分组版）',
      marker: 'const group = pets.filter((pet) => petGroupOf(pet.assetRoot ?? "main") === kind);',
      anchor: `\tconst add = () => {
\t\tconst group = pets.filter((pet) => (pet.assetRoot ?? "main") === kind);
\t\tconst template = group[0];
\t\tif (!template) return;
\t\tconst id = nextPetId(pets, kind);`,
      replacement: `\tconst add = () => {
\t\tconst group = pets.filter((pet) => petGroupOf(pet.assetRoot ?? "main") === kind);
\t\tconst template = group.find((pet) => pet.id === selId) ?? group[0];
\t\tif (!template) return;
\t\tconst assetRoot = template.assetRoot ?? "main";
\t\tconst id = nextPetId(pets, assetRoot);`
    },
    {
      label: '添加宠物写入 assetRoot',
      marker: '\t\t\tassetRoot\n\t\t};',
      anchor: '\t\t\tassetRoot: kind\n\t\t};',
      replacement: '\t\t\tassetRoot\n\t\t};'
    },
    {
      label: '添加宠物插入位置',
      marker: 'if ((next[i].assetRoot ?? "main") === assetRoot) at = i;',
      anchor: 'for (let i = 0; i < next.length; i += 1) if ((next[i].assetRoot ?? "main") === kind) at = i;',
      replacement: 'for (let i = 0; i < next.length; i += 1) if ((next[i].assetRoot ?? "main") === assetRoot) at = i;'
    },
    {
      label: '切换种类',
      marker: 'const first = pets.find((pet) => petGroupOf(pet.assetRoot ?? "main") === entry);',
      anchor: '\tconst selectKind = (entry) => {\n\t\tsetKind(entry);\n\t\tconst first = pets.find((pet) => (pet.assetRoot ?? "main") === entry);\n\t\tif (first) setSelId(first.id);\n\t};',
      replacement: '\tconst selectKind = (entry) => {\n\t\tsetKind(entry);\n\t\tconst first = pets.find((pet) => petGroupOf(pet.assetRoot ?? "main") === entry);\n\t\tif (first) setSelId(first.id);\n\t};'
    },
    {
      label: '重载后分组',
      marker: 'petGroupOf(entry.key) === kindRef.current',
      anchor: 'const nextKind = entries.some((entry) => entry.key === kindRef.current) ? kindRef.current : entries[0]?.key ?? "main";',
      replacement: `const nextKind = entries.some((entry) => petGroupOf(entry.key) === kindRef.current)
\t\t\t? kindRef.current
\t\t\t: petGroupOf(entries[0]?.key ?? "main");`
    },
    {
      label: '可见宠物（分组版）',
      marker: 'visiblePets: pets.filter((pet) => petGroupOf(pet.assetRoot ?? "main") === kind),',
      anchor: 'visiblePets: pets.filter((pet) => (pet.assetRoot ?? "main") === kind),',
      replacement: 'visiblePets: pets.filter((pet) => petGroupOf(pet.assetRoot ?? "main") === kind),'
    },
    {
      label: '种类提示文案',
      marker: 'const entryPrompt = loadedRef.current.find((item) => item.key === (current$1?.assetRoot ?? kind))?.entryPrompt ?? "";',
      anchor: 'const entryPrompt = loadedRef.current.find((item) => item.key === kind)?.entryPrompt ?? "";',
      replacement: 'const entryPrompt = loadedRef.current.find((item) => item.key === (current$1?.assetRoot ?? kind))?.entryPrompt ?? "";'
    },
    {
      label: '空种类占位',
      marker: 'pet: cur ?? null,',
      anchor: '\t\t\t\t\tpet: cur,',
      replacement: '\t\t\t\t\tpet: cur ?? null,'
    }
  ];
  for (const patch of patches) {
    const result = applyPatch(source, patch);
    notes.push(`${patch.label}: ${result.status}`);
    source = result.source;
  }
  const applied = notes.some((note) => note.endsWith('patched'));
  if (check) return { file, status: applied ? 'not-patched' : 'already', label: '网页端 bundle', notes };
  if (!applied) return { file, status: 'already', label: '网页端 bundle', notes };
  await ensureBackup(file);
  await writeFile(file, source, 'utf8');
  return { file, status: 'patched', label: '网页端 bundle', notes };
}

/** 内置宠物改名 + 保证 main 开机显示 */
async function patchMainPetName({ check, revert }) {
  const baseConfig = process.env.DSH_PROFILE_DIR
    ? join(process.env.DSH_PROFILE_DIR, 'node_modules', 'dsh-pet', 'assets', 'config.jsonc')
    : undefined;
  const files = [join(DSH_HOME, 'dsh-pet', 'main-config.jsonc'), baseConfig].filter(Boolean);
  const notes = [];
  for (const file of files) {
    if (!(await isFile(file))) continue;
    const backup = `${file}.dshpet-backup`;
    if (revert) {
      if (await isFile(backup)) {
        await copyFile(backup, file);
        notes.push(`${file}: reverted`);
      }
      continue;
    }
    let source = await readFile(file, 'utf8');
    if (source.includes('"name": "大肥鱼"')) {
      notes.push(`${file}: already`);
      continue;
    }
    source = source.replace(/"name": "蓝毛小女仆 · 分身1"/g, '"name": "大肥鱼 · 分身1"');
    source = source.replace(/"name": "蓝毛小女仆"/g, '"name": "大肥鱼"');
    // main 实例开机显示（8 个新 pack 默认 none；只把 main 拉回 desktop）
    source = source.replace(/("id": "main",[\s\S]*?)"display": "none"/, '$1"display": "desktop"');
    if (check) {
      notes.push(`${file}: not-patched`);
      continue;
    }
    await ensureBackup(file);
    await writeFile(file, source, 'utf8');
    notes.push(`${file}: patched`);
  }
  return { label: '内置宠物改名', status: notes.some((n) => n.endsWith('patched')) ? 'patched' : 'already', notes };
}

/* =============================== 主流程 =============================== */

export async function patchDshPet({ packageDir, check = false, revert = false } = {}) {
  const dir = findDshPetPackage(packageDir);
  if (!dir) throw new Error('找不到已安装的 dsh-pet：设置 DSH_PROFILE/DSH_PROFILE_DIR，或用 --package=<目录> 指定');
  if (!(await isFile(join(dir, 'package.json')))) throw new Error(`不是 dsh-pet 包目录：${dir}`);
  const results = [
    await patchDesktopMenu(dir, { check, revert }),
    await patchClientBundle(dir, { check, revert }),
    await patchMainPetName({ check, revert })
  ];
  return { packageDir: dir, results };
}

if (isMain(import.meta.url)) {
  const argv = process.argv.slice(2);
  const getOpt = (name) => {
    const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : undefined;
  };
  if (argv.includes('--help')) {
    console.log(`用法：node scripts/patch-dsh-pet.mjs [--check|--revert] [--package=<dsh-pet 目录>]

  给已安装的 dsh-pet 打 pamper 运行期补丁（幂等，自动备份 *.dshpet-backup）：
  1. 右键菜单「退出回家」：桌面透明窗 + 网页 overlay，点击只让这一只退出（display=none）。
  2. 主菜单新增「宠爱」：直接打开桌宠配置页（复用设置里的桌宠配置组件）。
  3. 设置页「种类」按型号分组：deepseek / GPT / Claude / Gemini / kimi / 豆包 / 其他。
  4. 内置宠物显示名改为「大肥鱼」，并保证 main 开机显示（新 pack 默认 none）。

  --check          只检查各补丁状态
  --revert         从 *.dshpet-backup 还原（含 main-config 与包内 config.jsonc）
  --package=<dir>  指定 dsh-pet 安装目录（默认 $DSH_PROFILE_DIR/node_modules/dsh-pet）`);
    process.exit(0);
  }
  const check = argv.includes('--check');
  const revert = argv.includes('--revert');
  const { packageDir, results } = await patchDshPet({ packageDir: getOpt('package'), check, revert });
  console.log(`dsh-pet 包：${packageDir}`);
  for (const item of results) {
    console.log(`  ${String(item.status).padEnd(12)} ${item.label ?? ''}  ${item.file ?? ''}`);
    for (const note of item.notes ?? []) console.log(`      - ${note}`);
  }
  if (!check && !revert) {
    const failed = results.filter((item) => !['patched', 'already'].includes(item.status));
    if (failed.length > 0) {
      console.log('\n有补丁未应用，请查看上面的 anchor-missing / not-patched。');
      process.exitCode = 1;
    } else {
      console.log('\n完成。刷新 DSH 页面（Ctrl+F5）后生效；桌面宠物右键「重载配置」可重建桌面窗口。');
    }
  }
}
