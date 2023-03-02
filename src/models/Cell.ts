import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    isAvailable: boolean; // can move or not
    id: number; // for react keys

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.isAvailable = false;
        this.id = Math.random();
    }

    isEmpty(): boolean {
        return this.figure === null;
    }
    isEnemy(targetCell: Cell): boolean {
        if (targetCell.figure && targetCell.figure.color !== this.figure?.color) {
            return true;
        }
        return false;
    }

    isEmptyVertical(targetCell: Cell): boolean {
        if (this.x !== targetCell.x) {
            return false;
        }

        const min = Math.min(this.y, targetCell.y);
        const max = Math.max(this.y, targetCell.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }
        return true;
    }
    isEmptyHorizontal(targetCell: Cell): boolean {
        if (this.y !== targetCell.y) {
            return false;
        }

        const min = Math.min(this.x, targetCell.x);
        const max = Math.max(this.x, targetCell.x);
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }
        return true;
    }
    isEmptyDiagonal(targetCell: Cell): boolean {
        const absX = Math.abs(this.x - targetCell.x);
        const absY = Math.abs(this.y - targetCell.y);
        if (absY !== absX) {
            return false;
        }

        const dY = this.y < targetCell.y ? 1 : -1;
        const dX = this.x < targetCell.x ? 1 : -1;
        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dX * i, this.y + dY * i).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }


    moveFigure(targetCell: Cell) {
        if (this.figure && this.figure.canMove(targetCell)) {
            this.figure.moveFigure(targetCell);

            if (targetCell.figure) {
                this.board.addEatenFigures(targetCell.figure);
            }

            targetCell.setFigure(this.figure);
            this.figure = null;
        }
    }
}