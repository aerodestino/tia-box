"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Arancel's data.
 */
var Arancel = (function (_super) {
    __extends(Arancel, _super);
    function Arancel(porcentaje, codigo, descrpicion, iva, ice, salvaguarda, pais_id, status, sitio_id, categorias) {
        var _this = _super.call(this) || this;
        _this.porcentaje = porcentaje;
        _this.codigo = codigo;
        _this.descrpicion = descrpicion;
        _this.iva = iva;
        _this.ice = ice;
        _this.salvaguarda = salvaguarda;
        _this.pais_id = pais_id;
        _this.status = status;
        _this.sitio_id = sitio_id;
        _this.categorias = categorias;
        return _this;
    }
    return Arancel;
}(model_1.Model));
exports.Arancel = Arancel;
