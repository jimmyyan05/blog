---
title: "vue綁定class"
date: "2025-03-24"
description: "vue。"
---

## ✨ 基本用法

### 1. 靜態 class

```html
<div class="active">Hello</div>
```

---

## 🎯 動態 class 綁定語法

### ✅ 物件語法（最常見）

```html
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
```

- `key` 是 class 名稱，`value` 是布林值
- 當值為 `true` 時，class 會被加上去

> ❌ **不能這樣寫：**

```js
:class="{ isActive ? 'active text-danger' : '' }" // ✘ 錯誤語法（JS 物件格式不對）
```

---

### ✅ 陣列語法

```html
<div :class="[activeClass, errorClass]"></div>
```

- 每個陣列元素都是一個 class 字串
- Vue 會自動幫你合併（過濾掉 falsy 值）

你也可以搭配三元運算子或邏輯運算：

```html
<div
  :class="['base', isActive ? 'active text-danger' : '', hasError && 'text-danger']"
></div>
```

✅ Vue 會自動忽略空字串或 `false`

---

### ✅ 三元運算語法（單條件切換）

```html
<div :class="isActive ? 'active' : 'inactive'"></div>
```

適合只有一種條件時切換兩種 class。

---

## 🔍 差異比較表

| 💻 寫法                                                           | 🧠 適合用法                     |
| ----------------------------------------------------------------- | ------------------------------- |
| `class="active"`                                                  | 靜態 class                      |
| `:class="{ active: isActive }"`                                   | 根據布林值條件加入 class        |
| `:class="[base, isActive ? 'active' : '', hasError && 'danger']"` | 組合 class 名 + 三元/邏輯運算子 |
| `:class="條件 ? A : B"`                                           | 單一條件下切換 class 字串       |

---

## 🧠 小提醒

- ✅ 陣列語法可以使用三元運算子，因為陣列元素允許是運算結果
- ❌ 物件語法中不能用三元運算子作為 key，這是 JS 的限制，不是 Vue 的問題
- `:class="[]"` 會自動濾除 `false`, `null`, `undefined`, `''`，很適合搭配條件組合

---

## ✅ 實作範例：結合物件與陣列語法

```js
<template>
  <div :class="['base', isActive && 'active', hasError && 'text-danger']">
    Hello World
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive: true,
        hasError: false,
      };
    },
  };
</script>
```

---

📌 小技巧：多個 class 字串可以寫在同一個三元運算子內，例如：

```html
:class="[isDark ? 'dark-mode text-white' : '']"
```

這份筆記清楚整理了 Vue 中 class 綁定的常見用法與注意事項，推薦搭配實際範例練習以加深理解。
