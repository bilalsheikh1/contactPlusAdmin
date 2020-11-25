import React from "react";

export const SayNumber = (number , escapeDigits,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Say Number</strong>
                </>
            ),
            label : 'SayNumber',
            number : Number,
            escapeDigits : escapeDigits
        },
        position: {x: 150, y: y},
    })
}

export default SayNumber