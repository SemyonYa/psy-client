export class Good {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    specialistId: number;
    invisible: number;

    constructor(id: string, name: string, description: string, price: string, duration: string, specialistId: string, invisible: string) {
        this.id = Number.parseInt(id, 10);
        this.name = name;
        this.description = description;
        this.price = Number.parseInt(price, 10);
        this.duration = Number.parseInt(duration, 10);
        this.specialistId = Number.parseInt(specialistId, 10);
        this.invisible = Number.parseInt(invisible, 10);
    }

}
