import yaml from 'js-yaml';

const parseVmess = (link) => {
    try {
        const base64 = link.replace('vmess://', '');
        const decoded = atob(base64);
        const config = JSON.parse(decoded);

        const proxy = {
            name: config.ps || 'vmess',
            type: 'vmess',
            server: config.add,
            port: parseInt(config.port),
            uuid: config.id,
            alterId: parseInt(config.aid) || 0,
            cipher: 'auto',
            udp: true,
            tls: config.tls === 'tls',
            'skip-cert-verify': true,
            network: config.net || 'tcp',
        };

        // Add network-specific options
        if (config.net === 'ws') {
            proxy['ws-opts'] = {
                path: config.path || '/',
                headers: config.host ? { Host: config.host } : {},
            };
        } else if (config.net === 'h2' || config.net === 'http') {
            proxy.network = 'h2';
            proxy['h2-opts'] = {
                host: config.host ? [config.host] : [],
                path: config.path || '/',
            };
        } else if (config.net === 'grpc') {
            proxy['grpc-opts'] = {
                'grpc-service-name': config.path || '',
            };
        }

        return proxy;
    } catch (e) {
        console.error('Error parsing vmess:', e);
        return null;
    }
};

const parseVless = (link) => {
    try {
        const url = new URL(link);
        const params = url.searchParams;
        const network = params.get('type') || 'tcp';
        const security = params.get('security') || 'none';

        const proxy = {
            name: url.hash ? decodeURIComponent(url.hash.slice(1)) : 'vless',
            type: 'vless',
            server: url.hostname,
            port: parseInt(url.port),
            uuid: url.username,
            udp: true,
            tls: security === 'tls' || security === 'xtls' || security === 'reality',
            'skip-cert-verify': true,
            network: network,
        };

        // Add flow for xtls
        if (params.get('flow')) {
            proxy.flow = params.get('flow');
        }

        // Add servername/sni
        if (params.get('sni')) {
            proxy.servername = params.get('sni');
        }

        // Reality options
        if (security === 'reality') {
            proxy['reality-opts'] = {
                'public-key': params.get('pbk') || '',
                'short-id': params.get('sid') || '',
            };
            if (params.get('fp')) {
                proxy['client-fingerprint'] = params.get('fp');
            }
        }

        // Network-specific options
        if (network === 'ws') {
            proxy['ws-opts'] = {
                path: params.get('path') || '/',
                headers: params.get('host') ? { Host: params.get('host') } : {},
            };
        } else if (network === 'h2') {
            proxy['h2-opts'] = {
                host: params.get('host') ? [params.get('host')] : [],
                path: params.get('path') || '/',
            };
        } else if (network === 'grpc') {
            proxy['grpc-opts'] = {
                'grpc-service-name': params.get('serviceName') || '',
            };
        }

        return proxy;
    } catch (e) {
        console.error('Error parsing vless:', e);
        return null;
    }
};

const parseTrojan = (link) => {
    try {
        const url = new URL(link);
        const params = url.searchParams;
        const network = params.get('type') || 'tcp';

        const proxy = {
            name: url.hash ? decodeURIComponent(url.hash.slice(1)) : 'trojan',
            type: 'trojan',
            server: url.hostname,
            port: parseInt(url.port),
            password: decodeURIComponent(url.username),
            udp: true,
            'skip-cert-verify': params.get('allowInsecure') === '1',
        };

        // Add SNI
        const sni = params.get('sni') || params.get('peer');
        if (sni) {
            proxy.sni = sni;
        }

        // Network
        if (network !== 'tcp') {
            proxy.network = network;
        }

        // Network-specific options
        if (network === 'ws') {
            proxy['ws-opts'] = {
                path: params.get('path') || '/',
                headers: params.get('host') ? { Host: params.get('host') } : {},
            };
        } else if (network === 'grpc') {
            proxy['grpc-opts'] = {
                'grpc-service-name': params.get('serviceName') || '',
            };
        }

        return proxy;
    } catch (e) {
        console.error('Error parsing trojan:', e);
        return null;
    }
};

const parseSS = (link) => {
    try {
        const url = new URL(link);
        let cipher, password;

        // Get the userinfo and decode URL encoding first
        const userInfo = decodeURIComponent(url.username);

        // Try to decode as base64
        if (userInfo && !url.password) {
            try {
                const decoded = atob(userInfo);
                const parts = decoded.split(':');
                cipher = parts[0];
                password = parts.slice(1).join(':');
            } catch (e) {
                // Not base64, might be plain cipher:password format
                const parts = userInfo.split(':');
                cipher = parts[0];
                password = parts.slice(1).join(':');
            }
        } else {
            cipher = userInfo;
            password = url.password ? decodeURIComponent(url.password) : '';
        }

        const proxy = {
            name: url.hash ? decodeURIComponent(url.hash.slice(1)) : 'ss',
            type: 'ss',
            server: url.hostname,
            port: parseInt(url.port),
            cipher: cipher,
            password: password,
        };

        // Plugin options
        const plugin = url.searchParams.get('plugin');
        if (plugin) {
            proxy.plugin = plugin;
        }

        return proxy;
    } catch (e) {
        console.error('Error parsing ss:', e);
        return null;
    }
};

export const generateClashConfig = (input, compact = false) => {
    const lines = input.split('\n').map(l => l.trim()).filter(l => l);
    const proxies = [];

    for (const line of lines) {
        let proxy = null;
        if (line.startsWith('vmess://')) {
            proxy = parseVmess(line);
        } else if (line.startsWith('vless://')) {
            proxy = parseVless(line);
        } else if (line.startsWith('trojan://')) {
            proxy = parseTrojan(line);
        } else if (line.startsWith('ss://')) {
            proxy = parseSS(line);
        }

        if (proxy) {
            proxies.push(proxy);
        }
    }

    if (compact) {
        // Generate compact format (one line per proxy)
        const proxyLines = proxies.map(p => '  - ' + JSON.stringify(p));
        return 'proxies:\n' + proxyLines.join('\n');
    }

    return yaml.dump({ proxies });
};
