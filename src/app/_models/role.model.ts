import { BaseModel } from "./_base.model";


export class Role extends BaseModel {
    id: number;
    title: string;
    permissions: number[];
    isCoreRole = false;

    clear(): void {
        this.id = 0;
        this.title = '';
        this.permissions = [];
        this.isCoreRole = false;
    }
}
