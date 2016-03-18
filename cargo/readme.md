# About
Helpful info for cargo (Rust package manager)

# Packaging using pbuilder
Make sure you implement the following code in `debian/rules`, or 'cargo fetch` will fail. This seems to require $HOME being available, something that is
not set during the build phase (or as it seems). While `sudo -E` is set in my personal pbuilderrc, this is obviously for sudo actions. For historical refernce, see this [cargo issue](https://github.com/rust-lang/cargo/issues/2492#issuecomment-198359087).
This assumes you have a var in your build script to set the builder dynamically. Otherwise, remove the conditional statement, and leave the export line below.

Example `debian/rules`
```
#!/usr/bin/make -f

# `cargo fetch` needs to write the registry to $HOME somewhere
# Because of the way pbuilder works, this is not optimal.
# Therefore, we need to set a temporary path for the cargo registry to be placed

ifeq ($(BUILDER),pdebuild)
	export HOME=$(CURDIR)/debian/home-tmp
endif

%:
	dh $@ --parallel

override_dh_auto_build:
	cargo fetch
	cargo build --release
```

**Please note:** This workaround is _not_needed if you are using local building (e.g. debuild).
