const {consulta} = require('../config/clienteRest');
const host = 'http://ALB-DEV-MN-DMZ-Ext-567058400.us-east-1.elb.amazonaws.com';

async function getTiendas(req, res) {

    try {
        const url = `${host}/tiendas/busquedas`;
        const response = await consulta('POST', req.body, url);
        const data = {};
        if (!response) {
            res.status(500).json({error: 'Ha ocurrido un error'});
        }
        if (response.status !== 201 && response.status !== 200) {
            res.status(500).json({error: 'Ha ocurrido un error'});
        }
        const {resultado} = await response.json()
        return res.status(200).send(resultado);

    } catch (e) {
        res.status(500).json({error: 'Ha ocurrido un error'});
    }
}

module.exports = {
    getTiendas,
}
