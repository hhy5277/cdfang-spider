import { ApolloServer, gql } from 'apollo-server-koa';
import houseModel from '../models/houseModel';
import spider from '../utils/spiderHelper';

interface Iyear {
  year: number;
}

function initGraphQL(app): void {
  const typeDefs = gql`
    type House {
      _id: ID
      area: String
      name: String
      number: Int
      beginTime: String
      endTime: String
      status: String
    }

    type PageOneArray {
      successArray: [House]
      allLength: Int
    }

    type Query {
      allHouses(year: Int): [House]
      spiderPageOne: PageOneArray
    }
  `;

  const resolvers = {
    Query: {
      // 和 type Query 中的 allHouses 对应
      allHouses: async (parent, args: Iyear): Promise<cdFang.IhouseData[]> => {
        let query = {};
        if (args.year !== 0) {
          const reg = new RegExp(`^${args.year}`);
          query = { beginTime: reg };
        }
        const allHouses = await houseModel.find(query);
        return allHouses;
      },
      spiderPageOne: async () => spider.spiderPageOne()
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
}

export default initGraphQL;
