import React from "react";

export const SayPhonetic = (phonetics , escapeDigits,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Say Phonetic</strong>
                </>
            ),
            label : 'SayPhonetic',
            phonetics : phonetics,
            escapeDigits : escapeDigits,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default SayPhonetic