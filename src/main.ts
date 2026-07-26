import { Plugin } from 'obsidian';

const TAB_TITLE_SELECTOR =
	'.workspace-tabs.mod-active .workspace-tab-header.is-active .workspace-tab-header-inner-title';

interface RenamedTab {
	/** The title Obsidian had set before this plugin overwrote it. */
	original: string;
	/** The title this plugin last wrote, used to detect Obsidian rewriting it. */
	written: string;
}

export default class TabNameFromTitlePlugin extends Plugin {
	private renamed = new Map<HTMLElement, RenamedTab>();

	renameTab() {
		const activeFile = this.app.workspace.getActiveFile();

		if (!activeFile) {
			return;
		}

		const metadata = this.app.metadataCache.getFileCache(activeFile);
		const h1 = metadata?.headings?.find((x) => x.level === 1);

		if (!h1) {
			return;
		}

		const thisTab =
			activeDocument.querySelector<HTMLElement>(TAB_TITLE_SELECTOR);

		if (!thisTab) {
			return;
		}

		const current = thisTab.getText();
		const previous = this.renamed.get(thisTab);

		// Obsidian reuses a tab's header element across files, so re-capture the
		// original whenever the text is not the one we last wrote.
		const original =
			previous && previous.written === current
				? previous.original
				: current;

		if (current !== h1.heading) {
			thisTab.setText(h1.heading);
		}

		this.renamed.set(thisTab, { original, written: h1.heading });
	}

	async onload() {
		this.registerEvent(
			this.app.workspace.on('layout-change', () => this.renameTab()),
		);

		this.registerEvent(
			this.app.workspace.on('active-leaf-change', () => this.renameTab()),
		);

		this.registerEvent(
			this.app.workspace.on('file-open', () => this.renameTab()),
		);

		this.registerEvent(this.app.vault.on('rename', () => this.renameTab()));

		this.registerEvent(
			this.app.metadataCache.on('changed', () => this.renameTab()),
		);
	}

	onunload() {
		for (const [el, { original, written }] of this.renamed) {
			// Leave alone any tab Obsidian has already relabelled or torn down.
			if (el.isConnected && el.getText() === written) {
				el.setText(original);
			}
		}

		this.renamed.clear();
	}
}
