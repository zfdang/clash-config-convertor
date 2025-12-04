import React from 'react';
import { Activity, Github, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Header = () => {
    const { lang, toggleLang, t } = useLanguage();

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <Activity className="logo-icon" />
                    <h1>{t('title')}</h1>
                </div>
                <p className="subtitle">{t('subtitle')}</p>
            </div>
            <div className="header-actions">
                <button className="lang-btn" onClick={toggleLang}>
                    <Globe size={18} />
                    <span>{lang === 'en' ? '中文' : 'EN'}</span>
                </button>
                <a href="https://github.com/zfdang/clash-config-convertor" target="_blank" rel="noopener noreferrer" className="github-link">
                    <Github size={24} />
                </a>
            </div>
        </header>
    );
};

export default Header;
