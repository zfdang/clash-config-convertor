# Sample Proxy Links for Testing

## VMess (WebSocket with TLS)
vmess://eyJ2IjoiMiIsInBzIjoidm1lc3Mtd3MtdGxzIiwiYWRkIjoiZXhhbXBsZS5jb20iLCJwb3J0Ijo0NDMsImlkIjoiYTNiYzQ1NjctODlkZS00ZjEyLTM0NTYtNzg5YWJjZGVmMDEyIiwiYWlkIjowLCJuZXQiOiJ3cyIsInR5cGUiOiJub25lIiwiaG9zdCI6ImV4YW1wbGUuY29tIiwicGF0aCI6Ii93cyIsInRscyI6InRscyJ9

## VMess (TCP)
vmess://eyJ2IjoiMiIsInBzIjoidm1lc3MtdGNwIiwiYWRkIjoiMS4yLjMuNCIsInBvcnQiOjEyMzQ1LCJpZCI6ImIxYjJiM2I0LWI1YjYtYjdiOC1iOWIwLWIxYjJiM2I0YjViNiIsImFpZCI6MCwibmV0IjoidGNwIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6IiIsInRscyI6IiJ9

## VMess (gRPC)
vmess://eyJ2IjoiMiIsInBzIjoidm1lc3MtZ3JwYyIsImFkZCI6ImdycGMuZXhhbXBsZS5jb20iLCJwb3J0Ijo0NDMsImlkIjoiYzFjMmMzYzQtYzVjNi1jN2M4LWM5YzAtYzFjMmMzYzRjNWM2IiwiYWlkIjowLCJuZXQiOiJncnBjIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6Im15X3NlcnZpY2UiLCJ0bHMiOiJ0bHMifQ==

## VLESS (WebSocket with TLS)
vless://d1d2d3d4-d5d6-d7d8-d9d0-d1d2d3d4d5d6@ws.example.com:443?type=ws&security=tls&path=%2Fvless&host=ws.example.com&sni=ws.example.com#vless-ws-tls

## VLESS (TCP with XTLS)
vless://e1e2e3e4-e5e6-e7e8-e9e0-e1e2e3e4e5e6@xtls.example.com:443?type=tcp&security=xtls&flow=xtls-rprx-direct#vless-xtls

## VLESS (gRPC with TLS)
vless://f1f2f3f4-f5f6-f7f8-f9f0-f1f2f3f4f5f6@grpc.example.com:443?type=grpc&security=tls&serviceName=my_grpc&sni=grpc.example.com#vless-grpc-tls

## VLESS (Reality)
vless://a1a2a3a4-a5a6-a7a8-a9a0-a1a2a3a4a5a6@reality.example.com:443?type=tcp&security=reality&pbk=abc123publickey&sid=12345678&fp=chrome#vless-reality

## Trojan (Basic)
trojan://mypassword123@trojan.example.com:443#trojan-basic

## Trojan (with SNI)
trojan://anotherpassword456@1.2.3.4:443?sni=sni.example.com#trojan-with-sni

## Trojan (WebSocket)
trojan://wspassword@ws-trojan.example.com:443?type=ws&path=%2Ftrojan-ws&host=ws-trojan.example.com#trojan-ws

## Shadowsocks (Basic)
ss://YWVzLTI1Ni1nY206bXlzZWNyZXRwYXNzd29yZA==@ss.example.com:8388#ss-basic

## Shadowsocks (Alternate Format)
ss://aes-256-gcm:plainpassword@1.2.3.4:8388#ss-plain

