export class Company {
    id: number;
    name: string;
    description: string;

    constructor(id: string, name: string, description: string) {
        this.id = Number.parseInt(id, 10);
        this.name = name;
        this.description = description;
    }
}
