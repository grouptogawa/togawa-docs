# 事件定义

在 Umiri 中，总线只对其传递的事件约束一个 `getType()` 方法：

```typescript
export interface IUmiriEvent {
  getType(): number[];
}
```

::: tip
使用静态的 `getType()` 方法可以避免在事件处理流程中产生实例化开销，Umiri 会优先调用静态的 `getType()` 方法。
:::

携带了 `getType()` 方法的对象就可以被视作是一个事件，`getType()` 方法返回的数组会被作为事件的**类型标识**。

在事件的处理流程中，总线会根据一个事件的类型标识来分配对应的处理器。

每一个事件可以有多个类型标识，处理器也可以同时对多个类型的事件进行处理。

推荐使用枚举来定义事件类型标识：

```typescript
enum EventType {
  MESSAGE_EVENT = 100,
  FRIEND_MESSAGE,
  GROUP_MESSAGE,
}
```

然后通过类来定义事件：

```typescript
class FriendMessageEvent {
  // Umiri 会优先调用可能存在的静态方法以避免产生实例化开销
  static getType(): EventType[] {
    return [EventType.MESSAGE_EVENT, EventType.FRIEND_MESSAGE];
  }

  getType(): EventType[] {
    return [EventType.MESSAGE_EVENT, EventType.FRIEND_MESSAGE];
  }
}
```

你可以根据自己的需求任意定义事件的结构，比如添加 UUID 作为事件的唯一标识。

```typescript
class UniqueEvent {
  uuid: string = Crypto.randomUUID();

  getType(): EventType[] {
    return [EventType.MESSAGE_EVENT];
  }
}
```

:::tip
你可能会想到，只通过整数数组来标识事件的类型虽然简单，但是在某些场景下事件的类型标识很有可能会冲突。

Umiri 本身不会对事件的类型标识进行校验，毕竟它只是一个事件总线（

如果你发现你的项目可能存在这样的风险，你可以试试这些思路：

- 可能的话，直接约定事件类型的标识范围是最简单的解决方案。
- 使用一个全局的类型标识分配器来注册事件类型标识而不是枚举，为每种事件类型分配一个唯一的整数标识。
- 直接想个方法把字符串编码成整数当然也不是不行，确实能大幅降低事件类型标识的冲突概率。

Uika 中实现了一个类型标识注册器，你懒得想的话也可以直接用这个。
:::
