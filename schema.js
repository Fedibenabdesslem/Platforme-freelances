const { gql } = require('apollo-server');

const typeDefs = gql`
  type Competence {
    nom: String
    niveau: String
  }

  type LienPro {
    type: String
    url: String
  }

  type Freelance {
    id: ID!
    nom: String
    prenom: String
    email: String
    bio: String
    competences: [Competence]
    liens: [LienPro]
  }

  input CompetenceInput {
    nom: String
    niveau: String
  }

  input LienProInput {
    type: String
    url: String
  }

  input FreelanceInput {
    nom: String
    prenom: String
    email: String
    bio: String
    competences: [CompetenceInput]
    liens: [LienProInput]
  }

  type Query {
  freelances: [Freelance]
  freelance(id: ID!): Freelance
  freelancesByCompetence(nom: String!): [Freelance]
}

type Mutation {
  createFreelance(input: FreelanceInput!): Freelance
  updateFreelance(id: ID!, input: FreelanceInput!): Freelance
  deleteFreelance(id: ID!): Boolean
  freelancesByCompetence(nom: String!): [Freelance]

}

    
`;

module.exports = { typeDefs };
