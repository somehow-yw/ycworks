## common-query查询组件
> 已注册为全局组件，不用引用，可直接引用

```html
<commonQuery 
   :pageConfig="pageConfig"
   ref="commonQuery"
   @closeTag="closeTag"
   @search="search">
</commonQuery>
```
![查询组件](/images/query.png)
::: tip 图片说明
  当查询的列，超过四项，将前四列与剩下的分割，剩下的放入更多筛选里，点击可见
::: 
- data中的特殊处理
 1. 路由中，附带过滤条件
 ```js
  // 获取初始的过滤条件，将过滤条件展示在页面上
  if (this.$route.query) {
    for (var ki in this.$route.query) {
      paramsArr.push({title: ki, value: this.$route.query[ki], field: ki})
      paramsArrTem.push({title: ki, value: this.$route.query[ki], field: ki})
    }
  }
 ```
 2. 初始的过滤条件  params: this.$deepClone(this.$route.query)
- methods中重点方法讲解
  1. acptQueryTxtArr 外部传入过滤条件，如策略梳理图形
  ```js
    if (data.val.callSearch) { // 传入条件需要触发搜索
      this.$emit('search', this.assginParams())
    }
    // 传入的过滤项新增或更新至页面搜索框以标签的形式展示
    let nohave = true
    this.queryTxtArr.forEach((item, index) => {
      if (item.type === data.type) {
        nohave = false
        this.$set(this.queryTxtArr, index, data)
      }
    })
    if (nohave) {
      this.queryTxtArr.push(data)
    }
  ```