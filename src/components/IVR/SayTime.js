import React from "react";

export const SayTime = (time , escapeDigits,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Say Time</strong>
                </>
            ),
            label : 'SayTime',
            time : time,
            escapeDigits : escapeDigits,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default SayTime