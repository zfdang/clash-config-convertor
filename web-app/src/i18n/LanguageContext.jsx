import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        const saved = localStorage.getItem('lang');
        return saved || (navigator.language.startsWith('zh') ? 'zh' : 'en');
    });

    useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    const t = (key) => translations[lang][key] || key;

    const toggleLang = () => {
        setLang(lang === 'en' ? 'zh' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
