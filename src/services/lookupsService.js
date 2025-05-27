//TODO: change this to a composable

const lookups = {
  productcategory: [
    { id: 1, code: 'dice', name: 'Dice', isActive: true, sequence: 1 },
    { id: 1, code: 'collections', name: 'Collections', isActive: true, sequence: 2 },
    { id: 2, code: 'dicecases', name: 'Dice Cases', isActive: true, sequence: 3 },
    { id: 3, code: 'jewelry', name: 'Jewelry', isActive: true, sequence: 4 },
    { id: 4, code: 'masters', name: 'Masters', isActive: false, sequence: 5 },
    { id: 5, code: 'molds', name: 'Molds', isActive: false, sequence: 6 },
  ],
};

const getLookupByKey = (key) => {
  return lookups[key].sort((a, b) => a.sequence - b.sequence).filter((l) => l.isActive);
};

export { getLookupByKey };
