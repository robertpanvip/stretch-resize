
ð¦ **Installation**
``` javascript
npm install stretch-resize
```
ð¨ **Usage**
> Note: `import "stretch-resize/lib/index.css"`

see demo

ð¦ **Description**

è°æ´åç´ çå®½é«

ð¥ **Props**

| Name        | Type                                                             | Default value         | Description               |
| ----------- | ---------------------------------------------------------------- | --------------------- | ------------------------- |
| className   | string                                                           |                       | ç±»åç§°                    |
| style       | CSSProperties                                                    |                       | åèæ ·å¼                  |
| is          | string                                                           | div                   | æå¤é¢åè£¹çåç´ é»è®¤æ¯div |
| minSize     | number \| Partial&lt;MinSize>                                    | {width: 0, height: 0} | å®½åº¦åé«åº¦çæå°å¼        |
| type        | "top" \| "bottom" \| "left" \| "right" \| ResizeType\[] \| "all" | all                   | åªäºè¾¹åè®¸è°æ´            |
| onResizeEnd | (rect: DOMRect) => void                                          |                       | è°æ´å°ºå¯¸å®æåçåè°      |

    