# 事件处理

在 Umiri 中，处理器是一个符合如下约束的对象：

```typescript
export type EventHandler<T extends IUmiriEvent = IUmiriEvent> = {
  targets: number[];
  priority: number;
  block: boolean;
  timeout: number;
  handle: (event: T) => Promise<boolean>;
};
```

其中：

- `targets`：处理器所处理的事件类型标识数组。
- `priority`：处理器优先级，数值越大优先级越高。
- `block`：是否阻止更低优先级上的处理器的执行。
- `timeout`：超时时间，单位为毫秒，默认值为 0 表示不超时。
- `handle`：事件处理函数，返回一个 Promise 表示处理是否成功。

虽然你想手搓处理器对象也是可以的，毕竟它的结构很简单，不过我会更推荐使用 Umiri 提供的 `on()` 函数来构建处理器。

`on()` 是一个构建器，它接受任意数量的事件类型（构造器）作为参数，返回一个链式构建器对象。

假设现在有 `EventA` 和 `EventB` 两个事件类型，要用 `on()` 函数来构建一个处理这两种事件的处理器，可以这样写：

```typescript
const handler = on(EventA, EventB)
  .block(true)
  .handle(async (event) => {
    // ...
    return true;
  }
  .build());
```

此时 `event` 会被自动推断成 `EventA | EventB`，你可以在 `handle()` 函数中根据 `event` 的类型来进行处理。

::: tip 注意
`on()` 接收的是事件类型（构造器），而不是事件实例。
:::

`on()`的链式调用可以设置的属性有：

```typescript
priority(val: number) // 设置处理器优先级，默认值为 0
timeout(val: number) // 设置超时时间，默认值为 0 表示不超时
block(val: boolean) // 设置是否阻止更低优先级上的处理器的执行，默认值为 false
handle(fn: (event: T) => Promise<boolean>) // 设置事件处理函数
```

::: tip
`handle()` 总是应该在调用链的最后一个，因为包含 `build()` 的可构建对象只会由 `handle()` 方法返回（而且这个对象除了 `build()` 也没别的方法）。

调用 `build()` 方法后，会返回一个**冻结**的处理器对象，这之后就不能再修改它的属性了。
:::
