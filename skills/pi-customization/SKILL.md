---
name: pi-customization
description: Create and manage pi extensions, themes, skills, and prompt templates in this repo. Use when adding new customization assets.
---

# Pi Customization (this repo)

This skill describes how to add **extensions**, **themes**, **skills**, and **prompt templates** in this repository and have them picked up by pi.

## Repository layout

- Extensions: `./extensions/*.ts`
- Themes: `./themes/*.json`
- Skills: `./skills/<skill-name>/SKILL.md`
- Prompt templates: `./prompts/*.md`

The global pi settings are configured to load these folders directly, so no `.pi/` directory is needed.

## Create an extension

1. Add a new TypeScript file:

```bash
mkdir -p ./extensions
$EDITOR ./extensions/my-extension.ts
```

2. Use this minimal template:

```typescript
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("session_start", (_event, ctx) => {
    ctx.ui.notify("Extension loaded", "info");
  });
}
```

3. Reload pi:

```bash
/reload
```

## Create a theme

1. Add a JSON theme:

```bash
mkdir -p ./themes
$EDITOR ./themes/my-theme.json
```

2. Include the schema and a full color palette. Start from the built-in theme (recommended):

- Copy a base theme into this repo (example):

```bash
cp ~/.pi/agent/themes/dark.json ./themes/my-theme.json  # if you have it
```

3. Select it via `/settings` or set in `~/.pi/agent/settings.json`:

```json
{ "theme": "my-theme" }
```

## Create a skill

1. Create a directory named after your skill (lowercase, hyphens only):

```bash
mkdir -p ./skills/my-skill
$EDITOR ./skills/my-skill/SKILL.md
```

2. Use this template:

```markdown
---
name: my-skill
description: What this skill does and when to use it.
---

# My Skill

## Setup

```bash
# optional setup steps
```

## Usage

```bash
# commands or scripts
```
```

3. Reload pi to pick it up:

```bash
/reload
```

## Create a prompt template

1. Add a Markdown file in `./prompts`:

```bash
mkdir -p ./prompts
$EDITOR ./prompts/review.md
```

2. Example template:

```markdown
---
description: Review staged git changes
---
Review the staged changes (`git diff --cached`). Focus on bugs, security, and error handling.
```

3. Use it by typing `/review` in the editor.
