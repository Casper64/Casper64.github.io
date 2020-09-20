import { Vec2 } from './util'

const positions = [0, 112, 224, 336];

export class Tile {
    public position: Vec2;
    public value: number;
    public element: HTMLElement;
    public id = Math.random();

    public get x (): number {
        return this.position.x;
    }
    public get y (): number {
        return this.position.y;
    }

    constructor(x: number, y: number) {
        this.position = new Vec2(x, y);
        this.value = (Math.random() >= 0.9 ? 2 : 1);
        // this.value = Math.ceil(Math.random() * 10) + 1; // For testing css classes
    }

    // Inserts the Element into the DOM
    public draw() {
        const root: HTMLElement = document.getElementById("root")!;
        const element = document.createElement("div");
        element.classList.add("tile");
        element.classList.add(`tile-${this.value}`);
        element.innerText = Math.pow(2, this.value).toString();

        element.style.left = `${positions[this.position.x]}px`;
        element.style.top = `${positions[this.position.y]}px`;
        root.insertAdjacentElement("beforeend", element);
        this.element = element;
        return this;
    }

    // Updates the text and class of the HTMLElement
    public update(remove = false) {
        // The time it takes to move the tile in ms
        const animationTime = 100;
        this.element.style.left = `${positions[this.position.x]}px`;
        this.element.style.top = `${positions[this.position.y]}px`;
        setTimeout(() => {
            this.element.className = `tile tile-${this.value}`;
            this.element.innerText = Math.pow(2, this.value).toString();
            if (remove) {
                this.remove();
            }
        }, animationTime)
        return this;
    }

    // Removes the HTMLElement from the DOM
    public remove() {
        this.element.remove();
    }

    // Creates a new Tile from a Vec2
    static from(position: Vec2): Tile {
        return new Tile (position.x, position.y);
    }
}