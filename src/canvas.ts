import { drawArrow, drawCircle } from "./draw";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

export const draw = () => {
	if (ctx == null) {
		throw new Error("Canvas context is null");
	}

	canvas.height = 600
	canvas.width = 800

	ctx.font = "30px Arial"
	ctx.lineWidth = 2


	drawCircle(ctx, 100, 100, "q0")

	drawArrow(ctx, 150, 100, 200, 100)

	ctx.stroke()
}
