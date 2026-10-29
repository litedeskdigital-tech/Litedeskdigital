#!/usr/bin/env bash
# Installs REA (+ Ghidra), Agent Reach and Context7 for Claude Code without the
# vendor installers: pinned versions, verified downloads, one config merge.
# Idempotent: rerunning skips anything already in place. Self-contained, so the
# whole file can be pasted into a cloud environment's setup script.
#
#   bash scripts/setup-agent-tools.sh            install + verify
#   bash scripts/setup-agent-tools.sh --check    verify only
#
# Optional env: SKIP_GHIDRA=1, AGENT_REACH_CHANNELS_REMOVE="bilibili" (space-separated).
# Context7 reads CONTEXT7_API_KEY at runtime if set; without it, it runs anonymously.
set -euo pipefail

REA_VERSION=6.7.0
GHIDRA_VERSION=12.1.4
GHIDRA_BUILD=20260921
GHIDRA_SHA256=ddac49f903da9d5bac833e5cc79395098b9c33cfd3279be5f31bd00387d2d4db
AGENT_REACH_VERSION=1.6.0
AGENT_REACH_SHA256=59c37586e45e5e111a78686e98a9d11ae71a7b4b1a334c41aef82831ea5b0a05
CONTEXT7_MCP_VERSION=4.4.4
CONTEXT7_REPO_COMMIT=eabe36965ec69b2f3487c4eb329c448dd60b817c

GHIDRA_DIR=/opt/ghidra_${GHIDRA_VERSION}_PUBLIC
GHIDRA_URL=https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_${GHIDRA_VERSION}_build/ghidra_${GHIDRA_VERSION}_PUBLIC_${GHIDRA_BUILD}.zip
AGENT_REACH_URL=https://github.com/Panniantong/Agent-Reach/releases/download/v${AGENT_REACH_VERSION}/agent-reach.zip
CONTEXT7_RAW=https://raw.githubusercontent.com/upstash/context7/${CONTEXT7_REPO_COMMIT}
CLAUDE_DIR=${CLAUDE_CONFIG_DIR:-$HOME/.claude}
CLAUDE_JSON=${CLAUDE_CONFIG_DIR:+$CLAUDE_CONFIG_DIR/.claude.json}
CLAUDE_JSON=${CLAUDE_JSON:-$HOME/.claude.json}
REMOVE_CHANNELS=${AGENT_REACH_CHANNELS_REMOVE-bilibili}
export AGENT_REACH_LANG=${AGENT_REACH_LANG:-en}
export PATH="$HOME/.local/bin:$PATH"

WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

log() { printf '\033[1m==> %s\033[0m\n' "$*"; }
ok() { printf '  ok   %s\n' "$*"; }
bad() { printf '  FAIL %s\n' "$*"; FAILED=1; }
die() { printf 'setup-agent-tools: %s\n' "$*" >&2; exit 1; }

fetch_verified() {  # url sha256 dest
  curl -fsSL --proto '=https' --retry 3 -o "$3" "$1"
  echo "$2  $3" | sha256sum -c --quiet - || die "checksum mismatch for $1"
}

need_ghidra() { [ "${SKIP_GHIDRA:-0}" != 1 ] && [ ! -f "$GHIDRA_DIR/Ghidra/application.properties" ]; }

java_home() {
  local javac
  javac=$(command -v javac) || return 1
  dirname "$(dirname "$(readlink -f "$javac")")"
}

preflight() {
  log "Preflight"
  for cmd in curl node npm unzip sha256sum python3; do
    command -v "$cmd" >/dev/null || die "$cmd is required"
  done
  node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a===22&&b>=19||a===24&&b>=11||a>=26?0:1)' \
    || die "Node $(node -v) is unsupported by REA; need 22.19+, 24.11+ or 26+"
  if ! command -v uv >/dev/null; then
    log "Installing uv"
    curl -LsSf https://astral.sh/uv/install.sh | sh
  fi
  if [ "${SKIP_GHIDRA:-0}" != 1 ] && ! java_home >/dev/null; then
    log "Installing OpenJDK 21 (Ghidra runtime)"
    apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y -qq openjdk-21-jdk-headless
  fi
}

