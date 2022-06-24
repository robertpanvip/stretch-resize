import * as React from 'react';
import StretchResize from "../src";
/***
 *
 * @constructor
 */
export default function App(): React.ReactElement<HTMLElement> {
    return (
        <div className="app">
            <StretchResize
                style={{
                    border: '1px solid',
                    width:500,
                    height:500,
                }}
            >
                <div style={{
                    border: '1px solid',
                    width:200,
                    height:200,
                    pointerEvents:'none'
                }} />
            </StretchResize>
        </div>
    )
}
