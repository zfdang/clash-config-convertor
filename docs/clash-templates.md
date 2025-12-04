# Clash Config Templates
# Clash 配置模板

This document explains the Clash configuration format used by Clash Config Convertor.

本文档说明 Clash Config Convertor 使用的 Clash 配置格式。

## Template Sources / 模板来源

The Clash configuration fields are derived from analyzing the [Mihomo (Clash Meta)](https://github.com/MetaCubeX/mihomo) project, specifically the Go structs in `adapter/outbound/` directory:

Clash 配置字段来源于 [Mihomo (Clash Meta)](https://github.com/MetaCubeX/mihomo) 项目的分析，具体参考了 `adapter/outbound/` 目录中的 Go 结构体：

- `vmess.go` - VMess proxy options / VMess 代理选项
- `vless.go` - VLESS proxy options / VLESS 代理选项
- `trojan.go` - Trojan proxy options / Trojan 代理选项
- `shadowsocks.go` - Shadowsocks proxy options / Shadowsocks 代理选项

## Config Format / 配置格式

Clash uses YAML format for configuration. Each proxy is defined under the `proxies` key:

Clash 使用 YAML 格式进行配置。每个代理定义在 `proxies` 键下：

```yaml
proxies:
  - name: "proxy-name"
    type: vmess
    server: example.com
    port: 443
    # ... type-specific options / 类型特定选项
```

---

## VMess Config / VMess 配置

```yaml
- name: "vmess-example"
  type: vmess
  server: example.com
  port: 443
  uuid: a3bc4567-89de-4f12-3456-789abcdef012
  alterId: 0
  cipher: auto
  udp: true
  tls: true
  skip-cert-verify: true
  network: ws
  ws-opts:
    path: /ws
    headers:
      Host: example.com
```

**Network Options / 网络选项:**
- `ws-opts` - WebSocket options / WebSocket 选项
- `h2-opts` - HTTP/2 options / HTTP/2 选项
- `grpc-opts` - gRPC options / gRPC 选项

---

## VLESS Config / VLESS 配置

```yaml
- name: "vless-example"
  type: vless
  server: example.com
  port: 443
  uuid: d1d2d3d4-d5d6-d7d8-d9d0-d1d2d3d4d5d6
  udp: true
  tls: true
  skip-cert-verify: true
  network: ws
  flow: xtls-rprx-direct  # for XTLS / 用于 XTLS
  client-fingerprint: chrome
  ws-opts:
    path: /vless
    headers:
      Host: example.com
  reality-opts:  # for Reality / 用于 Reality
    public-key: abc123
    short-id: 12345678
```

---

## Trojan Config / Trojan 配置

```yaml
- name: "trojan-example"
  type: trojan
  server: example.com
  port: 443
  password: mypassword123
  udp: true
  sni: example.com
  skip-cert-verify: false
  network: ws  # optional, for WS transport / 可选，用于 WS 传输
  ws-opts:
    path: /trojan
    headers:
      Host: example.com
```

---

## Shadowsocks Config / Shadowsocks 配置

```yaml
- name: "ss-example"
  type: ss
  server: example.com
  port: 8388
  cipher: aes-256-gcm
  password: mypassword
  plugin: obfs  # optional / 可选
  plugin-opts:
    mode: http
    host: example.com
```

---

## Compact Mode / 紧凑模式

When compact mode is enabled, each proxy is output as JSON on a single line:

启用紧凑模式后，每个代理将输出为单行 JSON：

```yaml
proxies:
  - {"name":"proxy1","type":"vmess","server":"example.com","port":443,...}
  - {"name":"proxy2","type":"vless","server":"example.com","port":443,...}
```

This format is still valid YAML and can reduce file size significantly.

这种格式仍然是有效的 YAML，可以显著减少文件大小。

---

## References / 参考资料

- [Mihomo Wiki](https://wiki.metacubex.one/)
- [Clash Config Documentation](https://clash.wiki/)
