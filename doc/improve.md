# Vue3+Vite+TS+Scss+Vuetify3+Pinia+Axios+VueUse

## 1、创建项目

考虑速度推荐使用pnpm，npm全局安装pnpm如下

```bash
npm install -g pnpm
```

但由于后续的测试内容，pnpm和npm的混用容易导致包管理器的混合出现问题，因此暂时继续使用npm进行依赖包的管理

npm创建基于vite的vue3+ts项目
推荐使用第一种方案，有关选项可自行选择
```bash
npm init vite@latest approaching_storm
npm init vite@latest approaching_storm -- --template vue-ts
```

这里注意刚安装项目后，进入vscode工作目录可能出现，import时可能会出现报错的情况
这是因为默认可能系统环境中已有ts依赖，但当前工作目录暂未安装ts

此时可以自行安装ts或在后续vuetify的安装中也会自行安装适配的ts依赖


## 2、UI库安装

抉择后选择Vuetify，material设计风格真的太好看了，他真的我哭死

但pnpm貌似还没有vuetify库，暂时只能yarn或npm安装

```bash
npm install vuetify
```

这里注意vuetify由于不属于常规英文单词，可能出现较多的波浪线显示情况，此时可通过增加一些单词限定来实现规避

解决方案：

为提高UI美化还需安装material design icon的库，这里选择基于js的svg类图标依赖

这里不安装也可以通过vuetify的v-icon进行图标的显示，但是没有那么灵活

原因：

```bash
npm install @mdi/js
```

安装后还须在main.ts进行有关依赖的引入

### Sass能力

引入sass样式表的强大能力
vite创建的项目已经自带sass-loader，因此只需要安装sass即可

```bash
npm install sass
```

这里注意，因为创建时是基于vite的，因此可能会出现需要新增一些配置文件来处理的情况
例如缺乏plugins下的vuetify.ts文件，用于应用内容、图标。

此时推荐npm init vuetify，参考vuetify自己的项目架构进行调整


## 3、引入项目基础能力

### router路由

提供路由配对能力，进而可结合进行url参数的解析匹配能力

```bash
npm i vue-router@latest
```

路由推荐文件位置：/src/router/index.ts

### require引用能力

require可以便捷的基于相对路径进行图片、文件的引用

```bash
npm i @types/node
```

### axios请求处理能力

基于axios进行http请求的处理，推荐使用有关代码进行封装，有助于后续使用

``` bash
npm i axios
```

### pinia状态管理能力

可借助pinia实现vuex的全局信息存储与同步能力，有助于前端信息的同步处理

```bash
npm i pinia
```

为使pinia具备持久化存储的能力，从而避免对LocalStorage的直接访问，简化操作
安装pinia插件实现持久化存储

```bash
npm i pinia-plugin-persist
```

## 重要情况说明
Vuetify真的太强了

强烈推荐直接基于vuetify的初始化项目进行创建

创建时可进行依赖的选择，可以在创建项目之后自动配置好如下内容：
vuetify、pinia、router、type/node等等

剩余内容还需要进行手动下载

对于sass，虽然已经存在sass-loader，但是还需要sass才能正常处理有关文件

### 引用VueUse便捷能力

提供黑盒函数，具备了很多常见能力

```bash
npm i @vueuse/core
```



### qs库学习字符串解析

```bash
npm i qs
```

但注意，qs直接安装无法被ts识别，因此需要安装ts版本的qs

但注意，为了避免vite在运行监测时找不到qs，最好还是再安装一个qs

```bash
npm i --save-dev @types/qs
```



如果觉得下载两个库比较麻烦，可以只安装qs，然后在src目录下新建一个d.ts，即declare ts文件

然后在其中声明qs包即可，具体如下：

``` typescript
declare module 'qs'
```



### 图标引用

如果希望在使用图标时不增加mdi-的表示，可以下载某依赖，如下

```bash
npm install material-design-icons-iconfont -D
```

具体引用方式需要参考：https://vuetifyjs.com/en/features/icon-fonts/

但注意这样可能会导致一些规范上的不统一，例如某些库中图标的分隔符是-，而该库是_，比较不同，这里为了保持规范，仍然选择了mdi/font库



vue3项目学习

Vue3+Vite+TS+Scss+Vuetify3+Pinia+Axios+VueUse

| 内容    | 0310进度                                       | 0311进度                                                     | 后续计划                                                   |
| ------- | ---------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Vue3    | 新版路由交互策略                               | 组合式开发代码的编写，进行组件的编写和使用，ref，reactive等函数的意义，页面标题和图标的调整（lolipop，官网） | 实现部分之前的组件，搭建部分内容                           |
| vite    | 项目初始化、依赖安装与运行                     | 了解vite下module的声明和使用                                 | 项目打包与上线，全局引用ref等内容，减少代码量（网络）      |
| ts      | 基础使用                                       | 接口定义、类型定义（网络、Alight）                           | ES6、ts特点、复杂类型的声明和使用                          |
| sass    | 创建全局、本地css变量并使用                    | 实现样式的打包，作为总控进行不同模式的切换；优化全局配置（Lolipop） | 复习for循环结合脚标的style定义，了解deep参数，学习高级用法 |
| vuetify | 内容引用，新版组件结构的学习                   | 了解图标、主题的基础使用方式，复习部分组件内容（官网）       | 搭建警告栏、带参数页脚组件                                 |
| router  | 组件的嵌套路由、路径设定与便捷引用             | 实现页面下某小块区域的组件按需切换能力，设立router的路由守卫，进行重复路由的检测避免异常（vue2，beacon_client） | 基于path进行参数的传递与接受                               |
| axios   | 复习了axios的请求发放、跨域处理、api结构       | 结合类型转化优化api代码，对axios请求进行try-catch模拟（各vue2，网络） | 对promise对象进一步了解                                    |
| pinia   | 实现了存储对象的创办、数据定义、监听与函数能力 | 学习对pinia的使用并总结（网络）                              | 了解persist和不持久的区别                                  |
| vueuse  | 仅仅安装                                       |                                                              | 按需对部分能力进行接入使用（官网）                         |

更多需学习内容：

echarts初步了解，ts组件库进行学习（总结组件的内部逻辑）、docker打包、

