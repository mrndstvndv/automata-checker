import { draw } from "./canvas";

draw()

class State {
	private transitions: Map<string, State>
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

const end = new State("end", true)
end.addTransition("b", end)
end.addTransition("a", end)

const dead = new State("dead")
dead.addTransition("b", dead)
dead.addTransition("a", dead)

const start = new State("start")
start.addTransition("a", end)
start.addTransition("b", dead)

const tests = ["aab", "baa", "ab", "b", "a", "aa", "bb", "abab", "baba", "abba", "baab", "ababab", "bababa", "abababab", "babababa"]

tests.forEach(test => {
	console.log(`Test ${test} ${start.traverse(test) ? "passed" : "failed"}`)
})
