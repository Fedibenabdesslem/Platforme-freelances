const { gql } = require('apollo-server');

const typeDefs = gql`
  # 🎯 Types
  type Competence {
    nom: String!
    niveau: String!
  }

  type LienPro {
    type: String!
    url: String!
  }

  type Freelance {
    id: ID!
    nom: String!
    prenom: String!
    email: String!
    bio: String
    competences: [Competence]
    liens: [LienPro]
  }

  # 📝 Inputs
  input CompetenceInput {
    nom: String!
    niveau: String!
  }

  input LienProInput {
    type: String!
    url: String!
  }

  input FreelanceInput {
    nom: String!
    prenom: String!
    email: String!
    bio: String
    competences: [CompetenceInput]
    liens: [LienProInput]
  }

  # 🔍 Requêtes (Queries)
  type Query {
    freelances: [Freelance]                          # Tous les freelances
    freelance(id: ID!): Freelance                    # Détail d'un freelance
    freelancesByCompetence(nom: String!): [Freelance]# Recherche par compétence
    rechercherProfil(terme: String!): [Freelance]    # Recherche par nom/prénom
  }

  # ✏️ Mutations (Modifications)
  type Mutation {
    createFreelance(input: FreelanceInput!): Freelance
    updateFreelance(id: ID!, input: FreelanceInput!): Freelance
    deleteFreelance(id: ID!): Boolean
    contacterFreelance(id: ID!, message: String!): String
  }
`;

module.exports = { typeDefs };
