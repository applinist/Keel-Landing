---
name: feedback_pnpm
description: Use pnpm instead of npm for this project
metadata:
  type: feedback
---

Use pnpm (not npm) for all package management and script running in this project.

**Why:** User preference — corrected when npm was used in launch.json.

**How to apply:** Any time a package manager is needed (install, run dev, build, etc.), use `pnpm`. Also set `"runtimeExecutable": "pnpm"` in `.claude/launch.json`.
