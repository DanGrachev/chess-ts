import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
//import blackLogo from "../../assets/black-rook.png";
//import whiteLogo from "../../assets/white-rook.png";
const blackLogo = require("../../assets/black-rook.png")
const whiteLogo = require("../../assets/white-rook.png")

export class Rook extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
    }

    canMove(targetCell: Cell): boolean {
        if(!super.canMove(targetCell))
            return false;

        // Rules for Rook moving:
        if (this.cell.isEmptyVertical(targetCell))
            return true;
        if (this.cell.isEmptyHorizontal(targetCell))
            return true;

        return false;
    }
}