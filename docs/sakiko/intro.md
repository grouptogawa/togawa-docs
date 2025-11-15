# Sakiko 是什么？

Sakiko 是一个轻量化、可拓展的现代聊天机器人框架，致力于提供简单易用清爽的 API，让开发者能够不用为框架本身的复杂而烦恼，快速面向各种需求进行开发。

🚧 注意：Sakiko 目前仍在重构中。

## ⚡ 特性

- **类型友好**：使用 TypeScript 开发，类型支持完善。
- **轻量级**：超轻！不做多余的事情，只用一个 `Sakiko` 对象作为入口。
- **可拓展**：一切都是插件，开发者可以根据需求自由的组合和扩展功能。
- **异步优先**：基于优先级机制的异步并发事件处理，减少对主线程的阻塞。
- **跨平台**：都有插件了这还不是手到擒来？

## 🌳 生态

| 项目名称                                                    | 描述                         |
| ----------------------------------------------------------- | ---------------------------- |
| [sakiko](https://github.com/grouptogawa/sakiko)（重构中）   | 聊天机器人框架               |
| [umiri](https://github.com/grouptogawa/umiri)               | 基于优先级机制的事件总线实现 |
| [uika](https://github.com/grouptogawa/uika)（未完成）       | 可选的高级功能扩展           |
| [mutsumi](https://github.com/grouptogawa/mutsumi)（未完成） | 多功能命令解析器             |

## 🚀 快速开始

见 [快速开始](/sakiko/quick-start)。

## ❓ 我为什么要选择 Sakiko？

社区中的聊天机器人框架很多，每个框架都有自己的使用场景，而 Sakiko 是为了追求轻量可控的开发体验设计的，这意味着：

- Sakiko 除了消息收发处理之外的功能非常有限，大部分高级功能都被拆分了到其他的模块或插件里
- Sakiko 永远不会直接提供 Web 面板这类的功能，这实在是太重了，对于 Sakiko 这个项目而言是不可接受的
- Sakiko **不适合完全没有开发经验的人使用**，你至少需要对 JavaScript / TypeScript 有最基础的了解
- Sakiko 不规定你要怎么设计和组织代码，只要能跑就是好代码，但是相应的，如果你写出来了超级巨大 💩 山，这和我们没有关系.jpg

如果你并不喜欢这样的设计，我更推荐你使用其他的聊天机器人框架，写这种东西如果不能让自己开心就实在是亏本了。

如果你已经被吓跑了的话，这里放一个指路牌：

### JavaScript / TypeScript

- [Koishi](https://koishi.chat/) 几乎是 JavaScript / TypeScript 生态里最好用的聊天机器人框架，虽然 Sakiko 的诞生就是因为开发者不喜欢它过重的设计，但是这不影响它强大又好用，还有成熟的社区生态，适合大多数开发者

### Python

- [NoneBot2](https://nonebot.dev/) 是 Python 生态里最流行的聊天机器人框架，设计非常优秀，插件生态丰富，把 Python 的语言特性利用到了极致，<s>Sakiko 嗯抄了很多 NoneBot 的设计</s>

### Go

- [ZeroBot](https://github.com/wdvxdr1123/ZeroBot) 很好用，也是 Go 生态里最成熟的聊天机器人框架
