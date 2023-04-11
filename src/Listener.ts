export interface Keybind {
	id: number;
	key: string;

	alt: boolean;
	ctrl: boolean;
	meta: boolean;
	shift: boolean;

	associatedEvent: (e: KeyboardEvent) => void;
	repeatable: boolean;

	onUp: () => void;
}

interface CurrentEvent {
	id: number;
	key: string;
	onUp: () => void;
	interval?: number;
}

export class KeyListener {
	keyBinds: Keybind[] = [];
	currentEvents: CurrentEvent[];
	currentId = 1;

	constructor() {
		document.body.onkeydown = (e) => {
			this.narrowSearch(e);
		};
		this.currentEvents = [];
		document.body.onkeyup = (e) => {
			//console.log(this.currentEvents)
			let relateds = this.currentEvents.filter((event) => event.key.toLowerCase() == e.key.toLowerCase());
			//console.log(related)
			if (relateds) {
				for (let related of relateds) {
					related.onUp();
					if (related.interval) clearInterval(related.interval);
					this.currentEvents.splice(this.currentEvents.indexOf(related!), 1);
				}
			}
			//this.currentEvents.indexOf(related!)
		};
	}

	private narrowSearch(e: KeyboardEvent) {
		// console.log(e.key, e.metaKey, e.altKey, e.ctrlKey, e.shiftKey)
		let founds = this.keyBinds.filter(
			(bind) =>
				bind.key.toLowerCase() == e.key.toLowerCase() &&
				bind.meta == e.metaKey &&
				bind.alt == e.altKey &&
				bind.ctrl == e.ctrlKey &&
				bind.shift == e.shiftKey
		);
		if (founds) {
			for (let found of founds) {
				let searched = this.currentEvents.find((event) => event.id == found!.id);
				let toPush: CurrentEvent = {
					id: -1,
					key: "sus",
					onUp: () => {
						console.log("amogus");
					},
				};
				if (!searched) {
					//console.log("First time", e.key)
					found.associatedEvent(e);
					toPush.key = e.key;
					toPush.id = found.id;
					toPush.onUp = found.onUp;
					if (found.repeatable) {
						toPush.interval = setInterval(() => {
							found!.associatedEvent(e);
						}, 100);
					}
				}
				if (toPush.id != -1) this.currentEvents.push(toPush);
			}
		}
	}

	add(path: string, e?: (e: KeyboardEvent) => void, repeat: boolean = false, onKeyUp?: () => void) {
		//console.log(path, onKeyUp)
		let generalMatch = path.toLowerCase().match(/^((?:shift|alt|control|meta|\+|\s)*)(.+?)$/i);
		e = e || (() => console.log(`You have pressed key: ${path}`));
		onKeyUp = onKeyUp || (() => console.log(`You have unpressed key: ${path}`));
		if (!generalMatch) {
			console.error("Failed to register key:", path);
			return;
		}
		let actionKeys = generalMatch[1].match(/shift|alt|control|meta/gi);
		if (["shift", "alt", "control", "meta"].includes(generalMatch[2]))
			actionKeys ? actionKeys.push(generalMatch[2]) : (actionKeys = [generalMatch[2]]);
		this.keyBinds.push({
			id: this.currentId,
			key: generalMatch[2] || " ",
			alt: actionKeys ? actionKeys.includes("alt") : false,
			ctrl: actionKeys ? actionKeys.includes("control") : false,
			meta: actionKeys ? actionKeys.includes("meta") : false,
			shift: actionKeys ? actionKeys.includes("shift") : false,

			associatedEvent: e,
			repeatable: repeat,
			onUp: onKeyUp,
		});
		this.currentId += 1;
	}
}