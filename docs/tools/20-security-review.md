# Differential security review

Trail of Bits' `differential-review` examines a change and the connected code for security regressions. Use it for authentication, authorization, sensitive data, external calls, dependency changes, or other meaningful trust boundaries. It complements ordinary [code review](../prompts/03-multi-agent-code-review.md), lint, and tests.

## Requirements and installation

The agent needs repository/history access and tools compatible with the [upstream skill](https://github.com/trailofbits/skills/tree/main/plugins/differential-review/skills/differential-review). Review the source, bundled references, and license. Install the focused capability through the [local skill procedure](16-vercel-skills.md#local-installation):

```bash
npx --yes skills@latest add https://github.com/trailofbits/skills/tree/main/plugins/differential-review --skill differential-review --agent codex claude-code --yes
```

An official plugin is also available from the [Trail of Bits marketplace](https://github.com/trailofbits/skills). Choose either a supported plugin or the local skill; avoid duplicate installations. Check current client installation instructions rather than assuming plugin commands are portable. No external security service is required.

## Use and verification

```text
Use differential-review for this change. Establish the exact base and head,
include relevant uncommitted changes, inspect affected callers and history,
and prioritize exploitable regressions across trust boundaries. Write the
Markdown report with locations, evidence, severity, coverage, and limitations.
```

Supply the actual comparison range; a dirty checkout needs an explicit working-tree review. Preserve the session's authorized model, provider, and authentication if the source mentions delegation. Tool availability does not authorize an external provider or sending private code to another service.

Check the report against the diff and callers. Reproduce material findings with focused tests, apply authorized fixes, then run the relevant suite. A report without findings is not proof of security; missing history, omitted files, untested attack paths, and unavailable runtime dependencies belong in its coverage section. Keep security reports containing sensitive details in an appropriate local/private destination.

## Maintenance

Update the selected project skill or installed plugin through its supported mechanism. Review instruction/reference changes and repeat a bounded review after material updates. Record source revision, reviewed range, report location, actual tests, and remaining findings in `docs/quality.md` or `docs/setup.md`. Routine prose changes do not require a full security audit.
