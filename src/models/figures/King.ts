import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
//import blackLogo from "../../assets/black-king.png";
//import whiteLogo from "../../assets/white-king.png";
const blackLogo = require("../../assets/black-king.png")
const whiteLogo = require("../../assets/white-king.png")

export class King extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(targetCell: Cell): boolean {
        if(!super.canMove(targetCell)) return false;

        // The King can move in any directions by 1 cell
        const isVerticalMove = (targetCell.y === this.cell.y + 1 || targetCell.y === this.cell.y - 1)
            && targetCell.x === this.cell.x;
        const isHorizontalMove = (targetCell.x === this.cell.x + 1 || targetCell.x === this.cell.x - 1)
            && targetCell.y === this.cell.y;

        const isLeftDiagonal = (
            (targetCell.x === this.cell.x + 1 && targetCell.y === this.cell.y + 1)
            || (targetCell.x === this.cell.x - 1 && targetCell.y === this.cell.y - 1)
        );
        const isRightDiagonal = (
            (targetCell.x === this.cell.x + 1 && targetCell.y === this.cell.y - 1)
            || (targetCell.x === this.cell.x - 1 && targetCell.y === this.cell.y + 1)
        );

        // Rule for King moving:
        if (isVerticalMove || isHorizontalMove || isLeftDiagonal || isRightDiagonal)
            return true;

        return false;
    }
}