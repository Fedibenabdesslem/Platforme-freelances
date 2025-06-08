const { freelances } = require('./data');

const resolvers = {
  Query: {
    //  Obtenir la liste complète des freelances
    freelances: () => freelances,

    //  Trouver un freelance par son ID
    freelance: (_, { id }) => {
      return freelances.find(f => f.id === id);
    },

    // Rechercher des freelances par nom de compétence
    freelancesByCompetence: (_, { nom }) => {
      return freelances.filter(f =>
        f.competences &&
        f.competences.some(c => c.nom.toLowerCase() === nom.toLowerCase())
      );
    },

    //  Rechercher un freelance par nom ou prénom (ajouté)
    rechercherProfil: (_, { terme }) => {
      const lower = terme.toLowerCase();
      return freelances.filter(f =>
        (f.nom && f.nom.toLowerCase().includes(lower)) ||
        (f.prenom && f.prenom.toLowerCase().includes(lower))
      );
    },
  },

  Mutation: {
   
    createFreelance: (_, { input }) => {
      if (!input.nom || !input.email) {
        throw new Error("Le nom et l'email sont obligatoires.");
      }
      const newFreelance = { id: `${Date.now()}`, ...input };
      freelances.push(newFreelance);
      return newFreelance;
    },


    updateFreelance: (_, { id, input }) => {
      const index = freelances.findIndex(f => f.id === id);
      if (index === -1) throw new Error("Freelance non trouvé.");
      freelances[index] = { id, ...input };
      return freelances[index];
    },

    
    deleteFreelance: (_, { id }) => {
      const index = freelances.findIndex(f => f.id === id);
      if (index > -1) {
        console.log(`Freelance supprimé : ${freelances[index].nom}`);
        freelances.splice(index, 1);
        return true;
      }
      return false;
    },

    // 📩 Simuler le contact d’un freelance (ajouté)
    contacterFreelance: (_, { id, message }) => {
      const freelance = freelances.find(f => f.id === id);
      if (!freelance) throw new Error("Freelance non trouvé.");
      console.log(`Message envoyé à ${freelance.nom} (${freelance.email}): ${message}`);
      return `Message envoyé à ${freelance.nom}.`;
    }
  }
};

module.exports = { resolvers };
