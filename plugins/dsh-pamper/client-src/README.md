# client-src（0.6.0 独立宠爱页源码）

本目录只用于构建 `plugins/dsh-pamper/client.js`，不会在运行时加载 dsh-pet。

## 目录

```text
love/
  injected-love-entry.raw.js   从 scripts/patch-dsh-pet.mjs 提取的旧宠爱页注入代码
vendor/dsh-pet/
  LICENSE                      MIT
  src/client/**                dsh-pet 客户端源码（已排除测试）
  src/shared/**                dsh-pet 共享源码
```

## 当前状态

- 旧页面壳（LovePanel/筛选/详情/发现）已从 patch 脚本提取，尚未模块化；
- dsh-pet settings 源码已 vendor，`esbuild` 单独打包通过；
- 下一步：
  1. 把 raw 页面壳改造成可接收依赖的模块；
  2. 把 vendor settings 的 `ROUTE_PATH`/`petBridge` 接到我们的 Host；
  3. 生成最终 `client.js`。

## 构建检查（临时）

```powershell
npx -y esbuild@latest client-src/vendor/dsh-pet/src/client/settings.ts ^
  --bundle --format=esm --platform=browser --external:react ^
  --outfile=.build-tmp/settings-bundle-test.js
```
