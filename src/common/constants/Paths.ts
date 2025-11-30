export default {
  Base: '/api',
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
