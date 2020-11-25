import React from "react";

export const SayDigits = (number , escapeDigits,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Say Digits</strong>
                </>
            ),
            label : 'SayDigits',
            number : Number,
            escapeDigits : escapeDigits,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default SayDigits