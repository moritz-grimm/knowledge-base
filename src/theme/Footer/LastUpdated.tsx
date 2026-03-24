import React, { type ReactNode, useEffect, useState } from "react";
import type { Endpoints } from "@octokit/types";

type Commits = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];
const CACHE_KEY = "lastCommitDate";
const CACHE_TIME_KEY = "lastCommitDateCachedAt";
const CACHE_TTL = 86400000; // 24h

function useLastCommitDate(): string | null {
    const [date, setDate] = useState<string | null>(null);

    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        const cachedAt = localStorage.getItem(CACHE_TIME_KEY);

        if (cached && Date.now() - Number(cachedAt) < CACHE_TTL) {
            setDate(cached);
            return;
        }

        fetch("https://api.github.com/repos/moritz-grimm/knowledge-base/commits")
            .then((res) => res.json())
            .then((commits: Commits) => {
                const commitDate = commits[0]?.commit?.committer?.date?.split("T")[0] ?? null;

                if (commitDate) {
                    localStorage.setItem(CACHE_KEY, commitDate);
                    localStorage.setItem(
                        CACHE_TIME_KEY,
                        String(Date.now())
                    );
                    setDate(commitDate);
                }
            })
            .catch(() => {
                setDate("Unknown");
            });
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
