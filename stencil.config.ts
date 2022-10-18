/*
 * @Date        : 2022-10-18 09:00:38
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQijun
 * @LastEditTime: 2022-10-18 15:50:11
 * @Description :
 */
import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'jack-web-ui',
  bundles: [
    {
      components: ['my-rating'],
    },
    {
      components: ['count-to'],
    },
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [sass()],
  globalStyle: './src/global/global.scss',
}
