import clsx from "clsx";
import React from "react"


const Wrapper = ({children,  className}: {children: React.ReactNode, className?:string}) => {
    return(
        <>
            <div className={clsx("px-16 pb-16 pt-32", className)}>
                {children}
            </div>
        </>
    )
}

export default Wrapper;