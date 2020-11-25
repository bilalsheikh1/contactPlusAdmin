import React from "react";

export const SetVar = (varName , varValue,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Get SetVar</strong>
                </>
            ),
            label : 'GetSetVar',
            varName : varName,
            varValue : varValue,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default SetVar