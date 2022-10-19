# jack-web-ui

A web component library build by stenciljs.

> It is WIP.

## Using this component

three methods:

### Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/my-component@0.0.1/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

Use it in vue3 project build vite.

```bash
npm i jack-web-ui
```

> use one component

main.js

```js
import 'jack-web-ui/dist/jack-web-ui/jack-web-ui.css'
import { CountTo } from 'jack-web-ui/dist/components'
customElements.define('count-to', CountTo)
```

### In a stencil-starter app

- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc

### 在 vue3 中使用

`package.json`的 module 为

```json
"module": "dist/index.js",
```

```js
import { CountTo } from 'jack-web-ui/dist/components' // 导出组件
customElements.define('count-to', CountTo)
```

package.json 的 module 为

```json
"module": "dist/components/index.js",
```

这样引入

```js
import { CountTo } from 'jack-web-ui' // 导出组件
customElements.define('count-to', CountTo)
```

然后 vite.config.js 配置编译选项：

```js
vue({
  template: {
    compilerOptions: {
      isCustomElement: isCustomElement,
    },
  },
}),
```

[How to set compilerOptions.isCustomElement for VueJS 3 in Laravel project](https://stackoverflow.com/questions/71601714/how-to-set-compileroptions-iscustomelement-for-vuejs-3-in-laravel-project)

### 配置全局样式

新建 src/global 目录，把全局样式放在这里。

然后在 stencil.config.ts 中引入：

```js
 globalStyle: './src/global/global.scss',
```

> 引入多个全局样式呢？

只有一个全局样式，然后这个全局样式引用其他全局样式。

vue3 中 main.js 引入组件样式

```js
import 'jack-web-ui/dist/jack-web-ui/jack-web-ui.css'
```
