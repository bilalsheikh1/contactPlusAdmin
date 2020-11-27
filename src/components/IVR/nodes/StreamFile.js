import React from "react";
import {Handle} from "react-flow-renderer";

const customNodeStyles = {
    background: '#fff',
    borderColor: '#0041d0',
    borderRadius: '3px',
    padding: '10px',
    width: '150px',
    color: '#222',
    textAlign: 'center',
    borderWidth: '1px',
    borderStyle: 'solid'
};

export default function ({data}) {
    return (
        <div style={customNodeStyles}>
            <Handle type="target" position="top" style={{ padding: 5, borderRadius: 0 }} />
            <small>{'streamFile'}</small>
            <div>{data.text}</div>
            <small>file: {data.file}</small>
            {[...Array(data.outputs)].map((value, index, array) => {
                const styles = index % 2 ? {left: 100 - index*10 + '%', borderRadius: 0} : {left: index*10 + 10 + '%', borderRadius: 0}
                return <Handle
                    key={data.text + index}
                    type="source"
                    position="bottom"
                    id={data.text + index}
                    style={{...styles, padding: 5}}
                />
            })}
        </div>
    )
}