#!/usr/bin/env bash
# This command is used to generate model class from xml schema files
xjc -d ../java -p com.searchzillow.model.generated SearchResults.xsd