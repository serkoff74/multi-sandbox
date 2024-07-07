PREFIX = registry.bars.group/medmis

# Migration
include ./docker/Makefile.subsystem-appointments.mk

# Service
include ./docker/Makefile.service-appointments.mk

include ./subsystem-appointments/frontend/Makefile
