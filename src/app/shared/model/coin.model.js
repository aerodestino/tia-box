"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
/**
 * The model that represents Coin's data.
 */
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(pais_id, pais, nombre, simbolo, status) {
        var _this = _super.call(this) || this;
        _this.pais_id = pais_id;
        _this.pais = pais;
        _this.nombre = nombre;
        _this.simbolo = simbolo;
        _this.status = status;
        return _this;
    }
    return Coin;
}(model_1.Model));
exports.Coin = Coin;
