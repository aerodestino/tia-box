"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Tracking's data.
 */
var Tracking = (function (_super) {
    __extends(Tracking, _super);
    function Tracking(nombre, fecha_llegada, empresa_envio_id, status) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.fecha_llegada = fecha_llegada;
        _this.empresa_envio_id = empresa_envio_id;
        _this.status = status;
        return _this;
    }
    return Tracking;
}(model_1.Model));
exports.Tracking = Tracking;
