import React from "react";

export const SayDate = (timeOut , maxDigits,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Say Date</strong>
                </>
            ),
            label : 'SayDate',
            timeOut : timeOut,
            maxDigits : maxDigits,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default SayDate