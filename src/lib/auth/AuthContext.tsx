"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

import { useViewerQuery } from "@/graphql/hooks/graphqlHooks";
import type { IViewer } from "@/graphql/types/graphqlTypes";
import routes from "@/utils/routes";

import type { ReactElement } from "react";

interface AuthContextType {
  viewer: IViewer | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  viewer: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, updateQuery } = useViewerQuery();
  const { replace } = useRouter();

  const viewer = data?.viewer || null;

  const logout = async () => {
    updateQuery(() => {
      return {
        __typename: "Query",
        viewer: null,
      };
    });

    replace(routes.api.logout);
  };

  return (
    <AuthContext.Provider
      value={{
        viewer,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useViewer() {
  const { viewer } = useContext(AuthContext);

  return viewer;
}

interface AuthConsumerProps {
  children(state: AuthContextType): ReactElement;
}

export function AuthConsumer({ children }: AuthConsumerProps) {
  return <AuthContext.Consumer>{children}</AuthContext.Consumer>;
}
