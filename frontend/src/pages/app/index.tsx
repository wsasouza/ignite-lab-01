import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { withApollo } from '../../lib/withApollo';
import { useGetProductsQuery } from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from '../../graphql/generated/pagePublic';

function Home({ data }) {
  const { user } = useUser();
  // const { data, loading, error } = useGetProductsQuery();

  return (
    <>
      <div className="text-violet-500 ">
        <h1>Hello Auth 0</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <h1>Return Products</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const data = await getServerPageGetProducts({}, ctx);

    return {
      props: data.props,
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
