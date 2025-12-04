# Supported Proxy Node Links

This document explains the proxy link formats supported by Clash Config Convertor.

## Link Format Sources

The link formats are derived from analyzing the [x-ui](https://github.com/vaxilu/x-ui) project, specifically the link generation code in `web/assets/js/model/xray.js`.

## VMess (`vmess://`)

VMess links use Base64-encoded JSON format.

**Format:**
```
vmess://BASE64_ENCODED_JSON
```

**Decoded JSON structure:**
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

**Example:**
```
vmess://eyJ2IjoiMiIsInBzIjoibXktdm1lc3MiLCJhZGQiOiJleGFtcGxlLmNvbSIsInBvcnQiOjQ0MywiaWQiOiJhM2JjNDU2Ny04OWRlLTRmMTItMzQ1Ni03ODlhYmNkZWYwMTIiLCJhaWQiOjAsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiZXhhbXBsZS5jb20iLCJwYXRoIjoiL3dzIiwidGxzIjoidGxzIn0=
```

---

## VLESS (`vless://`)

VLESS links use standard URL format.

**Format:**
```
vless://UUID@SERVER:PORT?PARAMS#REMARK
```

**Query Parameters:**
| Parameter | Description |
|-----------|-------------|
| type | Network type: tcp, ws, h2, grpc, kcp, quic |
| security | tls, xtls, reality, none |
| flow | XTLS flow: xtls-rprx-direct, etc. |
| path | WebSocket/H2 path |
| host | Host header |
| sni | Server Name Indication |
| serviceName | gRPC service name |
| pbk | Reality public key |
| sid | Reality short ID |
| fp | Client fingerprint |

**Example:**
```
vless://uuid@example.com:443?type=ws&security=tls&path=/vless&host=example.com#my-vless
```

---

## Trojan (`trojan://`)

Trojan links use standard URL format.

**Format:**
```
trojan://PASSWORD@SERVER:PORT?PARAMS#REMARK
```

**Query Parameters:**
| Parameter | Description |
|-----------|-------------|
| type | Network type: tcp, ws, grpc |
| sni | Server Name Indication |
| allowInsecure | Skip certificate verification (1/0) |
| path | WebSocket path |
| host | Host header |
| serviceName | gRPC service name |

**Example:**
```
trojan://mypassword@example.com:443?sni=example.com#my-trojan
```

---

## Shadowsocks (`ss://`)

Shadowsocks links use URL format with Base64-encoded userinfo.

**Format:**
```
ss://BASE64(METHOD:PASSWORD)@SERVER:PORT#REMARK
```

Or plain format:
```
ss://METHOD:PASSWORD@SERVER:PORT#REMARK
```

**Example:**
```
ss://YWVzLTI1Ni1nY206bXlwYXNzd29yZA==@example.com:8388#my-ss
```

Decoded: `aes-256-gcm:mypassword`
