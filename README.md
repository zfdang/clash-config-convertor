# Clash Config Convertor

[![GitHub](https://img.shields.io/badge/GitHub-zfdang%2Fclash--config--convertor-blue?logo=github)](https://github.com/zfdang/clash-config-convertor)
[![English](https://img.shields.io/badge/English-README-blue)](README_ENG.md)

一个基于 React 的 Web 应用，用于将代理节点链接转换为 Clash 兼容的 YAML 配置。

## 功能特性

- **支持协议**：VMess、VLESS、Trojan、Shadowsocks
- **Base64 解码**：内置 Base64 订阅内容解码工具
- **紧凑模式**：可选择每行输出一个代理节点（JSON 格式）
- **精美界面**：现代暗色主题，响应式布局

## 快速开始

```bash
cd web-app
npm install
npm run dev
```

在浏览器中打开 http://localhost:5173

## 使用方法

1. **粘贴链接**：将代理链接（每行一个）粘贴到左侧输入框
   - 支持格式：`vmess://`、`vless://`、`trojan://`、`ss://`
   - 如果是 Base64 编码的内容，先点击 **Decode Base64** 解码
2. **转换**：点击 **Convert** 按钮
3. **复制**：点击复制图标复制生成的配置

## 紧凑模式

勾选复选框后，每个代理将输出为单行 JSON：

```yaml
proxies:
  - {"name":"proxy1","type":"vmess","server":"example.com",...}
  - {"name":"proxy2","type":"vless","server":"example.com",...}
```

## 自定义模板

编辑 `web-app/src/templates/` 目录下的模板文件来自定义输出格式：
- `vmess.yaml`
- `vless.yaml`
- `trojan.yaml`
- `ss.yaml`

## 技术栈

- React 19 + Vite
- js-yaml
- Lucide React（图标）
- Vitest（测试）

## 文档

- [代理链接格式说明](docs/proxy-links.md)
- [Clash 配置模板说明](docs/clash-templates.md)
