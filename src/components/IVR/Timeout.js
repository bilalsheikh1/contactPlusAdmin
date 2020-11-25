import React from "react";

export const Timeout = ( data ,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>TimeOut</strong>
                </>
            ),
            label : 'TimeOut',
            data : data,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default Timeout