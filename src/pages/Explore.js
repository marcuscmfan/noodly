import { useMediaQuery } from "react-responsive"
import ExploreDesktop from "./ExploreDesktop"
import ExploreMobile from "./ExploreMobile"

export default function Explore() {

    const isDesktop = useMediaQuery({minWidth: 768})

    return(
        <>
            {isDesktop
            ? <ExploreDesktop />
            : <ExploreMobile />
            }
        </>
    );

}
