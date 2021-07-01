## common-table表格
### 重点import讲解
 - formateTemplet, 格式化显示特殊的gridItem.templet,如协议样式

### 重点props讲解
  - showIpSettingIcon 服务端IP的显示规则设置的popOver
  - percentSet 百分比设置，在策略命中率动态显示命中率的高中低等级
  - actionWidth 表格操作栏的宽度
  - showRightBtn 是否展示表格右侧的列筛选和打印Icon
  - initLoading 初始化loading的状态
  - repeatId  标记重复的ID,颜色高亮显示，在策略梳理用到

### 重点computed讲解
  - addToDropBtns 需要放到表头下拉菜单里的功能,已判断菜单权限，可直接在业务页面使用

    ```js
      addToDropBtns: ['export', 'mergeSameAppPolicy', 'issue', 'appPolicyExportReport']
    ```
  对应的页面效果

  ![addToDropBtns](/images/addToDropBtns.png)

  - addToDropToolbars 需要放到表格行中下拉菜单里的功能，已判断菜单权限，可直接在业务页面使用
    ```js
      addToDropToolbars: ['appPolicyAnalysis', 'appPolicyPathAnalysis']
    ```
  对应的页面效果

  ![addToDropToolbars](/images/addToDropToolbars.png)

### 重点data变量讲解
  - showGrid 页面中table实际展示的列
  > 由于页面上有列筛选的显示隐藏功能，所以，第一步，先取本地gridField的缓存，没有再从window.allField的中取

### 重点方法讲解
  - rowName

    ```js
      rowName ({ row, rowIndex }) {
      if (this.repeatId.indexOf(row.id) !== -1) {
        return 'repeat-row-name'
      } else {
        return 'rowName'
      }
    },
    ```
  用于计算是否是重复的数据，如果是，所在行repeat-row-name高亮显示