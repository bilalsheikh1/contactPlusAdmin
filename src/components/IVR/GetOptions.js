import React from "react";

export const GetOption = (timeout , escapeDigits,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Get Option</strong>
                </>
            ),
            label : 'GetOption',
            timeout : timeout,
            escapeDigits : escapeDigits,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default GetOption