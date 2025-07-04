
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint pour tracking (ancien)
app.post('/api/klaviyo-track', async (req, res) => {
  try {
    const response = await fetch('https://a.klaviyo.com/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Klaviyo tracking failed' });
  }
});

// Nouveau endpoint pour abonnement - API v3
app.post('/api/klaviyo-subscribe', async (req, res) => {
  try {
    const { email, firstName, skinType, skinState, skinTypeScore, confidence, characteristics, concerns, answers, timestamp } = req.body;
    
    if (!email || !process.env.KLAVIYO_PRIVATE_KEY) {
      return res.status(400).json({ 
        error: 'Missing required parameters: email or KLAVIYO_PRIVATE_KEY' 
      });
    }

    console.log("📧 Création profil Klaviyo pour:", email);

    // 1. Créer ou mettre à jour le profil avec l'API v3
    const profileData = {
      data: {
        type: "profile",
        attributes: {
          email: email,
          first_name: firstName || '',
          properties: {
            // Données du quiz
            skin_type: skinType,
            skin_state: skinState || 'none',
            skin_type_score: skinTypeScore || 0,
            confidence_level: confidence || 0,
            skin_characteristics: characteristics || '',
            skin_concerns: concerns || '',
            quiz_answers: answers || '{}',
            
            // Métadonnées
            quiz_completed: true,
            quiz_completion_date: timestamp || new Date().toISOString(),
            subscription_source: 'skinwise-quiz',
            quiz_version: '3.0'
          }
        }
      }
    };

    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
        'revision': '2024-02-15'
      },
      body: JSON.stringify(profileData)
    });

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text();
      console.error('❌ Erreur création profil:', errorData);
      return res.status(profileResponse.status).json({ 
        error: 'Failed to create profile',
        details: errorData
      });
    }

    const profileResult = await profileResponse.json();
    console.log('✅ Profil créé:', profileResult);

    // 2. Ajouter à la liste si LIST_ID est configuré
    if (process.env.KLAVIYO_LIST_ID) {
      const listData = {
        data: [
          {
            type: "profile",
            id: profileResult.data.id
          }
        ]
      };

      const listResponse = await fetch(`https://a.klaviyo.com/api/lists/${process.env.KLAVIYO_LIST_ID}/relationships/profiles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
          'revision': '2024-02-15'
        },
        body: JSON.stringify(listData)
      });

      if (listResponse.ok) {
        console.log('✅ Profil ajouté à la liste');
      } else {
        console.warn('⚠️ Erreur ajout à la liste:', await listResponse.text());
      }
    }

    res.json({ 
      success: true, 
      profileId: profileResult.data.id,
      message: 'Profile created and added to list successfully'
    });

  } catch (error) {
    console.error('❌ Erreur abonnement Klaviyo:', error);
    res.status(500).json({ 
      error: 'Klaviyo subscription failed', 
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Serveur proxy démarré sur le port ${PORT}`));
