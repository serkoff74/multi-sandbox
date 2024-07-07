#
# CICD .service
#
NAME01 = mis_service_appointments
PREFIX01 = subsystem-appointments/
SUFFIX01 = service-appointments
VERSION01 = $(shell git rev-list --max-count=1 --no-merges --pretty='format:%as-ba-%h' HEAD $(PREFIX01)$(SUFFIX01) | tail -1)
BUILD_IMAGE01 = $(PREFIX)/bars-mis-php:2024-05-02-mphp-aaf78ff-8.1.21-dev
BASE_IMAGE01 = $(PREFIX)/bars-mis-php:2024-05-02-mphp-aaf78ff-8.1.21
BASE_SOURCE01 = https://nexus.bars.group/repository/mirrors

$(SUFFIX01)-name:
	@echo $(PREFIX)/$(NAME01):$(VERSION01)

$(SUFFIX01)-lint:
	@hadolint $(PREFIX01)$(SUFFIX01)/Dockerfile

$(SUFFIX01)-build: $(SUFFIX01)-lint
	@docker buildx build --progress=plain \
		--add-host nexus.bars.group:192.168.228.17 --add-host gitlab.bars.group:192.168.233.37 \
		-t $(PREFIX)/$(NAME01):$(VERSION01) \
		--build-arg=BUILD_IMAGE=$(BUILD_IMAGE01) --build-arg=BASE_IMAGE=$(BASE_IMAGE01) \
		--build-arg=PROJECT_ROOT=$(PREFIX01)$(SUFFIX01) \
		--build-arg=BASE_SOURCE=$(BASE_SOURCE01) \
		-f $(PREFIX01)$(SUFFIX01)/Dockerfile .

$(SUFFIX01)-push: $(SUFFIX01)-build
	@docker push $(PREFIX)/$(NAME01):$(VERSION01)
