export default {
  Base: '/api',
  Users: {
    Base: '/personnage',
    Get: '/all',
    GetAllByLevel: '/allParNiveau/:niveau',
    GetAllByJoueur: '/allParJoueur/:nomJoueur',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
