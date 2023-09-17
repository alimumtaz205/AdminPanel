import { BaseModel } from "./_base.model";

export class Permission extends BaseModel {
    id: number;
    title: string;
    level: number;
    parentId: number;
    isSelected: boolean;
    name: string;
    _children: Permission[];

    clear(): void {
        this.id = 0;
        this.title = '';
        this.level = 1;
        this.parentId = 0;
        this.isSelected = false;
        this.name = '';
        this._children = [];
    }
}
