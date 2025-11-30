export default {
  Base: '/api',
  Personnage: {
    Base: '/personnages',
    GetById: '/:id',
    GetAll: '/all',
    GetAllByLevel: '/allParNiveau/:niveau',
    GetAllByJoueur: '/allParJoueur/:nomJoueur',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Users: {
    Base: '/users',
    GetById: 'getbyid/:id',
    Add: '/add',
    Delete: '/delete/:id',
  },
} as const;
