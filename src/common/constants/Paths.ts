export default {
  Base: '/edu',
  Personnage: {
    Base: '/personnages',
    GetAll: 'all',
    GetAllByLevel: '/allParNiveau/:niveau',
    GetAllByJoueur: '/allParJoueur/:nomJoueur',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
