import { drawCircle } from "./draw";
import { State } from "./automata";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

type position = {
	x: number
	y: number
}

let mousePos: position | null = null

class CanvasState extends State {
	private position: position

	constructor(name: string, end: boolean = false, position: position) {
		super(name, end)
		this.position = position
	}

	draw(ctx: CanvasRenderingContext2D) {
		drawCircle(ctx, this.position.x, this.position.y, this.name)

		this.transitions.forEach((value) => {
			const state = value as CanvasState
			ctx.beginPath()
			ctx.moveTo(this.position.x, this.position.y)
			ctx.lineTo(state.position.x, state.position.y)
			ctx.stroke()

			state.draw(ctx)
		})
	}
}

canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
}, false);

const states: CanvasState[] = []
let startState: CanvasState | null = null

window.addEventListener('keypress', function(evt) {
	if (evt.key == " ") {
		console.log("Space pressed")

		if (mousePos != null) {
			if (startState == null) {
				startState = new CanvasState("q0", false, mousePos)
				states.push(startState)
			}
		}
	}
})

export const draw = () => {
	if (ctx == null) {
		throw new Error("Canvas context is null");
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height)

	canvas.height = 600
	canvas.width = 800

	ctx.font = "30px Arial"

	if (startState != null) {
		startState.draw(ctx)
	}

	window.requestAnimationFrame(draw)
}
