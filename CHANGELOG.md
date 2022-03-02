# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2022-03-02

### Fixed

-   Skip unsafe updates. An unsafe update is when updating `x.y.z` to `^x.y.z`, but `^x.y.z` already exists in `yarn.lock` and it resolves to something different than `x.y.z`.

## [1.0.1] - 2022-03-01

-   Busted version, nothing really changed.

## [1.0.0] - 2022-03-01

### Added

-   Initial release
