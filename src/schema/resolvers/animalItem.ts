import { IResolvers } from 'graphql-tools';

import { getAnimalItemsQuery, getAnimalItemQuery } from '../../sql-queries/animalItem';

const resolvers: IResolvers = {
    Query: {
        // parent, args, context
        // (pgClient - postgress client padeda pasiekti duomenu baze)
        animalItems: async (_, __, { pgClient }) => {
            const result = await pgClient.query(getAnimalItemsQuery());
            return result.rows;
        },

        animalItem: async (_, { id }, { pgClient }) => {
            const result = await pgClient.query(getAnimalItemQuery(id));
            return result.rows[0];
        }
    }
}

export default resolvers;
