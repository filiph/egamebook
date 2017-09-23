MARKDOWN_TOPLEVEL := $(wildcard *.markdown)
MARKDOWN_SUBDIRS := $(wildcard **/*.markdown)

.SECONDARY: .full_build.intermediate

build: .full_build.intermediate
	@echo "=== Site built ==="

deploy: .full_build.intermediate
	firebase deploy

.full_build.intermediate: $(MARKDOWN_TOPLEVEL) $(MARKDOWN_SUBDIRS)
	jekyll build
	touch .full_build.intermediate

serve:
	rm -f .full_build.intermediate  # serving builds a local site
	./serve.sh

install:
	gem install jekyll bundler
	npm install -g firebase-tools
	npm install -g superstatic

clean:
	rm -fr .sass-cache/
	rm -fr _site/
	rm -f .full_build.intermediate
