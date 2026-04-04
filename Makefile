install:
	bun install

.env:
	cp .env.example .env

generate: docker-up .env install
	bun generate

up: generate
	bun dev

docker-up:
	docker compose up -d --wait