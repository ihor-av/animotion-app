---
description: Run an adversarial review of the current branch against main.
agent: reviewer
---

Review the current branch against `origin/main` (or the ref in `$ARGUMENTS` if
provided).

Read `AGENTS.md` first. Run `git diff origin/main...HEAD`, read the changed
files, and follow the review contract. End with exactly `VERDICT: PASS` or
`VERDICT: FAIL`.
