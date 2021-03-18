import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
    const { repos } = React.useContext(GithubContext);

    const languages = repos.reduce((total, item) => {
        const { language, stargazers_count } = item;

        if (!language) return total;

        if (!total[language]) {
            total[language] = {
                label: language,
                value: 1,
                stars: stargazers_count,
            };
        } else {
            total[language] = {
                ...total[language],
                value: total[language].value + 1,
                stars: total[language].stars + stargazers_count,
            };
        }

        return total;
    }, {});

    // MOST POPULAR LANGUAGES ---
    const mostUsedLanguages = Object.values(languages)
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    // MOST POPULAR REPOS - STARS -----------
    const mostStars = Object.values(languages)
        .sort((a, b) => b.stars - a.stars)
        .map((item) => {
            return { ...item, value: item.stars };
        })
        .slice(0, 5);

    // MOST POPULAR REPOS
    let { stars, forks } = repos.reduce(
        (total, item) => {
            const { stargazers_count, name, forks } = item;
            total.stars[name] = {
                label: name,
                value: stargazers_count, //stars count
            };

            total.forks[name] = {
                label: name,
                value: forks,
            };

            return total;
        },
        {
            stars: {},
            forks: {},
        }
    );

    stars = Object.values(stars)
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    forks = Object.values(forks)
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    return (
        <section className="section">
            <Wrapper className="section-center">
                {/* <ExampleChart data={chartData}></ExampleChart>; */}
                <Pie3D data={mostUsedLanguages}></Pie3D>
                <Column3D data={stars}></Column3D>
                <Doughnut2D data={mostStars}></Doughnut2D>
                <Bar3D data={forks}></Bar3D>
            </Wrapper>
        </section>
    );
};

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    gap: 2rem;
    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
        grid-template-columns: 2fr 3fr;
    }

    div {
        width: 100% !important;
    }
    .fusioncharts-container {
        width: 100% !important;
    }
    svg {
        width: 100% !important;
        border-radius: var(--radius) !important;
    }
`;

export default Repos;
