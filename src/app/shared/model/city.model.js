"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents City's data.
 */
var City = (function (_super) {
    __extends(City, _super);
    function City(nombre, iniciales, provincia_id, pais_id, zona_id, status) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.iniciales = iniciales;
        _this.provincia_id = provincia_id;
        _this.pais_id = pais_id;
        _this.zona_id = zona_id;
        _this.status = status;
        return _this;
    }
    return City;
}(model_1.Model));
exports.City = City;
