import { t } from "i18next";
import { toast } from "sonner-native";
import { createClient } from "graphql-ws";
import { OperationTypeNode } from "graphql";
import { ErrorLink } from "@apollo/client/link/error";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  defaultDataIdFromObject,
} from "@apollo/client";

import { useAuthStore } from "@/store";
import { ERROR_KEYS } from "@/lib/constants";
import { getToken, deleteToken, ReactNativeFile } from "@/lib/helpers";

import { fragmentRegistry } from "./fragment-registry.helper";

const handleSignOut = async () => {
  useAuthStore.getState().signOut();
  await deleteToken();
};

const isReactNativeFile = (value: unknown) => {
  return value instanceof ReactNativeFile;
};

const errorLink = new ErrorLink(({ error }) => {
  console.log(error);

  if (error.message === ERROR_KEYS.INVALID_TOKEN) {
    handleSignOut();
  }

  toast.error(t(`graphql_errors.${error.message}`));
});

const authLink = new SetContextLink(async (prevContext) => {
  const token = await getToken();

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const uploadLink = new UploadHttpLink({
  isExtractableFile: isReactNativeFile,
  uri: process.env.EXPO_PUBLIC_BACKEND_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.EXPO_PUBLIC_BACKEND_URL || "",
    on: {
      closed: () => console.log("GraphQLWsLink closed"),
      connected: () => console.log("GraphQLWsLink connected"),
    },
    connectionParams: async () => {
      const token = await getToken();

      return {
        authToken: token ? `Bearer ${token}` : "",
      };
    },
  }),
);

const link = ApolloLink.from([errorLink, authLink, uploadLink]);

const splitLink = ApolloLink.split(
  ({ operationType }) => {
    return operationType === OperationTypeNode.SUBSCRIPTION;
  },
  wsLink,
  link,
);

export const graphqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    fragments: fragmentRegistry,
    dataIdFromObject(responseObject) {
      return responseObject._id
        ? `${responseObject.__typename}:${responseObject._id}`
        : defaultDataIdFromObject(responseObject);
    },
    typePolicies: {
      Query: {
        fields: {
          businessBookings: {
            keyArgs: [
              "providerId",
              "businessId",
              "startDate",
              "endDate",
              "search",
              "status",
            ],
            merge(existing, incoming, { args }) {
              if (!args?.page || args?.page === 1) {
                return incoming;
              }

              const existingItems = existing?.items ?? [];
              const incomingItems = incoming?.items ?? [];
              return {
                ...incoming,
                items: [...existingItems, ...incomingItems],
              };
            },
          },
        },
      },
    },
  }),
});
