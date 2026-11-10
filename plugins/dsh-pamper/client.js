/**
 * dsh-pamper 0.4.0 客户端：完全独立的宠爱页面 + 页面内宠物浮层。
 * 不依赖 dsh-pet；角色配置来自插件自己的 %DSH_HOME%/pamper/pets。
 */
window.__ModuleLoader__.load({
  id: 'dsh-pamper',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useState } = React;
    const ROUTE = '/dsh-pamper-7470';

    async function api(path, options) {
      const response = await fetch(ROUTE + path, { cache: 'no-store', ...(options || {}) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return await response.json();
    }
    const post = (path, body) => api(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const avatarUrl = (kind) => ROUTE + '/avatar?kind=' + encodeURIComponent(kind);
    const animationUrl = (kind, name) => ROUTE + '/animation?kind=' + encodeURIComponent(kind) + '&name=' + encodeURIComponent(name);

    function LoveIcon({ size = 18 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
        h('path', { d: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z' }));
    }

    function useCharacters() {
      const [characters, setCharacters] = useState([]);
      const refresh = async () => {
        try { setCharacters((await api('/characters')).characters || []); } catch {}
      };
      useEffect(() => { void refresh(); const timer = setInterval(() => void refresh(), 5000); return () => clearInterval(timer); }, []);
      return [characters, refresh];
    }

    function PetOverlay() {
      const [characters] = useCharacters();
      const [desktopOverlay, setDesktopOverlay] = useState(false);
      useEffect(() => {
        let timer = 0;
        const check = () => { api('/desktop/status').then((body) => setDesktopOverlay(Boolean(body.running))).catch(() => {}); };
        check(); timer = setInterval(check, 5000);
        return () => clearInterval(timer);
      }, []);
      if (desktopOverlay) return null;
      const visible = characters.filter((item) => item.display && item.idle);
      if (visible.length === 0) return null;
      const cornerStyle = (character) => {
        const corner = character.corner || 'top-right';
        const style = { position: 'fixed', zIndex: 45, pointerEvents: 'none' };
        const marginX = Math.max(8, Number(character.marginX) || 24);
        const marginY = Math.max(8, Number(character.marginY) || 24);
        if (corner.includes('left')) style.left = marginX + 'px'; else style.right = marginX + 'px';
        if (corner.includes('bottom')) style.bottom = marginY + 'px'; else style.top = marginY + 'px';
        return style;
      };
      return h(React.Fragment, null, visible.map((character) => h('video', {
        key: character.kind + ':' + character.idle,
        src: animationUrl(character.kind, character.idle),
        autoPlay: true, loop: true, muted: true, playsInline: true,
        style: { ...cornerStyle(character), width: Math.min(Math.max(Number(character.size) * 0.45, 120), 280) + 'px', height: 'auto', display: 'block', filter: 'drop-shadow(0 8px 18px rgba(15,23,42,.18))' }
      })));
    }

    function Panel() {
      const [tab, setTab] = useState('characters');
      const [characters, refresh] = useCharacters();
      const [catalog, setCatalog] = useState(null);
      const [selected, setSelected] = useState('main');
      const [group, setGroup] = useState('全部');
      const [category, setCategory] = useState('全部');
      const [message, setMessage] = useState('');
      const [detail, setDetail] = useState(null);
      const [desktop, setDesktop] = useState(false);
      const refreshDesktop = async () => {
        try { setDesktop(Boolean((await api('/desktop/status')).running)); } catch {}
      };
      useEffect(() => { void refreshDesktop(); const timer = setInterval(() => void refreshDesktop(), 5000); return () => clearInterval(timer); }, []);
      const startDesktop = async () => {
        setMessage('正在准备桌面模式（首次约需下载 158MB 运行时）…');
        try { await post('/desktop/start', {}); setDesktop(true); setMessage('桌面模式已启动'); }
        catch (error) { setMessage('桌面模式启动失败：' + error.message); }
      };
      const stopDesktop = async () => {
        try { await post('/desktop/stop', {}); setDesktop(false); setMessage('桌面模式已关闭'); }
        catch (error) { setMessage('关闭失败：' + error.message); }
      };

      useEffect(() => {
        api('/catalog').then(setCatalog).catch((error) => setMessage('读取动作目录失败：' + error.message));
      }, []);
      useEffect(() => {
        if (characters.length && !characters.some((item) => item.kind === selected)) setSelected(characters[0].kind);
      }, [characters]);

      const installBase = async () => {
        setMessage('正在安装基础形象包（首次约 345MB，请稍候）…');
        try {
          const body = await post('/install-base', {});
          setMessage('基础包安装完成：' + body.characters + ' 个角色');
          await refresh();
        } catch (error) {
          setMessage('基础包安装失败：' + error.message);
        }
      };
      const selectedCharacter = characters.find((item) => item.kind === selected);
      const selectedCatalog = catalog && catalog.characters.find((item) => item.key === selectedCharacter?.kind || item.key === selectedCharacter?.group);
      const groups = ['全部', ...new Set(characters.map((item) => item.group))];
      const shown = group === '全部' ? characters : characters.filter((item) => item.group === group);
      const loadedNames = new Set(selectedCharacter?.loadedActions || []);
      const actions = selectedCatalog
        ? (category === '全部' ? selectedCatalog.actions : selectedCatalog.actions.filter((action) => action.category === category))
        : [];

      const toggle = async (character) => {
        try { await post('/toggle', { kind: character.kind, visible: !character.display }); await refresh(); setMessage(character.name + (character.display ? ' 已隐藏' : ' 已显示')); }
        catch (error) { setMessage('切换失败：' + error.message); }
      };
      const toggleAllVisible = async (visible) => {
        try { await post('/toggleAll', { visible }); await refresh(); setMessage(visible ? '已显示全部角色' : '已隐藏全部角色'); }
        catch (error) { setMessage('批量切换失败：' + error.message); }
      };
      const saveConfig = async (character, patch) => {
        try { await post('/config', { kind: character.kind, ...patch }); await refresh(); setMessage(character.name + ' 配置已保存'); }
        catch (error) { setMessage('保存失败：' + error.message); }
      };
      const loadAction = async (action) => {
        if (!selectedCharacter) return;
        setMessage('正在加载「' + action.name + '」…');
        try {
          const body = await post('/load', { kind: selectedCharacter.kind, actions: [action.name] });
          setMessage(body.failed?.length ? '部分失败：' + body.failed.join('；') : '已加载「' + action.name + '」');
          await refresh();
        } catch (error) { setMessage('加载失败：' + error.message); }
      };

      const unloadAction = async (action) => {
        if (!selectedCharacter) return;
        try {
          await post('/unload', { kind: selectedCharacter.kind, actions: [action.name] });
          setMessage('已卸载「' + action.name + '」');
          await refresh();
        } catch (error) { setMessage('卸载失败：' + error.message); }
      };
      const tabButton = (id, label) => h('button', { type: 'button', onClick: () => setTab(id), style: { border: 'none', background: tab === id ? '#fff' : 'transparent', color: tab === id ? '#16233d' : '#5b6b8a', fontWeight: tab === id ? 700 : 500, borderRadius: '9px', padding: '8px 18px', cursor: 'pointer' } }, label);
      const card = (children, extra) => h('div', { style: { background: '#fff', border: '1px solid rgba(15,35,80,.10)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(20,40,90,.06)', ...(extra || {}) } }, children);

      return h('div', { style: { height: '100%', overflowY: 'auto', background: '#fbfcff', padding: '22px 28px 40px' } },
        h('div', { style: { maxWidth: '1180px', margin: '0 auto' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' } },
            h('div', null,
              h('div', { style: { fontSize: '22px', fontWeight: 700, color: '#16233d' } }, '宠爱'),
              h('div', { style: { fontSize: '13px', color: '#5b6b8a', marginTop: '2px' } }, '独立 pamper 桌宠 · 不依赖 dsh-pet')
            ),
            h('button', { type: 'button', onClick: () => void (desktop ? stopDesktop() : startDesktop()), style: { border: '1px solid rgba(15,35,80,.16)', background: desktop ? '#1f2329' : '#fff', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', color: desktop ? '#fff' : '#3b4a66', marginRight: '8px' } }, desktop ? '关闭桌面' : '桌面模式'),
            h('button', { type: 'button', onClick: () => void refresh(), style: { border: '1px solid rgba(15,35,80,.16)', background: '#fff', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', color: '#3b4a66' } }, '刷新')
          ),
          h('div', { style: { display: 'inline-flex', gap: '2px', background: '#f2f4f7', borderRadius: '11px', padding: '3px', margin: '16px 0' } },
            tabButton('characters', '角色'), tabButton('config', '桌宠配置'), tabButton('discover', '发现')
          ),
          message ? h('div', { style: { fontSize: '13px', color: '#8a6d3b', marginBottom: '12px' } }, message) : null,
          tab === 'characters' ? h(React.Fragment, null,
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f4f7fb', border: '1px solid rgba(15,35,80,.06)', borderRadius: '12px', padding: '10px 14px', marginBottom: '14px', fontSize: '13px', color: '#5b6b8a' } },
              h('span', null, characters.length + ' 位角色 · ' + characters.filter((item) => item.display).length + ' 个正在陪伴'),
              h('span', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' } }, h('button', { type: 'button', onClick: () => void toggleAllVisible(true), style: { border: '1px solid rgba(15,35,80,.14)', background: '#fff', color: '#3b4a66', borderRadius: '999px', padding: '3px 10px', cursor: 'pointer', fontSize: '12px' } }, '全部显示'), h('button', { type: 'button', onClick: () => void toggleAllVisible(false), style: { border: '1px solid rgba(15,35,80,.14)', background: '#fff', color: '#3b4a66', borderRadius: '999px', padding: '3px 10px', cursor: 'pointer', fontSize: '12px' } }, '全部隐藏'), h('span', { style: { width: '1px', height: '18px', background: 'rgba(15,35,80,.12)' } }), groups.map((value) => h('button', { key: value, type: 'button', onClick: () => setGroup(value), style: { border: '1px solid ' + (group === value ? '#1f2329' : 'rgba(15,35,80,.14)'), background: group === value ? '#1f2329' : '#fff', color: group === value ? '#fff' : '#3b4a66', borderRadius: '999px', padding: '3px 10px', cursor: 'pointer', fontSize: '12px' } }, value)))
            ),
            h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '16px' } }, shown.map((character) => card(
              h(React.Fragment, null,
                h('div', { style: { height: '190px', background: '#eef2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '16px 16px 0 0' } },
                  h('img', { src: avatarUrl(character.kind), alt: '', style: { maxWidth: '86%', maxHeight: '86%', objectFit: 'contain' } })),
                h('div', { style: { padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' } },
                  h('div', { style: { flex: 1, minWidth: 0 } },
                    h('div', { style: { fontSize: '16px', fontWeight: 700, color: '#16233d' } }, character.name),
                    h('div', { style: { fontSize: '12px', color: '#5b6b8a', marginTop: '4px' } }, character.group + ' · ' + character.actionCount + ' 个动作 · ' + (character.display ? '正在陪伴' : '已隐藏'))
                  ),
                  h('button', { type: 'button', onClick: () => setDetail(character), style: { border: '1px solid rgba(15,35,80,.14)', borderRadius: '8px', padding: '5px 9px', background: '#fff', color: '#3b4a66', cursor: 'pointer', fontSize: '12px' } }, '详情'),
                  h('button', { type: 'button', onClick: () => void toggle(character), style: { width: '46px', height: '26px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: character.display ? '#2f6bff' : '#e5e7eb', position: 'relative' } },
                    h('span', { style: { position: 'absolute', top: '3px', left: character.display ? '23px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: character.display ? '#fff' : '#d4d7dc' } }))
                )
              ), { width: 'calc(25% - 12px)', minWidth: '240px' })))
          ) : null,
          tab === 'config' ? h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '16px' } }, characters.map((character) => card(
            h('div', { style: { padding: '16px 16px 18px' } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' } },
                h('img', { src: avatarUrl(character.kind), alt: '', style: { width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', background: '#eef2f8' } }),
                h('div', { style: { flex: 1 } }, h('div', { style: { fontWeight: 700, color: '#16233d' } }, character.name), h('div', { style: { fontSize: '12px', color: '#5b6b8a' } }, character.group))
              ),
              h('label', { style: { fontSize: '12px', color: '#5b6b8a' } }, '名字'),
              h('input', { type: 'text', defaultValue: character.name, onBlur: (event) => { if (event.target.value.trim() && event.target.value.trim() !== character.name) void saveConfig(character, { name: event.target.value.trim() }); }, style: { width: '100%', padding: '6px 8px', borderRadius: '8px', border: '1px solid rgba(15,35,80,.14)', margin: '4px 0 10px', boxSizing: 'border-box' } }),
              h('label', { style: { fontSize: '12px', color: '#5b6b8a' } }, '尺寸：' + character.size + 'px'),
              h('input', { type: 'range', min: 120, max: 720, step: 20, defaultValue: character.size, onMouseUp: (event) => void saveConfig(character, { size: Number(event.target.value) }), style: { width: '100%' } }),
              h('label', { style: { fontSize: '12px', color: '#5b6b8a', display: 'block', marginTop: '8px' } }, '位置'),
              h('select', { defaultValue: character.corner, onChange: (event) => void saveConfig(character, { corner: event.target.value }), style: { width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid rgba(15,35,80,.14)', marginTop: '4px' } },
                ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((value) => h('option', { key: value, value }, value))),
              h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' } },
                h('span', { style: { fontSize: '13px', color: '#3b4a66' } }, character.display ? '正在陪伴' : '已隐藏'),
                h('button', { type: 'button', onClick: () => void toggle(character), style: { border: 'none', borderRadius: '8px', padding: '6px 12px', background: character.display ? '#eef4ff' : '#1f2329', color: character.display ? '#2f6bff' : '#fff', cursor: 'pointer' } }, character.display ? '隐藏' : '显示')
              )
            )
          ), { width: 'calc(33.33% - 11px)', minWidth: '260px' })) : null,
          tab === 'discover' ? h(React.Fragment, null,
            h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' } },
              characters.map((character) => h('button', { key: character.kind, type: 'button', onClick: () => { setSelected(character.kind); setCategory('全部'); }, style: { border: '1px solid ' + (selected === character.kind ? '#1f2329' : 'rgba(15,35,80,.14)'), background: selected === character.kind ? '#1f2329' : '#fff', color: selected === character.kind ? '#fff' : '#3b4a66', borderRadius: '999px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px' } }, character.name))
            ),
            selectedCatalog ? h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' } },
              ['全部', ...new Set(selectedCatalog.actions.map((action) => action.category))].map((value) => h('button', { key: value, type: 'button', onClick: () => setCategory(value), style: { border: '1px solid ' + (category === value ? '#1f2329' : 'rgba(15,35,80,.12)'), background: category === value ? '#1f2329' : '#fafbfd', color: category === value ? '#fff' : '#3b4a66', borderRadius: '999px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' } }, value))
            ) : null,
            !selectedCatalog ? h('div', { style: { color: '#5b6b8a', fontSize: '13px' } }, '动作目录里没有这个角色的映射（独立版角色来自迁移的配置包）。') : null,
            h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '12px' } }, actions.slice(0, 120).map((action) => h('div', { key: action.pack + ':' + action.name, style: { width: 'calc(25% - 9px)', minWidth: '210px', background: '#fff', border: '1px solid rgba(15,35,80,.10)', borderRadius: '12px', overflow: 'hidden' } },
              h('div', { style: { height: '110px', background: '#eef2f8' } }, action.thumb ? h('img', { src: action.thumb, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover' } }) : null),
              h('div', { style: { padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' } },
                h('div', { style: { flex: 1, minWidth: 0 } },
                  h('div', { style: { fontSize: '13px', fontWeight: 600, color: '#16233d', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, action.name),
                  h('div', { style: { fontSize: '11px', color: '#8a94a8', marginTop: '2px' } }, action.category)
                ),
                loadedNames.has(action.name)
                  ? h('button', { type: 'button', onClick: () => void unloadAction(action), style: { border: 'none', borderRadius: '7px', padding: '5px 10px', fontSize: '12px', cursor: 'pointer', background: '#eef4ff', color: '#2f6bff' } }, '卸载')
                  : h('button', { type: 'button', onClick: () => void loadAction(action), style: { border: 'none', borderRadius: '7px', padding: '5px 10px', fontSize: '12px', cursor: 'pointer', background: '#1f2329', color: '#fff' } }, '加载')
              )
            )))
          ) : null
        ),
        detail ? h('div', { style: { position: 'fixed', inset: 0, background: 'rgba(15,23,42,.28)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          h('div', { style: { width: 'min(560px, calc(100vw - 40px))', maxHeight: '80vh', overflowY: 'auto', background: '#fff', borderRadius: '16px', padding: '20px 22px', boxShadow: '0 24px 60px rgba(15,23,42,.28)' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
              h('div', { style: { fontSize: '18px', fontWeight: 700, color: '#16233d' } }, detail.name + ' · 详情'),
              h('button', { type: 'button', onClick: () => setDetail(null), style: { border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer', color: '#5b6b8a' } }, '×')
            ),
            h('div', { style: { fontSize: '13px', color: '#5b6b8a', marginBottom: '12px' } }, detail.group + ' · ' + detail.actionCount + ' 个动作 · ' + (detail.display ? '正在陪伴' : '已隐藏')),
            h('div', { style: { fontSize: '13px', fontWeight: 600, color: '#16233d', marginBottom: '6px' } }, '已加载动作'),
            (detail.loadedActions || []).length === 0
              ? h('div', { style: { fontSize: '13px', color: '#8a94a8' } }, '还没有加载动作')
              : h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, (detail.loadedActions || []).map((name) => h('span', { key: name, style: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f4f7fb', borderRadius: '999px', padding: '4px 8px 4px 12px', fontSize: '12px', color: '#3b4a66' } }, name, h('button', { type: 'button', onClick: async () => { try { await post('/unload', { kind: detail.kind, actions: [name] }); const next = await api('/characters'); const updated = (next.characters || []).find((item) => item.kind === detail.kind); setDetail(updated || null); await refresh(); } catch (error) { setMessage('卸载失败：' + error.message); } }, style: { border: 'none', background: 'transparent', cursor: 'pointer', color: '#8a94a8', fontSize: '14px' } }, '×'))))
          )
        ) : null
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('sidebar.panellist', function* () {
          yield ctx.slots.register({ name: 'sidebar.panellist', id: 'pamper', order: 4, label: () => '宠爱' }, LoveIcon);
        });
        ctx.slots.inject('main', function* () {
          yield ctx.slots.register({ name: 'main', key: 'pamper' }, Panel);
        });
        ctx.slots.inject('shell.overlay', function* () {
          yield ctx.slots.register({ name: 'shell.overlay', id: 'pamper-pets', order: 40 }, PetOverlay);
        });
      }
    };
  }
});
