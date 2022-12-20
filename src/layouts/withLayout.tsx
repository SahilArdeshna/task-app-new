import { FC, PropsWithChildren } from "react";

export const withLayout = (Component: FC, Layout: FC<PropsWithChildren>) => {
  return (props: any) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};