install_rea() {
  log "REA $REA_VERSION"
  if [ "$(rea --version 2>/dev/null | tr -d '[:space:]')" != "$REA_VERSION" ]; then
    npm install --global --no-fund --no-audit --loglevel=error "rea-agents@$REA_VERSION"
  fi
  # Same skill `rea setup` copies, straight from the installed package.
  mkdir -p "$CLAUDE_DIR/skills"
  rm -rf "$CLAUDE_DIR/skills/reverse-engineer-anything"
  cp -a "$(npm root --global)/rea-agents/skills/reverse-engineer-anything" "$CLAUDE_DIR/skills/"
}

install_ghidra() {  # runs after the background download finishes
  [ -f "$WORK/ghidra.zip" ] || return 0
  log "Ghidra $GHIDRA_VERSION"
  echo "$GHIDRA_SHA256  $WORK/ghidra.zip" | sha256sum -c --quiet - || die "Ghidra checksum mismatch"
  unzip -q "$WORK/ghidra.zip" -d "$WORK/ghidra"
  rm -rf "$GHIDRA_DIR"
  mv "$WORK/ghidra/ghidra_${GHIDRA_VERSION}_PUBLIC" "$GHIDRA_DIR"
}

install_agent_reach() {
  log "Agent Reach $AGENT_REACH_VERSION"
  if ! agent-reach version 2>/dev/null | grep -q "\"version\": \"$AGENT_REACH_VERSION\""; then
    fetch_verified "$AGENT_REACH_URL" "$AGENT_REACH_SHA256" "$WORK/agent-reach.zip"
    uv tool install --force --quiet "$WORK/agent-reach.zip"
  fi
  # Removing first keeps `setup` from installing that channel's tools.
  for ch in $REMOVE_CHANNELS; do agent-reach remove "$ch" >/dev/null || true; done
  agent-reach setup | python3 -Ic 'import json,sys; d=json.load(sys.stdin); sys.exit(0 if d["ok"] else d["error"]["message"])'
}

install_context7() {
  log "Context7 MCP $CONTEXT7_MCP_VERSION"
  if ! npm ls --global --depth=0 "@upstash/context7-mcp@$CONTEXT7_MCP_VERSION" >/dev/null 2>&1; then
    npm install --global --no-fund --no-audit --loglevel=error "@upstash/context7-mcp@$CONTEXT7_MCP_VERSION"
  fi
  # Same rule and skill `ctx7 setup --claude` writes, pinned to one commit.
  mkdir -p "$CLAUDE_DIR/rules" "$CLAUDE_DIR/skills/context7-mcp"
  curl -fsSL --retry 3 -o "$CLAUDE_DIR/rules/context7.md" "$CONTEXT7_RAW/rules/context7-mcp.md"
  curl -fsSL --retry 3 -o "$CLAUDE_DIR/skills/context7-mcp/SKILL.md" "$CONTEXT7_RAW/skills/context7-mcp/SKILL.md"
}

register_mcp() {
  log "Registering MCP servers in $CLAUDE_JSON"
  local env_json='{}'
  if [ -f "$GHIDRA_DIR/Ghidra/application.properties" ]; then
    env_json=$(printf '{"GHIDRA_INSTALL_DIR":"%s","JAVA_HOME":"%s"}' "$GHIDRA_DIR" "$(java_home)")
  fi
  python3 -I - "$CLAUDE_JSON" "$(command -v rea)" "$(command -v context7-mcp)" "$env_json" <<'PY'
import json, os, sys, tempfile
path, rea, c7, rea_env = sys.argv[1], sys.argv[2], sys.argv[3], json.loads(sys.argv[4])
cfg = json.load(open(path)) if os.path.exists(path) else {}
servers = cfg.setdefault("mcpServers", {})
servers["rea"] = {"type": "stdio", "command": rea, "args": ["mcp"], "env": rea_env}
# No key in config: context7-mcp reads CONTEXT7_API_KEY from the session environment.
servers["context7"] = {"type": "stdio", "command": c7, "args": [], "env": {}}
fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path) or ".")
with os.fdopen(fd, "w") as f:
    json.dump(cfg, f, indent=2)
