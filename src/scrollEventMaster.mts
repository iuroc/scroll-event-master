export type ScrollWindowEventMap = {
    bottom: Event
    top: Event
    left: Event
    right: Event
}

export type ScrollHandler<K extends keyof ScrollWindowEventMap> = (event: ScrollWindowEventMap[K]) => void

export default class ScrollEventMaster {
    private handlers: [keyof ScrollWindowEventMap, ScrollHandler<any>][] = []
    private scrollHandler?: (event: Event) => void
    /** 为 true 时所有到达底部事件暂时失效 */
    public bottomLock = false
    /** 为 true 时所有到达顶部事件暂时失效 */
    public topLock = false
    /** 为 true 时所有到达最左侧暂时失效 */
    public leftLock = false
    /** 为 true 时所有到达最右侧事件暂时失效 */
    public rightLock = false
    /** 上次滚动条的水平位置 */
    private lastScrollX: number = 0
    /** 上次滚动条的垂直位置 */
    private lastScrollY: number = 0
    public bottomOffset = 20
    public topOffset = 20
    public leftOffset = 0
    public rightOffset = 0
    public constructor(private target: HTMLElement | Window) { }

    /** 新增事件处理程序 */
    public on<K extends keyof ScrollWindowEventMap>(type: K, handler: ScrollHandler<K>) {
        this.handlers.push([type, handler])
        this.updateScrollHandler()
    }

    /** 用于更新原生 `scroll` 监听事件 */
    private updateScrollHandler() {
        if (this.scrollHandler) this.target.removeEventListener('scroll', this.scrollHandler)
        this.scrollHandler = (event) => {
            const info = this.getScrollInfo()
            this.handlers.forEach(([type, handler]) => {
                switch (type) {
                    case 'bottom':
                        if (this.bottomLock || info.scrollY == this.lastScrollY) return
                        if (info.height - (info.scrollY + info.clientHeight) <= this.bottomOffset)
                            handler(event)
                        break
                    case 'top':
                        if (this.topLock || info.scrollY == this.lastScrollY) return
                        if (info.scrollY <= this.topOffset)
                            handler(event)
                        break
                    case 'left':
                        if (this.leftLock || info.clientWidth == info.width || info.scrollX == this.lastScrollX) return
                        if (info.scrollX <= this.leftOffset)
                            handler(event)
                        break
                    case 'right':
                        if (this.rightLock || info.clientWidth == info.width || info.scrollX == this.lastScrollX) return
                        if (info.width - (info.scrollX + info.clientWidth) <= this.rightOffset)
                            handler(event)
                        break
                }
            })
            this.lastScrollX = info.scrollX
            this.lastScrollY = info.scrollY
        }
        this.target.addEventListener('scroll', this.scrollHandler)
    }

    /** 获取滚动条信息 */
    private getScrollInfo(): {
        /** 滚动条水平位置 */
        scrollX: number
        /** 滚动条垂直位置 */
        scrollY: number
        /** 滚动区域总宽度 */
        width: number
        /** 滚动区域总高度 */
        height: number
        /** 滚动区域可见宽度 */
        clientWidth: number
        /** 滚动区域可见高度 */
        clientHeight: number
    } {
        if (this.target instanceof Window)
            return {
                scrollX: this.target.scrollX,
                scrollY: this.target.scrollY,
                width: document.body.offsetWidth,
                height: document.body.offsetHeight,
                clientWidth: window.innerWidth,
                clientHeight: window.innerHeight
            }
        return {
            scrollX: this.target.scrollLeft,
            scrollY: this.target.scrollTop,
            width: this.target.scrollWidth,
            height: this.target.scrollHeight,
            clientWidth: this.target.clientWidth,
            clientHeight: this.target.clientHeight
        }
    }

    /** 清除事件处理程序 */
    public off(handler: ScrollHandler<any>) {
        this.handlers = this.handlers.filter(item => item[1] != handler)
        this.updateScrollHandler()
    }
}