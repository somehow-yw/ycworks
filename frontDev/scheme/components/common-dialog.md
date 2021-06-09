## 编辑弹窗

### 重点props讲解
 - moduleType，页面模块，弹窗内的部分数据请求会用到
 - originFullscreenStatus 弹窗状态，默认非全屏
 - miniShowCallBack 内嵌新增编辑弹窗的展示回调
### 重点data变量讲解
 - formEachRowItemRel 每行展示的列，默认每行1列
 - listName: '', // list接口需要格外携带的参数的filed 如app/list, appPolicy/list
 - listParams: {}, // list接口需要格外携带的参数 如app/list, appPolicy/list
### 重点方法讲解
 - accetpListParams
 外部业务调用需要在接口动态追加参数
 ```js
  accetpListParams (params, listName) {
      this.listName = listName
      this.listParams = params
    },
 ```
 - resetStyle // 外部调用这个可重新绘制弹窗样式，用于页面行减少或者增加时，弹窗样式错位
 - save
  1. saveByout = true 将数据传递直外部的业务页面进行
  2. 
## formInfo,表单重点讲解

### 重点formItem讲解
  1. type === 'input_save'
    - 输入后，点击icon，可直接保存，现有的，策略梳理-右侧弹窗
    ```html
      <el-input v-if="item.type === 'input_save'"
                        :disabled="item.showStateObj ? item.showStateObj.disableWrite : false"
                        :placeHolder="item.placeHolder ? item.placeHolder : ''"
                        auto-complete="new-accounts"
                        size="small"
                        show-word-limit
                        class="inline-input_save"
                        clearable
                        :maxlength="item.maxLength"
                        @input="change($event)"
                        v-model="ruleForm[item.field]">
                        <el-button slot="append" size="mini" @click="inlineSave" icon="el-icon-check"></el-button>
              </el-input>
    ```
 2. 下拉单选和多选，type === 'select'/ 'multipleSelect'
  - 下拉框的选项匹配规则：
   * 第一种：如果item返回了<mark>enums</mark>, 并且通过<mark>$formateSelect(item.enums)</mark>获取到了对应的选项，则展示获取到的下拉选项
   * 第二种：item.enumOrRefValues
   * 第三种：selectFormFieldList 外部页面传入的下拉选择
 3. 表格选择 type===tableSelect，使用到formTable组件，详情见 to do
 4. 内嵌表格 type===tableAdd,如应用页面的新增编辑
 5. 纯文案展示 type===span,展示的文案需做换行处理
    ```html
      <span class="span-frame" v-if="item.type === 'span'" v-html="handleSpan(ruleForm[item.field])"></span>
    ```
    ```js 
      handleSpan (data) {
        if (String(data).indexOf(',') !== -1) {
          return data.split(',').join('<br/>')
        } else {
          return data
        }
      }
    ```
 6. 等级设置type=== higMidLowRange, 滑块选择
    ```html
      <div :class="item.type" v-if="item.type === 'higMidLowRange'">
        <ui-slider v-model="ruleForm[item.field]" :marks="getSliderMarks(ruleForm[item.field])" range show-stops  :max="100" />
      </div>
    ```
    ```js
      getSliderMarks (range) { // 滑块上标记处理
        let marks = {
          0: '0',
          100: {
            value: '100',
            skewPostion: 100 - range[1],
            label: this.$options.filters.formateLang('levelHigh')}
        }
        marks[range[0]] = {
          value: String(range[0]),
          skewPostion: range[0],
          label: this.$options.filters.formateLang('levelLow')
        }
        marks[range[1]] = {
          value: String(range[1]),
          skewPostion: range[1] - range[0],
          label: this.$options.filters.formateLang('levelMiddle')
        }
        return marks
      },
    ```
 7. 逻辑组件 type === 'logicMap'，详情to do 
 8. 支持各种slot
    1. slot= form 外部传入form表单
    2. slot= radioSlot, 格外传入单选
    3. slot= btnSlot, tableAdd内的按钮插槽
    4. slot= formButton, 马婷

### 重点methods讲解
 1. calcActiveNode()计算初始状态下的，选中的逻辑节点
### creadted()重点
 1. 如果是编辑状态，并且是应用策略详情或者应用策略时，传入的initForm并不完善，需单独走接口获取完整的数据
 ```js
  if (this.ruleForm.id && (this.moduleType === 'appPolicyDetail' || this.moduleType === 'appPolicy')) {
    this.dataLoading = true
    this.$http.generalApi.getCommonApi({ url: 'appPolicy/detail/' + this.ruleForm.id, params: {} }).then(res => {
      this.dataLoading = false
      if (res.success) {
        this.ruleForm = { ...this.ruleForm, ...res.data }
      }
    })
  }
 ```