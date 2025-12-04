import React, { useState } from 'react';
import { ArrowRight, FileJson, Copy, Check, RefreshCw } from 'lucide-react';
import { generateClashConfig } from '../utils/parser';
import { useLanguage } from '../i18n/LanguageContext';

const Converter = () => {
    const { t } = useLanguage();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [compactMode, setCompactMode] = useState(false);

    const handleConvert = async () => {
        setIsConverting(true);
        try {
            const config = generateClashConfig(input, compactMode);
            setOutput(config);
        } catch (e) {
            setOutput(t('convertError') + e.message);
        } finally {
            setIsConverting(false);
        }
    };

    const handleDecode = () => {
        try {
            const decoded = atob(input);
            setInput(decoded);
        } catch (e) {
            alert(t('decodeError'));
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="converter-container">
            {copied && <div className="toast">{t('copied')}</div>}
            <div className="panel input-panel">
                <div className="panel-header">
                    <FileJson className="panel-icon" />
                    <h2>{t('inputLinks')}</h2>
                    <button className="decode-btn" onClick={handleDecode}>
                        <RefreshCw size={14} />
                        <span>{t('decodeBase64')}</span>
                    </button>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('inputPlaceholder')}
                    className="editor"
                />
            </div>

            <div className="action-panel">
                <button className="action-btn primary" onClick={handleConvert} disabled={isConverting}>
                    {isConverting ? <RefreshCw className="spin" /> : <ArrowRight />}
                    <span>{t('convert')}</span>
                </button>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={compactMode}
                        onChange={(e) => setCompactMode(e.target.checked)}
                    />
                    <span>{t('compactMode')}</span>
                </label>
            </div>

            <div className="panel output-panel">
                <div className="panel-header">
                    <FileJson className="panel-icon" />
                    <h2>{t('clashConfig')}</h2>
                    {output && (
                        <button className="copy-btn" onClick={handleCopy}>
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    )}
                </div>
                <textarea
                    value={output}
                    readOnly
                    placeholder={t('outputPlaceholder')}
                    className="editor"
                />
            </div>
        </div>
    );
};

export default Converter;
