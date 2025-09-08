# knd SSL 배포 가이드 (Nginx + Certbot)

## 0. 전제
- DNS는 이미 이 서버의 공인 IP를 가리킴
- `docker-compose.yml`의 `client`(3000), `server`(8080)는 동일 네트워크 `edge`에 있음
- 프론트 API 베이스는 `/api` (client `NEXT_PUBLIC_API_BASE_URL=/api`)

## 1. 파일 구성
- `deploy/docker-compose.nginx.yml`: Nginx + Certbot 컨테이너 정의
- `deploy/nginx/conf.d/knd-80.conf`: 최초 발급용 HTTP 구성(ACME 챌린지 포함)
- `deploy/nginx/conf.d/knd-443.conf.disabled`: HTTPS 구성 템플릿(발급 후 파일명 변경)

## 2. 최초 구동 (HTTP)
```bash
docker compose -f docker-compose.yml -f deploy/docker-compose.nginx.yml up -d nginx
```

- 브라우저로 `http://<도메인>` 접속 시 Next.js 화면 노출 확인
- `http://<도메인>/api/...` 백엔드 응답 확인(엔드포인트 존재 시)

## 3. 인증서 발급 (HTTP-01)
```bash
DOMAIN="example.com"
EMAIL="you@example.com"

docker compose -f docker-compose.yml -f deploy/docker-compose.nginx.yml run --rm certbot \
  certonly --webroot -w /var/www/certbot -d "$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive
```

- 인증서 경로: `/var/lib/docker/volumes/knd_letsencrypt/_data/live/$DOMAIN/`

## 4. HTTPS 활성화
1) `deploy/nginx/conf.d/knd-443.conf.disabled`의 `REPLACE_DOMAIN`을 실제 도메인으로 교체
2) 파일명을 `knd-443.conf`로 변경
3) Nginx 재로드
```bash
docker compose -f docker-compose.yml -f deploy/docker-compose.nginx.yml exec nginx nginx -t && \
  docker compose -f docker-compose.yml -f deploy/docker-compose.nginx.yml exec nginx nginx -s reload
```

## 5. 자동 갱신 (cron)
```bash
0 3 * * * docker compose -f /root/knd/docker-compose.yml -f /root/knd/deploy/docker-compose.nginx.yml run --rm certbot renew --webroot -w /var/www/certbot && \
  docker compose -f /root/knd/docker-compose.yml -f /root/knd/deploy/docker-compose.nginx.yml exec nginx nginx -s reload
```

## 6. 보안/운영 팁
- HSTS 적용: conf에 `Strict-Transport-Security` 헤더 포함
- 80 포트는 인증서 갱신(HTTP-01) 및 http→https 리다이렉트용으로 유지
- WebSocket: `/ws/` 경로 업그레이드 설정 포함

## 7. 롤백
- 문제 시 `knd-443.conf`를 `.disabled`로 되돌리고 Nginx reload
