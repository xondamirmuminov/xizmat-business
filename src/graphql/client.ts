import { t } from "i18next";
import { toast } from "sonner-native";
import { ErrorLink } from "@apollo/client/link/error";
import { SetContextLink } from "@apollo/client/link/context";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { ApolloLink, ApolloClient, InMemoryCache } from "@apollo/client";

import { useAuthStore } from "@/store";
import { ERROR_KEYS } from "@/lib/constants";
import { getToken, deleteToken, ReactNativeFile } from "@/lib/helpers";

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

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
});
