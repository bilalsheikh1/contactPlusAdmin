import React from "react";

export const GetSay = (timeout , maxDigit,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: 'GEt Say',
            label : 'GetSay',
            timeout : timeout,
            maxDigit : maxDigit,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default GetSay