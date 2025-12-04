import { describe, it, expect } from 'vitest';
import { generateClashConfig } from '../utils/parser';
import yaml from 'js-yaml';

// Sample encoded links
const VMESS_WS_TLS = 'vmess://eyJ2IjoiMiIsInBzIjoidm1lc3Mtd3MtdGxzIiwiYWRkIjoiZXhhbXBsZS5jb20iLCJwb3J0Ijo0NDMsImlkIjoiYTNiYzQ1NjctODlkZS00ZjEyLTM0NTYtNzg5YWJjZGVmMDEyIiwiYWlkIjowLCJuZXQiOiJ3cyIsInR5cGUiOiJub25lIiwiaG9zdCI6ImV4YW1wbGUuY29tIiwicGF0aCI6Ii93cyIsInRscyI6InRscyJ9';
const VMESS_TCP = 'vmess://eyJ2IjoiMiIsInBzIjoidm1lc3MtdGNwIiwiYWRkIjoiMS4yLjMuNCIsInBvcnQiOjEyMzQ1LCJpZCI6ImIxYjJiM2I0LWI1YjYtYjdiOC1iOWIwLWIxYjJiM2I0YjViNiIsImFpZCI6MCwibmV0IjoidGNwIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6IiIsInRscyI6IiJ9';
const VLESS_WS_TLS = 'vless://d1d2d3d4-d5d6-d7d8-d9d0-d1d2d3d4d5d6@ws.example.com:443?type=ws&security=tls&path=%2Fvless&host=ws.example.com&sni=ws.example.com#vless-ws-tls';
const VLESS_REALITY = 'vless://a1a2a3a4-a5a6-a7a8-a9a0-a1a2a3a4a5a6@reality.example.com:443?type=tcp&security=reality&pbk=abc123publickey&sid=12345678&fp=chrome#vless-reality';
const TROJAN_BASIC = 'trojan://mypassword123@trojan.example.com:443#trojan-basic';
const TROJAN_SNI = 'trojan://anotherpassword456@1.2.3.4:443?sni=sni.example.com#trojan-with-sni';
const SS_BASE64 = 'ss://YWVzLTI1Ni1nY206bXlzZWNyZXRwYXNzd29yZA==@ss.example.com:8388#ss-basic';

describe('VMess Parser', () => {
    it('should parse vmess websocket tls link', () => {
        const result = generateClashConfig(VMESS_WS_TLS);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        expect(config.proxies.length).toBe(1);

        const proxy = config.proxies[0];
        expect(proxy.type).toBe('vmess');
        expect(proxy.name).toBe('vmess-ws-tls');
        expect(proxy.server).toBe('example.com');
        expect(proxy.port).toBe(443);
        expect(proxy.uuid).toBe('a3bc4567-89de-4f12-3456-789abcdef012');
        expect(proxy.network).toBe('ws');
        expect(proxy.tls).toBe(true);
    });

    it('should parse vmess tcp link', () => {
        const result = generateClashConfig(VMESS_TCP);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        const proxy = config.proxies[0];
        expect(proxy.type).toBe('vmess');
        expect(proxy.name).toBe('vmess-tcp');
        expect(proxy.server).toBe('1.2.3.4');
        expect(proxy.port).toBe(12345);
        expect(proxy.network).toBe('tcp');
        expect(proxy.tls).toBe(false);
    });
});

describe('VLESS Parser', () => {
    it('should parse vless websocket tls link', () => {
        const result = generateClashConfig(VLESS_WS_TLS);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        const proxy = config.proxies[0];
        expect(proxy.type).toBe('vless');
        expect(proxy.name).toBe('vless-ws-tls');
        expect(proxy.server).toBe('ws.example.com');
        expect(proxy.port).toBe(443);
        expect(proxy.uuid).toBe('d1d2d3d4-d5d6-d7d8-d9d0-d1d2d3d4d5d6');
        expect(proxy.network).toBe('ws');
        expect(proxy.tls).toBe(true);
    });

    it('should parse vless reality link', () => {
        const result = generateClashConfig(VLESS_REALITY);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        const proxy = config.proxies[0];
        expect(proxy.type).toBe('vless');
        expect(proxy.name).toBe('vless-reality');
        expect(proxy.server).toBe('reality.example.com');
        expect(proxy['client-fingerprint']).toBe('chrome');
    });
});

describe('Trojan Parser', () => {
    it('should parse basic trojan link', () => {
        const result = generateClashConfig(TROJAN_BASIC);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        const proxy = config.proxies[0];
        expect(proxy.type).toBe('trojan');
        expect(proxy.name).toBe('trojan-basic');
        expect(proxy.server).toBe('trojan.example.com');
        expect(proxy.port).toBe(443);
        expect(proxy.password).toBe('mypassword123');
    });

    it('should parse trojan link with sni', () => {
        const result = generateClashConfig(TROJAN_SNI);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        const proxy = config.proxies[0];
        expect(proxy.type).toBe('trojan');
        expect(proxy.sni).toBe('sni.example.com');
    });
});

describe('Shadowsocks Parser', () => {
    it('should parse shadowsocks base64 link', () => {
        const result = generateClashConfig(SS_BASE64);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        const proxy = config.proxies[0];
        expect(proxy.type).toBe('ss');
        expect(proxy.name).toBe('ss-basic');
        expect(proxy.server).toBe('ss.example.com');
        expect(proxy.port).toBe(8388);
        expect(proxy.cipher).toBe('aes-256-gcm');
        expect(proxy.password).toBe('mysecretpassword');
    });
});

describe('Multi-link Parsing', () => {
    it('should parse multiple links', () => {
        const multiInput = `${VMESS_WS_TLS}
${VLESS_WS_TLS}
${TROJAN_BASIC}
${SS_BASE64}`;

        const result = generateClashConfig(multiInput);
        const config = yaml.load(result);

        expect(config.proxies).toBeDefined();
        expect(config.proxies.length).toBe(4);
        expect(config.proxies[0].type).toBe('vmess');
        expect(config.proxies[1].type).toBe('vless');
        expect(config.proxies[2].type).toBe('trojan');
        expect(config.proxies[3].type).toBe('ss');
    });
});