os.chmod(tmp, 0o600)
os.replace(tmp, path)
PY
}

mcp_tool_count() {  # command... -> number of tools the server lists
  printf '%s\n' \
    '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"setup-check","version":"1"}}}' \
    '{"jsonrpc":"2.0","method":"notifications/initialized"}' \
    '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \
    | timeout 60 "$@" 2>/dev/null \
    | python3 -Ic 'import json,sys
for line in sys.stdin:
    try: r = json.loads(line).get("result", {})
    except ValueError: continue
    if "tools" in r: print(len(r["tools"])); break
else: print(0)'
}

verify() {
  log "Verifying"
  FAILED=0
  local n
  n=$(mcp_tool_count rea mcp); [ "$n" -gt 0 ] && ok "REA MCP server lists $n tools" || bad "REA MCP server did not start"
  if [ "${SKIP_GHIDRA:-0}" != 1 ]; then
    GHIDRA_INSTALL_DIR=$GHIDRA_DIR JAVA_HOME=$(java_home) rea doctor --format json 2>/dev/null \
      | python3 -Ic 'import json,sys; d=json.load(sys.stdin); g=[p for p in d["providerInspections"] if p["id"]=="ghidra"][0]; sys.exit(0 if g["available"] else 1)' \
      && ok "REA doctor: Ghidra $GHIDRA_VERSION available" || bad "REA doctor: Ghidra not available"
  fi
  [ -f "$CLAUDE_DIR/skills/reverse-engineer-anything/SKILL.md" ] && ok "REA skill installed" || bad "REA skill missing"
  agent-reach doctor >/dev/null && ok "Agent Reach doctor runs ($(agent-reach version | python3 -Ic 'import json,sys;print(json.load(sys.stdin)["result"]["version"])'))" || bad "Agent Reach doctor failed"
  [ -f "$CLAUDE_DIR/skills/agent-reach/SKILL.md" ] && ok "Agent Reach skill linked" || bad "Agent Reach skill missing"
  n=$(mcp_tool_count context7-mcp); [ "$n" -gt 0 ] && ok "Context7 MCP server lists $n tools" || bad "Context7 MCP server did not start"
  [ -f "$CLAUDE_DIR/skills/context7-mcp/SKILL.md" ] && [ -f "$CLAUDE_DIR/rules/context7.md" ] && ok "Context7 skill + rule installed" || bad "Context7 skill/rule missing"
  python3 -Ic 'import json,sys; s=json.load(open(sys.argv[1])).get("mcpServers",{}); sys.exit(0 if {"rea","context7"} <= s.keys() else 1)' "$CLAUDE_JSON" \
    && ok "rea + context7 registered in $CLAUDE_JSON" || bad "MCP registration missing"
  # Network reachability is environment policy, not install health: report, don't fail.
  for host in context7.com mcp.context7.com www.youtube.com www.v2ex.com; do
    if curl -fsS -o /dev/null --max-time 10 "https://$host/" 2>/dev/null; then ok "network: $host reachable"
    else printf '  warn network: %s not reachable (allow it in network settings)\n' "$host"; fi
  done
  return "$FAILED"
}

main() {
  if [ "${1:-}" = --check ]; then verify; exit; fi
  preflight
  # Ghidra is ~570 MB: download it while the other tools install.
  local ghidra_pid=
  if need_ghidra; then
    curl -fsSL --proto '=https' --retry 3 -o "$WORK/ghidra.zip" "$GHIDRA_URL" & ghidra_pid=$!
  fi
  install_rea
  install_agent_reach
  install_context7
  if [ -n "$ghidra_pid" ]; then
    wait "$ghidra_pid" || die "Ghidra download failed"
    install_ghidra
  fi
  register_mcp
  verify
}

main "$@"
