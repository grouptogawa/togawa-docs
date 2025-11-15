# 注册&发布

Umiri 事件总线的 API 非常简单，实际上就是`register()`、`unregister()`、`publish()` 这三个方法。

## 注册

在 [事件处理](handler.md) 中介绍了处理器的注册方法，这里不再赘述。

得到了处理器对象之后，调用事件总线的 `register()` 方法就可以注册它。

```typescript
const eventBus = new UmiriEventBus();

const handler = on(SomeEvent)
  .handle(async (event) => {
    // 处理事件
    return true;
  })
  .build();

const unregisterHandler = eventBus.register(handler);

unregisterHandler(); // 注销处理器
// or
eventBus.unregister(handler); // 手动注销处理器，和上面的效果是一样的
```

事件总线的 `register()` 方法会返回这个处理器对应的注销函数，调用它就可以直接注销对应的处理器。

事件总线的 `unregister()` 方法也可以单独调用，但是需要传入要注销的处理器对象实例，显然并不是很适合直接拿来用。

## 发布

事件总线的 `publish()` 方法可以发布一个符合 `IUmiriEvent` 约束的事件实例。

```typescript
const event = new SomeEvent();

await eventBus.publish(event); // 发布事件
```

发布行为是异步的，会返回一个 **Promise\<void\>**，当所有处理器都处理完成后 resolve，或者有任意一个处理器返回 `false` 时 reject。

事件被发布之后的处理流程如下：

- 获取这个事件的优先级，从事件总线维护的 `优先级->类型标识->处理器` 映射里收集可用的优先级映射。
- 如果没有收集到任何可用的优先级映射，直接跳出处理流程。
- 然后根据事件的类型标识，从每个优先级映射里收集可用的处理器。
- 如果没有收集到任何可用的处理器，直接跳出处理流程。
- 从最高的优先级开始处理，以从高到低的顺序处理各个优先级中的处理器
- 在一个优先级中，会并发执行这个优先级里所有可用的处理器，并等待所有处理器处理完成，同时会对启用了 timeout 参数的处理器进行超时控制。
