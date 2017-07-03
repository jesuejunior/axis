.PHONY: lint base

base:
	npm i --no-progress

lint:
	./node_modules/eslint/bin/eslint.js --fix src/ test/

test: base
	docker-compose up -d
	ENV=test PORT=8001 ./node_modules/mocha/bin/mocha
cov:
	ENV=test PORT=8001 ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha test/*.spec.js
