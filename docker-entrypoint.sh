#!/bin/sh
set -e

node /app/backend/index.js &
api_pid="$!"

term_handler() {
  kill -TERM "$api_pid" 2>/dev/null || true
  wait "$api_pid" 2>/dev/null || true
  exit 0
}

trap term_handler INT TERM

nginx -g "daemon off;" &
nginx_pid="$!"

wait -n "$api_pid" "$nginx_pid"
exit_code="$?"

kill -TERM "$api_pid" "$nginx_pid" 2>/dev/null || true
wait "$api_pid" "$nginx_pid" 2>/dev/null || true

exit "$exit_code"
