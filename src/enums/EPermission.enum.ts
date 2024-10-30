import AppError from "../errors";

export enum EPermission {
    VIEWER,
    EDITOR
}

export const permissionToString = (permission: EPermission): string => {
    switch(permission) {
        case EPermission.VIEWER:
            return "Viewer";
        case EPermission.EDITOR:
            return "Editor";
    }
}

export const stringToPermission = (string: string): EPermission => {
    switch(string) {
        case "Viewer":
            return EPermission.VIEWER;
        case "Editor":
            return EPermission.EDITOR;
        default:
            return EPermission.VIEWER;
    }
}