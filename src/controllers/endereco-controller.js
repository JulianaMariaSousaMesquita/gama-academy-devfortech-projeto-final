const endereco_service = require('../services/endereco-service');

function _validaEndereco(endereco) {
  return !Object.keys(endereco).some(el => {
    if (el == 'numero' || el == 'cep') {
      if (endereco[el] == '' || isNaN(endereco[el])) {
        console.log(`${el}:${endereco[el]} não é um número`);
        return true;
      }
    }
    else if (el != 'complemento') {
      if (endereco[el] == '' || !(typeof (endereco[el]) === 'string')) {
        console.log(`${el}:${endereco[el]} não é uma string`);
        return true;
      }
    }
  });
}

exports.create = async (req, res) => {
  let endereco = {};
  endereco.rua = req.body.rua;
  endereco.numero = req.body.numero;
  endereco.bairro = req.body.bairro;
  endereco.complemento = req.body.complemento;
  endereco.cidade = req.body.cidade;
  endereco.estado = req.body.estado;
  endereco.cep = req.body.cep;

  endereco_service.create(endereco, 1)
  //endereco_service.create(endereco, req.session.cliente.id)
    .then(() => {
      res.status(200).json({ message: 'Endereco criado.' });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: e });
    });      
}

exports.update = async (req, res) => {
  let endereco = {};

  endereco.id = req.params.id;
  req.body.rua != '' ? endereco.rua = req.body.rua : '';
  req.body.numero != '' ? endereco.numero = req.body.numero : '';
  req.body.bairro != '' ? endereco.bairro = req.body.bairro : '';
  req.body.complemento != '' ? endereco.complemento = req.body.complemento : '';
  req.body.cidade != '' ? endereco.cidade = req.body.cidade : '';
  req.body.estado != '' ? endereco.estado = req.body.estado : '';
  req.body.cep != '' ? endereco.cep = req.body.cep : '';
  
  endereco_service.updateEndereco(endereco)
    .then(() => {
      res.status(200).json({ message: 'Endereco atualizado' });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: e });
    });
}

exports.delete = async (req, res) => {
  endereco_service.deleteById(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'endereco deletado' });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: e });
    });
}

exports.selectAll = async (req, res) => {
  try {
    res.status(200).json(await endereco_service.findAll());
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Alguma coisa deu errado' });
  }
}

exports.selectById = async (req, res) => {
  endereco_service.findById(req.params.id)
    .then((endereco) => {
      res.status(200).json(endereco);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: e });
    });
}

exports.selectByClienteId = async (req, res) => {
  endereco_service.findByClienteId(req.params.id)
    .then((enderecos) => {
      res.status(200).json(enderecos);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ message: e });
    });
}