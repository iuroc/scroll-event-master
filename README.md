# Scroll Event Master

用于在 Web 页面中监听滚动事件，可检测到达顶部、底部、最左侧和最右侧的情况，并允许自定义处理程序。

## 安装

```bash
npm i scroll-event-master
```

## 快速开始

```typescript
import ScrollEventMaster from "scroll-event-master";

const element = document.querySelector(".box");
const manager = new ScrollEventMaster(element as HTMLDivElement);

manager.on("bottom", () => {
  console.log("到底了");
});

manager.on("top", () => {
  console.log("到顶了");
});

manager.on("left", () => {
  console.log("到最左了");
});

manager.on("right", () => {
  console.log("到最右了");
});
```

## 事件锁定

ScrollEventMaster 通过 `topLock`、`bottomLock`、`leftLock` 和 `rightLock` 实现事件锁定，当值为 `true` 时，对应方向的到达事件处理程序将不可用，值恢复 `false` 时事件处理程序也会恢复。

## 方法说明

- 新增事件处理程序，`type` 可取值 `top` | `bottom` | `left` | `right`

  ```typescript
  export type ScrollWindowEventMap = {
    bottom: Event
    top: Event
    left: Event
    right: Event
  }
  export type ScrollHandler<K extends keyof ScrollWindowEventMap> = (event: ScrollWindowEventMap[K]) => void

  public on<K extends keyof ScrollWindowEventMap>(type: K, handler: ScrollHandler<K>): void {}
  ```

- 清除事件处理程序
  ```typescript
  public off(handler: ScrollHandler<any>): void {}
  ```
