import { Height } from "@mui/icons-material";
import React from "react";

const styles = {
    container: {
   display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
   

    },
    image: {
        width: "380px",
        marginBottom: "28px",
        filter: "drop-shadow(0 4px 16px rgba(108,99,255,0.12))",
    },
    title: {
        fontSize: "2rem",
        fontWeight: 700,
        color: "#6c63ff",
        marginBottom: "10px",
        letterSpacing: "0.5px",
    },
    text: {
        fontSize: "1.1rem",
        color: "#555",
        textAlign: "center",
        marginBottom: "0",
        lineHeight: 1.6,
    },
};

const NoResultFound = () => (
    <div style={styles.container}>
        <img
            src={'/storyset.com_search_q_thinkingiii-removebg-preview.png'}
            alt="No Result Found"
            style={styles.image}
            loading="lazy"
        />
        <div style={styles.title}>No Results Found</div>
        <div style={styles.text}>
            We couldn't find any matches for your search.<br />
            Try adjusting your filters or keywords.
        </div>
    </div>
);

export default NoResultFound;