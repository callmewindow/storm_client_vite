// 声明全局类型和变量

// 将qs暴露出来，这样可以不用下载ts下的qs了
declare module 'qs'

// 默认会将 xx.d.ts 类型文件中的类型注册成全局的
// 例如interface type

// 用户信息接口
// 此时等同于declare interface
interface UserInfo {
  token: string
  name: string
  age: number
  isAdmin: boolean
  avatar: string
}

// 提示栏选项
// 问号表示非必需
interface SnackbarOption {
  display?: boolean
  content: string
  color: string
}


// interface和type都可用于声明类型
// 但type不是真正的类型，只是一个别名，interface是内置的真正的借口，有真实效果
// type可以针对任何类型，interface只能针对对象

// type可以对基本类型、联合类型、交叉类型、元组进行声明
// 但type继承时需要通过交叉类型的&符号来进行

// interface在其他语言也存在，例如extend和implement均通用
// 并且interface会自动合并重名接口


// 但对于一些变量，需要显式使用declare才行
// 日期格式化类型
declare enum DateFormats {
  YMD = 'Y-m-d',
  YMDHIS = 'Y-m-d H:i:s',
  _YMD = 'Y年m月d日',
  _YMDHIS = 'Y年m月d日 H时i分s秒'
}
