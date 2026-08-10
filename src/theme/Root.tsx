import React, { type ReactNode } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ChatBot from "@site/src/components/ChatBot";

export default function Root({ children }: { children: ReactNode }): ReactNode {
    return (
        <>
            {children}
            <BrowserOnly>
                {() => <ChatBot />}
            </BrowserOnly>
        </>
    );
}
