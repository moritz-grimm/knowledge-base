import { type ReactNode, useEffect, useState } from "react";

type LastUpdatedResponse = {
    lastUpdated: string,
};

function useLastCommitDate(): string | null {
    const [date, setDate] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDate(): Promise<void> {
            const res = await fetch("https://api.moritz-grimm.dev/last-updated/knowledge-base");
            const data = await res.json() as LastUpdatedResponse;
            setDate(data.lastUpdated);
        }

        void fetchDate();
    }, []);

    return date;
}

export default function LastUpdated(): ReactNode {
    const date = useLastCommitDate();

    if (!date) {
        return null;
    }

    return (
        <div className="footer__last-updated">
            Last updated: {date}
        </div>
    );
}
