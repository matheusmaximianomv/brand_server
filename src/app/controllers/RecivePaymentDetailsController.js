import { flags } from '../../databases';

class RecivePaymentDetailsController {
  store(req, res) {
    const {
      numero_cartão,
      nome_cliente,
      bandeira,
      cod_seguranca,
      valor_em_centavos,
      parcelas,
      cod_operadora,
    } = req.body;
  }
}

export default new RecivePaymentDetailsController();