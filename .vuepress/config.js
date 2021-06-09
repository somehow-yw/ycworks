/*
 * @Descripttion: 
 * @version: 
 * @Author: yangym
 * @Date: 2021-06-04 11:21:14
 * @LastEditors: yangym
 * @LastEditTime: 2021-06-09 14:53:24
 */
module.exports = {
  title: '微澈研发团队介绍与前端项目交接',
  description: '架构、规范',
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    nav: [
      {
        text: '团队指南',
        items: [
          {
            text: '人员介绍',
            link: '/teamGuide/guide/'
          }
        ]
      },
      {
        text: '产品',
        items: [
          {
            text: '1.0',
            link: '/product/'
          }
        ]
      },
      {
        text: '前端',
        items: [
          {
            text: '概览',
            link: '/frontDev/'
          },
          {
            text: '基础建设',
            items: [
              {
                text: '开发准备阶段',
                link: '/frontDev/base/development-preparation-stage/'
              }
            ]
          },
          {
            text: '解决方案',
            items: [
              {
                text: '业务解决方案',
                link: '/frontDev/scheme/'
              }
            ]
          }
        ]
      }
    ],
    sidebar: {
      '/frontDev/base/development-preparation-stage/': [{
        title: '规范',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          '/frontDev/base/development-preparation-stage/specification/css-specs',
          '/frontDev/base/development-preparation-stage/specification/js-specs',
          '/frontDev/base/development-preparation-stage/specification/vue-style-specs'
        ]
      }],
      '/frontDev/scheme/': [
        {
          title: '方案',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            '/frontDev/scheme/components/carding-components',
            '/frontDev/scheme/components/common-detail',
            '/frontDev/scheme/components/common-dialog',
            '/frontDev/scheme/components/common-import',
            '/frontDev/scheme/components/common-leftpart',
            '/frontDev/scheme/components/common-localSortTable',
            '/frontDev/scheme/components/common-query',
            '/frontDev/scheme/components/common-table',
            '/frontDev/scheme/components/firewall-components',
            '/frontDev/scheme/components/layout',
            '/frontDev/scheme/components/logic-map',
            '/frontDev/scheme/components/viewsGrid'
          ]
        }
      ]
    }
  },
  plugins: ['@vuepress/medium-zoom', true],
  dest: 'dist'
}
