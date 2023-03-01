"use client";

import { FC, ReactNode } from "react";
import BlogProvider from "./blog-context";
import FollowingProvider from "./following-context";
import KeysProvider from "./keys-context";
import RelayProvider from "./relay-context";
import UserProvider from "./user-context";
import FeedProvider from "./feed-context";

const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <KeysProvider>
    <FollowingProvider>
      <UserProvider>
        <BlogProvider>
          <FeedProvider>
            <RelayProvider>{children}</RelayProvider>
          </FeedProvider>
        </BlogProvider>
      </UserProvider>
    </FollowingProvider>
  </KeysProvider>
);

export default Providers;