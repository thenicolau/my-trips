import { useRouter } from "next/dist/client/router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Place = {
  id: string;
  name: string;
  slug: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type MapProps = {
  places?: Place[];
};
const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_APIKEY;
const MAPBOX_USERID = process.env.NEXT_PUBLIC_MAPBOX_USERID;
const MAPBOX_STYLEID = process.env.NEXT_PUBLIC_MAPBOX_STYLEID;
const CustomTitleLayer = () => {
  return MAPBOX_API_KEY ? (
    <TileLayer
      attribution=""
      url={`https://api.mapbox.com/styles/v1/gustavonicolau/cktfzqqel0spv18pjugs36mi8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ3VzdGF2b25pY29sYXUiLCJhIjoiY2t0ZnI5eXV2MGF2bjJxbm0wYWRnc3hwMCJ9.cC4_i0OKV9qPCaF1DY0NVw`}
    />
  ) : (
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  );
};
const Map = ({ places }: MapProps) => {
  const router = useRouter();
  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      style={{ height: "100%", width: "100%" }}
    >
      <CustomTitleLayer />
      {places?.map(({ id, slug, name, location }) => {
        const { latitude, longitude } = location;
        return (
          <Marker
            key={`place-${id}`}
            position={[latitude, longitude]}
            title={name}
            eventHandlers={{
              click: () => {
                router.push(`/place/${slug} `);
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
};

export default Map;
