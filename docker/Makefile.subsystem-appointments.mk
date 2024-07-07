#
# CICD .migrate
#
BASE_VERSION100=4.23.0
NAME100 = mis_schema
SUFFIX100 = subsystem-appointments
VERSION100 = $(shell git rev-list --max-count=1 --no-merges --pretty='format:%as-bh-%h' HEAD $(SUFFIX100)/database | tail -1)-$(BASE_VERSION100)

$(SUFFIX100)-name:
	@echo $(PREFIX)/$(NAME100):$(VERSION100)

$(SUFFIX100)-lint:
	@hadolint $(SUFFIX100)/database/docker/Dockerfile*

$(SUFFIX100)-build: $(SUFFIX100)-lint
	echo Database only

$(SUFFIX100)-push: $(SUFFIX100)-build
	echo Database only

$(SUFFIX100)-name-database:
	@echo $(PREFIX)/$(NAME100):$(SUFFIX100)-$(VERSION100)

$(SUFFIX100)-lint-database:
	@hadolint $(SUFFIX100)/database/docker/Dockerfile*

$(SUFFIX100)-build-database: $(SUFFIX100)-lint-database
	@cd $(SUFFIX100)/database && docker build --progress=plain \
		--build-arg L_IMAGE=$(PREFIX)/mirrors/liquibase/liquibase:$(BASE_VERSION100) \
		-t $(PREFIX)/$(NAME100):database-$(SUFFIX100)-$(VERSION100) \
		--build-arg=PROJECT_ROOT=$(SUFFIX100) \
		-f docker/Dockerfile.database .

$(SUFFIX100)-push-database: $(SUFFIX100)-build-database
	@docker tag $(PREFIX)/$(NAME100):database-$(SUFFIX100)-$(VERSION100) $(PREFIX)/$(NAME100):database-$(SUFFIX100)-latest
	@docker push $(PREFIX)/$(NAME100):database-$(SUFFIX100)-$(VERSION100)

