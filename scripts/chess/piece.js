export default class piece {
    _x;
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    _y;
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    _type;
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    _color;
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    constructor(x, y, type, color) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
    }

    draw(context) {
        var img = new Image();
        img.onload = function() {
            context.drawImage(img, this.x * 100 + 20, this.y * 100 + 20);
            console.log("draw " + this.x + " " + this.y + " " + this.color + this.type);
        }
        img.src = "../resources/chess/" + this.color + this.type + ".png";
    }
}