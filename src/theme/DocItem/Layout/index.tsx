import React, { type ReactNode } from "react";
import Layout from "@theme-original/DocItem/Layout";
import type LayoutType from "@theme/DocItem/Layout";
import type { WrapperProps } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import NotTranslatedBanner from "./NotTranslatedBanner";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
    const currentLocale = useDocusaurusContext().i18n.currentLocale;
    const metadata = useDoc().metadata;

    const isUntranslated = currentLocale === "de" && !metadata.source.startsWith("@site/i18n/de");

    return (
        <>
            {isUntranslated && <NotTranslatedBanner />}
            <Layout {...props} />
        </>
    );
}
