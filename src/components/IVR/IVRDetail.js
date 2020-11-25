import React from "react";

export const answer = () =>
{
    return(  {
        id: "2",
        type: 'default',
        data: {
            text: (
                <>
                    <strong>Answer</strong>
                </>
            ),
            label : 'answer'
        },
        position: {x: 150, y: 50},
    })
}

export const StreamFile = (fileName) =>
{
    return({
        id: "3",
        type: 'special',
        data: {
            text: (
                <>
                    <strong>Stream File</strong>
                </>
            ),
            label : 'StreamFile',
            fileName : fileName
        },
        position: {x: 150, y: 50},
    })
}