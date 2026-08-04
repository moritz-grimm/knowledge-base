import type { ReactNode } from "react";
import Admonition from "@theme/Admonition";

export default function NotTranslatedBanner(): ReactNode {
    return (
        <Admonition type="info" >
            <p>Diese Seite wurde noch nicht ins Deutsche übersetzt</p>
        </Admonition>
    );
}
