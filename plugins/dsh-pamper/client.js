/**
 * dsh-pamper client：
 * - dsh-pet 已存在且补丁成功：自动刷新一次，使用打补丁后的完整「宠爱」页面；
 * - 没有 dsh-pet / 补丁失败：仍然注册「宠爱」菜单，页面给出安装/修复提示，避免“装完没有菜单”。
 */
window.__ModuleLoader__.load({
  id: 'dsh-pamper',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useState } = React;
    const ROUTE = '/dsh-action-store-7462';

    function LoveIcon({ size = 18 }) {
      return h('svg', {
        width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
        'aria-hidden': 'true'
      }, h('path', { d: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z' }));
    }

    function FallbackPanel() {
      const [state, setState] = useState({ status: 'checking', patched: false });
      const check = async () => {
        setState({ status: 'checking', patched: false });
        try {
          const body = await (await fetch(ROUTE + '/ensure', { cache: 'no-store' })).json();
          setState({ status: body.patched ? 'patched' : 'missing', patched: Boolean(body.patched) });
          if (body.patched) window.location.reload();
        } catch (error) {
          setState({ status: 'error', patched: false, error: error && error.message ? error.message : String(error) });
        }
      };
      useEffect(() => { void check(); }, []);
      return h('div', { style: { height: '100%', overflowY: 'auto', background: '#fbfcff', padding: '28px', fontFamily: 'inherit' } },
        h('div', { style: { maxWidth: '760px', margin: '0 auto' } },
          h('div', { style: { fontSize: '22px', fontWeight: 700, color: '#16233d' } }, '宠爱'),
          h('div', { style: { fontSize: '13px', color: '#5b6b8a', margin: '4px 0 18px' } }, 'pamper 宠爱页面套件'),
          h('div', { style: { background: '#fff', border: '1px solid rgba(15,35,80,.10)', borderRadius: '16px', padding: '20px 22px', boxShadow: '0 8px 24px rgba(20,40,90,.06)' } },
            h('div', { style: { fontSize: '15px', fontWeight: 700, color: '#16233d', marginBottom: '8px' } },
              state.status === 'checking' ? '正在检查宠爱页面…' : state.patched ? '宠爱页面已就绪' : '未检测到可用的 dsh-pet'
            ),
            h('div', { style: { fontSize: '13px', color: '#4b5b78', lineHeight: 1.7 } },
              state.status === 'missing'
                ? '完整宠爱页面需要先安装 dsh-pet。安装后点下面的「重新检查」，插件会自动打补丁并刷新页面。'
                : state.status === 'error'
                  ? '检查失败：' + state.error
                  : state.patched
                    ? '补丁已应用，页面即将刷新。'
                    : '正在检测 dsh-pet 与宠爱补丁状态。'
            ),
            h('div', { style: { marginTop: '14px', display: 'flex', gap: '10px' } },
              h('button', { type: 'button', onClick: () => void check(), style: { border: 'none', borderRadius: '9px', padding: '8px 14px', background: '#1f2329', color: '#fff', cursor: 'pointer' } }, '重新检查'),
              h('button', { type: 'button', onClick: () => window.location.reload(), style: { border: '1px solid rgba(15,35,80,.14)', borderRadius: '9px', padding: '8px 14px', background: '#fff', color: '#3b4a66', cursor: 'pointer' } }, '刷新页面')
            ),
            state.status === 'missing' ? h('div', { style: { marginTop: '16px', fontSize: '12px', color: '#8a94a8', lineHeight: 1.7 } },
              '安装命令：', h('code', { style: { background: '#f2f4f7', padding: '2px 6px', borderRadius: '5px' } }, 'dsh plugin add dsh-pet')
            ) : null
          )
        )
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const boot = async () => {
          let body = null;
          try {
            body = await (await fetch(ROUTE + '/ensure', { cache: 'no-store' })).json();
          } catch {}
          if (body && body.patched) {
            try {
              if (!sessionStorage.getItem('dsh-pamper-menu-ready')) {
                sessionStorage.setItem('dsh-pamper-menu-ready', '1');
                window.location.reload();
              }
            } catch {}
            return;
          }
          // 没有 dsh-pet：仍然给出「宠爱」菜单，页面提示安装/修复。
          ctx.slots.inject('sidebar.panellist', function* () {
            yield ctx.slots.register({ name: 'sidebar.panellist', id: 'pamper-fallback', order: 4, label: () => '宠爱' }, LoveIcon);
          });
          ctx.slots.inject('main', function* () {
            yield ctx.slots.register({ name: 'main', key: 'pamper-fallback' }, FallbackPanel);
          });
        };
        void boot();
      }
    };
  }
});
