import {Colors} from "../Colors";
import {Cell} from "../Cell";
//import logo from "../../assets/black-bishop.png"
const logo = require("../../assets/black-bishop.png")

export enum FigureNames {
    FIGURE = 'Figure',
    KING = 'King',
    KNIGHT = 'Knight',
    PAWN = 'Pawn',
    QUEEN = 'Queen',
    ROOK = 'Rook',
    BISHOP = 'Bishop'
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(targetCell: Cell): boolean {
        // Check the cells color: allied figures can't be eaten
        if (targetCell.figure?.color === this.color) {
            return false;
        }
        // The King can't be eaten
        if (targetCell.figure?.name === FigureNames.KING) {
            return false;
        }

        return true;
    }

    moveFigure(targetCell: Cell) {

    }
}