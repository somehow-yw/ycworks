## 详情弹窗

> 已注册为全局组件，不用引用，可直接调用
  - 调用方式
    * show(data, fullscreen)
    1. data: 数据
    2. fullscreen: 是否全屏展示
```html
  <commonDetail v-if="showCommonForm"
                  :width="detailWidth"
                  :detailsDialogWidth='detailsDialogWidth'
                  :detailLabel="detailLabel"
                  :pageConfig="pageConfig"
                  @enabledChange="enabledChange"
                  :formField="tabPageConfig.formField || []"
                  :moduleType="moduleType"
                  ref="commonDetail">
      <template style="width: 100%"
                slot="detail">
        <slot name="detail"></slot>
      </template>
  </commonDetail>
```
```js
  this.$refs.commonDetail.show(dataRel.row, this.detailFullscreen)
```
