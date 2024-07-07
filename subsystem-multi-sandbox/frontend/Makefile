.PHONY: frontend-push
.DEFAULT_GOAL := frontend-push
.EXPORT_ALL_VARIABLES:

YARN_NPM_AUTH_TOKEN = $(shell echo $${NPM_AUTH_TOKEN:-YouBetterHaveYourOwnToken} )
NPM_CONFIG_REGISTRY = https://nexus.bars.group/repository/medmis-npm/
YARN_NPM_PUBLISH_REGISTRY = https://nexus.bars.group/repository/medmis-npm/

frontend-build:
	@$(MAKE) -C subsystem-multi-sandbox/frontend frontend-build-internal

frontend-push:
	@$(MAKE) -C subsystem-multi-sandbox/frontend frontend-push-internal

frontend-build-internal:
	yarn install

frontend-push-internal:
	yarn dlx @mis/release-packages