
📦 **Installation**
``` javascript
npm install stretch-resize
```
🔨 **Usage**
> Note: `import "stretch-resize/lib/index.css"`

see demo

📦 **Description**

调整元素的宽高

🖥 **Props**

| Name        | Type                                                             | Default value         | Description               |
| ----------- | ---------------------------------------------------------------- | --------------------- | ------------------------- |
| className   | string                                                           |                       | 类名称                    |
| style       | CSSProperties                                                    |                       | 内联样式                  |
| is          | string                                                           | div                   | 最外面包裹的元素默认是div |
| minSize     | number \| Partial&lt;MinSize>                                    | {width: 0, height: 0} | 宽度和高度的最小值        |
| type        | "top" \| "bottom" \| "left" \| "right" \| ResizeType\[] \| "all" | all                   | 哪些边允许调整            |
| onResizeEnd | (rect: DOMRect) => void                                          |                       | 调整尺寸完成后的回调      |

    