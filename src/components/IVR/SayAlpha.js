import React from "react";

export const SayAlpha = (Number , escapeDigits, totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Say Alpha</strong>
                </>
            ),
            label : 'SayAlpha',
            Number : Number,
            escapeDigits : escapeDigits,
            totalNumOfOutputs
        },
        position: {x: 150, y: y}
    })
}

export default SayAlpha