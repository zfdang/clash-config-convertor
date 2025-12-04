# Clash Config Convertor

[![GitHub](https://img.shields.io/badge/GitHub-zfdang%2Fclash--config--convertor-blue?logo=github)](https://github.com/zfdang/clash-config-convertor)
[![中文](https://img.shields.io/badge/中文-README-blue)](README.md)

A React-based web application that converts proxy node links into Clash-compatible YAML configurations.

## Features

- **Supported Protocols**: VMess, VLESS, Trojan, Shadowsocks
- **Base64 Decoding**: Built-in tool to decode Base64 subscription content
- **Compact Mode**: Option to output one proxy per line (JSON format)
- **Premium UI**: Modern dark theme with responsive layout

## Quick Start

```bash
cd web-app
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Usage

1. **Paste Links**: Paste proxy links (one per line) into the left input panel
   - Supported: `vmess://`, `vless://`, `trojan://`, `ss://`
   - For Base64 encoded content, click **Decode Base64** first
2. **Convert**: Click the **Convert** button
3. **Copy**: Click the copy icon to copy the generated config

## Compact Mode

Enable the checkbox to output each proxy on a single line:

```yaml
proxies:
  - {"name":"proxy1","type":"vmess","server":"example.com",...}
  - {"name":"proxy2","type":"vless","server":"example.com",...}
```

## Customization

Edit templates in `src/templates/` to customize output format:
- `vmess.yaml`
- `vless.yaml`
- `trojan.yaml`
- `ss.yaml`

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm test         # Run tests
```

## Tech Stack

- React 19 + Vite
- js-yaml
- Lucide React (icons)
- Vitest (testing)
