import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
//import blackLogo from "../../assets/black-queen.png";
//import whiteLogo from "../../assets/white-queen.png";
const blackLogo = require("../../assets/black-queen.png")
const whiteLogo = require("../../assets/white-queen.png")

export class Queen extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(targetCell: Cell): boolean {
        if (!super.canMove(targetCell))
            return false;

        // Rules for Queen moving:
        if (this.cell.isEmptyVertical(targetCell))
            return true;
        if (this.cell.isEmptyHorizontal(targetCell))
            return true;
        if (this.cell.isEmptyDiagonal(targetCell))
            return true;

        return false;
    }
}