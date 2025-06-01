"use client";

import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}

export default Provider;
