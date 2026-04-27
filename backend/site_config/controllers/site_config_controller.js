const SiteConfig = require('../models/SiteConfig');

const CONFIG_KEY = 'main';

async function getOrCreateConfig() {
  let config = await SiteConfig.findOne({ key: CONFIG_KEY });

  if (!config) {
    config = await SiteConfig.create({ key: CONFIG_KEY });
  }

  return config;
}

function cleanWhatsappPayload(payload = {}) {
  return {
    enabled: payload.enabled !== false,
    phone: String(payload.phone || '').replace(/\D/g, ''),
    message: String(payload.message || '').trim(),
  };
}

exports.getWhatsappConfig = async (req, res) => {
  try {
    const config = await getOrCreateConfig();
    res.json(config.whatsapp);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar configuração do WhatsApp.' });
  }
};

exports.updateWhatsappConfig = async (req, res) => {
  try {
    const payload = cleanWhatsappPayload(req.body);

    if (payload.enabled && !payload.phone) {
      return res.status(400).json({ message: 'Informe o telefone do WhatsApp.' });
    }

    if (payload.enabled && !payload.message) {
      return res.status(400).json({ message: 'Informe a mensagem padrão.' });
    }

    const config = await getOrCreateConfig();
    config.whatsapp = payload;
    await config.save();

    res.json(config.whatsapp);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar configuração do WhatsApp.' });
  }
};
