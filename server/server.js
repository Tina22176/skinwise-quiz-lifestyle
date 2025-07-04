import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/klaviyo-track', async (req, res) => {
  try {
    const response = await fetch('https://a.klaviyo.com/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}` // Pour d'autres endpoints
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Klaviyo tracking failed' });
  }
});

app.post('/api/klaviyo-subscribe', async (req, res) => {
  try {
    const { email, firstName, skinType } = req.body;
    
    if (!email || !process.env.KLAVIYO_PRIVATE_KEY || !process.env.KLAVIYO_LIST_ID) {
      return res.status(400).json({ 
        error: 'Missing required parameters: email, KLAVIYO_PRIVATE_KEY, or KLAVIYO_LIST_ID' 
      });
    }

    // Préparer les données pour Klaviyo
    const klaviyoData = {
      profiles: [{
        email: email,
        first_name: firstName || '',
        $consent: ['email'],
        $extra: {
          skin_type: skinType || '',
          subscription_date: new Date().toISOString()
        }
      }]
    };

    // Appel à l'API v2 de Klaviyo pour ajouter à la liste
    const response = await fetch(`https://a.klaviyo.com/api/v2/list/${process.env.KLAVIYO_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`
      },
      body: JSON.stringify(klaviyoData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Klaviyo API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to add contact to Klaviyo list',
        details: errorData
      });
    }

    const data = await response.json();
    console.log('Contact added to Klaviyo list:', data);
    res.json({ success: true, data });

  } catch (error) {
    console.error('Klaviyo subscription error:', error);
    res.status(500).json({ error: 'Klaviyo subscription failed', details: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`)); 