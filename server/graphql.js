const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const redis = require("./redis");

const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    amount: Int
    price: Int
    userId: Int
  }

  type Cart {
    _id: ID
    productId : Int
    userId : Int
    amount_product : Int
  }

  type Query {
    products: [Product]
    product(Id: ID!): Product
    carts: [Cart]
    cart(Id: ID!): Cart
  }

  input InputData {
    title: String!
    overview: String!
    poster_path: String!
    popularity: String!
    tags: String!
  }

  type User {
      _id:ID
      name: String
      email: String
      password: String
      saldo: Inte
      product: [Product]
  }

  type Mutation {
    addProduct(data: InputData): Product
    addCart(data: InputData): Cart
    deleteProduct(Id: ID!): Product
    deleteCart(Id: ID!): Cart
    editProduct(Id: ID!, data: InputData): Product
    editCart(Id: ID!, data: InputData): Cart
  }
`;

const mongourl = "http://localhost:3001";
// const serieurl = "http://localhost:3002/series";

const resolvers = {
  Query: {
    // movies: async () => {
    //   const cache = await redis.get("movies");
    //   try {
    //     const cache = await redis.get("movies");
    //     if (cache) {
    //       return JSON.parse(cache);
    //     } else {
    //       const { data } = await axios.get(movieurl);
    //       const result = data;
    //       console.log(result);
    //       await redis.set("movies", JSON.stringify(result));
    //       return result;
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // movie: (parent, args, context, info) => {
    //   const { Id } = args;
    //   console.log(Id);
    //   return axios({
    //     url: `http://localhost:3001/movies/${Id}`,
    //     method: "get",
    //   })
    //     .then(({ data }) => {
    //       console.log(data);
    //       return data[0];
    //     })
    //     .catch(console.log);
    // },
    // series: async () => {
    //   const cache = await redis.get("series");
    //   try {
    //     const cache = await redis.get("series");
    //     if (cache) {
    //       return JSON.parse(cache);
    //     } else {
    //       const { data } = await axios.get(serieurl);
    //       const result = data;
    //       console.log(result);
    //       await redis.set("series", JSON.stringify(result));
    //       return result;
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // serie: (parent, args, context, info) => {
    //   const { Id } = args;
    //   return axios({
    //     url: `http://localhost:3002/series/${Id}`,
    //     method: "get",
    //   })
    //     .then(({ data }) => {
    //       return data[0];
    //     })
    //     .catch(console.log);
    // },
  },
  Mutation: {
    addSerie: async (_, args) => {
      try {
        let cache = await redis.get("series");

        const { data } = await axios.post(serieurl + "/add", args.data);
        cache = JSON.parse(cache);
        const result = data;
        console.log(result);

        if (cache) {
          cache.result = cache.push(result.data[0]);
          await redis.set("series", JSON.stringify(cache));
          return result.data[0];
        } else {
          const { data } = await axios.get(url);
          // .then(({data}) => {
          await redis.set("series", JSON.stringify(data));
          return result.data[0];
        }
      } catch (e) {
        console.log(e);
      }

    },
    editSerie: async (_, args) => {
      try {
        const { Id } = args;
        let cache = await redis.get("series");
        const { data } = await axios.put(serieurl + `/${Id}`, args.data);
        cache = JSON.parse(cache);
        if (cache) {
          cache.map((data) => {
            if (data._id == Id) {
              // console.log(args.data.title)
              data.title = args.data.title;
              data.overview = args.data.overview;
              data.poster_path = args.data.poster_path;
              data.popularity = args.data.popularity;
              data.tags = args.data.tags;
            }
          });
          await redis.set("series", JSON.stringify(cache));
        } else {
          const { data } = await axios.get(serieurl);
          await redis.set("series", JSON.stringify(data));
        }
        console.log(data);
        return data.result[0];
      } catch (e) {
        console.log(e);
      }

    },
    deleteSerie: async (_, args) => {
      try {
        const { Id } = args;
        // let cache = await redis.get("movies");

        const { data } = await axios.delete(serieurl + `/${Id}`);

        await redis.del("series");
        const movies = await axios.get(serieurl);
        await redis.set("series", JSON.stringify(movies.data));

        return data;
      } catch (e) {
        console.log(e);
      }

    },
    addMovie: async (_, args) => {
      try {
        let cache = await redis.get("movies");

        const { data } = await axios.post(movieurl + "/add", args.data);
        cache = JSON.parse(cache);
        const result = data;
        console.log(result);

        if (cache) {
          cache.result = cache.push(result.data[0]);
          await redis.set("movies", JSON.stringify(cache));
          return result.data[0];
        } else {
          const { data } = await axios.get(url);
          // .then(({data}) => {
          await redis.set("movies", JSON.stringify(data));
          return result.data[0];
        }
      } catch (e) {
        console.log(e);
      }
    },
    editMovie: async (_, args) => {
      try {
        const { Id } = args;
        let cache = await redis.get("movies");
        const { data } = await axios.put(movieurl + `/${Id}`, args.data);
        cache = JSON.parse(cache);
        if (cache) {
          cache.map((data) => {
            if (data._id == Id) {
              // console.log(args.data.title)
              data.title = args.data.title;
              data.overview = args.data.overview;
              data.poster_path = args.data.poster_path;
              data.popularity = args.data.popularity;
              data.tags = args.data.tags;
            }
          });
          await redis.set("movies", JSON.stringify(cache));
        } else {
          const { data } = await axios.get(movieurl);
          await redis.set("movies", JSON.stringify(data));
        }
        console.log(data);
        return data.result[0];
      } catch (e) {
        console.log(e);
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const { Id } = args;
        // let cache = await redis.get("movies");

        const { data } = await axios.delete(movieurl + `/${Id}`);

        await redis.del("movies");
        const movies = await axios.get(movieurl);
        await redis.set("movies", JSON.stringify(movies.data));

        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
