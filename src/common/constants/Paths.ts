export default {
  Base: '/api',
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
  Personnage: {
    Base: '/personnages',
    GetById: '/:id',
    GetAll: '/all',
    GetAllByJoueur: '/allParJoueur/:idJoueur',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Users: {
    Base: '/users',
    GetById: '/:id',
    Add: '/add',
    Delete: '/delete/:id',
  },
} as const;
