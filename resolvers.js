const { freelances } = require('./data');

const resolvers = {
 Query: {
  freelances: () => freelances,
  freelance: (_, { id }) => freelances.find(f => f.id === id),
  freelancesByCompetence: (_, { nom }) => {
    return freelances.filter(f =>
      f.competences.some(c => c.nom.toLowerCase() === nom.toLowerCase())
    );
  }
},


  Mutation: {
  createFreelance: (_, { input }) => {
    const newFreelance = { id: `${Date.now()}`, ...input };
    freelances.push(newFreelance);
    return newFreelance;
  },
  deleteFreelance: (_, { id }) => {
    const index = freelances.findIndex(f => f.id === id);
    if (index > -1) {
      freelances.splice(index, 1);
      return true;
    }
    return false;
  },
  updateFreelance: (_, { id, input }) => {
    const index = freelances.findIndex(f => f.id === id);
    if (index === -1) return null;

    freelances[index] = { id, ...input };
    return freelances[index];
  }




  },
};

module.exports = { resolvers };
