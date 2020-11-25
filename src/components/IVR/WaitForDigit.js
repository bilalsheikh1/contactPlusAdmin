import React from "react";

export const WaitForDigit = (timeout , channelName,totalNumOfOutputs, y) =>
{
    return({
        id: Date.now(),
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Get WaitForDigit</strong>
                </>
            ),
            label : 'WaitForDigit',
            timeout : timeout,
            channelName : channelName,
            totalNumOfOutputs
        },
        position: {x: 150, y: y},
    })
}

export default WaitForDigit