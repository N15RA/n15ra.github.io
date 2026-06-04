# NISRA Official Website

Official website for NISRA (Network and Information Security Research
Association), Fu Jen Catholic University.

## Status

The project is being migrated off Wix to a pure-static solution hosted on
GitHub Pages. The repository has been **reset to a clean slate**: the
previous (half-finished) framework was removed, and only the faithful
backup of the existing Wix site is kept as the source of truth for the
rebuild.

**The new static framework has not been chosen yet.**

Roadmap:

1. Faithfully refactor the existing site into the new framework, using
   `old-website/` as the reference.
2. Redesign the site and the maintenance setup.

## Repository Layout

| Path                      | Purpose                                                        |
| ------------------------- | ------------------------------------------------------------- |
| `old-website/`            | Faithful archival dump of the existing Wix site (do not edit) |
| `.claude/`, `CLAUDE.md`   | Development guidelines and Claude Code configuration          |
| `AGENTS.md`               | General usage guidelines                                       |
| `mise.toml`               | Runtime version management (Node)                             |
| `.pre-commit-config.yaml` | Pre-commit base checks                                        |

## Getting Started

```bash
mise install        # provision the managed runtime
pre-commit install  # enable commit-time checks
```

A build/dev workflow will be added once the new static framework is
selected.

## License

Maintained by NISRA, Fu Jen Catholic University.
