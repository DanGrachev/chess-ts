import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
//import blackLogo from "../../assets/black-pawn.png";
//import whiteLogo from "../../assets/white-pawn.png";
const blackLogo = require("../../assets/black-pawn.png")
const whiteLogo = require("../../assets/white-pawn.png")

export class Pawn extends Figure{

    isFirstMove: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(targetCell: Cell): boolean {
        if(!super.canMove(targetCell)) return false;

        // In which direction will a Pawn move: Up(white: -1) or Down(black: 1)
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        // The same case, but for the first move: at first a pawn can move up to 2 steps
        const firstMoveDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        // Rule for Pawn moving:
        //  1. Checking the offset by 1 OR 2(if isFirstMove = true) cells;
        //  2. Checking that the offset is only by X-coordinate;
        //  3. Making sure that the target cell is free to move.
        if ((targetCell.y === this.cell.y + direction ||
                this.isFirstMove && (targetCell.y === this.cell.y + firstMoveDirection))
            && targetCell.x === this.cell.x
            && this.cell.board.getCell(targetCell.x, targetCell.y).isEmpty()) {
            return true;
        }
        // Attacking rule:
        //  1. Checking that a pawn is moving in up or down direction(depending on color);
        //  2. Offset by X-coordinate by 1 cell;
        //  3. Checking weather an enemy stand on target cell or not.
        if (targetCell.y === this.cell.y + direction
            && (targetCell.x === this.cell.x + 1 || targetCell.x === this.cell.x -1)
            && this.cell.isEnemy(targetCell)) {
            return true;
        }

        return false;
    }

    moveFigure(targetCell: Cell) {
        super.moveFigure(targetCell);
        this.isFirstMove = false;
    }
}