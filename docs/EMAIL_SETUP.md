# Configuration des e-mails de confirmation

PlaneT utilise l’API navigateur d’EmailJS pour envoyer un modèle de confirmation sans déployer de serveur d’e-mail. Le bouton de confirmation fonctionne uniquement après configuration des trois identifiants publics ci-dessous.

## Ce qu’il faut créer dans EmailJS

1. Créer un compte EmailJS et connecter un service e-mail.
2. Créer un modèle de confirmation. Configurer le destinataire du modèle avec `{{to_email}}`.
3. Dans le corps du modèle, insérer les variables souhaitées :

   - `{{traveler_name}}`
   - `{{booking_reference}}`
   - `{{flight_route}}`
   - `{{departure_date}}`
   - `{{passengers_count}}`
   - `{{total_price}}`

4. Copier l’identifiant du service, l’identifiant du modèle et la clé publique depuis le tableau de bord EmailJS.
5. Les ajouter dans `.env.local` à la racine du projet :

   ```dotenv
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

6. Redémarrer le serveur Vite. Les modifications des variables `VITE_` ne sont prises en compte qu’au démarrage.
7. Créer une réservation de démonstration, puis cliquer sur **Send Confirmation** sur l’écran de confirmation.

## Sécurité et limites

La clé publique EmailJS est conçue pour être utilisée côté navigateur; elle n’est pas un secret. N’ajoutez jamais une clé privée ou un mot de passe SMTP dans une variable `VITE_`. Restreindre le domaine autorisé, activer les protections disponibles dans le compte EmailJS et utiliser un modèle prédéfini. Une intégration côté navigateur expose l’identifiant public et peut être abusée si le compte n’est pas configuré avec des garde-fous.

Le code envoie une requête à `https://api.emailjs.com/api/v1.0/email/send`, sans joindre le fichier de billet. L’export du billet demeure une action distincte contrôlée par l’utilisateur. Le forfait gratuit est affiché par EmailJS avec 200 requêtes mensuelles et deux modèles; les limites et conditions peuvent changer. Voir la [documentation React EmailJS](https://www.emailjs.com/docs/examples/reactjs/), la [FAQ sur la clé publique](https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/) et les [tarifs](https://www.emailjs.com/pricing/).

## Si une intervention dans le compte est nécessaire

L’utilisateur doit créer le service et le modèle dans son propre compte EmailJS, puis ajouter les trois valeurs ci-dessus à son fichier `.env.local`. Ne partage pas la clé privée. Une fois les valeurs locales configurées, le bouton envoie le modèle et signale le succès ou l’erreur dans l’interface.
