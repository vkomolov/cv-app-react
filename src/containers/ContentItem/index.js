import React from "react";
import * as PropTypes from "prop-types";
import "./ContentItem.scss";
import { v4 } from "uuid";

export default function ContentItem({ classAux, data }) {
    //log(data, "data in ContentItem");

    const dataHandles = {
        subheading: ( data ) => {
            return (
                <h3
                    key={ v4() }
                >
                    {data["subheading"]}
                </h3>
            )
        },
        comments: ( data ) => {
            return (
                <h4
                    key={ v4() }
                >
                    {data["comments"]}
                </h4>
            )
        },
        p: ( data ) => {
            if (Array.isArray(data["p"])) {
                return data["p"].map(text => (
                    <p key={ v4() }>
                        { text }
                    </p>
                ));
            }
        },
        a: ( data ) => {
            if (Array.isArray(data["a"])) {
                const linkArr = data["a"].map(linkElem => {
                    const { path, title } = linkElem;

                    /**
                     * when target="_blank" to other urls, its recommended using rel="noreferrer" for avoiding vulnerabilities
                     */
                    return (
                        <li
                            key={ v4() }
                        >
                            <a
                                href={ path }
                                className="link"
                                target="_blank"
                                rel="noreferrer noopener nofollow"
                                aria-label="follow the link for review"
                                title="follow the link for review"
                            >
                                { title }
                            </a>
                        </li>
                    );
                });

                return (
                    <ul
                        key={ v4() }
                    >
                        { linkArr }
                    </ul>
                )
            }
        },
        li: ( data ) => {
            if (Array.isArray(data["li"])) {
                const liArr = data["li"].map(listItem => (
                    <li
                        key={ v4() }
                    >
                        { listItem }
                    </li>
                ));

                return (
                    <ul
                        key={ v4() }
                    >
                        { liArr }
                    </ul>
                );
            }
        },
        file: ( data ) => {
            if (Array.isArray(data["file"])) {
                const linkArr = data["file"].map(linkElem => {
                    const { path, title } = linkElem;
                    const titleLabel = `${ title } in pdf format`;

                    return (
                        <li
                            key={ v4() }
                        >
                            <a
                                href={ path }
                                className="link"
                                aria-label={ titleLabel }
                                title={titleLabel}
                                download={ true }
                            >
                                { titleLabel }
                            </a>
                        </li>
                    );
                });

                return (
                    <ul
                        key={ v4() }
                    >
                        { linkArr }
                    </ul>
                );
            }
        },
        remark: ( data ) => {
            return (
                <div className="remarkCol">
                    <span className="remark">
                        { data["remark"] }
                    </span>
                </div>
            );
        }
    };

    const { remark, ...restHandles } = dataHandles;
    const elemsArr = Object.keys(restHandles).reduce((acc, prop) => {
        if (prop in data) {
            return acc.concat(restHandles[prop](data));
        }
        return acc;
    }, []);

    return (
        <div className={ classAux }>
            { data["remark"] && remark( data ) }
            <div className="contentBlock">
                { elemsArr }
            </div>
        </div>
    );
}

ContentItem.propTypes = {
    data: PropTypes.object.isRequired,
    classAux: PropTypes.string.isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}