# Bienvenu à l'API de Personage d'Anima:Beyond Fantasy

## À partir de cet Api, chaque joueur peut gérer ses personnages

## Pour initialiser le service API:

1. Effectuez un git clone https://github.com/Victo-2365930/DevWeb3Final-ServiceApi.git
2. Dans le dossier créé,
   npm install
3. Renommez le .env-example à la racine du proje pour .env et changez les variables PORT et MONGODB avec les informations de votre base de données
4. Toujours dans le fichier .env , écrivez un JWTSECRET remplis de caractères aléatoires (entre 20 et 50 caractères)
5. Pour démarrer le service:

   Développement:
   npm run dev

   Production:
   npm run build et
   npm start
  
Un jeu de données tests sont disponible dans le dossier /dev

## Ce que contient le service API

    Gestion d'Utilisateur
        - Selecteur par Id
        - Ajouter un Utilisateur
        - Supprimer un Utilisateur


    Gestion de Personnage
        - Selecteur par Id
        - Selecteur GetAll
        - Selecteur GetAllByJoueur
        - Ajouter un Personnage
        - Modifier un Personnage
        - Supprimer Personnage

    Générateur de token
