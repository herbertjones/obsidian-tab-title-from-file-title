import { Plugin } from 'obsidian';

export default class TabNameFromTitlePlugin extends Plugin {
	async renameTab() {
		const activeFile = this.app.workspace.getActiveFile();

		if (activeFile) {
			const metadata = this.app.metadataCache.getFileCache(activeFile);
			const h1 = metadata?.headings?.find((x) => x.level === 1);

			if (h1) {
				const thisTab = document.querySelector(
					'.workspace-tabs.mod-active .workspace-tab-header.is-active .workspace-tab-header-inner-title',
				);

				if (thisTab) {
					thisTab.setText(h1.heading);
				}
			}
		}
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

	onunload() {}
}
