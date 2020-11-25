import React from "react";

export const SayDateTime = (time , escapeDigits,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Say DateTime</strong>
                </>
            ),
            label : 'SayDateTime',
            time : time,
            escapeDigits : escapeDigits,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default SayDateTime