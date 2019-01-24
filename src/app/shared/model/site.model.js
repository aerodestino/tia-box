"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Site's data.
 */
var Site = (function (_super) {
    __extends(Site, _super);
    function Site(nombre, iniciales, tipo_sitio, status) {
        var _this = _super.call(this) || this;
        _this.nombre = nombre;
        _this.iniciales = iniciales;
        _this.tipo_sitio = tipo_sitio;
        _this.status = status;
        return _this;
    }
    return Site;
}(model_1.Model));
exports.Site = Site;
