# Tab Title from H1

An [Obsidian](https://obsidian.md) plugin that renames the active tab to the note's first-level heading (`# H1`) instead of showing the filename.

If a note has an H1 that differs from its filename, the tab header displays the H1 text. This keeps tabs readable when your filenames are terse, dated, or kebab-cased but your notes carry a human-friendly title.

## How it works

The plugin listens for workspace and metadata events (`layout-change`, `active-leaf-change`, `file-open`, vault `rename`, and metadata cache `changed`). On each event it looks up the active file's first H1 heading and, if one exists, sets the active tab header's text to that heading.

There are no settings — the behavior is automatic once the plugin is enabled.

## Installation

### Manually

1. Build the plugin (see below) or download `main.js` and `manifest.json` from a release.
2. Copy `main.js` and `manifest.json` into your vault at `VaultFolder/.obsidian/plugins/tab-title-from-h1/`.
3. Reload Obsidian and enable **Tab Title from H1** in **Settings → Community plugins**.

## Development

- Make sure NodeJS is at least v18 (`node --version`).
- `npm i` to install dependencies.
- `npm run dev` to start compilation in watch mode.
- `npm run build` to produce a production build.
- `npm run lint` to run ESLint.

The plugin source is a single file: `src/main.ts`.

## License

MIT
