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

lint:
	bun lint

lint-fix:
	bun lint --fix