import React, { useMemo } from "react";
import "./NotFoundPage.scss";
import { Link } from "react-router-dom";
import ImageWrapper from "../../components/ImageWrapper";
import { useRoutesData } from "../../hooks";



const NotFoundPage = () => {
    const { filters, auxData } = useRoutesData();

    const rootRout = useMemo(() => {
        log(filters, "filters in 404 useMemo:");
        if (filters.length) {
            return filters[0];
        }
        return "/";
    }, [filters]);

    const photoUrl = useMemo(() => {
        log(auxData, "auxData in 404 useMemo");
        if (auxData && "photoUrl" in auxData) {
            return auxData["photoUrl"];
        }
        return null;
    }, [auxData]);

    return (
        <div className="full-page-wrapper">
            <div className="aside-container">
                <span className="sign-404">404</span>
                <h1 className="heading-404">Such page is not found</h1>
                <p className="text-404">There may be a mistake in the URL of the page.</p>
                <Link
                    to={ `/${ rootRout }` }
                    replace={ true }
                    className="link-to-main"
                >
                    Go to Main Page
                </Link>
            </div>
            <div className="image-bar">
                { photoUrl &&  (
                    <ImageWrapper imgSrc={ photoUrl } alt="applicant" className="img-container" >
                        <span className="photo-heading">Vadim Komolov</span>
                        <a href="mailto:vkomolov.ua@gmail.com" className="mail-to">vkomolov.ua@gmail.com</a>
                    </ImageWrapper>
                ) }
            </div>
        </div>
    );
};

export default NotFoundPage;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}