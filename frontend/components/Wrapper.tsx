import clsx from "clsx";
import React from "react"


const Wrapper = ({children,  className}: {children: React.ReactNode, className?:string}) => {
    return(
        <>
            <div className={clsx("p-12 md:px-16", className)}>
                {children}
            </div>
        </>
    )
}

export default Wrapper;