/* Extracted from scripts/patch-dsh-pet.mjs; adapted for the independent client. */
export function createLoveEntry({ h, useEffect, useRef, PetConfigSection, ROUTE_PATH }) {

  const PET_GROUP_OF = {
    main: 'deepseek',
    'aboutme-dragon': 'GPT',
    'xiaoxiao-bailong': 'GPT',
    'aboutme-claude': 'Claude',
    'xiaoxiao-ojousama': 'Claude',
    'aboutme-gemini': 'Gemini',
    'xiaoxiao-huangmao': 'kimi',
    'xiaoxiao-heihu': '其他',
    'xiaoxiao-naicha': '其他'
  };
  const petGroupOf = (root) => PET_GROUP_OF[root] || '其他';
			// —— pamper 补丁：主菜单「宠爱」入口 + 角色/配置双页（原生 DOM 渲染）——
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
					const STORE_ROUTE = "/dsh-pamper-7470";
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
						panel.style.cssText = "width:min(820px,100%);max-height:90vh;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(15,23,42,.3);display:flex;flex-direction:column;";
						const head = document.createElement("div");
						head.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;border-bottom:1px solid rgba(15,35,80,.08);";
						const title = document.createElement("div");
						title.textContent = action.name + (action.category ? " · " + action.category : "");
						title.style.cssText = "font-size:15px;font-weight:700;color:#16233d;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
						const close = document.createElement("button");
						close.type = "button";
						close.textContent = "关闭";
						close.style.cssText = "border:1px solid rgba(15,35,80,.16);background:#fff;border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer;color:#3b4a66;";
						head.appendChild(title);
						head.appendChild(close);
						const stage = document.createElement("div");
						stage.style.cssText = "position:relative;width:100%;aspect-ratio:16/9;background:#F2F5FA;display:flex;align-items:center;justify-content:center;overflow:hidden;";
						const hint = document.createElement("div");
						hint.textContent = "正在加载预览…";
						hint.style.cssText = "font-size:13px;color:#8a94a8;";
						const video = document.createElement("video");
						video.autoplay = true;
						video.loop = true;
						video.muted = true;
						video.playsInline = true;
						video.style.cssText = "display:none;width:100%;height:100%;object-fit:contain;";
						stage.appendChild(hint);
						stage.appendChild(video);
						panel.appendChild(head);
						panel.appendChild(stage);
						overlay.appendChild(panel);
						document.body.appendChild(overlay);
						const cleanup = () => {
							try { video.pause(); video.removeAttribute("src"); video.load(); } catch (e) { void e; }
							overlay.remove();
						};
						close.onclick = cleanup;
						overlay.addEventListener("click", (event) => { if (event.target === overlay) cleanup(); });
						video.onloadeddata = () => {
							hint.remove();
							video.style.display = "block";
							void video.play().catch(() => {});
						};
						video.onerror = () => { hint.textContent = "预览加载失败"; };
						video.src = STORE_ROUTE + "/preview?pack=" + encodeURIComponent(action.pack) + "&name=" + encodeURIComponent(action.name);
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
					let refreshing = false;
					const refreshTimer = setInterval(async () => {
						if (activeTab !== "characters" || refreshing) return;
						refreshing = true;
						try { await loadGallery(); } catch (e) { void e; } finally { refreshing = false; }
					}, 2500);
					return () => {
						clearInterval(refreshTimer);
						if (rootRef.current) {
							try { rootRef.current.unmount(); } catch (e) { void e; }
							rootRef.current = null;
						}
					};
				}, []);
				return h("div", { ref: hostRef, style: { height: "100%", overflowY: "auto", overflowX: "hidden", boxSizing: "border-box" } });
			};
  return { LovePanel, LoveIcon };
}
