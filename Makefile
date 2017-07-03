.PHONY: lint base

base:
	npm i --no-progress

run: base
	docker-compose up -d 
	node src/app.js

lint:
	./node_modules/eslint/bin/eslint.js --fix src/ test/

test: base
	docker-compose up -d --force-recreate
	ENV=test PORT=8001 ./node_modules/mocha/bin/mocha test/

cov:
	ENV=test PORT=8001 ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha test/*.spec.js
