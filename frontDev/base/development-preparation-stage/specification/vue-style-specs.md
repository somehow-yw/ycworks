# Vue 代码风格指南

## 组件命名规范

1. 组件名应该始终为多个单词，根组件 App 除外

```js
Vue.component('aside-menu', {
  // ...
})
export default {
  // 注意单词大写开头(PascalCase)
  name: 'AsideMenu'
}
```

2. 要是能够拼接文件的系统，就把每个组件单独分成文件

```js
components/
|- TodoList.vue
|- TodoItem.vue
```

3. 单文件组件的文件名始终以小写开头（kebab-case）

```js
components/
|- aside-menu.vue
```

4. 和父组件紧密耦合的自组件应该以父组件名作为前缀命名

```js
components/aside
|- aside-menu.vue
|- aside-menu-item.vue
```

5. 自闭合组件，在单文件组件中没有内容的组件应该是自闭合的

```js
<!-- bad -->
<my-component></my-component>
<!-- good -->
<my-component />
```

6. 指令缩写，用 : 表示 v-bind: ，用 @ 表示 v-on:

```js
<!-- bad -->
<input
  v-bind:value="value"
  v-on:input="onInput"
>
<!-- good -->
<input
  :value="value"
  @input="onInput"
>
```

7. Props 换行，多个 Props 的元素应该分多行撰写，每个 Props 一行，闭合标签单起一行。

```plain
<!-- bad -->
<my-component foo="a" bar="b" baz="c" />
<!-- good -->
<my-component
  foo="a"
  bar="b"
  baz="c"
/>
```

8. Props 顺序，标签的 Props 应该有统一的顺序，依次为指令、属性和事件

```js
<my-component
  v-if="if"
  v-show="show"
  v-model="value"
  ref="ref"
  :key="key"
  :text="text"
  @input="onInput"
  @change="onChange"
/>
```

9. 组件选项的顺序，组件选项应该有统一的顺序。

```js
export default {
  name: '',
  mixins: [],
  components: {},
  props: {},
  data() {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
```

10. 组件选项中的空行，组件选项较多时，建议在属性之间添加空行

```js
export default {
  computed: {
    formattedValue() {
      // ...
    },
    // 空行
    styles() {
      // ...
    }
  },
  // 空行
  methods: {
    onInput() {
      // ...
    },
    // 空行
    onChange() {
      // ...
    }
  }
};
```

11. 单文件组件顶级标签的顺序，应该总是让顶级标签的顺序保持一致，且标签之间留有空行。

```js
<template>
...
</template>
<!-- 空行 -->
<script>
/* ... */
</script>
<!-- 空行 -->
<style>
/* ... */
</style>
```