'use strict';

import { ipcRenderer } from 'electron';

import BaseComponent = require('../../components/base');

interface BaseProps {
	[key: string]: any;
}

class BaseSection extends BaseComponent {
	generateSettingOption(props: BaseProps): void {
		const {$element, disabled, value, clickHandler} = props;

		$element.innerHTML = '';

		const $optionControl = this.generateNodeFromTemplate(this.generateOptionTemplate(value, disabled));
		$element.append($optionControl);

		if (!disabled) {
			$optionControl.addEventListener('click', clickHandler);
		}
	}

	generateOptionTemplate(settingOption: boolean, disabled: boolean): string {
		const label = disabled ? `<label class="disallowed" title="Setting locked by system administrator."/>` : `<label/>`;
		if (settingOption) {
			return `
				<div class="action">
					<div class="switch">
					  <input class="toggle toggle-round" type="checkbox" checked disabled>
					  ${label}
					</div>
				</div>
			`;
		} else {
			return `
				<div class="action">
					<div class="switch">
					  <input class="toggle toggle-round" type="checkbox">
					  ${label}
					</div>
				</div>
			`;
		}
	}

	reloadApp(): void {
		ipcRenderer.send('forward-message', 'reload-viewer');
	}
}

export = BaseSection;
