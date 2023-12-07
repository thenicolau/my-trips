import { InfoOutline } from "@styled-icons/evaicons-outline";
import NextNprogress from "nextjs-progressbar";
import client from "@/graphql/client";
import { GetPlacesQuery } from "@/graphql/generated/graphql";
import { GET_PLACES } from "@/graphql/queries";
import LinkWrapper from "@/components/LinkWrapper";
import dynamic from "next/dynamic";
import { MapProps } from "@/components/Map";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const getPlaces = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES);

  return places;
};
export default function Home({ places }: MapProps) {
  return (
    <>
      <LinkWrapper href={"/about"}>
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
      <NextNprogress
        color="#f231a5"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES);

  return {
    props: {
      revalidate: 5,
      places,
    },
  };
};
