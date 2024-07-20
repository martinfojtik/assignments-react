import React from "react";
import styled from "styled-components";
import { getTodos } from "./hooks/hooks";

const FooterStyled = styled.footer`
    display: flex;

    margin-top: 15px;
    padding-top: 15px;

    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
    
    gap: 10px;
`;

type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer = (props: FooterProps) => {
    // const { todoItems, doneItems } = props;
    const {data} = getTodos();

    const doneItems = (data || []).filter(({ isDone }) => isDone).length;
    const todoItems = (data?.length ?? 0) - doneItems;

    return (
        <FooterStyled>
            <p>Todo: {todoItems ?? 0}</p>
            <p>Done: {doneItems ?? 0}</p>
        </FooterStyled>
    );
};
