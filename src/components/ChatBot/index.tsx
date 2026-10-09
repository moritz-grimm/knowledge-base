import React, { useState, useRef, useEffect, useCallback } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

const i18n = {
    en: {
        title: "Assistant",
        placeholder: "Ask a question...",
        send: "Send",
        explainPage: "Explain this page",
        welcome: "Hi! I can help explain the content on this page or answer your questions about it. What would you like to know?",
        noApiKey: "The assistant is not configured yet. Set the GROQ_API_KEY environment variable to enable it.",
        error: "Something went wrong. Please try again.",
        errorRateLimit: "Rate limit reached. Please wait a moment and try again.",
    },
    de: {
        title: "Assistent",
        placeholder: "Stelle eine Frage...",
        send: "Senden",
        explainPage: "Diese Seite erklären",
        welcome: "Hallo! Ich kann den Inhalt dieser Seite erklären oder Fragen dazu beantworten. Was möchtest du wissen?",
        noApiKey: "Der Assistent ist noch nicht konfiguriert. Setze die Umgebungsvariable GROQ_API_KEY, um ihn zu aktivieren.",
        error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
        errorRateLimit: "Rate-Limit erreicht. Bitte warte einen Moment und versuche es erneut.",
    },
};

interface Message {
    role: "user" | "assistant";
    content: string;
}

function getPageContext(): { title: string; content: string } {
    const title = document.title;
    const content = document.querySelector(".theme-doc-markdown")?.textContent?.slice(0, 3000) ?? "";
    return { title, content };
}

const ChatIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

export default function ChatBot(): React.ReactNode {
    const { siteConfig, i18n: docI18n } = useDocusaurusContext();
    const apiKey = siteConfig.customFields?.groqApiKey as string | undefined;
    const locale = (docI18n.currentLocale === "de" ? "de" : "en") as keyof typeof i18n;
    const t = i18n[locale];
    const location = useLocation();

    const [ isOpen, setIsOpen ] = useState(false);
    const [ messages, setMessages ] = useState<Message[]>([]);
    const [ input, setInput ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setMessages([]);
    }, [ location.pathname ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [ messages ]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [ isOpen ]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading || !apiKey) return;

        const userMessage: Message = { role: "user", content: text.trim() };
        const updatedMessages = [ ...messages, userMessage ];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        const { title, content } = getPageContext();

        const systemPrompt = locale === "de"
            ? `Du bist ein hilfreicher Lernassistent für eine Entwickler-Wissensdatenbank. Du hilfst dabei, die Inhalte zu verstehen. Die aktuelle Seite heißt: "${title}". ${content ? `Seiteninhalt: "${content}"` : "Es gibt keinen spezifischen Seiteninhalt."}. Antworte immer auf Deutsch. Erkläre Konzepte klar und verständlich, wie ein guter Lehrer. Halte dich kurz aber gründlich. Verwende Codebeispiele wenn hilfreich.`
            : `You are a helpful teaching assistant for a developer knowledge base. You help users understand the content. The current page is: "${title}". ${content ? `Page content: "${content}"` : "There is no specific page content."}. Always respond in English. Explain concepts clearly as a good teacher would. Be concise but thorough. Use code examples when helpful.`;

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...updatedMessages.map(m => ({ role: m.role, content: m.content })),
                    ],
                    max_tokens: 1024,
                }),
            });

            if (!response.ok) {
                const errorMsg = response.status === 429 ? t.errorRateLimit : t.error;
                setMessages(prev => [ ...prev, { role: "assistant", content: errorMsg } ]);
                return;
            }

            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content ?? t.error;
            setMessages(prev => [ ...prev, { role: "assistant", content: reply } ]);
        } catch (err) {
            console.error("ChatBot API error:", err);
            setMessages(prev => [ ...prev, { role: "assistant", content: t.error } ]);
        } finally {
            setIsLoading(false);
        }
    }, [ apiKey, isLoading, locale, messages, t.error, t.errorRateLimit ]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    }, [ input, sendMessage ]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }, []);

    const handleExplainPage = useCallback(() => {
        const text = locale === "de"
            ? "Erkläre mir den Inhalt dieser Seite."
            : "Explain the content of this page to me.";
        sendMessage(text);
    }, [ locale, sendMessage ]);

    return (
        <div className={styles.wrapper}>
            {isOpen && (
                <div className={styles.window}>
                    <div className={styles.header}>
                        <span className={styles.headerTitle}>{t.title}</span>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close"
                            type="button"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    <div className={styles.messages}>
                        {!apiKey && (
                            <div className={`${styles.message} ${styles.botMessage}`}>
                                {t.noApiKey}
                            </div>
                        )}

                        {apiKey && messages.length === 0 && (
                            <>
                                <div className={`${styles.message} ${styles.botMessage}`}>
                                    {t.welcome}
                                </div>
                                <button
                                    className={styles.quickAction}
                                    onClick={handleExplainPage}
                                    type="button"
                                >
                                    {t.explainPage}
                                </button>
                            </>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`${styles.message} ${msg.role === "user" ? styles.userMessage : styles.botMessage}`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {isLoading && (
                            <div className={`${styles.message} ${styles.botMessage}`}>
                                <span className={styles.loadingDots}>
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {apiKey && (
                        <div className={styles.inputArea}>
                            <textarea
                                ref={inputRef}
                                className={styles.input}
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder={t.placeholder}
                                rows={1}
                                disabled={isLoading}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={() => sendMessage(input)}
                                disabled={isLoading || !input.trim()}
                                aria-label={t.send}
                                type="button"
                            >
                                <SendIcon />
                            </button>
                        </div>
                    )}
                </div>
            )}

            <button
                className={styles.chatButton}
                onClick={() => setIsOpen(prev => !prev)}
                aria-label={isOpen ? "Close assistant" : "Open assistant"}
                type="button"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>
        </div>
    );
}
