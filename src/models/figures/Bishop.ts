import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
// import blackLogo from "../../assets/black-bishop.png";
// import whiteLogo from "../../assets/white-bishop.png";
const blackLogo = require("../../assets/black-bishop.png")
const whiteLogo = require("../../assets/white-bishop.png")

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.BISHOP;
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    }

    canMove(targetCell: Cell): boolean {
        if(!super.canMove(targetCell))
            return false;

        // Rule for Bishop moving:
        if (this.cell.isEmptyDiagonal(targetCell))
            return true;

        return false;
    }
}