"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Plattform Type's data.
 */
var PlattformType = (function (_super) {
    __extends(PlattformType, _super);
    function PlattformType(nombre, iniciales, status, is_marketplace) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.iniciales = iniciales;
        _this.status = status;
        _this.is_marketplace = is_marketplace;
        return _this;
    }
    return PlattformType;
}(model_1.Model));
exports.PlattformType = PlattformType;
