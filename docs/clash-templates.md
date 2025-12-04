# Clash Config Templates

This document explains the Clash configuration format used by Clash Config Convertor.

## Template Sources

The Clash configuration fields are derived from analyzing the [Mihomo (Clash Meta)](https://github.com/MetaCubeX/mihomo) project, specifically the Go structs in `adapter/outbound/` directory:

- `vmess.go` - VMess proxy options
- `vless.go` - VLESS proxy options  
- `trojan.go` - Trojan proxy options
- `shadowsocks.go` - Shadowsocks proxy options

## Config Format

Clash uses YAML format for configuration. Each proxy is defined under the `proxies` key:

```yaml
proxies:
  - name: "proxy-name"
    type: vmess
    server: example.com
    port: 443
    # ... type-specific options
```

---

## VMess Config

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

**Network Options:**
- `ws-opts` - WebSocket options
- `h2-opts` - HTTP/2 options
- `grpc-opts` - gRPC options

---

## VLESS Config

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
  flow: xtls-rprx-direct  # for XTLS
  client-fingerprint: chrome
  ws-opts:
    path: /vless
    headers:
      Host: example.com
  reality-opts:  # for Reality
    public-key: abc123
    short-id: 12345678
```

---

## Trojan Config

```yaml
- name: "trojan-example"
  type: trojan
  server: example.com
  port: 443
  password: mypassword123
  udp: true
  sni: example.com
  skip-cert-verify: false
  network: ws  # optional, for WS transport
  ws-opts:
    path: /trojan
    headers:
      Host: example.com
```

---

## Shadowsocks Config

```yaml
- name: "ss-example"
  type: ss
  server: example.com
  port: 8388
  cipher: aes-256-gcm
  password: mypassword
  plugin: obfs  # optional
  plugin-opts:
    mode: http
    host: example.com
```

---

## Compact Mode

When compact mode is enabled, each proxy is output as JSON on a single line:

```yaml
proxies:
  - {"name":"proxy1","type":"vmess","server":"example.com","port":443,...}
  - {"name":"proxy2","type":"vless","server":"example.com","port":443,...}
```

This format is still valid YAML and can reduce file size significantly.

---

## References

- [Mihomo Wiki](https://wiki.metacubex.one/)
- [Clash Config Documentation](https://clash.wiki/)
