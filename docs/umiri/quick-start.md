---
title: 快速开始
---

# 快速开始

## 安装

::: code-group

```bash [npm]
npm install @grouptogawa/umiri
```

```bash [yarn]
yarn add @grouptogawa/umiri
```

```bash [pnpm]
pnpm add @grouptogawa/umiri
```

```bash [bun]
bun add @grouptogawa/umiri
```

:::

## 使用示例

```typescript [TypeScript]
import { UmiriEventBus, on } from "@grouptogawa/umiri";

// 定义事件类型枚举
enum EventType {
  MESSAGE = 100,
  FRIEND_MESSAGE,
  GROUP_MESSAGE,
}

// 定义事件结构
class FriendMessageEvent {
  static getType(): EventType[] {
    return [EventType.MESSAGE, EventType.FRIEND_MESSAGE];
  }
  getType(): EventType[] {
    return [EventType.MESSAGE, EventType.FRIEND_MESSAGE];
  }
}

class GroupMessageEvent {
  static getType(): EventType[] {
    return [EventType.MESSAGE, EventType.GROUP_MESSAGE];
  }
  getType(): EventType[] {
    return [EventType.MESSAGE, EventType.GROUP_MESSAGE];
  }
}

// 创建事件总线实例
const eb = new UmiriEventBus();

// 注册好友消息处理器
const friendHandler = on(FriendMessageEvent)
  .priority(10) // 优先级高的先执行
  .timeout(5000) // 超时控制（ms），默认不超时（0）
  .block(true) // 若处理成功则阻断后续低优先级处理器
  .handle(async (event) => {
    console.log("处理好友消息事件", event);
    return true; // 必须返回 boolean
  })
  .build();

eb.register(friendHandler);

// 注册群消息处理器
const groupHandler = on(GroupMessageEvent)
  .priority(5)
  .handle(async (event) => {
    console.log("处理群消息事件", event);
    return true;
  })
  .build();

eb.register(groupHandler);

// 发布事件
(async () => {
  await eb.publish(new FriendMessageEvent());
  await eb.publish(new GroupMessageEvent());
})();
```
