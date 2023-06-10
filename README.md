# 丰羽笔记

## 1 需求的发散与收敛

### 发散阶段

3 个关键点：层层分解，上层概况下次，同层独立穷尽  
5 个维度：功能，性能，场景，API，设计约束

### 收敛阶段

3 个关键：重要性，复杂度，影响面

步骤

1. 筛选整合
2. 优先级排序
3. 划定边界
4. 确定可行性

## 2 模块拆分与封装

强调对外交付的接口易用，屏蔽模块内部的巨大复杂度

### 外部

1. 职责单一
2. 接口满足 solid

### 内部

1. 分层分治
2. 层与层节藕

### 抽象

1. 提炼不变的逻辑

### 封装

1. 整体
2. 增强安全性与简化编程
3. 核心是数据隐藏（但不是目的）
4. 提供公共方法、公共配置对其访问

## 3 API 设计

> solid

1. s/职责单一原则/只做一件事
2. o/开闭原则/不修改现有代码的基础上拓展功能
3. d/依赖倒置原则/模块不直接依赖另一个模块的细节，而是共同依赖定义明确的接口

> 拓展机制
>
> > 如 中间件、插件、mock uuid

1. 开发增加
2. 共建生态

> 收敛 API 集
> 暴露的接口要克制
> 版本控制

## 4 0603 作业

1. 输出思维导图
2. 输出 API 设计 和 DEMO 示例

## 5 逻辑解耦

将纠缠的逻辑分开，提高可测试性、拓展性

### 步骤

1. 识别变与不变（易变流程、不变流程）
    1. 易变：依赖实现方案的、依赖需求的、需要不断优化与改变的
    2. 不变：与具体业务无关的
2. 分离
    1. 将其分别实现为独立模块、函数
3. 制程与生产
    1. 制程阶段：确定生产阶段的各种参数（配置中间层）
    2. 生产阶段：根据上述参数加工
    3. 将易变步骤由变量定义，做到可运行时改变

## 6 代码健壮

### 6.1 异常处理

#### 契约式编程

前置的类型检查与后置的输出处理

#### 进攻式编程

在代码中预测并处理错误，保证正常执行，并适当提示错误

#### 防御式编程

进行边界检查、错误处理、异常处理；加入错误处理机制，保护代码免受非预期输入或外部条件的影响

### 6.2 日志处理

#### 目标

再现程序执行结果

#### 日志五元组

时间、模块、对象、事件、结果

#### 级别

1. trace 实时调试日志
2. debug 调试日志
3. info 信息
4. warn 告警 （五元组 + 建议）
5. error 错误 （五元组 + 建议）

## 7 封装

> 从使用者的角度去衡量 易于维护

### 7.1 避免强行封装

定义良好的输入和输出；考虑变化的来源，找到变化，定什么是可以封装的

### 7.2 避免破坏封装

经受不住诱惑，往封装好的里面加入奇怪逻辑，变得不通用  
可以考虑增加一层中间层（二次封装）  
可以考虑再写一个方法

## 8 0610 作业

1. 完成作业，完善拆分与封装技巧，提高模块可拓展性、可复用性
2. 完成异常处理、日志，提高健壮性
3. 补充单测
4. 重构一坨狗屎

``` js
// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
function uploadByFtp (file: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
}
function uploadBySftp (file: string[], cb: (ret: boolean) => void): void {
    cb(true)
}
function uploadByHttp (file: string): boolean {
    return true
}

// 实现如下
function upload (files: string[]): Promise<boolean> {
    return Promise.all(files.filter(file => {
        const ext = file.match(/\.(\w+)$/)[1]
        if (ext !== 'txt' && ext !== 'ext' && ext !== 'doc') {
            return false
        }
        return true
    }).map(file => {
        const ext = file.match(/\.(\w+)$/)[1]
        if (ext === 'txt') {
            return uploadByFtp(file)
        } else if (ext === 'exe') {
            return new Promise((resolve, reject) => {
                uploadBySftp([file], ret => {
                    if (ret) {
                        resolve(true)
                    } else {
                        reject()
                    }
                })
            })
        } else if (ext === 'doc') {
            return Promise.resolve(uploadByHttp(file))
        }
    })).then(() => {
        console.log('upload success.')
        return true
    })
}
```
