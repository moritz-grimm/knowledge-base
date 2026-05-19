import type { ReactNode } from "react";

export default function NotTranslatedBanner(): ReactNode {
    return (
        <>
            <div className="theme-admonition theme-admonition-info admonition_xJq3 alert alert--info">
                <div className="admonitionHeading_Gvgb">
                    <span className="admonitionIcon_Rf37">
                        <svg viewBox="0 0 14 16">
                            <path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z">
                            </path>
                        </svg>
                    </span>
                    info
                </div>
                <div className="admonitionContent_BuS1">
                    <p>Diese Seite wurde noch nicht ins Deutsche übersetzt</p>
                </div>
            </div>
        </>
    );
}
