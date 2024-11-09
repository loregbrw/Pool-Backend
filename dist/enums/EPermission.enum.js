"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToPermission = exports.permissionToString = exports.EPermission = void 0;
var EPermission;
(function (EPermission) {
    EPermission[EPermission["VIEWER"] = 0] = "VIEWER";
    EPermission[EPermission["EDITOR"] = 1] = "EDITOR";
})(EPermission || (exports.EPermission = EPermission = {}));
const permissionToString = (permission) => {
    switch (permission) {
        case EPermission.VIEWER:
            return "Viewer";
        case EPermission.EDITOR:
            return "Editor";
    }
};
exports.permissionToString = permissionToString;
const stringToPermission = (string) => {
    switch (string) {
        case "Viewer":
            return EPermission.VIEWER;
        case "Editor":
            return EPermission.EDITOR;
        default:
            return EPermission.VIEWER;
    }
};
exports.stringToPermission = stringToPermission;
