export class WarehouseObject {

    slotId :number;
    spaceRequired :number;
    description :string;
    type :string;

    constructor(slotId :number, spaceRequired :number, description :string, type :string) { 
        this.slotId = slotId;
        this.spaceRequired = spaceRequired;
        this.description = description;
        this.type = type;
    }

}