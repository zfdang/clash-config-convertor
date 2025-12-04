# Supported Proxy Node Links
# 支持的代理节点链接格式

This document explains the proxy link formats supported by Clash Config Convertor.

本文档说明 Clash Config Convertor 支持的代理链接格式。

## Link Format Sources / 链接格式来源

The link formats are derived from analyzing the [x-ui](https://github.com/vaxilu/x-ui) project, specifically the link generation code in `web/assets/js/model/xray.js`.

链接格式来源于 [x-ui](https://github.com/vaxilu/x-ui) 项目的分析，具体参考了 `web/assets/js/model/xray.js` 中的链接生成代码。

---

## VMess (`vmess://`)

VMess links use Base64-encoded JSON format.

VMess 链接使用 Base64 编码的 JSON 格式。

**Format / 格式:**
```
vmess://BASE64_ENCODED_JSON
```

**Decoded JSON structure / 解码后的 JSON 结构:**
```json
{
  "v": "2",
  "ps": "remark/name",
  "add": "server address",
  "port": 443,
  "id": "uuid",
  "aid": 0,
  "net": "ws|tcp|h2|grpc|kcp|quic",
  "type": "none|http",
  "host": "host header",
  "path": "/path",
  "tls": "tls|none"
}
```

**Example / 示例:**
```
vmess://eyJ2IjoiMiIsInBzIjoibXktdm1lc3MiLCJhZGQiOiJleGFtcGxlLmNvbSIsInBvcnQiOjQ0MywiaWQiOiJhM2JjNDU2Ny04OWRlLTRmMTItMzQ1Ni03ODlhYmNkZWYwMTIiLCJhaWQiOjAsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiZXhhbXBsZS5jb20iLCJwYXRoIjoiL3dzIiwidGxzIjoidGxzIn0=
```

---

## VLESS (`vless://`)

VLESS links use standard URL format.

VLESS 链接使用标准 URL 格式。

**Format / 格式:**
```
vless://UUID@SERVER:PORT?PARAMS#REMARK
```

**Query Parameters / 查询参数:**
| Parameter / 参数 | Description / 说明 |
|-----------|-------------|
| type | Network type / 网络类型: tcp, ws, h2, grpc, kcp, quic |
| security | tls, xtls, reality, none |
| flow | XTLS flow / XTLS 流控: xtls-rprx-direct, etc. |
| path | WebSocket/H2 path / WebSocket/H2 路径 |
| host | Host header / Host 头 |
| sni | Server Name Indication / 服务器名称指示 |
| serviceName | gRPC service name / gRPC 服务名 |
| pbk | Reality public key / Reality 公钥 |
| sid | Reality short ID / Reality 短 ID |
| fp | Client fingerprint / 客户端指纹 |

**Example / 示例:**
```
vless://uuid@example.com:443?type=ws&security=tls&path=/vless&host=example.com#my-vless
```

---

## Trojan (`trojan://`)

Trojan links use standard URL format.

Trojan 链接使用标准 URL 格式。

**Format / 格式:**
```
trojan://PASSWORD@SERVER:PORT?PARAMS#REMARK
```

**Query Parameters / 查询参数:**
| Parameter / 参数 | Description / 说明 |
|-----------|-------------|
| type | Network type / 网络类型: tcp, ws, grpc |
| sni | Server Name Indication / 服务器名称指示 |
| allowInsecure | Skip certificate verification / 跳过证书验证 (1/0) |
| path | WebSocket path / WebSocket 路径 |
| host | Host header / Host 头 |
| serviceName | gRPC service name / gRPC 服务名 |

**Example / 示例:**
```
trojan://mypassword@example.com:443?sni=example.com#my-trojan
```

---

## Shadowsocks (`ss://`)

Shadowsocks links use URL format with Base64-encoded userinfo.

Shadowsocks 链接使用 URL 格式，用户信息部分采用 Base64 编码。

**Format / 格式:**
```
ss://BASE64(METHOD:PASSWORD)@SERVER:PORT#REMARK
```

Or plain format / 或明文格式:
```
ss://METHOD:PASSWORD@SERVER:PORT#REMARK
```

**Example / 示例:**
```
ss://YWVzLTI1Ni1nY206bXlwYXNzd29yZA==@example.com:8388#my-ss
```

Decoded / 解码后: `aes-256-gcm:mypassword`
