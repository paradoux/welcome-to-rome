.PHONY: ship

m ?= deploy: $(shell date "+%Y-%m-%d %H:%M:%S")

ship:
	@if [ -n "$$(git status --porcelain)" ]; then \
		git add -A && git commit -m "$(m)"; \
	else \
		echo "No changes to commit — pushing and deploying current HEAD."; \
	fi
	git push origin main
	cd rome-places && npm run deploy
