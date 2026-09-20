#!/bin/zsh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

export PATH="$HOME/.local/node/bin:$PATH"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 was not found. Install it from https://www.python.org/downloads/"
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js / npm was not found. Install Node.js LTS from https://nodejs.org/"
  exit 1
fi

VENV="$ROOT/backend/.venv"
if [ ! -x "$VENV/bin/python" ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv "$VENV"
fi

echo "Installing Python packages..."
"$VENV/bin/python" -m pip install --upgrade pip >/dev/null
"$VENV/bin/python" -m pip install -r "$ROOT/backend/requirements.txt"

echo "Installing frontend packages..."
(cd "$ROOT/frontend" && npm install)

cleanup() {
  if [ -n "${BACK_PID:-}" ]; then kill "$BACK_PID" 2>/dev/null || true; fi
  if [ -n "${FRONT_PID:-}" ]; then kill "$FRONT_PID" 2>/dev/null || true; fi
}
trap cleanup EXIT INT TERM

echo "Starting Python API on http://127.0.0.1:8000 ..."
(cd "$ROOT/backend" && "$VENV/bin/python" -m uvicorn app:app --reload --host 127.0.0.1 --port 8000) &
BACK_PID=$!

echo "Starting React / Next.js site on http://localhost:3000 ..."
(cd "$ROOT/frontend" && npm run dev) &
FRONT_PID=$!

URL="http://localhost:3000"
echo "Waiting for $URL ..."
for i in {1..90}; do
  if curl -sf "$URL" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! curl -sf "$URL" >/dev/null 2>&1; then
  echo "The site did not start in time. Check the terminal for errors."
  exit 1
fi

echo "Opening $URL in your browser..."
open "$URL"

echo ""
echo "Portfolio is running."
echo "  Site:    $URL"
echo "  API:     http://127.0.0.1:8000/api/profile"
echo "Press Ctrl+C to stop."
echo ""

wait "$FRONT_PID"
