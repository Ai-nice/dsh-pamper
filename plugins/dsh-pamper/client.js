/**
 * dsh-pamper 客户端：独立的「宠爱」页面 + 页面内桌宠浮层。
 * 不依赖 dsh-pet；数据来自 /dsh-pamper-7463 路由。
 */
window.__ModuleLoader__.load({
  id: 'dsh-pamper',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useState } = React;
    const ROUTE = '/dsh-pamper-7463';

    async function api(path, options) {
      const response = await fetch(ROUTE + path, { cache: 'no-store', ...(options || {}) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return await response.json();
    }

    function LoveIcon({ size = 18 }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true'
      }, h('path', { d: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z' }));
    }

    function PetOverlay() {
      const [characters, setCharacters] = useState([]);
      useEffect(() => {
        let timer = 0;
        const load = () => {
          api('/characters').then((body) => setCharacters(body.characters || [])).catch(() => {});
        };
        load();
        timer = setInterval(load, 5000);
        return () => clearInterval(timer);
      }, []);
      const visible = characters.filter((character) => character.visible && character.idle);
      if (visible.length === 0) return null;
      return h('div', {
        style: {
          position: 'fixed',
          right: '16px',
          bottom: '8px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          zIndex: 45,
          pointerEvents: 'none'
        }
      }, visible.map((character) => h('video', {
        key: character.key + ':' + character.idle,
        src: ROUTE + '/asset?kind=' + encodeURIComponent(character.key) + '&action=' + encodeURIComponent(character.idle),
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        style: { width: '150px', height: 'auto', display: 'block', filter: 'drop-shadow(0 8px 18px rgba(15,23,42,.18))' }
      })));
    }

    function Panel() {
      const [tab, setTab] = useState('characters');
      const [catalog, setCatalog] = useState(null);
      const [characters, setCharacters] = useState([]);
      const [selected, setSelected] = useState('maid');
      const [category, setCategory] = useState('全部');
      const [message, setMessage] = useState('');

      const refresh = async () => {
        try {
          const [catalogBody, charactersBody] = await Promise.all([api('/catalog'), api('/characters')]);
          setCatalog(catalogBody);
          setCharacters(charactersBody.characters || []);
        } catch (error) {
          setMessage('加载失败：' + (error && error.message ? error.message : error));
        }
      };
      useEffect(() => { void refresh(); }, []);

      const characterConf = catalog && catalog.characters.find((item) => item.key === selected);
      const actions = characterConf
        ? (category === '全部' ? characterConf.actions : characterConf.actions.filter((action) => action.category === category))
        : [];

      const toggle = async (key, visible) => {
        try {
          await api('/toggle', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ key, visible }) });
          await refresh();
        } catch (error) {
          setMessage('切换失败：' + (error && error.message ? error.message : error));
        }
      };
      const loadAction = async (action) => {
        setMessage('正在加载「' + action.name + '」…');
        try {
          const body = await api('/load', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ key: selected, actions: [action.name] }) });
          setMessage(body.failed && body.failed.length ? '部分失败：' + body.failed.join('；') : '已加载「' + action.name + '」');
          await refresh();
        } catch (error) {
          setMessage('加载失败：' + (error && error.message ? error.message : error));
        }
      };

      const tabButton = (id, label) => h('button', {
        type: 'button',
        onClick: () => setTab(id),
        style: {
          border: 'none',
          background: tab === id ? '#fff' : 'transparent',
          color: tab === id ? '#16233d' : '#5b6b8a',
          fontWeight: tab === id ? 700 : 500,
          borderRadius: '9px',
          padding: '8px 18px',
          cursor: 'pointer'
        }
      }, label);

      const loadedNames = new Set((characters.find((item) => item.key === selected) || {}).loaded || []);

      return h('div', { style: { height: '100%', overflowY: 'auto', background: '#fbfcff', padding: '22px 28px 40px' } },
        h('div', { style: { maxWidth: '1180px', margin: '0 auto' } },
          h('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' } },
            h('div', null,
              h('div', { style: { fontSize: '22px', fontWeight: 700, color: '#16233d' } }, 'Pamper'),
              h('div', { style: { fontSize: '13px', color: '#5b6b8a', marginTop: '2px' } }, '独立版桌宠：不依赖 dsh-pet；页面内浮层 + 动作按需下载')
            ),
            h('button', { type: 'button', onClick: () => void refresh(), style: { border: '1px solid rgba(15,35,80,.16)', background: '#fff', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', color: '#3b4a66' } }, '刷新')
          ),
          h('div', { style: { display: 'inline-flex', gap: '2px', background: '#f2f4f7', borderRadius: '11px', padding: '3px', margin: '16px 0' } },
            tabButton('characters', '角色'),
            tabButton('discover', '发现')
          ),
          message ? h('div', { style: { fontSize: '13px', color: '#8a6d3b', marginBottom: '12px' } }, message) : null,
          tab === 'characters'
            ? h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '16px' } },
                characters.map((character) => {
                  const conf = catalog && catalog.characters.find((item) => item.key === character.key);
                  return h('div', {
                    key: character.key,
                    style: { width: 'calc(25% - 12px)', minWidth: '240px', background: '#fff', border: '1px solid rgba(15,35,80,.10)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(20,40,90,.07)' }
                  },
                    h('div', { style: { position: 'relative', height: '180px', background: '#eef2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                      character.thumb ? h('img', { src: character.thumb, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover' } }) : null,
                      !character.visible ? h('span', { style: { position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,.92)', borderRadius: '8px', padding: '4px 8px', fontSize: '12px', color: '#3b4a66' } }, '已隐藏') : null
                    ),
                    h('div', { style: { padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' } },
                      h('div', { style: { flex: 1, minWidth: 0 } },
                        h('div', { style: { fontSize: '16px', fontWeight: 700, color: '#16233d', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, character.name),
                        h('div', { style: { fontSize: '12px', color: '#5b6b8a', marginTop: '4px' } }, (conf ? conf.actions.length : character.actionCount) + ' 个动作 · 已加载 ' + character.loaded.length)
                      ),
                      h('button', {
                        type: 'button',
                        onClick: () => void toggle(character.key, !character.visible),
                        'aria-pressed': character.visible,
                        style: { width: '46px', height: '26px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: character.visible ? '#2f6bff' : '#e5e7eb', position: 'relative', flex: '0 0 auto' }
                      }, h('span', { style: { position: 'absolute', top: '3px', left: character.visible ? '23px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: character.visible ? '#fff' : '#d4d7dc', transition: 'left .15s ease' } }))
                    )
                  );
                })
              )
            : h('div', null,
                h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' } },
                  (catalog ? catalog.characters : []).map((item) => h('button', {
                    key: item.key,
                    type: 'button',
                    onClick: () => { setSelected(item.key); setCategory('全部'); },
                    style: { border: '1px solid ' + (selected === item.key ? '#1f2329' : 'rgba(15,35,80,.14)'), background: selected === item.key ? '#1f2329' : '#fff', color: selected === item.key ? '#fff' : '#3b4a66', borderRadius: '999px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px' }
                  }, item.key === 'maid' ? '大肥鱼' : item.name))
                ),
                characterConf ? h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' } },
                  ['全部', ...new Set(characterConf.actions.map((action) => action.category))].map((value) => h('button', {
                    key: value,
                    type: 'button',
                    onClick: () => setCategory(value),
                    style: { border: '1px solid ' + (category === value ? '#1f2329' : 'rgba(15,35,80,.12)'), background: category === value ? '#1f2329' : '#fafbfd', color: category === value ? '#fff' : '#3b4a66', borderRadius: '999px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }
                  }, value))
                ) : null,
                h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '12px' } },
                  actions.slice(0, 80).map((action) => h('div', {
                    key: action.pack + ':' + action.name,
                    style: { width: 'calc(25% - 9px)', minWidth: '200px', background: '#fff', border: '1px solid rgba(15,35,80,.10)', borderRadius: '12px', overflow: 'hidden' }
                  },
                    h('div', { style: { height: '110px', background: '#eef2f8' } }, action.thumb ? h('img', { src: action.thumb, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover' } }) : null),
                    h('div', { style: { padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' } },
                      h('div', { style: { flex: 1, minWidth: 0 } },
                        h('div', { style: { fontSize: '13px', fontWeight: 600, color: '#16233d', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, action.name),
                        h('div', { style: { fontSize: '11px', color: '#8a94a8', marginTop: '2px' } }, action.category)
                      ),
                      h('button', {
                        type: 'button',
                        disabled: loadedNames.has(action.name),
                        onClick: () => void loadAction(action),
                        style: { border: 'none', borderRadius: '7px', padding: '5px 10px', fontSize: '12px', cursor: loadedNames.has(action.name) ? 'default' : 'pointer', background: loadedNames.has(action.name) ? '#f1f3f6' : '#1f2329', color: loadedNames.has(action.name) ? '#9aa6bd' : '#fff' }
                      }, loadedNames.has(action.name) ? '已加载' : '加载')
                    )
                  ))
                )
              )
        )
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('sidebar.panellist', function* () {
          yield ctx.slots.register({ name: 'sidebar.panellist', id: 'pamper', order: 4, label: () => 'Pamper' }, LoveIcon);
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
