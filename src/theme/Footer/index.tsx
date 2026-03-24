import React, { type ReactNode } from "react";
import Footer from "@theme-original/Footer";
import type FooterType from "@theme/Footer";
import type { WrapperProps } from "@docusaurus/types";
import LastUpdated from "./LastUpdated";

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
    return (
        <div className="footer-wrapper">
            <Footer {...props} />
            <LastUpdated />
        </div>
    );
}
