export class State {
	public transitions: Map<string, State>
	public end: boolean

	constructor(public name: string, end: boolean = false) {
		this.transitions = new Map<string, State>()
		this.end = end
	}

	addTransition(symbol: string, state: State) {
		this.transitions.set(symbol, state)
	}

	private consume(symbol: string): State {
		const state = this.transitions.get(symbol)

		if (state == null) {
			throw new Error(`No transition for symbol ${symbol} in state ${this.name}`)
		}

		return state
	}

	traverse(input: string): boolean {
		let currentState: State = this
		for (let i=0; i<input.length; i++) {
			currentState = currentState.consume(input[i])
		}

		return currentState.end
	}
}
