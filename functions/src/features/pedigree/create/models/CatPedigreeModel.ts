export class CatPedigreeModel {
    id: number;
    normalizedName: string;
    displayName: string;

    constructor(id: number, normalizedName: string, displayName: string) {
        this.id = id;
        this.normalizedName = normalizedName;
        this.displayName = displayName;
    }
}