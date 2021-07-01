
### 策略梳理-梳理图形右键菜单-cardingContextmenu

  图形右键菜单，目前在策略梳理、策略关系、策略分析弹窗中用到

  #### 要点提示

  1. cardingMenuList: 右键菜单选项

  ```js
    cardingMenuList: function () {
      return this.$store.state.cardingMenuList // 通过store获取点击不同图像节点位置时的菜单列表
    }
  ```

  2. currNode: 当前点击的节点，数组

  <!-- :::tip cardingMenuList: 右键菜单选项

  技术实现业务，业务验证技术，技术促进业务发展，业务发展促进技术进步的良性循环

  ::: -->

### 梳理弹窗-cardingDialog

梳理服务端、 梳理未知客户端、梳理未知应用

  #### 要点提示

  1. 弹窗默认全屏

  ```html
    <cardingDialog @refreshData="refresh()" ref="cardingDialog" />
  ```


  ```js
    // 业务页面引入本组建后，调用show方法，默认全屏
    this.cardingDialog.$refs.dialogBox.show({fullscreen: true})
  ```

  2. 方法resizeStop()，resize弹窗大小，table表格自适应

  > 非全屏模式下
  
  ```html
    <dialogBox ref="dialogBox" @fullscreenChange="fullscreenChange" @resizeStop="resizeStop" :dialogTitle="cardData.cardingtTitle" width='800px' :initDialogHeight='543'>
  ```

  ```js
    // 获取拖动后的高度，减去对应tab的空间，剩下的为table所占空间
    resizeStop (h) {
      this.saveHeight = h
      this.$nextTick(() => {
        this.tableHeightGather.cardingServerToPolicy = h - 193
        this.tableHeightGather.cardingUnkownApp = h - 163
        this.tableHeightGather.cardingUnkownClient = h - 153
        this.tableHeightGather.issuePageConfilictCheck = h - 153
      })
    }
  ```

### 策略分析全屏弹窗-policyAnalyzeFullScreenDialog

策略梳理、应用策略明细等都有用到

#### 要点提示

1. moduleType 使用该弹窗的模块，用于区分 appPolicy应用策略 firewallPolicy防火墙策略

  ```js
    props: {
      moduleType: { // 判断是那个模块的分析 appPolicy应用策略 firewallPolicy防火墙策略
        default: 'appPolicy',
        type: String
      }
    },
  ```

  - 梳理图像数据的接口

    ```js
    this.$http.generalApi.postCommonApi({url: `${this.moduleType}Analysis/carding`, data: {...params, ...{showAnyClientDetail: this.showAnyClientDetail}}})
    ```

  - 梳理图像的右键菜单

    ```html
      <cardingContextmenu ref="cardingContextmenu" @appPolicyServerDelete="appPolicyServerDelete" @appRuleServerDelete="appRuleServerDelete" />
    ```
    这两个<mark>删除</mark>操作，实际并不是删除，而是调编辑弹窗
    > 在编辑弹窗内，调'appRule/list'和'/appPolicy/list',传入delete: []参数，后台过滤掉数组内的数据，点击保存，才是真正意义上的删除

    ```js
      // appPolicyServerDelete 策略删除
      appPolicyServerDelete (arr) { // 提取节点的ip，转换为clientIp送上来
      let transArr = []
      arr.map(item => {
        item.clientIp = item.ip
        transArr.push(item)
      })
      this.$refs.commonForm.show(this.objectDetail)
      if (this.moduleType === 'appPolicy') {
        this.$refs.commonForm.accetpListParams({delete: JSON.stringify(transArr)}, 'appPolicy')
      } else if (this.moduleType === 'firewallPolicy') {
        this.$refs.commonForm.accetpListParams({delete: JSON.stringify(transArr)}, 'policyService')
      }
    }
    ```

    ```js
    // appRuleServerDelete 规则删除
    appRuleServerDelete (arr) {
      this.$refs.commonForm.show(this.objectDetail)
      if (this.moduleType === 'appPolicy') {
        this.$refs.commonForm.accetpListParams({delete: JSON.stringify(arr)}, 'appRule')
      } else if (this.moduleType === 'firewallPolicy') {
        this.$refs.commonForm.accetpListParams({delete: JSON.stringify(arr)}, 'policyService')
      }
    },
    ```

  - 应用或策略详情
    ![应用或策略详情](/images/detail.png)
    * 图标展示

    ```html
      <!-- 应用详情可能会返回icon -->
      <img v-if="objectDetail.icon" :src="'rest/v1/basePub/getIcon/'+objectDetail.icon" alt="">
      <i v-else :class="'iconfont '+ caclIcon()"></i>
    ```

    ```js
    // 根据moduleType动态返回图标
    caclIcon () {
      let icon = 'iconyingyong1'
      if (this.moduleType === 'appPolicy') {
        icon = 'iconyingyong1'
      } else if (this.moduleType === 'firewallPolicy') {
        icon = 'iconfanghuoqiangcelve1'
      }
      return icon
    },
    ```

  - 策略分析表格的数据
    * 表格为奇数时，底部表格独占一排

    ```html
      <div class="pro-model-color each-table" :class="{lastTable:index+1 === tablesGatherData.length && tablesGatherData.length%2}" :key="table.id">
    ```

    ```css
    .tables-box {
        display: inline-flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        .each-table {
          margin-top: 10px;
          width: calc(50% - 5px);
          padding-bottom: 10px;
          /deep/ .table-top {
            padding: 10px 0;
            .btns-list {
              padding: 0;
            }
          }
          p {
            padding: 0 10px;
            font-weight: 700;
            line-height: 30px;
            float: left;
          }
        }
        .lastTable {
          width: 100%;
        }
        padding-bottom: 10px;
      }
    ```

    ```js
      this.tablesLoading = true
      this.$http.generalApi.postCommonApi({url: `${this.moduleType}Analysis/analysis`, data: {...this.params, ...{showAnyClientDetail: this.showAnyClientDetail}}}).then(res => {
        this.tablesLoading = false
        if (res.success) {
          if (res.data.appPolicyHitLevelSet && res.data.appPolicyHitLevelSet.levelRange) { // 策略命中等级颜色设置
            this.hitLevelSet = res.data.appPolicyHitLevelSet.levelRange
          }
          this.tablesGatherData = [] // table表格集合
          for (var ki in res.data) {
            if (ki.indexOf('List') !== -1) {
              res.data[ki].tableType = ki
              this.tablesGatherData.push(res.data[ki])
            }
          }
        }
      })
    ```


  