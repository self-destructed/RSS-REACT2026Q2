import { useLocation } from "react-router";

export function LocationSpy(): React.JSX.Element {
  const location = useLocation();
  return <div data-testid="location">{location.search}</div>;
}
