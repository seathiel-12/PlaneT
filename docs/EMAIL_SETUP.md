# Configuration des e-mails de confirmation

PlaneT utilise le SDK navigateur officiel EmailJS (`@emailjs/browser`) en développement. En production, l'envoi et la vérification de configuration passent par `api/proxy.ts`, une fonction Node Vercel qui lit ses propres variables d'environnement.

## Préparer EmailJS

1. Créez un compte EmailJS et connectez un service e-mail.
2. Créez un modèle de confirmation et configurez son destinataire avec `{{email}}`.
3. Vous pouvez utiliser les variables suivantes dans l'objet ou le corps du modèle :
   - `{{traveler_name}}`
   - `{{booking_reference}}`
   - `{{flight_route}}`
   - `{{departure_date}}`
   - `{{passengers_count}}`
   - `{{total_price}}`
   - `{{priceHT}}`
4. Relevez l'identifiant du service, celui du modèle et la clé publique dans le tableau de bord EmailJS.

## Variables selon l'environnement

En développement, ajoutez les variables dans `.env.local` à la racine :

```dotenv
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
VITE_EMAILJS_BLOCKED_EMAILS=foo@example.com,bar@example.com
```

En production, ajoutez les variables sans préfixe `VITE_` aux variables d'environnement du projet Vercel :

```dotenv
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
EMAILJS_BLOCKED_EMAILS=foo@example.com,bar@example.com
```

Ces valeurs sont lues par `process.env` dans la fonction Vercel et ne sont pas injectées dans le bundle client. Le `GET /api/proxy` répond uniquement si la configuration requise est présente; il ne renvoie aucune valeur EmailJS. Le `POST /api/proxy` envoie le modèle via l'API EmailJS. Pour tester cette fonction localement, utilisez Vercel CLI (`vercel dev`) et définissez les variables serveur dans l'environnement local.

## Protections activées

- En développement, `blockHeadless: true` et le `limitRate` du SDK EmailJS sont initialisés avant le premier envoi; le délai est de 10 secondes.
- La liste `VITE_EMAILJS_BLOCKED_EMAILS` bloque les destinataires configurés en développement.
- En production, le proxy bloque les adresses de `EMAILJS_BLOCKED_EMAILS` et applique un délai de 10 secondes par adresse IP. Cette limitation en mémoire peut être réinitialisée lorsqu'une instance serverless est remplacée; utilisez un stockage partagé si un quota strict entre instances est requis.

Les protections côté navigateur en développement ne remplacent pas les restrictions à configurer dans EmailJS. Les variables non préfixées sont réservées à la fonction serveur; ne les définissez pas comme variables `VITE_` et ne placez jamais de clé privée ou de mot de passe SMTP dans les variables client.

Le courriel ne joint pas le billet téléchargé. Le forfait EmailJS et ses quotas peuvent évoluer; consultez la [documentation d'initialisation](https://www.emailjs.com/docs/sdk/init/), les [options du SDK](https://www.emailjs.com/docs/sdk/options/) et les [tarifs EmailJS](https://www.emailjs.com/pricing/).

## Intervention requise dans le compte

Le propriétaire du compte EmailJS doit créer le service et le modèle. Pour le développement, les valeurs `VITE_EMAILJS_*` sont nécessaires au serveur Vite. Pour la production, définissez `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` et, facultativement, `EMAILJS_BLOCKED_EMAILS` dans les variables du projet Vercel; elles sont lues à l'exécution par la fonction Node.
