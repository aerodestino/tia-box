"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Zone's data.
 */
var Zone = (function (_super) {
    __extends(Zone, _super);
    function Zone(nombre, domicilio, iva, pais_id, status) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.domicilio = domicilio;
        _this.iva = iva;
        _this.pais_id = pais_id;
        _this.status = status;
        return _this;
    }
    return Zone;
}(model_1.Model));
exports.Zone = Zone;
