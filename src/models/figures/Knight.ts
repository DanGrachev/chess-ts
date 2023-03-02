import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
// import blackLogo from "../../assets/black-knight.png";
// import whiteLogo from "../../assets/white-knight.png";
const blackLogo = require("../../assets/black-knight.png")
const whiteLogo = require("../../assets/white-knight.png")

export class Knight extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT;
    }

    canMove(targetCell: Cell): boolean {
        if (!super.canMove(targetCell))
            return false;

        const dX = Math.abs(this.cell.x - targetCell.x);
        const dY = Math.abs(this.cell.y - targetCell.y);
        // Rule for Knight moving:
        if ((dX === 1 && dY === 2) || (dX === 2 && dY === 1))
            return true;

        return false;
    }
}