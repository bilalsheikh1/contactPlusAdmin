import React from "react";

export const HangUp = ( channelName,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>HangUp</strong>
                </>
            ),
            label : 'HangUp',
            channelName : channelName,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default HangUp