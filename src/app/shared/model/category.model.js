"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Category's data.
 */
var Category = (function (_super) {
    __extends(Category, _super);
    function Category(nombre, iniciales, singular, padre_id, padre, status, sub_categorias) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.iniciales = iniciales;
        _this.singular = singular;
        _this.padre_id = padre_id;
        _this.padre = padre;
        _this.status = status;
        _this.sub_categorias = sub_categorias;
        return _this;
    }
    return Category;
}(model_1.Model));
exports.Category = Category;
