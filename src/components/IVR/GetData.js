import React from "react";

export const GetData = (timeout , maxDigits, totalNumOfOutputs,file , y) =>
{

    return({
        id:  Date.now(),
        type: 'special',
        data: {
            text: 'Get Data',
            label : 'GetData',
            timeout : timeout,
            maxDigits : maxDigits,
            totalNumOfOutputs: totalNumOfOutputs,
            file
        },
        position: {x: 150, y: y},
    })
}

export default GetData