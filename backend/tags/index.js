const express = require('express');
const router = express.Router();
const tagController = require('./controller/tag_controller');
const Tag = require('./models/Tag');

// SEED DAS TAGS PADRÃO
(async () => {
  const defaultTags = [
    'seguro',
    'consórcio',
    'automóvel',
    'residencial',
    'empresarial',
    'vida',
    'prestamista',
    'viagem',
    'frota',
    'equipamentos',
    'patrimônio',
    'cartão de crédito',
    'capitalização',
    'imóvel',
    'consórcio de automóvel',
    'consórcio de imóvel',
    'consórcio de serviços',
    'plano de saúde',
    'odontológico',
    'acidentes pessoais',
    'rcf-v',
    'rcf',
    'assistência 24h',
    'proteção financeira',
    'sinistro',
    'vistoria',
    'apólice',
    'simulação',
    'cobertura',
    'franquia',
    'indenização',
    'benefício',
    'adesão',
    'parcelamento'
  ];
  for (let tagName of defaultTags) {
    await Tag.updateOne(
      { name: tagName },
      { name: tagName },
      { upsert: true }
    );
  }
  console.log('[TAGS] Tags padrão garantidas!');
})();

// SUAS ROTAS
router.post('/', tagController.createTag);
router.get('/', tagController.getTags);

module.exports = router;
