import React from "react";

export default function Input({children,...props}){
    return (
        <input{...props}>{children}</input>
    )
}