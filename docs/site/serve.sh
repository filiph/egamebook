#!/usr/bin/env bash

set -e -o pipefail

jekyll build --config _config.yml,_config_dev.yml --incremental --watch &
j_pid=$!

superstatic --port 5000 &
f_pid=$!

echo "catched PIDs: $j_pid, $f_pid"

trap "{ kill $j_pid; kill $f_pid; exit 0;}" SIGINT
wait
