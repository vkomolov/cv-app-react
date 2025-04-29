import React from "react";
import * as PropTypes from "prop-types";
import "./ContentItem.scss";
import { nanoid } from "@reduxjs/toolkit";

const subheading = (data) => {
    return (
        <h3
            key={ nanoid() }
        >
            { data["subheading"] }
        </h3>
    );
};
const comments = (data) => {
    return (
        <h4
            key={ nanoid() }
        >
            { data["comments"] }
        </h4>
    );
};
const p = (data) => {
    if (Array.isArray(data["p"])) {
        return data["p"].map(text => (
            <p key={ nanoid() }>
                { text }
            </p>
        ));
    }
};
const a = (data) => {
    if (Array.isArray(data["a"])) {
        const linkArr = data["a"].map(linkElem => {
            const { path, title } = linkElem;

            /**
             * when target="_blank" to other urls, its recommended using rel="noreferrer" for avoiding vulnerabilities
             */
            return (
                <li
                    key={ nanoid() }
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
                key={ nanoid() }
            >
                { linkArr }
            </ul>
        );
    }
};
const li = (data) => {
    if (Array.isArray(data["li"])) {
        const liArr = data["li"].map(listItem => (
            <li
                key={ nanoid() }
            >
                { listItem }
            </li>
        ));

        return (
            <ul
                key={ nanoid() }
            >
                { liArr }
            </ul>
        );
    }
};
const file = (data) => {
    if (Array.isArray(data["file"])) {
        const linkArr = data["file"].map(linkElem => {
            const { path, title } = linkElem;
            const titleLabel = `${ title } in pdf format`;

            return (
                <li
                    key={ nanoid() }
                >
                    <a
                        href={ path }
                        className="link"
                        aria-label={ titleLabel }
                        title={ titleLabel }
                        download={ true }
                    >
                        { titleLabel }
                    </a>
                </li>
            );
        });

        return (
            <ul
                key={ nanoid() }
            >
                { linkArr }
            </ul>
        );
    }
};
const cbRemark  = (data) => (
    <div className="remarkCol">
        <span className="remark">
            { data["remark"] }
        </span>
    </div>
);

export default function ContentItem({ classAux, data }) {
    const dataHandles = {
        subheading,
        comments,
        p,
        a,
        li,
        file,
        remark: cbRemark,
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
            { data["remark"] && remark(data) }
            <div className="contentBlock">
                { elemsArr }
            </div>
        </div>
    );
}

ContentItem.propTypes = {
    data: PropTypes.object.isRequired,
    classAux: PropTypes.string.isRequired,
};