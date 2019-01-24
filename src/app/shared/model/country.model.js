"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Country's data.
 */
var Country = (function (_super) {
    __extends(Country, _super);
    function Country(nombre, abreviatura, status) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.abreviatura = abreviatura;
        _this.status = status;
        return _this;
    }
    return Country;
}(model_1.Model));
exports.Country = Country;
