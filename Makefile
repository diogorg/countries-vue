bash:
	docker-compose exec app-countries sh
build:
	docker-compose build --no-cache
dev:
	docker-compose -f docker-compose.dev.yml up
down:
	docker-compose down
install:
	docker-compose exec app-countries npm i
up:
	docker-compose up -d --force-recreate
up-log:
	docker-compose up
version:
	docker-compose exec app-countries node -v
test:
	make up && \
	docker-compose exec app-countries npm run test