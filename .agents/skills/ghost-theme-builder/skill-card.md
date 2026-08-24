## Description:

Build, customize, review, debug, migrate, and optimize Ghost CMS Handlebars themes. Use for Ghost theme templates and partials, package.json custom settings, routes.yaml, memberships, Portal, comments, search, GScan, or converting a design into a Ghost theme.

This skill is ready for commercial/non-commercial use.

## Publisher:

[frontendweb](https://clawhub.ai/user/frontendweb)

### License/Terms of Use:

MIT-0

## Use Case:

Developers and theme maintainers use this skill to build, customize, review, debug, migrate, and optimize Ghost CMS themes with Ghost Theme API, Handlebars, routing, membership, search, accessibility, SEO, and GScan guidance.

### Deployment Geography for Use:

Global

## Known Risks and Mitigations:

Risk: Generated theme changes can alter routing, package settings, membership signup behavior, newsletter defaults, search integrations, or billing/account pages.

Mitigation: Review generated changes before applying them, verify Ghost admin settings, and use visible newsletter choices or clearly disclosed defaults that comply with applicable email and privacy rules.

Risk: Theme output may introduce rendering, accessibility, SEO, or membership-state regressions if it is applied without validation.

Mitigation: Run GScan and applicable build or lint commands, then manually test member and non-member states, keyboard navigation, narrow viewports, missing images, and long content.

## Reference(s):

- [ClawHub Skill Page](https://clawhub.ai/frontendweb/skills/ghost-theme-builder)
- [Ghost Theme Builder README](README.md)
- [Ghost Theme Structure](docs/structure.md)
- [Ghost Theme Contexts](reference/contexts.md)
- [Ghost Theme Helpers](reference/helpers.md)
- [GScan](docs/gscan.md)
- [Ghost CMS](https://ghost.org)

## Skill Output:

**Output Type(s):** [Text, Markdown, Code, Shell commands, Configuration, Guidance]

**Output Format:** [Markdown with inline code blocks and file-oriented implementation guidance]

**Output Parameters:** [1D]

**Other Properties Related to Output:** [May include Ghost Handlebars templates, CSS, JavaScript, routes.yaml, package.json settings, review findings, and validation commands.]

## Skill Version(s):

1.0.4 (source: server release evidence)

## Ethical Considerations:

Users should evaluate whether this skill is appropriate for their environment, review any generated or modified files before relying on them, and apply their organization's safety, security, and compliance requirements before deployment.
