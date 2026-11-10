/**
 * dsh-pamper client：安装后自动应用补丁并刷新一次页面，让「宠爱」菜单出现。
 */
window.__ModuleLoader__.load({
  id: 'dsh-pamper',
  factory() {
    return {
      apply() {
        const key = 'dsh-pamper-menu-ready';
        try {
          if (sessionStorage.getItem(key)) return;
          sessionStorage.setItem(key, '1');
        } catch {}
        fetch('/dsh-action-store-7462/ensure', { cache: 'no-store' })
          .then((response) => response.json())
          .then((body) => {
            if (body && body.patched) window.location.reload();
          })
          .catch(() => {});
      }
    };
  }
});
